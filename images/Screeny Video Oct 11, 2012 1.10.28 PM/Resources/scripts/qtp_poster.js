/*

File: qtp_poster.js

Version: <2.0>

Disclaimer: IMPORTANT:  This Apple software is supplied to you by Apple
Computer, Inc. ("Apple") in consideration of your agreement to the
following terms, and your use, installation, modification or
redistribution of this Apple software constitutes acceptance of these
terms.  If you do not agree with these terms, please do not use,
install, modify or redistribute this Apple software.

In consideration of your agreement to abide by the following terms, and
subject to these terms, Apple grants you a personal, non-exclusive
license, under Apple's copyrights in this original Apple software (the
"Apple Software"), to use, reproduce, modify and redistribute the Apple
Software, with or without modifications, in source and/or binary forms;
provided that if you redistribute the Apple Software in its entirety and
without modifications, you must retain this notice and the following
text and disclaimers in all such redistributions of the Apple Software. 
Neither the name, trademarks, service marks or logos of Apple Computer,
Inc. may be used to endorse or promote products derived from the Apple
Software without specific prior written permission from Apple.  Except
as expressly stated in this notice, no other rights or licenses, express
or implied, are granted by Apple herein, including but not limited to
any patent rights that may be infringed by your derivative works or by
other works in which the Apple Software may be incorporated.

The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

Copyright © 2006-2007 Apple Computer, Inc., All Rights Reserved

*/ 

if (typeof(QTP) == "undefined") { 
	/** QTP is a namespace for QuickTime Player javascript objects. */
	QTP = {}; 
}

/**
 * Include the necessary prerequisites for this script: 
 *   QTP.Movie, QTP.Controller, and QTP.UI:
 */
{
	var head = document.getElementsByTagName('head')[0];
	var scripts = $A(document.getElementsByTagName('script'));
	var baseURL;
	scripts.each(function(script) {
		var src = script.getAttribute('src');
		if(typeof(src) == 'undefined')
			return;
			
		var match = src.match(/(.*)qtp_poster.js/);
		if(!match)
			return;
			
		baseURL = src.match(/(.*)qtp_poster.js/)[1];
		if(typeof(baseURL) != 'undefined')
			throw($break);
	});
	
	var include = function(url) {
		var script = document.createElement('script');
		script.setAttribute('language', 'javascript');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		head.appendChild(script);
	};
	if(typeof(QTP.Movie) == "undefined")
		include(baseURL + "qtp_movie.js");
	if(typeof(QTP.Button) == "undefined")
		include(baseURL + "qtp_ui.js");
	if(typeof(QTP.MovieController) == "undefined")
		include(baseURL + "qtp_controller.js");
}

/**
 * Creates an object which listens for a mouse click, intercepts it, and creates a DOM element
 * in response.  Creates a QTP.Movie using the <code>url</code> parameter, and a QTP.MovieController
 * object for that movie.
 * @param {String} url Initializes the object's url member
 * @class Poster
 * @constructor
 */
QTP.Poster = function(url) 
{ 
	this.url = url;
};

/**
 * URL to use when activating the popup DOM element.
 * @type String
 */
QTP.Poster.prototype.url = null;
/**
 * Caches the movie created when the popup is activated.
 * @type QTP.Movie
 */
QTP.Poster.prototype.movie = null;
/**
 * Caches the "click to play" DOM element.
 * @type Element
 */
QTP.Poster.playButton = null;
/**
 * Caches the poster image
 * @type Element
 */
QTP.Poster.img = null;
/**
 * Caches the DOM movie wrapper element
 * @type Element
 */
QTP.Poster.element = null;
/**
 * Caches the movie controller.
 * @type QTP.Controller
 */
QTP.Poster.controller = null;
/**
 * Determines whether to allow the popup to fade into existence.  Set this
 * to <code>false</code> to disable the fade behavior.
 * @type boolean
 */
QTP.Poster.prototype.fadeIn = true;
/**
 * Sets the default clickText of the popup DOM element.  Set this to another String
 * to change the text displayed in the poster element.
 * @type String
 */
QTP.Poster.prototype.clickText = "Click to Play";
/**
 * Sets the default className of the movieController DOM element.  Set this to another String
 * to change the defailt controller className.
 * @type String
 */
QTP.Poster.prototype.controllerType = 'QTP_Poster';

/**
 * Sets the default className for the poster DOM element.  Set this to another String to
 * change the default poster className.
 * @type String
 */
QTP.Poster.prototype.className = 'QTP';

/**
 * Sets the default attributes to be passed to QTP.Movie when the movie is instantiated.
 * Change or add attributes to control the movie created by the poster object.
 */
QTP.Poster.prototype.attributes = {
		controller: 'false',
		autoplay: 'true', 
		bgcolor: 'black', 
		scale: 'aspect',
		postdomevents: 'true'
	};

/**
 * Caches whether the movie element is currently popped up.
 * @type boolean
 */
 QTP.Poster.prototype.swapped = false;

/**
 * Walks through the DOM heirarchy, looking for <code>&lt;a&gt;</code> tags with a <code>rel</code>
 * attribute of <code>'qtpopup'</code>.  For each it finds, the function creates a new Poster
 * object and attaches the object to the link as its <code>popup</code> member.  The Poster
 * object listens for the link's <code>click</code> event.
 * @example 
 * &lt;script type="javascript" src="qtp_library.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_ui.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_controller.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_popup.js"&gt;&lt;/script&gt;
 * ...
 * &lt;a href="myMovie.mov" rel="qtpopup"&gt;
 */
QTP.Poster.instantiatePosters = function()
{
	if (navigator.platform.indexOf('iPhone') > -1) 
		return;

	// Check for prerequisites before continuing:		
	if(typeof(QTP.Movie) == "undefined" || typeof(QTP.Button) == "undefined" || typeof(QTP.MovieController) == "undefined")
	{	
		setTimeout(QTP.Poster.instantiatePosters, 100);
		return;
	}


	var links = $A(document.getElementsByTagName('a'));
	var posters = links.findAll(function(link){ return link.rel && link.rel == 'qtposter'; });
	
	posters.each(function(link){
		var movieUrl = link.href;
		var img = link.getElementsByTagName('img')[0];
		
		if (navigator.platform.indexOf('iPhone') > -1) 
		{
			var movie = new QTP.Movie({src:movieUrl});
			link.parentNode.replaceChild(movie.element, link);
			return;
		}
		
		var poster = new QTP.Poster(movieUrl);		
		var element = document.createElement('div');
		
		
		if(Element.hasAttribute(img, 'width'))
			poster.attributes.width = parseInt(img.getAttribute('width'));
		if(Element.hasAttribute(img, 'height'))
			poster.attributes.height = parseInt(img.getAttribute('height'));

		if(!Element.hasAttribute(element, 'className'))
			element.className = poster.className;
		poster.element = element;
		element.poster = poster;
		element.style.position = 'relative';

		var playContainer = element.appendChild(document.createElement('div'));
		playContainer.className = 'playContainer';
		
		poster.play = playContainer.appendChild(document.createElement('span'));
		poster.play.innerHTML = poster.clickText;
		poster.play.className = 'playButton';
		QTP.Poster.FixOperaOpacity(poster.play);

		element.appendChild(img);
		poster.img = img;
			
		if(link.getAttribute('jscontroller')=='false')
		{
			poster.attributes.controller = 'true';
		}
		else
		{
			poster.controller = new QTP.MovieController(poster.controllerType);
			poster.controller.setMovie(poster);
			element.appendChild(poster.controller.element);
		}

		element.onclick = poster.posterListener.bindAsEventListener(poster);
		link.parentNode.replaceChild(element, link);
	});
};

/**
 * Static utility function which fixes misalignment in the default movie controller.
 * @param {Element} movie element to fix
 */
QTP.Poster.FixIEController = function(element)
{
	if(navigator.appName != "Microsoft Internet Explorer")
		return;

	if(!element.GetControllerVisible());
		setTimeout( function() { element.SetControllerVisible(true); }, 100);
}

/**
 * Static utility function to fix the opacity problems present in Opera.
 * @param {Element} element to fix
 */
QTP.Poster.FixOperaOpacity = function(element)
{
	if(navigator.appName != "Opera")
		return;

	element.style.opacity = "1.0";
}


/**
 * Event listener which calls <code>poster()</code> once, and prevents the poster action from
 * being called again.
 * @param {Event} event The instigating event
 */
QTP.Poster.prototype.posterListener = function(event)
{
	if(this.swapped)
		return;
	this.swapped = true;
	
	Event.stop(event);

	this.play.style.display = 'none';
	this.img.style.opacity = 1.0;

	var intervalId = setInterval(function() {
		var opacity = parseFloat(this.img.style.opacity);
		opacity = Math.max(0.0, opacity - 0.2);
		this.img.style.opacity = opacity;
		this.img.style.filter = 'alpha(opacity='+(opacity*100)+')';
	}.bind(this), 25);
	
	setTimeout(function() {
		clearInterval(intervalId); 
		
		var attributes = this.attributes;
		if(Element.hasAttribute(this.element, 'width'))
			attributes.width = this.element.getAttribute('width');
		if(Element.hasAttribute(this.element, 'height'))
			attributes.height = this.element.getAttribute('height');
			
		attributes.src = this.url;
		var movie = new QTP.Movie(attributes);
		this.movie = movie;
		
		if(this.controller)
			this.controller.setMovie(movie);
		
		this.element.replaceChild(movie.element, this.img);
		
		if(attributes.controller != 'false')
			QTP.Poster.FixIEController(movie.element);
	}.bind(this), 250);
	
	return true;
};

Event.observe(window, 'load', QTP.Poster.instantiatePosters);

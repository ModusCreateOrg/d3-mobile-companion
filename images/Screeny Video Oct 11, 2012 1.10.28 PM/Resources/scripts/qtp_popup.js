/*

File: qtp_popup.js

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
 * Creates an object which listens for a mouse click, intercepts it, and creates a DOM element
 * in response.  Creates a QTP.Movie using the <code>url</code> parameter, and a QTP.MovieController
 * object for that movie.
 * @param {String} url Initializes the object's url member
 * @class Popup
 * @constructor
 */
QTP.Popup = function(url) 
{ 
	this.url = url;
};

/**
 * URL to use when activating the popup DOM element.
 * @type String
 */
QTP.Popup.prototype.url = null;
/**
 * Caches whether the DOM element is currently popped up.
 * @type boolean
 */
QTP.Popup.prototype.poppedUp = false;
/**
 * Caches the DOM div element which contains the popup.
 * @type DOMElement
 */
QTP.Popup.prototype.popupDiv = null;
/**
 * Caches the movie created when the popup is activated.
 * @type QTP.Movie
 */
QTP.Popup.prototype.movie = null;
/**
 * Determines whether to allow the popup to fade into existence.  Set this
 * to <code>false</code> to disable the fade behavior.
 * @type boolean
 */
QTP.Popup.prototype.fadeIn = true;
/**
 * Determines whether to discover the movie's natural size, and then to manually 
 * set the movie to that size.  Set this to <code>false</code> to disable the autoSize 
 * behavior.
 * @type boolean
 */
QTP.Popup.prototype.autoSize = true;
/**
 * Sets the default className of the movieController DOM element.  Set this to another String
 * to change the defailt controller className.
 * @type String
 */
QTP.Popup.prototype.controllerType = 'Pro';
QTP.Popup.prototype.attributes = {
		controller: 'false',
		autoplay: 'true', 
		bgcolor: 'black', 
		scale: 'aspect',
		postdomevents: 'true'
	};

/**
 * Walks through the DOM heirarchy, looking for <code>&lt;a&gt;</code> tags with a <code>rel</code>
 * attribute of <code>'qtpopup'</code>.  For each it finds, the function creates a new Popup
 * object and attaches the object to the link as its <code>popup</code> member.  The Popup
 * object listens for the link's <code>click</code> event.
 * @example 
 * &lt;script type="javascript" src="qtp_library.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_ui.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_controller.js"&gt;&lt;/script&gt;
 * &lt;script type="javascript" src="qtp_popup.js"&gt;&lt;/script&gt;
 * ...
 * &lt;a href="myMovie.mov" rel="qtpopup"&gt;
 */
QTP.Popup.instantiatePopups = function()
{
	if (navigator.platform.indexOf('iPhone') > -1) 
		return;

	var links = $A(document.getElementsByTagName('a'));
	var controllers = links.findAll(function(link){ return link.rel && link.rel == 'qtpopup'; });
	
	controllers.each(function(link){
			if(link.popup)
				return;
			var popup = new QTP.Popup(link.href);
			link.popup = popup;
			
			var img = document.createElement('span');
			img.className = 'qtpopupbutton';
			link.appendChild(img);
			
			var listener = popup.popupListener.bindAsEventListener(popup);
			Event.observe(link, 'click', listener);
		});
};

/**
 * Static utility function which converts a query string to a hash of key:value pairs.
 * @param {String} query A url-style query string
 * @returns Object A hash object of key:value pairs
 */
QTP.Popup.toQueryParams = function(query)
{
	var hash = {};

	if(typeof(query) == 'undefined')
		return hash;
		
	query.split('&').each(function(param){
			var pair = param.split('=');
			hash[pair[0]] = pair.length > 1 ? pair[1] : pair[0];
		});
		
	return hash;
};

/**
 * Static utility function which will call a handler when the element param is either loaded, or 
 * emits a qt_loadmetadata event; whichever comes first.
 * @param {DOMElement} element A video or object/embed element.
 * @param {Function} handler A callback method
 */
QTP.Popup.pollOrListenForLoad = function(element, handler)
{
	if( !typeof(element.GetPluginStatus) == 'undefined' &&
		(element.GetPluginStatus() == 'playable' || element.GetPluginStatus() == 'complete'))
	{
		// short circuit
		handler();
		return;
	}


	Event.observe(element, 'qt_loadedmetadata', handler);

	var timer = function() {
		if(!timer._stoppedListener)
		{
			if(typeof(element.GetQuickTimeVersion) == 'undefined')
			{
				setTimeout(timer, 100);
				return;
			}
		
			var version = element.GetQuickTimeVersion().split('.');
			if(!(version[0] < 7 || version[1] < 2 || version[2] < 1))
			{
				// just use the observer
				return;
			}
			
			// cancel the listener
			Event.stopObserving(element, 'qt_loadedmetadata', handler);
			timer._stoppedListener = true;
		}
		
		if( typeof(element.GetPluginStatus) == 'undefined' ||
		 !(element.GetPluginStatus() == 'playable' || element.GetPluginStatus() == 'complete'))
		{
			setTimeout(timer, 100);
			return;
		}
		
		handler();
	}
	
	timer();
}

/**
 * Event listener which calls <code>popup()</code> once, and prevents the popup action from
 * being called again.  The listener will become active again once <code>closePopup()</code> is
 * called.
 * @param {Event} event The instigating event
 */
QTP.Popup.prototype.popupListener = function(event)
{
	event.stopPropagation();
	event.preventDefault();
	
	if(this.poppedUp)
		return;
	this.poppedUp = true;
	
	this.popup();
	return true;
};

/**
 * Creates the popup DOM object, instantiates a new QTP.Movie, and inserts the whole into the document
 * body.  The fade behavior is controlled by the <code>fade</code> property.  The autoSize behavior
 * is controlled by the <code>autoSize</code> property.  The css className of the instantiated 
 * QTP.MovieController element is controlled by the <code>controllerType</code> property.
 */
QTP.Popup.prototype.popup = function()
{
	var url = this.url;
	
	var div = document.createElement('div');
	var background = document.createElement('div');
	var wrapper1 = document.createElement('div');
	var wrapper2 = document.createElement('div');
	var spinner = document.createElement('div');
	var moviewrapper = document.createElement('div');
	var close = document.createElement('div');
//	var openinplayer = document.createElement('div');
	var controller = new QTP.MovieController(this.controllerType);
	div.className = 'qtpopup';
	background.className = 'qtpopupbackground';
	wrapper1.className = 'qtpopupwrapper1';
	wrapper2.className = 'qtpopupwrapper2';
	moviewrapper.className = 'qtpopupmovie';
	close.className = 'qtpopupclose';
	spinner.className = 'qtpopupprogress';
//	openinplayer.className = 'qtpopupopeninplayer';
			
//	Event.observe(openinplayer, 'click', this.openFullscreen.bindAsEventListener(this));
	Event.observe(close, 'click', this.closePopup.bindAsEventListener(this));
	Event.observe(background, 'click', this.closePopup.bindAsEventListener(this));

	if(this.fadeIn)
	{
		// set up fade in
		background.style.opacity = 0.0;
		background.style.webkitTransition = 'opacity 0.25s ease-in';
		spinner.style.opacity = 0.0;
		spinner.style.webkitTransition =  'opacity 0.25s ease-in';
	}

	// add the elements to the DOM
	moviewrapper.appendChild(spinner);
	wrapper2.appendChild(spinner);
	wrapper1.appendChild(wrapper2);
	div.appendChild(wrapper1);
	div.appendChild(background);
	document.body.appendChild(div);
	
	if(this.fadeIn)
	{
		// fade in
		background.style.removeProperty('opacity');
		spinner.style.removeProperty('opacity')
	}
	
	// allow the user to override the attributes
	var args = url.indexOf('?') > -1 ? QTP.Popup.toQueryParams(url.split('?')[1]) : [];
	var attributes = this.attributes;
	for(key in args) { attributes[key] = args[key]; }

	attributes.src = url;
	var movie = new QTP.Movie(attributes);

	// size the movie to its default size, but
	// not until it's loaded
	if(this.autoSize && (!args.width || !args.height))
		QTP.Popup.pollOrListenForLoad(movie.element, function()
			{
				var dims = movie.element.GetRectangle().split(',');
				var matrix = movie.element.GetMatrix().split(/$/m);
				matrix.each(function(row, index){ matrix[index] = row.split(/,/); });
				// invert the width and height matrix adjustments
				dims[2] /= matrix[0][0];
				dims[3] /= matrix[1][1];
				movie.element.setAttribute('width',dims[2]);
				movie.element.setAttribute('height',dims[3]);
			});
			
	this.movie = movie;

	controller.setMovie(movie);
	moviewrapper.appendChild(movie.element);
	moviewrapper.appendChild(close);
	moviewrapper.appendChild(document.createElement('br'));
//	moviewrapper.appendChild(openinplayer);
	moviewrapper.appendChild(controller.element);		

	// add the movie to the DOM
	setTimeout(function() {
		wrapper2.removeChild(spinner);
		wrapper2.appendChild(moviewrapper);
		}, this.fadeIn ? 250 : 0);

	div.movie = movie;

	this.popupDiv = div;
	this.moviewrapper = moviewrapper;
	this.controller = controller;
};

/**
 * Stops the movie playback, removes the popup DOM element from the DOM tree, and empties its members.
 * This function will reset the <code>popupListener()</code> behavior, so that the user can once again
 * click on a qtpopup link.
 */
QTP.Popup.prototype.closePopup = function(event)
{
	event.stopPropagation();
	event.preventDefault();

	if(!this.poppedUp)
		return;
	this.poppedUp = false;
	
	if(typeof(this.movie.element.Stop) != 'undefined')
		this.movie.element.Stop();
	this.popupDiv.style.display = 'hidden';
	document.body.removeChild(this.popupDiv);
	this.popupDiv = null;
	this.movie = null;

	return true;
};

/**
 * For object/embed tag movies, this will cause the movie URL to be opened in QuickTime Player.
 * But for video tag movies, this function will have no effect.
 */
QTP.Popup.prototype.openInPlayer = function(event)
{
	event.stopPropagation();
	event.preventDefault();

	var movie = this.movie;
	
	movie.element.Stop();
	movie.addParameter('href', this.href);
	movie.addParameter('target', 'quicktimeplayer');
	movie.addParameter('autohref', 'true');
	
	QTP.Popup.closePopup.call(this, event);
};

/**
 * Creates a new child browser window, with no menu-, tool-, or scrollbars.  This window's 
 * initial size will be the available screen size, and will contain the same movie object as 
 * the popup.
 */
QTP.Popup.prototype.openFullscreen = function(event)
{
	var dims = [window.screen.availLeft, 
				window.screen.availTop,
				window.screen.availWidth,
				window.screen.availHeight];
				
	var settings = "left="+dims[0]+",top="+dims[1]+",width="
					+dims[2]+",height="+dims[3]+",menubar=no,toolbar=no,location=no,"
					+"resizable=yes,scrollbars=no,dependent=yes"

	var url = "Fullscreen.html?" + escape(this.url);		
	var child = window.open(url, "child", settings);
	this.closePopup(event);
}

Event.observe(window, 'load', QTP.Popup.instantiatePopups);

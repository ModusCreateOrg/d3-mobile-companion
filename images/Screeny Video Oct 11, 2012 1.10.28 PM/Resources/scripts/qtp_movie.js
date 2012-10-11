/*

File: qtp_movie.js

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
 * @fileoverview This file contains functions to generate a JavaScript-based QuickTime movie 
 * object, compatable with both Desktop and iPhone platforms. 
 *
 * @requires Prototype.Browser (Prototype.js or Mini_prototype.js)
 * @requires Event.observe (Prototype.js or Mini_prototype.js)
 */

/** 
 * Movie is an class which abstracts the creation of embed/object/video tags.
 * The correct tag will be created depending on the user's browser.
 * @param {Object} hash a key-value dictionary of attributes
 * @constructor
 * @example
 * var movie = new Movie({src: 'myMovie.mov', autoplay: 'false', scale: 'aspect'});
 * document.body.appendChild(movie.element);
 */
QTP.Movie = function(hash)
{
	
	// Create a <video> tag for builds of Safari which support it:
	if( QTP.Movie.useVideoTag && QTP.Movie.isVideoTagSupported() )
	{
		this.element = document.createElement( 'video' );
		this.addParameters(hash);
	}
	else
	{
		this.element = document.createElement( 'object' );
	
		if( Prototype.Browser.IE )
		{
			this.element.setAttribute('codebase', 'http://www.apple.com/qtactivex/qtplugin.cab#version=7,1,6,0');
		}
		else
		{
			this.element.setAttribute('type', 'video/quicktime');
		}
		
		this.addParameters(hash);
		
		if( Prototype.Browser.IE )
		{
			this.element.setAttribute('classid', 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B');
		}
	}
};

/**
 * Determines whether to use the &lt;video&gt; tag where supported.  Defaults to true.
 * @type boolean
 */
QTP.Movie.useVideoTag = true;
	
/**
 * The DOM element created by Movie, either an embed, object, or video tag
 * depending on the user's browser.
 * @type DOMElement
 */
QTP.Movie.prototype.element = null;

/**
 *
 */
QTP.Movie.isVideoTagSupported = function()
{
	try {
		if (typeof(window.HTMLVideoElement) == 'undefined')
			return false;
			
		var video = document.createElement('video');
		return (video.constructor == window.HTMLVideoElement)
	} catch(err) {
		return false;
	}	
}
	
/**
 * Adds the specified attribute key and value to the DOM element. Keys of the type 
 * "obj#xxx" and "emb#xxx" are supported and will be added only if the DOM element 
 * type is appropriate.  The parameter will be of the form of a tag attribute, or a child
 * param object, depending on the DOM element type and the parameter key.
 * @param {String} key The attribute name
 * @param {String} value The attribute value
 */
QTP.Movie.prototype.addParameter = function(key, value)
{
	if( this.element.tagName.toLowerCase() == 'embed' )
	{
		if(key.toLowerCase().indexOf('obj#') == 0)
			return; // Do not add obj-specific tags to embeds
		this.element.setAttribute(key, value);
	}
	else if( this.element.tagName.toLowerCase() == 'object' )
	{
		if(key.toLowerCase().indexOf('emb#') == 0)
			return; // Do not add emb-specific tags to objects
		if(key.toLowerCase() == 'width' || key.toLowerCase() == 'height' || key.toLowerCase() == 'id' || key.toLowerCase() == 'data')
			this.element.setAttribute(key, value);
		else if(key.toLowerCase() == 'src' && Prototype.Browser.Gecko)
		{
			this.element.setAttribute('data', value);
		}
		else
		{
			var param = document.createElement('param');
			param.setAttribute('name', key);
			param.setAttribute('value', value);
			this.element.appendChild(param);
		}
	}
	else if( this.element.tagName.toLowerCase() == 'video' )
	{
		if(key.toLowerCase().indexOf('emb#') == 0 || key.toLowerCase().indexOf('obj#') == 0)
			return; // Do not add emb- or obj-specific tags to objects
			
		// convert from embed-style keys to video tag keys
		switch(key.toLowerCase()) {
			case 'controller':
				key = 'controls';
			case 'autoplay':
				if(value.toLowerCase() == 'false')
					return; // for the <video> tag, the presence of a boolean attribute == 'true'
				break;
		}

		this.element.setAttribute(key, value);					
	}
};

/**
 * Removes the specified attribute from the DOM element, whether the attribute is
 * a tag attribute, or a child param tag.
 * @param {String} key The attribute name
 */
QTP.Movie.prototype.removeParameter = function(key)
{
	if( this.element.hasAttribute(key) )
		this.element.removeAttribute(key);
	else
	{
		for(i in childNodes)
		{
			if(childNodes[i].getAttribute('name') == key)
			{
				this.element.removeChild(childNodes[i]);
			}
		}
	}
};

/** 
 * Replaces an existing parameter value with a new one.  The new value is set
 * whether or not the previous value exists.
 * @param {String} key The attribute name
 * @param {String} value The attribute value
 */
QTP.Movie.prototype.replaceParameter = function(key, value)
{
	this.removeParameter(key);
	this.addParameter(key, value);
};

/**
 * Adds the specified attribute key and value to the DOM element.
 * @param {Object} pair A key-value pair
 * @config {String} key The attribute name
 * @config {String} value The attribute value
 */
QTP.Movie.prototype.addParameterPair = function(pair)
{
	return this.addParameter(pair.key, pair.value);
};
	
/**
 * Adds the specified attributes to the DOM element.
 * @param {Array} pair An array of key-value pairs
 * @config {String} key The attribute name
 * @config {String} value The attribute value
 */
QTP.Movie.prototype.addParameters = function(hash)
{
	for(var key in hash )
	{
		this.addParameter(key, hash[key]);
	}
};

/**
 * Determines whether the DOM element has enabled DOM media events.
 * @returns {boolean} true, if elements have been enabled.
 */
QTP.Movie.prototype.areEventsEnabled = function()
{
	switch(this.element.tagName.toLowerCase())
	{
	case 'video':
	case 'embed':
		return this.element.getAttribute('postdomevents').toLowerCase() == 'true';
	case 'object':
		var params = this.element.getElementsByTagName('param');
		for(var index in params)
			if(params[index].name == 'postdomevents' && params[index].value == 'true')
				return true;
	}
	return false;
}

/**
 * Determines whether the DOM element supports HTML5-style media events.
 * @returns {boolean} true, if elements are supported. false, if elements are not supported.
 * undefined, if the plugin is not sufficiently loaded to make a determination.
 */
QTP.Movie.prototype.areEventsSupported = function()
{
	if(typeof(this._eventsSupported) != 'undefined')
		return this._eventsSupported;
		
	if(QTP.isMobileSafari() && this.areEventsEnabled())
	{
		this._eventsSupported = true;
		return this._eventsSupported;
	}
	
	$A(navigator.plugins).each(function(plugin) {
		if(plugin.name.indexOf('QuickTime Plug-In ') != 0)
			return;
		var version = plugin.name.slice(18).split('.');
		if(version.length < 3)
			version[2] = 0;
		if(!(version[0] < 7 || version[1] < 2 || version[2] < 1))
			this._evenstSupported = true;
	}.bind(this));
	
	return this._eventsSupported;
};

/**
 * Detects if the browser is an iPhone/iPod Touch
 * @returns bool <code>true</code> if the browser user agent is Mobile Safari, <code>false</code> otherwise.
 */
QTP.isMobileSafari = function()
{
	var ua = navigator.userAgent;
	return RegExp(" AppleWebKit/").test(ua) && RegExp(" Mobile/").test(ua)
};


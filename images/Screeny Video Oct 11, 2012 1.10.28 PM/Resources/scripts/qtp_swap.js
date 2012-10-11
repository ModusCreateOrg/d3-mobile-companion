/*

File: qtp_swap.js

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
 * Creates a new Swap object which downloads a podcast feed, and uses that feed
 * to populate a list.
 * @constructor
 */
QTP.Swap = function(feed, list, video, poster)
{
	this.feed = feed;
	this.list = list;
	this.video = video;
	this.poster = poster;
	this.loadFeed();
	
	this.movie = new QTP.Movie({ autoplay: 'true', postdomevents: 'true',
	scale: 'aspect', controller: 'false', autoexitfullscreen: 'false',
	type: 'video/quicktime' });

	this.video.controller = new QTP.MovieController('controller');
	this.video.appendChild(this.video.controller.element);
	this.video.controller.setMovie(this.movie);

	this.video.wrapper = this.video.appendChild(document.createElement('div'));
	this.video.wrapper.className = 'wrapper';

	this.video.wrapper.appendChild(this.movie.element);
	
	this.video.desc = this.video.appendChild(document.createElement('div'));
	this.video.desc.className = 'description';

	this.video.close = this.video.appendChild(document.createElement('button'));
	this.video.close.className = 'close';
	Event.observe(this.video.close, 'click', this.onExitFullscreen.bindAsEventListener(this));
	
	this.video.next = this.video.appendChild(document.createElement('a'));
	this.video.next.className = 'next';
	this.video.next.href = '#';
	Event.observe(this.video.next, 'click', this.onNextMovie.bindAsEventListener(this));	

	this.video.prev = this.video.appendChild(document.createElement('a'));
	this.video.prev.className = 'prev';
	this.video.prev.href = '#';
	Event.observe(this.video.prev, 'click', this.onPrevMovie.bindAsEventListener(this));	

	Event.observe(this.movie.element, 'exitfullscreen', this.onExitFullscreen.bindAsEventListener(this));
	Event.observe(this.movie.element, 'qt_exitfullscreen', this.onExitFullscreen.bindAsEventListener(this));
};

/**
 * Static utility method which creates a new Swap object with the 
 * contents of the list DOM element's <code>src</code> attribute.
 */
QTP.Swap.instantiateSwaps = function() 
{
	var list = document.getElementById('list');
	var video = document.getElementById('video');
	var url = list.getAttribute('src');
	var poster = document.getElementById('poster');
	var swap = new QTP.Swap(url, list, video, poster);
};

/**
 * A string containing the URL of the feed source
 * @type String
 */
QTP.Swap.prototype.feed = null;
/**
 * An array of feed episodes.
 * @type Array
 * @config {String} img A string containing the URL to the episode poster image.
 * @config {String} url A string containing the URL to the episode movie.
 * @config {String} title A string containing the episode title.
 * @config {String} description A string containing the episode description.
 * @config {boolean} watched A bolean indicating whether this episode has already been watched.
 */
QTP.Swap.prototype.episodes = [];
/**
 * The current index into the episodes list
 * @type number
 */
QTP.Swap.prototype.currentEpisode = -1;
/**
 * The DOM div element containing the video playback area.
 * @type DOMElement
 */
QTP.Swap.prototype.video = null;
/**
 * The DOM div element containing the movie poster information.
 */
QTP.Swap.prototype.poster = null;
/**
 * The DOM div element containing the episode list.
 * @type DOMElement
 */
QTP.Swap.prototype.list = null;
/**
 * The DOM div element containing status messages.
 * @type DOMElement
 */
QTP.Swap.prototype.status = null;

/**
 * Fires a Ajax request for this object's <code>feed</code> url.
 */
QTP.Swap.prototype.loadFeed = function()
{
	new Ajax.Request(this.feed, {
		method: 'get',
		onCreate: this.onCreate.bind(this),
		onComplete: this.onComplete.bind(this),
		onFailure: this.onFailure.bind(this),
		onException: this.onException.bind(this),
		onError: this.onError.bind(this),
		onSuccess: this.onSuccess.bind(this)
	});
};

/**
 * Ajax onCreate handler.
 */
QTP.Swap.prototype.onCreate = function(transport)
{
	if(this.status)
	{
		this.status.parentNode.removeChild(this.status);
		this.status = null;
	}
	
	this.status = this.list.appendChild(document.createElement('div'));
	this.status.id = 'status';
	this.status.innerText = 'Loading...';
};

/**
 * Ajax onFailure handler.
 */
QTP.Swap.prototype.onFailure = function(transport)
{
	this.status.innerText += 'Loading... Failed';
};
 
/**
 * Ajax onException handler.
 */
QTP.Swap.prototype.onException = function(transport, exception)
{
	alert('An exception occured while loading the feed: ' + exception);
};
 
/**
 * Ajax onError handler.
 */
QTP.Swap.prototype.onError = function(transport)
{
	this.status.innerText += 'Loading... Error';
};

/**
 * Ajax onSuccess handler.
 */
QTP.Swap.prototype.onSuccess = function(transport)
{
	this.status.innerText += 'Loading... 100%';
};

/**
 * Ajax onComplete handler.
 */
QTP.Swap.prototype.onComplete = function(transport)
{
	this.status.parentNode.removeChild(this.status);
	this.status = null;
	
	this.parseFeed(transport.responseText);
	this.buildList();
};

/**
 * Parses the feed text and creates elements from it.
 * @param {String} feedText The podcast feed contents
 */
QTP.Swap.prototype.parseFeed = function(feedText)
{
	var xmlobject = (new DOMParser()).parseFromString(feedText, "text/xml");

	var root = xmlobject.getElementsByTagName('rss')[0];
	var channels = $A(root.getElementsByTagName('channel'));
	channels.each( function(channel) {
		var image = channel.getElementsByTagName('image')[0].getElementsByTagName('url')[0].firstChild.nodeValue;
		var items = $A(channel.getElementsByTagName('item'));
		var desc = '';
		try {
			desc = channel.getElementsByTagName('summary')[0].firstChild.nodeValue;
			desc = desc.replace(/$/mg, '<br>');
		} catch (e) {}
		
		// Only use the first item:
		items = items.splice(0, 1);
	
		items.each( function(item) {
			try { 
				var titl = item.getElementsByTagName('title')[0].firstChild.nodeValue;
				titl = item.getElementsByTagName('subtitle')[0].firstChild.nodeValue;
			} catch(e) {}
			var enclosures = $A(item.getElementsByTagName('enclosure'));
			if(enclosures.length == 0)
				return;
				
			enclosures.sortBy(function(enclosure) { 
				switch (enclosure.type) 
				{
					case 'video/quicktime': return 1;
					case 'video/mp4': return 2;
					default: return 3;
				}
			});
			
			var movie = enclosures[0].getAttribute('url');
			var episode = {img: image, title: titl, description: desc, url: movie, watched: false};
			this.episodes.push(episode);
		}.bind(this));
	}.bind(this));
};

/**
 * Uses the <code>episodes</code> member to construct the episode list
 */
QTP.Swap.prototype.buildList = function()
{
	this.list.innerHTML = '';
	this.episodes.each(function(episode, index) {
		var row = this.list.appendChild(document.createElement('li'));
		var link = row.appendChild(document.createElement('a'));
		link.appendChild(document.createTextNode(episode.title));
		link.href = "#";
		link.episodeNumber = index;
		Event.observe(link, 'click', this.onLinkClick.bindAsEventListener(this));
		
		var poster =document.createElement('div');
		poster.className = 'poster';
		
		var link = poster.appendChild(document.createElement('a'));
		var img = link.appendChild(document.createElement('img'));
		var icon = link.appendChild(document.createElement('div'));
		icon.className = 'icon';
		img.src = episode.img;
		link.href = episode.url;
		
		var desc = poster.appendChild(document.createElement('div'));
		desc.innerHTML = episode.description;
		desc.className = 'description';
	
		poster.episodeNumber = index;
		Event.observe(link, 'click', this.onPosterClick.bindAsEventListener(this, index));
		
		row.appendChild(poster);
		row.poster = poster;

	}.bind(this));
};

/**
 * Link list click handler.
 */
QTP.Swap.prototype.onLinkClick = function(event)
{
	event.stop();
	try {
		var link = event.element();
		if(link.parentNode.hasAttribute('selected'))
		{
			var rows = $A(this.list.getElementsByTagName('li'));
			rows.each(function(r) { r.removeAttribute('selected'); });
		}
		else
			this.setCurrentLink(link.episodeNumber);
	} catch(e) {}
	return false;
};

QTP.Swap.prototype.onPosterClick = function(event, episodeNumber)
{
	event.stop();

	/* Set an attribute onto which animations can be attached */
	if(this.video.hasAttribute('disabled'))
	{
		this.video.setAttribute('minimized', 'true');
		setTimeout(function() { this.video.removeAttribute('minimized'); }.bind(this), 0);
	}

	this.playMovie(episodeNumber);
	return false;
};

QTP.Swap.prototype.onExitFullscreen = function(event)
{
	Event.stopObserving(this.movie.element, 'exitfullscreen', this.exitFullscreenListener);
	Event.stopObserving(this.movie.element, 'qt_exitfullscreen', this.exitFullscreenListener);
	this.video.setAttribute('disabled', 'true');
	document.getElementById('outer').setAttribute('disabled', 'true');
	
	try {
		this.movie.element.Stop();
		this.movie.element.SetURL('');
	} catch(e) { }
};

QTP.Swap.prototype.onNextMovie = function(event) 
{	
	event.stop();
	
	if((this.video.episodeNumber + 1) < this.episodes.length)
	{
		this.playMovie( this.video.episodeNumber + 1 );
	}
	
	return false;
}

QTP.Swap.prototype.onPrevMovie = function(event)
{
	event.stop();

	if((this.video.episodeNumber - 1) >= 0)
	{
		this.playMovie( this.video.episodeNumber - 1 );
	}

	return false;
}

QTP.Swap.prototype.playMovie = function(episodeNumber)
{
	this.video.episodeNumber = episodeNumber;
	var episode = this.episodes[episodeNumber];

	this.video.removeAttribute('disabled');
	document.getElementById('outer').removeAttribute('disabled');

	episode.watched = true;

	this.video.desc.innerHTML = episode.description;
	this.video.next.innerText = episodeNumber + 1 < this.episodes.length ? this.episodes[episodeNumber+1].title : '';
	this.video.prev.innerText = episodeNumber - 1 >= 0 ? this.episodes[episodeNumber-1].title : '';
		

	this.setCurrentLink(episodeNumber);
	this.setLinkWatched(episodeNumber);
		
	var listener;
	listener = function(){ 
		Event.stopObserving(this.movie.element, 'qt_ended', listener);
		Event.stopObserving(this.movie.element, 'ended', listener);
		if(episodeNumber >= this.episodes.length)
			return;
		this.playMovie(episodeNumber+1);
	}.bind(this);
	
	Event.observe(this.movie.element, 'qt_ended', listener);
	Event.observe(this.movie.element, 'ended', listener);

		this.movie.element.SetURL(episode.url); 
		this.movie.element.Play(); 
};

QTP.Swap.prototype.setCurrentLink = function(episodeNumber)
{
	var rows = $A(this.list.getElementsByTagName('li'));
	rows.each(function(r) { r.removeAttribute('selected'); });
	
	var row = rows[episodeNumber];
	var link = row.getElementsByTagName('a')[0];
	row.setAttribute('selected','true');
	
	if(row.offsetTop + row.offsetHeight > this.list.clientHeight + window.scrollY)
		window.scrollTo(window.scrollX, row.offsetTop);
	else if(row.offsetTop < window.pageYOffset)
		window.scrollTo(window.scrollX, row.offsetTop);
};

QTP.Swap.prototype.setLinkWatched = function(episodeNumber)
{
	var row = this.list.getElementsByTagName('li')[episodeNumber];
	row.setAttribute('watched', 'true');
}

Event.observe(window, 'load', QTP.Swap.instantiateSwaps);

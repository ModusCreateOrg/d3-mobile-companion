/*

File: qtp_controller.js

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
 * An embed-style API adapter for video tags.
 * @class QTP.VideoEmbedAdapter
 */
QTP.VideoEmbedAdapter =
{
	// QuickTime Embed interface
	Play: function() { this.play(); },
	Stop: function() { this.pause(); },
	GetTime: function() { return this.currentTime; },
	SetTime: function(t) { this.currentTime = t; },
	GetMute: function() { return this.muted; },
	SetMute: function(m) { this.muted = m; },
	GetTimeScale: function() { return 1.0; },
	GetRate: function() { return this.paused || this.ended ? 0.0 : this.playbackRate ; },
	SetRate: function(r) { this.playbackRate = r; },
	GetEndTime: function() { return this.duration; },
	GetStartTime: function() { return 0.0; },
	GetMaxTimeLoaded: function() { return this.buffered.length > 0 ? this.buffered.end(this.buffered.length-1) : 0.0; },
	GetVolume: function() { return this.volume * 256; },
	SetVolume: function(v) { this.volume = v / 256; },
	GetControllerVisible: function() { return this.controls; },
	SetControllerVisible: function(v) { this.controls = v; },
	SetURL: function(u) { this.src = u; this.load(); },
	GetURL: function(u) { return this.src; }
};

/**
 * An embed-style API adapter for QTP.Poster objects.
 * @class QTP.PosterAdapter
 */
QTP.PosterAdapter =
{
	// QuickTime Embed interface
	Play: function() { this.movie ? this.movie.element.Play() : this.click(); },
	Stop: function() { this.movie ? this.movie.element.Stop() : this.click(); },
	GetTime: function() { return this.movie ? this.movie.element.GetTime() : 0.0; },
	SetTime: function(t) { if(this.movie) this.movie.element.SetTime(t); },
	GetMute: function() { return this.movie ? this.movie.element.GetMute() : true; },
	SetMute: function(m) { if(this.movie) this.movie.element.SetMute(m); },
	GetTimeScale: function() { return this.movie ? this.movie.element.GetTimeScale() : 1.0; },
	GetRate: function() { return this.movie ? this.movie.element.GetRate() : 0.0; },
	SetRate: function(r) { if(this.movie) this.movie.element.SetRate(r); },
	GetEndTime: function() { return this.movie ? this.movie.element.GetEndTime() : 1.0; },
	GetStartTime: function() { return this.movie ? this.movie.element.GetStartTime() : 0.0; },
	GetMaxTimeLoaded: function() { return this.movie ? this.movie.element.GetMaxTimeLoaded() : 1.0; },
	GetVolume: function() { return this.movie ? this.movie.element.GetVolume() : 0.0; },
	SetVolume: function(v) { if(this.movie) this.movie.element.SetVolume(v); }
};

/**
 * A DOM-based controller for media elements.
 * Works with QTP.Movie objects, video tags, and object/embed tags.
 * @class QTP.MovieController
 * @param {String} name The className to give the top DOM element.
 * @constructor
 */
QTP.MovieController = function(name) 
{
	this.name = name;
	this.play = new QTP.Button('Play');
	this.rewind = new QTP.Button('Rewind');
	this.forward = new QTP.Button('Forward');
	this.beginning = new QTP.Button('Beginning');
	this.end = new QTP.Button('End');
	this.timeline = new QTP.Slider('Timeline');
	this.playHead = this.timeline.knob;
	this.loaded = document.createElement('div');
	this.loaded.className = 'Loaded';
	this.volume = new QTP.Slider('Volume');
	this.mute = new QTP.Button('Unmute');
	this.time = document.createElement('span');
	this.time.className = 'Time';
	this.element = document.createElement('div');
	this.element.className = name;
	this.buttonHolder = document.createElement('div');
	
	this.timeline.element.insertBefore(this.loaded, this.timeline.element.firstChild);
	
	this.buttonHolder.className = 'Buttons';
	this.buttonHolder.appendChild(this.beginning.element);
	this.buttonHolder.appendChild(this.rewind.element);
	this.buttonHolder.appendChild(this.play.element);
	this.buttonHolder.appendChild(this.forward.element);
	this.buttonHolder.appendChild(this.end.element);
	this.element.appendChild(this.buttonHolder);
	this.element.appendChild(this.time);
	this.element.appendChild(this.timeline.element);
	this.element.appendChild(this.mute.element);
	this.element.appendChild(this.volume.element);
	
	this.play.clickAction = this.playButtonClicked.bindAsEventListener(this);
	this.forward.downAction = this.forwardButtonDown.bindAsEventListener(this);
	this.forward.upAction = this.forwardButtonUp.bindAsEventListener(this);
	this.forward.outAction = this.forwardButtonUp.bindAsEventListener(this);
	this.rewind.downAction = this.rewindButtonDown.bindAsEventListener(this);
	this.rewind.upAction = this.rewindButtonUp.bindAsEventListener(this);
	this.rewind.outAction = this.rewindButtonUp.bindAsEventListener(this);
	this.end.clickAction = this.endButtonClicked.bindAsEventListener(this);
	this.beginning.clickAction = this.beginningButtonClicked.bindAsEventListener(this);
	this.timeline.changeAction = this.timelineChanged.bindAsEventListener(this);
	this.timeline.beginDragAction = this.timelineDragStarted.bindAsEventListener(this);
	this.timeline.endDragAction = this.timelineDragEnded.bindAsEventListener(this);
	this.volume.changeAction = this.volumeChanged.bindAsEventListener(this);
	this.mute.clickAction = this.muteClicked.bindAsEventListener(this);

	setInterval(this.update.bind(this), this.pausedUpdateDelay);
};

/**
 * Cache of the DOM element's className
 * @type String
 */
QTP.MovieController.prototype.name = null;
/**
 * Cache of the class's movie object
 * @type QTP.Movie, video, or object/embed tag
 */
QTP.MovieController.prototype.movie = null;
/**
 * The top DOM element
 * @type DOMElement
 */
QTP.MovieController.prototype.element = null;
/**
 * The play button object.
 * @type QTP.Button
 */
QTP.MovieController.prototype.play = null;
/**
 * The rewind button object.
 * @type QTP.Button
 */
QTP.MovieController.prototype.rewind = null;
/**
 * The forward button object.
 * @type QTP.Button
 */
QTP.MovieController.prototype.forward = null;
/**
 * The beginning button object.
 * @type QTP.Button
 */
QTP.MovieController.prototype.beginning = null;
/**
 * The end button object.
 * @type QTP.Button
 */
QTP.MovieController.prototype.end = null;
/**
 * The timeline slider object.
 * @type QTP.Slider
 */
QTP.MovieController.prototype.timeline = null;
/**
 * The timeline slider knob DOM element.
 * @type DOMElement
 */
QTP.MovieController.prototype.playHead = null;
/**
 * The "maximum time loaded" indicator DOM element
 * @type DOMElement
 */
QTP.MovieController.prototype.loaded = null;
/** 
 * The volume slider.
 * @type QTP.Slider
 */
QTP.MovieController.prototype.volume = null;
/** 
 * The "current time" DOM element.
 * @type DOMElement
 */
QTP.MovieController.prototype.time = null;
/**
 * Cache of the previous rate value.
 * @type float
 */
QTP.MovieController.prototype.oldRate = 0.0;
/**
 * Number of milliseconds between updates while playing.
 * @type int
 */
QTP.MovieController.prototype.playingUpdateDelay = 50; //milliseconds
/**
 * Number of milliseconds between updates while paused.
 * @type int
 */
QTP.MovieController.prototype.pausedUpdateDelay = 250; //milliseconds
/**
 * Cache of movie properties.
 * @type Object
 */
QTP.MovieController.prototype.cache = {
	rate: 0.0,
	time: 0.0,
	scale: 1.0,
	start: 0.0,
	end: 1.0,
	max: 1.0,
	volume: 0.0,
	muted: false
};
/**
 * Array of cue points, each in the form of: <code>{time:<i>{int}</i>, listener:<i>{Function}</i>}</code>
 * @type Array
 */
QTP.MovieController.prototype.cuePoints = [];
/**
 * Array of cue ranges, each in the form of: 
 * <code>{start:<i>{int}</i>, end:<i>{int}</i>, enter:<i>{Function}</i>, exit:<i>{Function}</i}</code>
 * @type Array
 */
QTP.MovieController.prototype.cueRanges = [];
/**
 * Array of cue ranges, each in the form of: 
 * <code>{start:<i>{int}</i>, end:<i>{int}</i>, enter:<i>{Function}</i>, exit:<i>{Function}</i}</code>
 * @type Array
 */
QTP.MovieController.prototype.inRanges = [];

/**
 * Sets the top DOM element's className.
 * @param {String} name The new className value.
 */
QTP.MovieController.prototype.setName = function(name)
{
	if(name === this.name)
		return;
	this.element.className = this.element.className.replace(this.name, name);
	this.name = name;
	this.update();
};

/**
 * Sets the current movie object.  Depending on the type of movie object passed in, the object
 * may be extended with a QTP.VideoEmbedAdapter, or otherwise converted.
 * @param {QTP.Movie, video, or object/embed tag} movie The new movie object
 */
QTP.MovieController.prototype.setMovie = function(movie)
{
	this.movie = movie;
	if(movie instanceof QTP.Movie)
	{
		this.setMovie(movie.element);
		return;
	}
	else if(movie instanceof QTP.Poster)
	{
		Object.extend(movie, QTP.PosterAdapter);
	}
	else if(movie.tagName.toLowerCase() == 'video')
	{
		Object.extend(movie, QTP.VideoEmbedAdapter);
	}
	else
	{
	}
	this.update();
};

/**
 * Updates the current cached movie properties and relevent UI elements.
 */
QTP.MovieController.prototype.update = function()
{
	this.updateCache();
	this.updatePlayHead();
	this.updateLoaded();
	this.updatePlay();
	this.updateVolume();
	this.updateTime();
};

/**
 * Updates the current cached movie properties, then executes the cue points and ranges.
 */
QTP.MovieController.prototype.updateCache = function()
{
	try {
		this.cache.rate = this.movie.GetRate();
		this.cache.muted = this.movie.GetMute();
		this.cache.time = this.movie.GetTime();
		this.cache.start = this.movie.GetStartTime();
		this.cache.scale = this.movie.GetTimeScale();
		this.cache.end = this.movie.GetEndTime();
		this.cache.max = this.movie.GetMaxTimeLoaded();
		this.cache.volume = this.movie.GetVolume();
	}
	catch(err)
	{
	}
	
	// Run the cue points:
	while(this.cuePoints.length > 0 && this.cuePoints[0].time < this.cache.time)
	{
		try {
			this.cuePoints.shift().listener();
		}
		catch(err) {}
	} 
			
	// Run the cue ranges:
	for(var i = this.cueRanges.length - 1; i >= 0; --i)
	{
		if(this.cueRanges[i].start < this.cache.time && this.cueRanges[i].end > this.cache.time)
		{
			var range = this.cueRanges.splice(i, 1)[0];
			this.inRanges.push(range);
			try { range.enter(); } catch (e) {}
		}
	}

	// Run the in ranges:
	for(var i = this.inRanges.length - 1; i >= 0; --i)
	{
		if(this.inRanges[i].start > this.cache.time || this.inRanges[i].end < this.cache.time)
		{
			var range = this.inRanges.splice(i, 1)[0];
			this.cueRanges.push(range);
			try { range.exit(); } catch (e) {}
		}
	}
};

/** 
 * Periodic update timer.  Calls QTP.MovieController.prototype.update().
 */
QTP.MovieController.prototype.movieTimer = function()
{
	setTimeout(this.movieTimer.bind(this), this.pausedUpdateDelay);

	this.update();		
};

/**
 * Updates the play head to reflect the current cached time.
 */
QTP.MovieController.prototype.updatePlayHead = function()
{
	if(!this.playHead || !this.movie)
		return;
		
	var position = (this.cache.time - this.cache.start)/(this.cache.end - this.cache.start);
	if(isNaN(position))
		position = 0;
		
	this.timeline.setPosition(position);
};

/**
 * Updates the loaded bar to reflect the current max playable time.
 */
QTP.MovieController.prototype.updateLoaded = function()
{
	if(!this.loaded || !this.movie)
		return;
					
	var percent = (this.cache.max - this.cache.start) / (this.cache.end - this.cache.start);
	if (isNaN(percent))
		percent = 0.0;
		
	var right = (1 - percent) * this.timeline.element.clientWidth + 'px';
		
	if (right !== this.loaded.style.right)
	{
		this.loaded.style.right = right;
	}
};

/**
 * Updates the play button to reflect the current play state.
 */
QTP.MovieController.prototype.updatePlay = function()
{
	if(!this.play || !this.movie)
		return;

	if(this.cache.rate == 0.0 && this.play.element.className !== 'Play')
		this.play.setName('Play');
	else if(this.cache.rate != 0.0 && this.play.element.className !== 'Pause')
		this.play.setName('Pause');
};

/**
 * Updates the volume slider to reflect the curretn movie volume.
 */
QTP.MovieController.prototype.updateVolume = function()
{
	if(!this.movie)
		return;
		
	var volume = this.cache.muted ? 0 : this.cache.volume;

	if(this.volume)	
		this.volume.setPosition( volume / 256 );

	if(!this.mute)
		return;

	if(this.cache.muted && this.mute.element.className !== 'Mute')
		this.mute.setName('Mute');
	else if(!this.cache.muted && this.mute.element.className !== 'Unmute')
		this.mute.setName('Unmute');
};

/** 
 * Updates the time element to reflect the current movie time.
 */
QTP.MovieController.prototype.updateTime = function()
{
	if(!this.time || !this.movie)
		return;
		
	var time = this.movie ? this.cache.time / this.cache.scale : 0;

	var seconds = Math.floor( time % 60	);
	var minutes = Math.floor( (time / 60) % 60 );
	var hours   = Math.floor( time / (60*60) );

	if(seconds < 10) seconds = '0' + seconds;
	if(minutes < 10) minutes = '0' + minutes;
	if(hours < 10) hours = '0' + hours;

	var text = hours + ":" + minutes + ":" + seconds;
	if(this.time.textContent != undefined)
		this.time.textContent = text
	else
		this.time.innerText = text;
};
	
/**
 * Handler for the play button's click event.  Starts or stops the movie depending on the cached
 * movie rate.
 */
QTP.MovieController.prototype.playButtonClicked = function(event)
{
	if(!this.movie)
		return true;
	if(this.cache.rate>0)
	{
		this.play.setName('Play');
		this.movie.Stop();
	}
	else
	{
		this.play.setName('Pause');
		this.movie.Play();
	}
	return false;
};

/**
 * Handler for the forward button's mousedown event.  Sets the movie playback rate to 2x.
 */
QTP.MovieController.prototype.forwardButtonDown = function(event)
{
	if(!this.movie)
		return true;
	
	this.forward.down = true;
		
	this.oldRate = this.cache.rate;
	this.movie.SetRate(2.0);
	return false;
};

/**
 * Handler for the forward button's mouseup event.  Sets the movie playback rate back to its previous 
 * value.
 */
QTP.MovieController.prototype.forwardButtonUp = function(event)
{
	if(!this.movie || this.cache.rate <= 1.0)
		return true;
	
	if(this.forward.down)
	{
		this.movie.SetRate(this.oldRate);
		this.forward.down = false;
	}
	return false;
};

/**
 * Handler for the rewind button's mousedown event.  Sets the movie playback rate to -2x.
 */
QTP.MovieController.prototype.rewindButtonDown = function(event)
{
	if(!this.movie)
		return true;
		
	this.rewind.down = true;			
	this.oldRate = this.cache.rate;
	this.movie.SetRate(-2.0);
	return false;
};

/**
 * Handler for the rewind button's mouseup event.  Sets the movie playback rate back to its previous 
 * value.
 */
QTP.MovieController.prototype.rewindButtonUp = function(event)
{
	if(!this.movie || this.cache.rate >= 1.0)
		return true;

	if(this.rewind.down)
	{			
		this.movie.SetRate(this.oldRate);
		this.rewind.down = false;
	}
	return false;
};

/**
 * Handler for the end button's click event.  Sets the current movie time to the end of the movie.
 */
QTP.MovieController.prototype.endButtonClicked = function(event)
{
	if(!this.movie)
		return true;
			
	this.movie.SetTime(this.cache.end);	

};

/**
 * Handler for the beginning button's click event.  Sets the current movie time to the beginning of 
 * the movie.
 */
QTP.MovieController.prototype.beginningButtonClicked = function(event)
{
	if(!this.movie)
		return true;
	this.movie.SetTime(this.cache.start);
};

/**
 * Handler for the mute button's click event.  Toggles the movie's mute property.
 */
QTP.MovieController.prototype.muteClicked = function(event)
{
	if(!this.movie)
		return true;
	if(this.cache.muted)
	{
		this.movie.SetMute(false);
		this.mute.setName('Unmute');
	}
	else
	{
		this.movie.SetMute(true);
		this.mute.setName('Mute');
	}
};

/**
 * Handler for the volume slider's changed event.  Sets the movie volume to reflect the slider's 
 * position.
 */
QTP.MovieController.prototype.volumeChanged = function(position)
{
	if(!this.movie)
		return true;
		
	if(isNaN(position))
		position = 0.0;
		
	this.movie.SetVolume(position * 256);
};

/**
 * Handler for the timeline slider's changed event.  Sets the current movie time to reflect the 
 * slider's position.
 */
QTP.MovieController.prototype.timelineChanged = function(position)
{
	if(!this.movie)
		return true;
	
	var newTime = this.cache.start + position * (this.cache.end - this.cache.start);
	if(isNaN(newTime))
		newTime = this.cache.start;
		
	this.movie.SetTime(newTime);
	return true;
};

/**
 * Handler for the timeline slider's dragStarted event. Pauses the movie if playing.
 */
QTP.MovieController.prototype.timelineDragStarted = function(event)
{
	if(!this.movie)
		return true;
	this.paused = this.cache.rate == 0;
	this.movie.Stop();
};

/**
 * Handler for the timeline slider's dragEnded event. Restarts the movie if it was playing when
 * dragging started.
 */
QTP.MovieController.prototype.timelineDragEnded = function(event)
{
	if(!this.movie)
		return true;
	if(!this.paused)
		this.movie.Play();
};

/** 
 * Adds a cue point.  The listener function will be called once the movie's time is greater or 
 * equal than the specified time value.  The cue point is removed once it is called.
 * @param {int} timeVal Time which, when reached, the listener will be called.
 * @param {Function} listenerVal Listener function called when the timeVal is reached.
 */
QTP.MovieController.prototype.addCuePoint = function(timeVal, listenerVal)
{
	this.cuePoints.push({time:timeVal,listener:listenerVal});
	this.cuePoints.sort(function(a,b){return a.time - b.time;});
};

/** 
 * Adds a cue range.  The <code>enter</code> listener function will be called once the movie's time 
 * is inside the range specified by the <code>start</code> and <code>end</code> time values.  
 * The cue range is <i>not</i> removed once it is called. 
 * The <code>exit</code> listener function will be called once the movie's time 
 * is outside the range specified by the <code>start</code> and <code>end</code> time values.  
 * @param {int} startVal Time which, when reached, the listener will be called.
 * @param {int} endVal Time which, when reached, the listener will be called.
 * @param {Function} enterVal Listener function called when the timeVal is reached.
 * @param {Function} exitVal Listener function called when the timeVal is reached.
 */
QTP.MovieController.prototype.addCueRange = function(startVal, endVal, enterListener, exitListener)
{
	this.cueRanges.push({start:startVal,end:endVal,enter:enterListener,exit:exitListener});
	this.cueRanges.sort(function(a,b){return a.start - b.start;});
};
// End Class "QTP.MovieController"

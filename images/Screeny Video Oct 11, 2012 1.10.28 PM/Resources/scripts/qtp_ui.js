/*

File: qtp_ui.js

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

if (typeof(QTP) == "undefined") { QTP = {}; }

/**
 * @fileoverview
 * This file contains functions to generate simple, stylable, DOM-based buttons and sliders.
 */

/** 
 * Button is an class which creates a DOM button element, and provides listener methods
 * for the element's actions.
 * @param {String} name the className of the DOM element
 * @constructor
 */
QTP.Button = function(name)
{
	this.name = name;
		
	this.element = document.createElement('button');
	this.element.className = this.name;
			
	Event.observe(this.element, "click", this.onClick.bindAsEventListener(this));
	Event.observe(this.element, "mousedown", this.onDown.bindAsEventListener(this));
	Event.observe(this.element, "mouseup", this.onUp.bindAsEventListener(this));
	Event.observe(this.element, "mouseover", this.onOver.bindAsEventListener(this));
	Event.observe(this.element, "mouseout", this.onOut.bindAsEventListener(this));
};
	

/**
 * Cache of the button's className
 * @type String
 */
QTP.Button.prototype.name = '';
/**
 * Cache of the button's enabled state
 * @type String
 */
QTP.Button.prototype.enabled = true;
/**
 * Button's mouseup handler.  Set this to a function, and it will be called when 
 * the button receives a mouseup event.
 * @type Function
 */
QTP.Button.prototype.upAction = null;
/**
 * Button's mousedown handler.  Set this to a function, and it will be called when 
 * the button receives a mousedown event.
 * @type Function
 */
QTP.Button.prototype.downAction = null;
/**
 * Button's click handler.  Set this to a function, and it will be called when 
 * the button receives a click event.
 * @type Function
 */
QTP.Button.prototype.clickAction = null;
/**
 * Button's mouseover handler.  Set this to a function, and it will be called when 
 * the button receives a mouseover event.
 * @type Function
 */
QTP.Button.prototype.overAction = null;
/**
 * Button's mouseout handler.  Set this to a function, and it will be called when 
 * the button receives a mouseout event.
 * @type Function
 */
QTP.Button.prototype.outAction = null;
/**
 * DOM button element
 * @type DOMElement
 * @memberOf Button
 */
QTP.Button.prototype.element = null;
	
/**
 * Internal message handler.
 * @private
 */
QTP.Button.prototype.onClick = function(event)
{
	if((this.clickAction != null) && this.enabled)
		return this.clickAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Button.prototype.onDown = function(event)
{
	if(this.downAction && this.enabled)
		return this.downAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Button.prototype.onUp = function(event)
{
	if(this.upAction && this.enabled)
		return this.upAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Button.prototype.onOver = function(event)
{
	if(this.overAction && this.enabled)
		return this.overAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 */
QTP.Button.prototype.onOut = function(event)
{
	if(this.outAction && this.enabled)
		return this.outAction.call(Event.element(event), event);
	return true;
};

/**
 * Enables or disables the button. This will set the DOM element's <code>disabled</code>
 * property to <code>true</code>.
 */
QTP.Button.prototype.setEnabled = function(enabled)
{
	if(enabled === this.enabled)
		return;
	this.element.disabled = !enabled;
	this.enabled = enabled;
};

/** 
 * Sets the DOM button element's className.
 */
QTP.Button.prototype.setName = function(name)
{
	if(name === this.name)
		return;
	this.element.className = this.element.className.replace(this.name, name);
	this.name = name;
};

/** 
 * Slider is an class which creates a DOM-based slider element, and provides listener methods
 * for the element's actions.
 * @param {String} name the className of the DOM element
 * @constructor
 */
QTP.Slider = function(name)
{
	this.name = name;
	this.knob = new QTP.Button('Knob');

	this.left = document.createElement('div');
	this.left.className = 'Left';
	
	this.right = document.createElement('div');
	this.right.className = 'Right';
	
	this.element = document.createElement('div');
	this.element.className = this.name;
	
	this.element.appendChild(this.left);
	this.element.appendChild(this.knob.element);
	this.element.appendChild(this.right);
	
	Event.observe(this.element, "click", this.onClick.bindAsEventListener(this));
	Event.observe(this.element, "mousedown", this.onDown.bindAsEventListener(this));
	Event.observe(this.element, "mouseup", this.onUp.bindAsEventListener(this));
	Event.observe(this.element, "mouseover", this.onOver.bindAsEventListener(this));
	Event.observe(this.element, "mouseout", this.onOut.bindAsEventListener(this));
	
	this.knob.downAction = this.beginDrag.bindAsEventListener(this);
	this.knob.upAction = this.endDrag.bindAsEventListener(this);
};
	
/**
 * Cache of the slider's className
 * @type String
 */
QTP.Slider.prototype.name = '';
/**
 * The DOM button element which represents the slider as a whole.
 * @type DOMElement
 */
QTP.Slider.prototype.element = null;
/**
 * The DOM button element which represents the slider knob.  The element
 * has an initial class name of 'Knob'.
 * @type DOMElement
 */
QTP.Slider.prototype.knob = null;
/**
 * The DOM element which represents the track to the left of the knob.  The element
 * has an initial class name of 'Left'.
 * @type DOMElement
 */
QTP.Slider.prototype.left = null;
/**
 * The DOM element which represents the track to the right of the knob.  The element
 * has an initial class name of 'Right'.
 * @type DOMElement
 */
QTP.Slider.prototype.right = null;
/**
 * Cache of the enabled state of the slider.
 * @type boolean
 */
QTP.Slider.prototype.enabled = true;
/**
 * Slider's mouseup handler.  Set this to a function, and it will be called when 
 * the slider receives a mouseup event.
 * @type Function
 */
QTP.Slider.prototype.upAction = null;
/**
 * Slider's mousedown handler.  Set this to a function, and it will be called when 
 * the slider receives a mousedown event.
 * @type Function
 */
QTP.Slider.prototype.downAction = null;
/**
 * Slider's click handler.  Set this to a function, and it will be called when 
 * the slider receives a click event.
 * @type Function
 */
QTP.Slider.prototype.clickAction = null;
/**
 * Slider's mouseover handler.  Set this to a function, and it will be called when 
 * the slider receives a mouseover event.
 * @type Function
 */
QTP.Slider.prototype.overAction = null;
/**
 * Slider's mouseout handler.  Set this to a function, and it will be called when 
 * the slider receives a mouseout event.
 * @type Function
 */
QTP.Slider.prototype.outAction = null;
/**
 * Slider's changeAction handler.  Set this to a function, and it will be called when 
 * the slider's position changes.
 * @type Function
 */
QTP.Slider.prototype.changeAction = null;
/**
 * Slider's beginDrag handler.  Set this to a function, and it will be called when 
 * the user begins to drag the slider's knob.
 * @type Function
 */
QTP.Slider.prototype.beginDragAction = null;
/**
 * Slider's endDrag handler.  Set this to a function, and it will be called when 
 * the user stops dragging the slider's knob.
 * @type Function
 */
QTP.Slider.prototype.endDragAction = null;
/**
 * Cache of the position value of the slider.
 * @type float
 */
QTP.Slider.prototype.position = 0.0;
/**
 * Cache of the mouse position when the slider began dragging
 * @type Array
 */
QTP.Slider.prototype.dragStart = null;
/**
 * Cache of the knob position when the slider began dragging
 * @type Array
 */
QTP.Slider.prototype.knobStart = null;
/**
 * Sets whether the slider goes from top-to-bottom or from left-to-right.
 * @type boolean
 */
QTP.Slider.prototype.horizontal = true;
	
/**
 * Internal message handler.
 */
QTP.Slider.prototype.beginDrag = function(event)
{
	// Install document-level event listeners
	this.continueDragListener = this.continueDrag.bindAsEventListener(this);
	this.endDragListener = this.endDrag.bindAsEventListener(this);
	Event.observe(document, "mousemove", this.continueDragListener );
	Event.observe(document, "mouseup", this.endDragListener );
	
	this.dragStart = new Array(event.clientX, event.clientY);
	this.knobStart = [this.knob.element.offsetLeft, this.knob.element.offsetTop];
	if((this.beginDragAction != null) && this.enabled)
		return this.beginDragAction.call(Event.element(event), event);
	
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.continueDrag = function(event)
{
	var delta = [event.clientX - this.dragStart[0], event.clientY - this.dragStart[1]];
	var availSize = [this.element.clientWidth - this.knob.element.clientWidth, 
		this.element.clientHeight - this.knob.element.clientHeight];
	var newPos = [this.knobStart[0] + delta[0], this.knobStart[1] + delta[1]];

	newPos[0] = Math.max(0, Math.min(availSize[0], newPos[0]));
	newPos[1] = Math.max(0, Math.min(availSize[1], newPos[1]));
		
	if(newPos[0] != this.knob.element.offsetLeft || newPos[1] != this.knob.element.offsetTop)
	{
		this.setPosition(this.horizontal ? newPos[0] / availSize[0] : newPos[1] / availSize[1]);
		this.onChange(event);
	}		
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.endDrag = function(event)
{			
	Event.stopObserving(document, "mousemove",this.continueDragListener);
	Event.stopObserving(document, "mouseup", this.endDragListener, true);		

	if((this.endDragAction != null) && this.enabled)
		return this.endDragAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onClick = function(event)
{
	var parPos = Element.cumulativeOffset(this.element);
	var newPos = [event.clientX - parPos[0] - this.element.clientLeft - this.knob.element.clientWidth/2, event.clientY - parPos[1] - this.element.clientTop - this.knob.element.clientHeight/2];

	var availSize = [this.element.clientWidth - this.knob.element.clientWidth, 
		this.element.clientHeight - this.knob.element.clientHeight];
		
	newPos[0] = Math.max(0, Math.min(availSize[0], newPos[0]));
	newPos[1] = Math.max(0, Math.min(availSize[1], newPos[1]));

	if(newPos[0] != this.knob.element.offsetLeft || newPos[1] != this.knob.element.offsetTop)
	{
		this.setPosition(this.horizontal ? newPos[0] / availSize[0] : newPos[1] / availSize[1]);
		this.onChange(event);
	}		

	if((this.clickAction != null) && this.enabled)
		return this.clickAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onDown = function(event)
{
	if(this.downAction && this.enabled)
		return this.downAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onUp = function(event)
{
	if(this.upAction && this.enabled)
		return this.upAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onOver = function(event)
{
	if(this.overAction && this.enabled)
		return this.overAction.call(Event.element(event), event);
	return true;
};

/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onOut = function(event)
{
	if(this.outAction && this.enabled)
		return this.outAction.call(Event.element(event), event);
	return true;
};
	
/**
 * Internal message handler.
 * @private
 */
QTP.Slider.prototype.onChange = function(event)
{
	if(this.changeAction && this.enabled)
		return this.changeAction.call(Event.element(event), this.position);
	return true;
};

/**
 * Enables or disables the slider.  This will set the DOM element's <code>disabled</code>
 * property to <code>true</code>.
 */
QTP.Slider.prototype.setEnabled = function(enabled)
{
	if(enabled === this.enabled)
		return;
	this.element.disabled = !enabled;
	this.enabled = enabled;
};

/** 
 * Sets the DOM element's className.
 */
QTP.Slider.prototype.setName = function(name)
{
	if(name === this.name)
		return;
	this.element.className = this.element.className.replace(this.name, name);
	this.name = name;
};

/**
 * Sets the slider position.
 * @param {float} position the position, from [0.0 .. 1.0].
 */
QTP.Slider.prototype.setPosition = function(position)
{
	if(isNaN(position))
		position = 0;
		
	position = Math.max(0, Math.min(1, position));

	if(this.position === position)
		return;
		
	this.position = position;
		
	var availSize = [this.element.clientWidth - this.knob.element.clientWidth, 
		this.element.clientHeight - this.knob.element.clientHeight];
	var knobPos = [position * availSize[0], position * availSize[1]];
	var rightPos = [position * availSize[0], position * availSize[1]];
	var leftPos = [(1-position) * availSize[0], (1-position) * availSize[1]];
	
	if(this.horizontal)
	{
		if(knobPos[0] != this.knob.element.offsetLeft)
			this.knob.element.style.left = knobPos[0] + 'px';
		if(rightPos[0] != this.right.offsetLeft)
			this.right.style.left = rightPos[0] + 'px';	
		if(leftPos[0] != this.left.offsetRight)
			this.left.style.right = leftPos[0] + 'px';
	}
	else
	{
		if(knobPos[1] != this.knob.element.offsetTop)
			this.knob.element.style.top = knobPos[1] + 'px';
		if(rightPos[1] != this.right.offsetTop)
			this.right.style.top = rightPos[1] + 'px';
		if(leftPos[1] != this.right.offsetBottom)
			this.left.style.bottom = leftPos[1] + 'px';
	}
	
};

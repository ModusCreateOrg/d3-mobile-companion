/*

File: AC_QuickTime.js

Abstract: This file contains functions to generate OBJECT and EMBED tags for QuickTime content.

Version: <1.3>

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

/*
 * This file contains functions to generate OBJECT and EMBED tags for QuickTime content. 
 */

if (typeof(QT) == "undefined") { 
	/** QT is a namespace for QuickTime javascript objects. */
	QT = {}; 
}

/************** LOCALIZABLE GLOBAL VARIABLES ****************/

QT.argCountErr =	'The "%%" function requires an even number of arguments.'
				+	'\nArguments should be in the form "atttributeName", "attributeValue", ...';

/******************** END LOCALIZABLE **********************/

QT.tagAttrs				= null;
QT.generatorVersion		= 1.3;
QT.behaviorID			= "qt_event_source";
QT.eventsEnabled		= false;

QT.QuickTimeVersion = function()	{ return QT.generatorVersion; };

QT._Complain = function(callingFcnName, errMsg)
{
    errMsg = errMsg.replace("%%", callingFcnName);
	alert(errMsg);
};

QT._IsMSIE = function()
{
    var ua = navigator.userAgent.toLowerCase();
	var msie = /msie/.test(ua) && !/opera/.test(ua);

	return msie;
};


QT._GenerateBehavior = function()
{
	return objTag = '<!--[if IE]>'
				 + '<object id="' + QT.behaviorID + '" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598"></object>'
				 + '<![endif]-->';
};

QT._PageHasBehaviorObject = function(callingFcnName, args)
{
	var haveBehavior = false;
	var objects = document.getElementsByTagName('object');
	
	for ( var ndx = 0, obj; obj = objects[ndx]; ndx++ )
	{
		if ( obj.getAttribute('classid') == "clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598" )
		{
			if ( obj.getAttribute('id') == QT.behaviorID )
				haveBehavior = true;
			break;
		}
	}

	return haveBehavior;
};


QT._ShouldInsertBehavior = function()
{
	var		shouldDo = false;

	if ( QT.eventsEnabled && QT._IsMSIE() && !QT._PageHasBehaviorObject() )
		shouldDo = true;
	
	return shouldDo;
};


QT._AddAttribute = function(prefix, slotName, tagName)
{
	var		value;

	value = QT.tagAttrs[prefix + slotName];
	if ( null == value )
		value = QT.tagAttrs[slotName];

	if ( null != value )
	{
		if ( 0 == slotName.indexOf(prefix) && (null == tagName) )
			tagName = slotName.substring(prefix.length); 
		if ( null == tagName ) 
			tagName = slotName;
		return ' ' + tagName + '="' + value + '"';
	}
	else
		return "";
};

QT._AddObjectAttr = function(slotName, tagName)
{
	// don't bother if it is only for the embed tag
	if ( 0 == slotName.indexOf("emb#") )
		return "";

	if ( 0 == slotName.indexOf("obj#") && (null == tagName) )
		tagName = slotName.substring(4); 

	return QT._AddAttribute("obj#", slotName, tagName);
};

QT._AddEmbedAttr = function(slotName, tagName)
{
	// don't bother if it is only for the object tag
	if ( 0 == slotName.indexOf("obj#") )
		return "";

	if ( 0 == slotName.indexOf("emb#") && (null == tagName) )
		tagName = slotName.substring(4); 

	return QT._AddAttribute("emb#", slotName, tagName);
};


QT._AddObjectParam = function(slotName, generateXHTML)
{
	var		paramValue;
	var		paramStr = "";
	var		endTagChar = (generateXHTML) ? ' />' : '>';

	if ( -1 == slotName.indexOf("emb#") )
	{
		// look for the OBJECT-only param first. if there is none, look for a generic one
		paramValue = QT.tagAttrs["obj#" + slotName];
		if ( null == paramValue )
			paramValue = QT.tagAttrs[slotName];

		if ( 0 == slotName.indexOf("obj#") )
			slotName = slotName.substring(4); 
	
		if ( null != paramValue )
			paramStr = '<param name="' + slotName + '" value="' + paramValue + '"' + endTagChar;
	}

	return paramStr;
};

QT._DeleteTagAttrs = function()
{
	for ( var ndx = 0; ndx < arguments.length; ndx++ )
	{
		var attrName = arguments[ndx];
		delete QT.tagAttrs[attrName];
		delete QT.tagAttrs["emb#" + attrName];
		delete QT.tagAttrs["obj#" + attrName];
	}
};


// generate an embed and object tag, return as a string
QT._Generate = function(callingFcnName, generateXHTML, args)
{
	// is the number of optional arguments even?
	if ( args.length < 4 || (0 != (args.length % 2)) )
	{
		QT._Complain(callingFcnName, QT.argCountErr);
		return "";
	}
	
	// allocate an array, fill in the required attributes with fixed place params and defaults
	QT.tagAttrs = new Object();
	QT.tagAttrs["src"] = args[0];
	QT.tagAttrs["width"] = args[1];
	QT.tagAttrs["height"] = args[2];
	QT.tagAttrs["classid"] = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
		//Impportant note: It is recommended that you use this exact classid in order to ensure a seamless experience for all viewers
	QT.tagAttrs["pluginspage"] = "http://www.apple.com/quicktime/download/";

	// set up codebase attribute with specified or default version before parsing args so
	//  anything passed in will override
	var activexVers = args[3]
	if ( (null == activexVers) || ("" == activexVers) )
		activexVers = "7,3,0,0";
	QT.tagAttrs["codebase"] = "http://www.apple.com/qtactivex/qtplugin.cab#version=" + activexVers;

	var	attrName,
		attrValue;

	// add all of the optional attributes to the array
	for ( var ndx = 4; ndx < args.length; ndx += 2)
	{
		attrName = args[ndx].toLowerCase();
		attrValue = args[ndx + 1];

		QT.tagAttrs[attrName] = attrValue;

		if ( ("postdomevents" == attrName) && (attrValue.toLowerCase() != "false") )
		{
			QT.eventsEnabled = true;
			if ( QT._IsMSIE() )
				QT.tagAttrs["obj#style"] = "behavior:url(#" + QT.behaviorID + ")";
		}
	}

	// init both tags with the required and "special" attributes
	var objTag =  '<object '
					+ QT._AddObjectAttr("classid")
					+ QT._AddObjectAttr("width")
					+ QT._AddObjectAttr("height")
					+ QT._AddObjectAttr("codebase")
					+ QT._AddObjectAttr("name")
					+ QT._AddObjectAttr("id")
					+ QT._AddObjectAttr("tabindex")
					+ QT._AddObjectAttr("hspace")
					+ QT._AddObjectAttr("vspace")
					+ QT._AddObjectAttr("border")
					+ QT._AddObjectAttr("align")
					+ QT._AddObjectAttr("class")
					+ QT._AddObjectAttr("title")
					+ QT._AddObjectAttr("accesskey")
					+ QT._AddObjectAttr("noexternaldata")
					+ QT._AddObjectAttr("obj#style")
					+ '>'
					+ QT._AddObjectParam("src", generateXHTML);
	var embedTag = '<embed '
					+ QT._AddEmbedAttr("src")
					+ QT._AddEmbedAttr("width")
					+ QT._AddEmbedAttr("height")
					+ QT._AddEmbedAttr("pluginspage")
					+ QT._AddEmbedAttr("name")
					+ QT._AddEmbedAttr("id")
					+ QT._AddEmbedAttr("align")
					+ QT._AddEmbedAttr("tabindex");

	// delete the attributes/params we have already added
	QT._DeleteTagAttrs("src","width","height","pluginspage","classid","codebase","name","tabindex",
					"hspace","vspace","border","align","noexternaldata","class","title","accesskey","id","style");

	// and finally, add all of the remaining attributes to the embed and object
	for ( var attrName in QT.tagAttrs )
	{
		attrValue = QT.tagAttrs[attrName];
		if ( null != attrValue )
		{
			embedTag += QT._AddEmbedAttr(attrName);
			objTag += QT._AddObjectParam(attrName, generateXHTML);
		}
	} 

	// end both tags, we're done
	return objTag + embedTag + ' /></ob' + 'ject' + '>';
};


// return the object/embed as a string
QT.GenerateOBJECTText = function()
{
	var	txt = QT._Generate("GenerateOBJECTText", false, arguments);
	if ( QT._ShouldInsertBehavior() )
		txt = QT._GenerateBehavior() + txt;
	return txt;
};

QT.GenerateOBJECTText_XHTML = function()
{
	var	txt = QT._Generate("GenerateOBJECTText_XHTML", true, arguments);
	if ( QT._ShouldInsertBehavior() )
		txt = QT._GenerateBehavior() + txt;
	return txt;
};

QT.WriteOBJECT = function()
{
	var	txt = QT._Generate("WriteOBJECT", false, arguments);
	if ( QT._ShouldInsertBehavior() )
		document.writeln(QT._GenerateBehavior());
	document.writeln(txt);
};

QT.WriteOBJECT_XHTML = function()
{
	var	txt = QT._Generate("WriteOBJECT_XHTML", true, arguments);
	if ( QT._ShouldInsertBehavior() )
		document.writeln(QT._GenerateBehavior());
	document.writeln(txt);
};

QT.GenerateBehaviorOBJECT = function()
{
	return QT._GenerateBehavior();
};

QT.ReplaceElementContents = function()
{
	var element = arguments[0];
	var args = [];

	// copy all other arguments we want to pass through to the fcn
	for ( var ndx = 1; ndx < arguments.length; ndx++ )
		args.push(arguments[ndx]);

	var	txt = QT._Generate("ReplaceElementContents", false, args);
	if ( txt.length > 0 )
		element.innerHTML = txt;
};


QT.ReplaceElementContents_XHTML = function()
{
	var element = arguments[0];
	var args = [];

	// copy all other arguments we want to pass through to the fcn
	for ( var ndx = 1; ndx < arguments.length; ndx++ )
		args.push(arguments[ndx]);

	var	txt = QT._Generate("ReplaceElementContents_XHTML", true, args);
	if ( txt.length > 0 )
		element.innerHTML = txt;
};


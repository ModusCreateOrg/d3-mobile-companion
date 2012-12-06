// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.application({
    name        : 'D3Mobile',
    requires    : [
        'Ext.MessageBox',
        'D3Mobile.data.JsonP'
    ],
    controllers : [
        'Main',
        'Hero',
        'Friend',
        'News'
    ],
    icon        : {
        '57'  : 'resources/icons/Icon.png',
        '72'  : 'resources/icons/Icon~ipad.png',
        '114' : 'resources/icons/Icon@2x.png',
        '144' : 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed : true,

    startupImage : {
        '320x460'   : 'resources/startup/320x460.jpg',
        '640x920'   : 'resources/startup/640x920.png',
        '768x1004'  : 'resources/startup/768x1004.png',
        '748x1024'  : 'resources/startup/748x1024.png',
        '1536x2008' : 'resources/startup/1536x2008.png',
        '1496x2048' : 'resources/startup/1496x2048.png'
    },
    childBrowser : null,
    region       : 'us',
    launch       : function () {
        var me = this;
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        if (window.plugins.childBrowser) {
            window.openURL = me.openURL;
        }
        document.addEventListener('resume', Ext.bind(me.onResume, me), false);


    },
    onUpdated    : function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    openURL      : function (url) {
        window.plugins.childBrowser.showWebPage(url);
    },
    onResume     : function () {
        this.getController("Main").updateUser();
        Ext.Viewport.down('main').getActiveItem().isXType('friendscontainer') && this.getController("Friend").updateFriend();
    },
    parseLinks : function(node) {
        var links       = node.getElementsByTagName("a"),
            linksLength = links.length,
            link,
            i;

        for(i = 0; i < linksLength; i++) {
            link      = links[i];
            link.href = "javascript: openURL('" + link.href + "');";
        }
    }
});

// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.view.Servers', {
    extend : 'Ext.Container',
    xtype  : 'servers',
    config : {
        title            : 'Servers',
        cls              : 'server-status',
        styleHtmlContent : true,
        scrollable       : {
            direction : 'vertical'
        },
        items            : [
            {
                xtype  : 'titlebar',
                title  : 'Servers',
                docked : 'top'
            }
        ]
    }
});
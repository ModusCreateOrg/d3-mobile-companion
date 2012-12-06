// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.view.Tooltip', {
    extend     : 'Ext.Panel',
    xtype      : 'tooltip',
    config     : {
        cls              : 'skill-tooltip',
        modal            : true,
        centered         : true,
        hideOnMaskTap    : true,
        styleHtmlContent : true,
        scrollable       : {
            direction : 'vertical'
        },
        showAnimation    : {
            type     : 'popIn',
            duration : 250,
            easing   : 'ease-out'
        },
        hideAnimation    : {
            type     : 'popOut',
            duration : 250,
            easing   : 'ease-out'
        },
        hidden           : true
    },
    initialize : function () {
        var me = this;
        me.callParent();
        me.on({
            hide  : me.onHide,
            scope : me
        });
    },
    onHide     : function () {
        this.destroy();
    }

});
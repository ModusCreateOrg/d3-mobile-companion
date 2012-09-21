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
Ext.define('D3Mobile.view.Tooltip', {
    extend     : 'Ext.Panel',
    xtype      : 'tooltip',
    config     : {
        cls              : 'tooltip',
        modal            : true,
        centered         : true,
        hideOnMaskTap    : true,
        styleHtmlContent : true,
        scrollable       : {
            direction : 'vertical'
        }
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
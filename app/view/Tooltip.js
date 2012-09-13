Ext.define('D3Mobile.view.Tooltip', {
    extend           : 'Ext.Panel',
    xtype            : 'tooltip',
    config           : {
        cls      : 'tooltip',
        modal    : true,
        centered : true
    },
    initialize       : function () {
        this.add(this.buildCloseButton());
        this.callParent();
    },
    buildCloseButton : function () {
        return {
            xtype  : 'component',
            docked : 'top',
            html   : '<div class="close-button"></div>'
        };
    }
});
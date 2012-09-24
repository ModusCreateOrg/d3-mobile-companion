Ext.define('D3Mobile.view.Tooltip', {
    extend       : 'Ext.Panel',
    xtype        : 'tooltip',
    config       : {
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
    initialize   : function () {
        var me = this;
        me.callParent();

        me.element.on({
            tap        : me.onTap,
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            scope      : me
        });

        me.on({
            hide  : me.onHide,
            scope : me
        });
    },
    onTap        : function (evtObj) {
        var closeButton = evtObj.getTarget(".close-button");
        if (closeButton) {
            this.fireEvent("close");
        }
    },
    onTouchStart : function (evtObj) {
        var closeButton = evtObj.getTarget(".close-button");
        if (closeButton) {
            Ext.fly(closeButton).addCls('pressed');

        }
    },
    onTouchEnd   : function (evtObj) {
        var closeButton = evtObj.getTarget(".close-button");
        if (closeButton) {
            Ext.fly(closeButton).removeCls('pressed');

        }
    },
    onHide       : function () {
        this.destroy();
    }

});
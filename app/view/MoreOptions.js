/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 10/16/12
 * Time: 5:13 PM
 */
Ext.define('D3Mobile.view.MoreOptions', {
    extend       : 'Ext.Container',
    xtype        : 'moreoptions',
    config       : {
        cls    : 'more-options',
        layout : 'card',
        items  : [
            {
                xtype : 'component',
                html  : ''.concat(
                    '<div class="more-options-inner animated fadeIn">',
                        '<div class="options-button legal">Legal</div>',
                        '<div class="options-button logout">Log Out</div>',
                    '</div>'
                )
            }
        ]
    },
    initialize   : function () {
        var me = this;

        me.element.on({
            tap        : me.onTap,
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            scope      : me
        });

        me.callParent();
    },
    onTap        : function (evtObj) {
        var isLogOut = evtObj.getTarget(".logout"),
            isLegal  = evtObj.getTarget('.legal');

        isLogOut && this.fireEvent('logout');
        isLegal && this.fireEvent('legal');
    },
    onTouchStart : function (evtObj) {
        var btn = evtObj.getTarget('.options-button', null, true);

        if (btn && !btn.hasCls("pressed")) {
            Ext.fly(btn).addCls("pressed");
        }
    },
    onTouchEnd   : function (evtObj) {
        var btn = evtObj.getTarget('.options-button');

        if (btn) {
            Ext.fly(btn).removeCls("pressed");
        }

    }

});
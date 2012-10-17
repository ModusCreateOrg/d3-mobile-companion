/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 10/16/12
 * Time: 9:32 PM
 */
Ext.define('D3Mobile.view.Legal', {
    extend     : 'Ext.Container',
    xtype      : 'legal',
    config     : {
        cls        : 'legal',
        scrollable : {
            direction : 'vertical'
        },
        items      : [
            {
                xtype  : 'component',
                docked : 'top',
                html   : ''.concat(
                    '<div class="legal-header">',
                        '<div class="hero-back close"></div>',
                        '<div class="legal-header">LEGAL</div>',
                    '</div>'
                )
            },
            {
                xtype : 'component',
                html  : ''.concat(
                    '<div class="legal-text">',
                        '<p>All images in the application come from the Diablo 3 public API.</p>',
                        '<p>Hero images on the character selection sheet are property of d3wiki.com</p>',
                    '</div>'
                )
            }
        ]

    },
    initialize : function () {
        var me = this;
        me.element.on({
            tap   : me.onTap,
            scope : me
        });
    },
    onTap      : function (evtObj) {
        var isClose = evtObj.getTarget(".close");

        isClose && this.fireEvent('close');
    }
});
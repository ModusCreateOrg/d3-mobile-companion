/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/25/12
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.tooltip.About', {
    extend : 'D3Mobile.view.tooltip.Tooltip',
    xtype  : 'abouttooltip',
    config : {
        html : ''.concat(
            '<div class="about-text">',
                '<div class="logo"></div>',
                '<p>We are a highly motivated, interdisciplinary team that believe in lean development, design strategy, and user experience to develop stunning applications with emerging technology.<p>',
                '<p>Interested in a possible project?</p>',
                '<p><a class="link" data-url="http://www.moduscreate.com">Visit our website and get in touch.</a></p>',
            '</div>'
        )
    },
    initialize : function() {
        var me = this;
        me.element.on({
            tap   : me.onTap,
            scope : me
        });
        me.callParent();
    },
    onTap : function(evtObj) {
        var href        = evtObj.getTarget('.link'),
            closeButton = evtObj.getTarget(".close-button") ;

        href && this.fireEvent('openAboutLink', href.dataset.url);
        closeButton && this.fireEvent('close');
    }
});
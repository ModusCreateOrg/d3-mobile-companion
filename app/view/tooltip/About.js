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
            '<div class="close-button">x</div>',
            '<div class="about-text">',
                '<div class="logo"></div>',
                '<p>We are a highly motivated, interdisciplinary team that believe in lean development, design strategy, and user experience to develop stunning applications with emerging technology.<p>',
                '<p>Interested in a possible project?</p>',
                '<p><a href="http://www.moduscreate.com">Visit our website and get in touch.</a></p>',
            '</div>'
        )
    }
});
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
            '<div class="stage">',
                '<p class="far-far-away">Diablo 3 Mobile Companion <br/><a href="http://www.moduscreate.com">By Modus Create</a></p>',
                '<div class="crawl">',
                    '<p class="episode">Modus<p>',
                    '<p class="episode">Create<p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>Don\'t </p>',
                    '<p>Forget </p>',
                    '<p>to be</p>',
                    '<p>AWESOME</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>All Your</p>',
                    '<p>Base</p>',
                    '<p>Are Belong</p>',
                    '<p>To Us</p>',
                '</div>',
            '</div>'
        )
    }
});
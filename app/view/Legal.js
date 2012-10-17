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
                        '<p>Diablo® and Blizzard Entertainment® are all trademarks or registered trademarks of Blizzard Entertainment in the United States and/or other countries. These terms and all related materials, logos, and images are copyright © Blizzard Entertainment. This site is in no way associated with or endorsed by Blizzard Entertainment®.</p>',
                        '<p>Diablo III is a registered trademark of Blizzard Entertainment, Inc. This application is in no way affiliated or endorsed by Blizzard Entertainment®. All content is based on the official API. You can find API related source code here for your own use:</p>',
                        '<p><a href="https://github.com/Blizzard/d3-api-docs">https://github.com/Blizzard/d3-api-docs</a></p>',
                        '<p>All images in the application come from the Diablo 3 public API.</p>',
                        '<p>Hero images on the character selection sheet are property of <a href="http://www.diablowiki.com/">diablowiki.com</a></p>',
                        '<p>All content exposed on diablowiki is available under the <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)</a></p>',
                        '<p><a href="http://www.diablowiki.com/Diablo_Wiki:Copyrights">http://www.diablowiki.com/Diablo_Wiki:Copyrights</a></p>',
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
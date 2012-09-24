/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/19/12
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.hero.Items', {
    extend   : 'Ext.Container',
    xtype    : 'items',
    requires : ['D3Mobile.view.hero.Header'],
    config   : {
        cls              : 'hero-detail-card',
        scrollable       : {
            direction     : 'vertical',
            directionLock : true
        },
        styleHtmlContent : true,
        header           : {},
        headerLabel      : 'Items',
        tpl              : ''.concat(
            '<div class="hero-items">',
                '<div class="items-container">',
                    '<tpl if="items.head">',
                        '<div class="item helm {items.head.displayColor}" data-tooltipparams="{items.head.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.head.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.shoulders">',
                        '<div class="item shoulders {items.shoulders.displayColor}" data-tooltipparams="{items.shoulders.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.shoulders.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.neck">',
                        '<div class="item neck {items.neck.displayColor}" data-tooltipparams="{items.neck.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.neck.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.torso">',
                        '<div class="item chest {items.torso.displayColor}" data-tooltipparams="{items.torso.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.torso.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.hands">',
                        '<div class="item hands {items.hands.displayColor}" data-tooltipparams="{items.hands.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.hands.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.bracers">',
                        '<div class="item wrist {items.bracers.displayColor}" data-tooltipparams="{items.bracers.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.bracers.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.leftFinger">',
                        '<div class="item ringL {items.leftFinger.displayColor}" data-tooltipparams="{items.leftFinger.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.leftFinger.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.waist">',
                        '<div class="item belt {items.waist.displayColor}" data-tooltipparams="{items.waist.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.waist.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.rightFinger">',
                        '<div class="item ringR {items.rightFinger.displayColor}" data-tooltipparams="{items.rightFinger.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.rightFinger.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.legs">',
                        '<div class="item legs {items.legs.displayColor}" data-tooltipparams="{items.legs.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.legs.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.feet">',
                        '<div class="item feet {items.feet.displayColor}" data-tooltipparams="{items.feet.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.feet.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.mainHand">',
                        '<div class="item mainHand {items.mainHand.displayColor}" data-tooltipparams="{items.mainHand.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.mainHand.icon}.png" />',
                        '</div>',
                    '</tpl>',
                    '<tpl if="items.offHand">',
                        '<div class="item offHand {items.offHand.displayColor}" data-tooltipparams="{items.offHand.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.offHand.icon}.png" />',
                        '</div>',
                    '<tpl elseif="items.mainHand">',
                        '<div class="item offHand {items.mainHand.displayColor} repeat" data-tooltipparams="{items.mainHand.tooltipParams}">',
                            '<img alt="{items.head.name}" src="http://us.media.blizzard.com/d3/icons/items/large/{items.mainHand.icon}.png" />',
                        '</div>',
                    '</tpl>',
                '</div>',
            '</div>'
        )
    },
    initialize : function() {
        var me = this;
//        me.add(me.getHeader());
        me.setData(me.getData());
        me.callParent();
    },
    applyHeader : function(cfg, inst) {
        if (!inst) {
            Ext.apply(cfg,
                {
                    data : Ext.apply(this.getData(), {
                            headerLabel : this.getHeaderLabel()
                        })
                }
            );
        }
        return Ext.factory(cfg, D3Mobile.view.hero.Header, inst);
    }
});

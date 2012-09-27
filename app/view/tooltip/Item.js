/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/21/12
 * Time: 12:44 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.tooltip.Item', {
    extend : 'D3Mobile.view.tooltip.Tooltip',
    xtype  : 'itemtooltip',
    config : {
        tpl : ''.concat(
            '<div class="tooltip-content">',
                '<div class="d3-tooltip d3-tooltip-item">',
                    '<div class="tooltip-head tooltip-head-{displayColor}">',
                        '<h3 class="d3-color-{displayColor}">{name}</h3>',
                    '</div>',
                    '<div class="tooltip-body effect-bg effect-bg-lightning">',
                        '<span class="d3-icon d3-icon-item d3-icon-item-large  d3-icon-item-{displayColor}">',
                            '<span class="icon-item-gradient">',
                                '<span class="icon-item-inner icon-item-default" style="background-image: url(http://us.media.blizzard.com/d3/icons/items/large/{icon}.png);">',
                                '</span>',
                            '</span>',
                        '</span>',
                        '<div class="d3-item-properties">',
                            '<ul class="item-type">',
                                '<li>',
                                    '<span class="d3-color-{displayColor}">{typeName}</span>',
                                '</li>',
                            '</ul>',
                            '<tpl if="armor">',
                                '<ul class="item-armor-weapon item-armor-armor">',
                                    '<li class="big"><span class="value">{armor.max}</span></li>',
                                    '<li>Armor</li>',
                                '</ul>',
                            '<tpl elseif="dps">',
                                '<ul class="item-armor-weapon item-weapon-dps">',
                                    '<li class="big"><span class="value">{[values.dps.max.toFixed(1)]}</span></li>',
                                    '<li>Damage Per Second</li>',
                                '</ul>',
                                    '<ul class="item-armor-weapon item-weapon-damage">',
                                    '<li><p><span class="value">{[values.minDamage.max.toFixed(0)]}–{[values.maxDamage.max.toFixed(0)]}</span> <span>Damage</span></p></li>',
                                    '<li><p><span class="value">{[values.attacksPerSecond.max.toFixed(2)]}</span> <span>Attacks per Second</span></p></li>',
                                '</ul>',
                            '</tpl>',
                            '<div class="item-before-effects"></div>',
                            '<ul class="item-effects">',
                                '<tpl for="attributes">',
                                    '<li class="d3-color-blue"><p>{.}</p></li>',
                                '</tpl>',
                                '<tpl for="gems">',
                                '<li class="d3-color-white full-socket">',
                                    '<img class="gem" src="http://us.media.blizzard.com/d3/icons/items/small/{item.icon}.png" />',
                                    '<span class="socket-effect">{attributes[0]}</span>',
                                '</li>',
                                '</tpl>',
                            '</ul>',
                            '<ul class="item-extras">',
                                '<li class="item-reqlevel"><span class="d3-color-gold">Required Level: </span><span class="value">{requiredLevel}</span></li>',
                                '<li class="item-ilvl">Item Level: <span class="value">{itemLevel}</span></li>',
                            '</ul>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        )
    }
});
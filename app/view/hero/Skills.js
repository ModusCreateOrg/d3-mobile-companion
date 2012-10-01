/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/19/12
 * Time: 3:44 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.hero.Skills', {
    extend   : 'Ext.Container',
    xtype    : 'skills',
    requires : ['D3Mobile.view.hero.Header'],
    config   : {
        cls              : 'hero-detail-card',
        scrollable       : {
            direction     : 'vertical',
            directionLock : true
        },
        styleHtmlContent : true,
        header           : {},
        headerLabel      : 'Skills',
        tpl              : ''.concat(
            '<div class="hero-skills">',
                '<div class="skills">',
                    '<div class="actives">',
                        '<tpl for="skills.active">',
                            '<tpl if="skill.name">',
                                '<tpl if="rune.type">',
                                    '<div class="skill" data-tooltipurl="{skill.tooltipUrl}" data-runetype="{rune.type}">',
                                        '<tpl if="xindex == 1">',
                                            '<div class="mouse left">L</div>',
                                        '<tpl elseif="xindex == 2">',
                                            '<div class="mouse right">R</div>',
                                        '<tpl else>',
                                            '<div class="number">{[xindex-2]}</div>',
                                        '</tpl>',
                                        '<img alt="{skill.name}" src="http://us.media.blizzard.com/d3/icons/skills/64/{skill.icon}.png">',
                                        '<span class="rune-icon {rune.type}"></span>',
                                        '<div class="name">{skill.name}</div>',
                                        '<div class="rune">{rune.name}</div>',
                                    '</div>',
                                '<tpl else>',
                                    '<div class="skill" data-tooltipurl="{skill.tooltipUrl}">',
                                        '<tpl if="xindex == 1">',
                                            '<div class="number">L</div>',
                                        '<tpl elseif="xindex == 2">',
                                            '<div class="number">R</div>',
                                        '<tpl else>',
                                            '<div class="number">{[xindex-2]}</div>',
                                        '</tpl>',
                                        '<img alt="{skill.name}" src="http://us.media.blizzard.com/d3/icons/skills/64/{skill.icon}.png">',
                                        '<div class="name">{skill.name}</div>',
                                    '</div>',
                                '</tpl>',
                            '</tpl>',
                        '</tpl>',
                    '</div>',
                    '<div class="passives">',
                        '<tpl for="skills.passive">',
                            '<tpl if="skill.name">',
                                '<div class="skill" data-tooltipurl="{skill.tooltipUrl}">',
                                    '<img alt="{skill.name}" src="http://us.media.blizzard.com/d3/icons/skills/64/{skill.icon}.png">',
                                    '<div class="name">{skill.name}</div>',
                                '</div>',
                            '</tpl>',
                        '</tpl>',
                    '</div>',
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
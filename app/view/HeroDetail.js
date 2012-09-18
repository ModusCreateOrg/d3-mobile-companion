Ext.define('D3Mobile.view.HeroDetail', {
    extend              : 'Ext.Carousel',
    xtype               : 'herodetail',
    config              : {
        hero              : null,
        attributesCardTpl : ''.concat(
            '<div class="hero-attributes">',
                '<div class="header">',
                    '<div class="hero-detail-back hero-back">Heros</div>',
                    'Attributes',
                    '<div class="sub">{name} {level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></tpl> - {class}</div>',
                '</div>',
                '<div class="base-stats">',

                    '<div class="stats-group">',
                        '<div class="stats-row highlight">',
                            '<div class="attribute-label">Elite Kills</div>',
                            '<div class="attribute-value">{kills.elites}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Damage</div>',
                            '<div class="attribute-value">{[values.stats.damage.toFixed(2)]}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Life</div>',
                            '<div class="attribute-value">{stats.life}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Armor</div>',
                            '<div class="attribute-value">{stats.armor}</div>',
                        '</div>',
                    '</div>',

                    '<div class="stats-group">',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Strength</div>',
                            '<div class="attribute-value">{stats.strength}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Dexterity</div>',
                            '<div class="attribute-value">{stats.dexterity}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Intelligence</div>',
                            '<div class="attribute-value">{stats.intelligence}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Vitality</div>',
                            '<div class="attribute-value">{stats.vitality}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Special Resource</div>',
                            '<div class="attribute-value">{stats.primaryResource}</div>',
                        '</div>',
                    '</div>',

                    '<div class="stats-group">',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Attack Speed</div>',
                            '<div class="attribute-value">{[values.stats.attackSpeed.toFixed(2)]}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Critical Hit Chance</div>',
                            '<div class="attribute-value">{[(values.stats.critChance * 100).toFixed(2)]}%</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Critical Hit Damage</div>',
                            '<div class="attribute-value">{[(values.stats.critDamage * 100).toFixed(2)]}%</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Damage Increase</div>',
                            '<div class="attribute-value">{[(values.stats.damageIncrease * 100).toFixed(2)]}%</div>',
                        '</div>',
                    '</div>',

                    '<div class="stats-group">',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Damage Reduction</div>',
                            '<div class="attribute-value">{[(values.stats.damageReduction * 100).toFixed(2)]}%</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Life on Hit</div>',
                            '<div class="attribute-value">{[values.stats.lifeOnHit.toFixed(2)]}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Life per Kill</div>',
                            '<div class="attribute-value">{[values.stats.lifePerKill.toFixed(2)]}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Life Steal</div>',
                            '<div class="attribute-value">{[(values.stats.lifeSteal * 100).toFixed(2)]}%</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Block Chance</div>',
                            '<div class="attribute-value">{[(values.stats.blockChance * 100).toFixed(2)]}%</div>',
                        '</div>',
                    '</div>',

                    // highlight the biggest resist
                    '<div class="stats-group">',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Arcane Resist</div>',
                            '<div class="attribute-value">{stats.arcaneResist}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Cold Resist</div>',
                            '<div class="attribute-value">{stats.coldResist}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Fire Resist</div>',
                            '<div class="attribute-value">{stats.fireResist}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Lightning Resist</div>',
                            '<div class="attribute-value">{stats.lightningResist}</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Poison Resist</div>',
                            '<div class="attribute-value">{stats.poisonResist}</div>',
                        '</div>',
                    '</div>',

                    // convert these to a %
                    '<div class="stats-group">',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Magic Find</div>',
                            '<div class="attribute-value">{[(values.stats.magicFind * 100).toFixed(0)]}%</div>',
                        '</div>',
                        '<div class="stats-row">',
                            '<div class="attribute-label">Gold Find</div>',
                            '<div class="attribute-value">{[(values.stats.goldFind * 100).toFixed(0)]}%</div>',
                        '</div>',
                    '</div>',

                '</div>',
            '</div>'
        ),
        itemsCard : ''.concat(
            '<div class="hero-items">',
                '<div class="header">',
                    '<div class="hero-detail-back hero-back">Heros</div>',
                    'Items',
                    '<div class="sub">{name} {level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></tpl> - {class}</div>',
                '</div>',
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
        ),
        skillsCard : ''.concat(
            '<div class="hero-skills">',
                '<div class="header">',
                    '<div class="hero-detail-back hero-back">Heros</div>',
                    'Skills',
                    '<div class="sub">{name} {level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></tpl> - {class}</div>',
                '</div>',
                // icons are located:
                // 64x64 = http://us.media.blizzard.com/d3/icons/skills/64/{passive.skill.icon}.png
                // 21x21 = http://us.media.blizzard.com/d3/icons/skills/21/{passive.skill.icon}.png
                '<div class="skills">',
                    '<div class="actives">',
                        '<tpl for="skills.active">',
                            '<div class="skill" data-tooltipurl="{skill.tooltipUrl}" data-runetype="{rune.type}">',
                                '<tpl if="xindex == 1">',
                                    '<div class="number">L</div>',
                                '<tpl elseif="xindex == 2">',
                                    '<div class="number">R</div>',
                                '<tpl else>',
                                    '<div class="number">{[xindex-2]}</div>',
                                '</tpl>',
                                '<img alt="{skill.name}" src="http://us.media.blizzard.com/d3/icons/skills/64/{skill.icon}.png">',
                                '<div class="name">{skill.name}</div>',
                                '<div class="rune">{rune.name}</div>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                    '<div class="passives">',
                        '<tpl for="skills.passive">',
                            '<div class="skill" data-tooltipurl="{skill.tooltipUrl}">',
                                '<img alt="{skill.name}" src="http://us.media.blizzard.com/d3/icons/skills/64/{skill.icon}.png">',
                                '<div class="name">{skill.name}</div>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                '</div>',
            '</div>'
        )
    },
    initialize          : function () {
        var me = this;
        me.config.title = this.getHero().name;
        me.add(me.buildAttributesCard());
        me.add(me.buildItemsCard());
        me.add(me.buildSkillsCard());

        me.element.on({
            tap   : me.onTap,
            scope : me
        });

        me.element.on({
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            delegate   : '.item',
            scope: me
        });

        me.callParent();
    },


    onTap : function(evtObj) {
        var backButton = evtObj.getTarget('.hero-detail-back'),
            skill      = evtObj.getTarget('.skill'),
            item       = evtObj.getTarget('.item');
        if(backButton) {
            this.fireEvent('close');
        } else if(skill) {
            this.fireEvent('skillTap', skill.dataset.tooltipurl, skill.dataset.runetype);
        } else if(item) {
            this.fireEvent('itemTap', item.dataset.tooltipparams);
        }
    },

    onTouchStart : function(evtObj) {
        var target = evtObj.getTarget();
        if (target) {
            Ext.fly(target).addCls('tapped');
        }
    },

    onTouchEnd : function(evtObj) {
        var target = evtObj.getTarget();
        if (target) {
            Ext.fly(target).removeCls('tapped');
        }
    },

    buildAttributesCard : function () {
        return {
            xtype            : 'container',
            scrollable       : {
                direction     : 'vertical',
                directionLock : true
            },
            cls              : 'hero-detail-card',
            tpl              : this.getAttributesCardTpl(),
            data             : this.getHero(),
            styleHtmlContent : true
        };
    },
    buildItemsCard      : function () {
        return {
            xtype            : 'container',
            scrollable       : {
                direction     : 'vertical',
                directionLock : true
            },
            cls              : 'hero-detail-card',
            tpl              : this.getItemsCard(),
            data             : this.getHero(),
            styleHtmlContent : true
        };
    },
    buildSkillsCard     : function () {
        return {
            xtype            : 'container',
            scrollable       : {
                direction     : 'vertical',
                directionLock : true
            },
            cls              : 'hero-detail-card',
            tpl              : this.getSkillsCard(),
            data             : this.getHero(),
            styleHtmlContent : true
        };
    }
});
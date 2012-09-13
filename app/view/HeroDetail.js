Ext.define('D3Mobile.view.HeroDetail', {
    extend              : 'Ext.Carousel',
    xtype               : 'herodetail',
    config              : {
        hero              : null,
        attributesCardTpl : ''.concat(
            '<div class="hero-attributes">',
                '<div class="header">',
                    '<div class="hero-detail-back">Heros</div>',
                    'Attributes',
                    '<div class="sub">{level} <span class="paragonLevel">({paragonLevel})</span> - {class}</div>',
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
                    '<div class="hero-detail-back">Heros</div>',
                    'Items',
                    '<div class="sub">{level} <span class="paragonLevel">({paragonLevel})</span> - {class}</div>',
                '</div>',
                '<div class="items-container">',
                    '<div class="item helm orange"></div>',
                    '<div class="item shoulders yellow"></div>',
                    '<div class="item neck yellow"></div>',
                    '<div class="item chest green"></div>',
                    '<div class="item hands yellow"></div>',
                    '<div class="item wrist yellow"></div>',
                    '<div class="item ringL blue"></div>',
                    '<div class="item belt yellow"></div>',
                    '<div class="item ringR blue"></div>',
                    '<div class="item legs green"></div>',
                    '<div class="item feet orange"></div>',
                    '<div class="item mainHand yellow"></div>',
                    '<div class="item offHand yellow"></div>',
                '</div>',
            '</div>'
        ),
        skillsCard : ''.concat(
            '<div class="hero-skills">',
                '<div class="header">',
                    '<div class="hero-detail-back">Heros</div>',
                    'Skills',
                    '<div class="sub">{level} <span class="paragonLevel">({paragonLevel})</span> - {class}</div>',
                '</div>',

                // icons are located:
                // 64x64 = http://us.media.blizzard.com/d3/icons/skills/64/{passive.skill.icon}.png
                // 21x21 = http://us.media.blizzard.com/d3/icons/skills/21/{passive.skill.icon}.png

                '<div class="passives">',
                    '<div class="skill">1</div>',
                    '<div class="skill">2</div>',
                    '<div class="skill">3</div>',

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
        me.callParent();
    },
    onTap : function(evtObj) {
        var backButton = evtObj.getTarget('.hero-detail-back');
        if(backButton) {
            this.fireEvent('close');
        }
    },
    buildAttributesCard : function () {
        return {
            xtype            : 'container',
            scrollable       : {
                direction : 'vertical',
                directionLock: true
            },
            cls              : 'hero-detail-card',
            tpl              : this.getAttributesCardTpl(),
            data             : this.getHero(),
            styleHtmlContent : true
        };
    },
    buildItemsCard      : function () {
        return {
            xtype : 'container',
            scrollable       : {
                direction : 'vertical',
                directionLock: true
            },
            cls   : 'hero-detail-card',
            tpl   : this.getItemsCard(),
            data  : this.getHero(),
            styleHtmlContent : true
        };
    },
    buildSkillsCard     : function () {
        return {
            xtype : 'component',
            cls   : 'hero-detail-card',
            tpl   : this.getSkillsCard(),
            data  : this.getHero(),
            styleHtmlContent : true
        };
    }
});
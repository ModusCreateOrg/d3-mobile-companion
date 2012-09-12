Ext.define('D3Mobile.view.HeroDetail', {
    extend              : 'Ext.Carousel',
    xtype               : 'herodetail',
    config              : {
        hero              : null,
        attributesCardTpl : ''.concat(
            '<div class="hero-attributes">',
                '<div class="attributes-header">Attributes</div>',
                '<div class="base-stats">',
                    '<div class="attribute-label">Strength</div>',
                    '<div class="attribute-value">{stats.strength}</div>',
                    '<div class="attribute-label">Dexterity</div>',
                    '<div class="attribute-value">{stats.dexterity}</div>',
                    '<div class="attribute-label">Intelligence</div>',
                    '<div class="attribute-value">{stats.intelligence}</div>',
                    '<div class="attribute-label">Vitality</div>',
                    '<div class="attribute-value">{stats.vitality}</div>',
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
        me.callParent();
    },
    buildAttributesCard : function () {
        return {
            xtype            : 'component',
            cls              : 'hero-detail-card',
            tpl              : this.getAttributesCardTpl(),
            data             : this.getHero(),
            styleHtmlContent : true
        };
    },
    buildItemsCard      : function () {
        return {
            xtype : 'component',
            cls   : 'hero-detail-card',
            tpl   : ''.concat('items'),
            data  : this.getHero()
        };
    },
    buildSkillsCard     : function () {
        return {
            xtype : 'component',
            cls   : 'hero-detail-card',
            tpl   : ''.concat('skills'),
            data  : this.getHero()
        };
    }
});
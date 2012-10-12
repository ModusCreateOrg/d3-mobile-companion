Ext.define('D3Mobile.view.HeroDetail', {
    extend     : 'Ext.Carousel',
    xtype      : 'herodetail',
    requires   : [
        'D3Mobile.view.HeroDetailHeader',
        'D3Mobile.view.hero.Attributes',
        'D3Mobile.view.hero.Items',
        'D3Mobile.view.hero.Skills'
    ],
    config     : {
        hero       : null,
        attributes : {},
        heroItems  : {},
        skills     : {},
        headerBar  : {}
    },
    initialize : function () {
        var me = this;
        me.config.title = this.getHero().name;
        me.add(
            [
                me.getHeaderBar(),
                me.getAttributes(),
                me.getHeroItems(),
                me.getSkills()
            ]
        );

        me.element.on({
            tap        : me.onTap,
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            scope      : me
        });

        me.callParent();
    },


    onTap : function (evtObj) {
        var backButton    = evtObj.getTarget('.hero-detail-back'),
            skill         = evtObj.getTarget('.skill'),
            item          = evtObj.getTarget('.item'),
            tooltipUrl    = skill.dataset ? skill.dataset.tooltipurl   : skill.getAttribute("data-tooltipurl"),
            runeType      = skill.dataset ? skill.dataset.runetype     : skill.getAttribute("data-runetype"),
            tooltipParams = item.dataset  ? item.dataset.tooltipparams : item.getAttribute("data-tooltipparams");
        if (backButton) {
            this.fireEvent('close');
        } else if (skill) {
            this.fireEvent('skillTap', tooltipUrl, runeType);
        } else if (item) {
            this.fireEvent('itemTap', tooltipParams);
        }
    },

    onTouchStart : function (evtObj) {
        var target = evtObj.getTarget('.item') || evtObj.getTarget('.skill img');
        if (target) {
            Ext.fly(target).addCls('tapped');
        }
    },

    onTouchEnd      : function (evtObj) {
        var target = evtObj.getTarget('.item') || evtObj.getTarget('.skill img');
        if (target) {
            Ext.fly(target).removeCls('tapped');
        }
    },
    applyAttributes : function (cfg, inst) {
        return Ext.factory(this.buildCfg(cfg, inst), D3Mobile.view.hero.Attributes, inst);
    },
    applyHeroItems  : function (cfg, inst) {
        return Ext.factory(this.buildCfg(cfg, inst), D3Mobile.view.hero.Items, inst);
    },
    applySkills     : function (cfg, inst) {
        return Ext.factory(this.buildCfg(cfg, inst), D3Mobile.view.hero.Skills, inst);
    },
    applyHeaderBar  : function (cfg, inst) {
        return Ext.factory(this.buildCfg(cfg, inst), D3Mobile.view.HeroDetailHeader, inst);
    },
    buildCfg        : function (cfg, inst) {
        if (!inst) {
            Ext.apply(cfg, {data : this.getHero()});
        }
        return cfg;
    }
});
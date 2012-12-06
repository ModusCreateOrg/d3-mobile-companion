// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

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
        var backButton = evtObj.getTarget('.hero-detail-back'),
            skill      = evtObj.getTarget('.skill'),
            item       = evtObj.getTarget('.item'),
            tooltipUrl,
            runeType,
            tooltipParams;
        if (backButton) {
            this.fireEvent('close');
        } else if (skill) {
            tooltipUrl = skill.dataset ? skill.dataset.tooltipurl   : skill.getAttribute("data-tooltipurl");
            runeType   = skill.dataset ? skill.dataset.runetype     : skill.getAttribute("data-runetype");
            this.fireEvent('skillTap', tooltipUrl, runeType);
        } else if (item) {
            tooltipParams = item.dataset  ? item.dataset.tooltipparams : item.getAttribute("data-tooltipparams");
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
Ext.define('D3Mobile.controller.Hero', {
    extend                : 'Ext.app.Controller',
    config                : {
        views   : [
            'HeroDetail',
            'Tooltip'
        ],
        refs    : {
            main            : 'main',
            heroes          : 'heroes',
            heroesContainer : 'heroescontainer',
            heroDetail      : 'herodetail'
        },
        control : {
            'heroes'     : {
                'heroOverviewTap' : 'onHeroOverviewTap'
            },
            'herodetail' : {
                'close'    : 'onCloseHeroDetailTap',
                'skillTap' : 'onSkillTap',
                'itemTap'  : 'onItemTap'
            }
        }
    },
    onHeroOverviewTap     : function (battleTag, heroId) {
        var me = this;
        Ext.ModelMgr.getModel('D3Mobile.model.Hero').load(heroId, {
            url     : 'http://us.battle.net/api/d3/profile/' + battleTag + '/hero/' + heroId,
            success : me.onHeroLoadSuccess,
            failure : me.onHeroLoadFailure,
            scope   : me
        });
        Ext.Viewport.setMasked({
            xtype : 'loadmask'
        });
    },
    onHeroLoadSuccess     : function (record) {
        var heroesContainer = this.getHeroesContainer(),
            heroDetail;
        this.getMain().getTabBar().getActiveTab().setTitle(record.get('name'));
        heroDetail = heroesContainer.add({
            xtype : 'herodetail',
            hero  : record.getData()
        });
        // since these are 'cards', we flip them around to see the details
        heroesContainer.animateActiveItem(heroDetail, { type : 'flip' });
        Ext.Viewport.setMasked(false);
    },
    onHeroLoadFailure     : function (error) {
        console.log('fail', arguments);
        Ext.Viewport.setMasked(false);
    },
    onCloseHeroDetailTap  : function () {
        var heroesContainer = this.getHeroesContainer();
        this.getMain().getTabBar().getActiveTab().setTitle('Heroes');
        heroesContainer.animateActiveItem(0, { type : 'flip' });
        setTimeout(function () {
            heroesContainer.remove(heroesContainer.down('herodetail'), true);
        }, 0);

    },
    onSkillTap            : function (tooltipUrl, runeType) {
        var me = this,
            url = "http://us.battle.net/d3/en/tooltip/" + tooltipUrl + "?format=jsonp";

        D3Mobile.data.JsonP.request({
            url            : url,
            callback       : me.onSkillTooltipSuccess,
            callbackExtras : runeType,
            scope          : me
        });
    },
    onSkillTooltipSuccess : function (success, response, notSure, request) {
        if (request.callbackExtras) {
            var me = this,
                url = 'http://us.battle.net/d3/en/tooltip/rune/' + response.params.key + '/' + request.callbackExtras + '?format=jsonp';

            D3Mobile.data.JsonP.request({
                url            : url,
                callback       : me.onRuneTooltipSuccess,
                callbackExtras : response,
                scope          : me
            });
        } else {
            this.showTooltip(response.tooltipHtml);
        }
    },
    onRuneTooltipSuccess  : function (success, response, notSure, request) {
        this.showTooltip(request.callbackExtras.tooltipHtml + response.tooltipHtml);
    },
    onItemTap             : function (tooltipUrl) {
        var url = "http://us.battle.net/api/d3/data/" + tooltipUrl;
        Ext.data.JsonP.request({
            url      : url,
            callback : this.onItemTooltipSuccess,
            scope    : this
        });
    },
    onItemTooltipSuccess  : function (success, itemInfo) {
        var xTpl,
            htmlTpl;

        htmlTpl = ''.concat(
            '<div class="tooltip-content">',
                '<div class="d3-tooltip d3-tooltip-item">',
                    '<div class="tooltip-head tooltip-head-{displayColor}">',
                        '<h3 class="d3-color-{displayColor}">{name}</h3>',
                    '</div>',
                    '<div class="tooltip-body effect-bg effect-bg-lightning">',
                        '<span class="d3-icon d3-icon-item d3-icon-item-large  d3-icon-item-yellow">',
                            '<span class="icon-item-gradient">',
                                '<span class="icon-item-inner icon-item-default" style="background-image: url(http://us.media.blizzard.com/d3/icons/items/large/{icon}.png);">',
                                '</span>',
                            '</span>',
                        '</span>',
                        '<div class="d3-item-properties">',
                            '<ul class="item-type">',
                                '<li>',
                                    '<span class="d3-color-yellow">{typeName}</span>',
                                '</li>',
                            '</ul>',
                            '<tpl if="armor">',
                                '<ul class="item-armor-weapon item-armor-armor">',
                                    '<li class="big"><span class="value">{armor.max}</span></li>',
                                    '<li>Armor</li>',
                                '</ul>',
                            '<tpl elseif="dps">',
                                '<ul class="item-armor-weapon item-weapon-dps">',
                                    '<li class="big"><span class="value">{[dps.max.toFixed(1)]}</span></li>',
                                    '<li>Damage Per Second</li>',
                                '</ul>',
                                    '<ul class="item-armor-weapon item-weapon-damage">',
                                    '<li><p><span class="value">{[minDamage.max.toFixed(0)]}–{[maxDamage.max.toFixed(0)]}</span> <span>Damage</span></p></li>',
                                    '<li><p><span class="value">{[attacksPerSecond.max.toFixed(0)]}</span> <span>Attacks per Second</span></p></li>',
                                '</ul>',
                            '</tpl>',
                            '<div class="item-before-effects"></div>',
                            '<ul class="item-effects">',
                                '<tpl for="attributes">',
                                    '<li class="d3-color-blue"><p>{.}</p></li>',
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
        );

        xTpl = new Ext.XTemplate(htmlTpl);
        this.showTooltip(xTpl.apply(itemInfo));

    },
    showTooltip           : function (tooltipHtml) {
        Ext.Viewport.add({
            xtype : 'tooltip',
            html  : tooltipHtml
        });
    }
});
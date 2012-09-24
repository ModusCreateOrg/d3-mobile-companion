Ext.define('D3Mobile.controller.Hero', {
    extend                : 'Ext.app.Controller',
    config                : {
        views   : [
            'HeroDetail',
            'Tooltip',
            'ItemTooltip'
        ],
        refs    : {
            main            : 'main',
            heroes          : 'heroes',
            heroesContainer : 'heroescontainer',
            heroDetail      : 'herodetail'
        },
        control : {
            'heroes'           : {
                'heroOverviewTap' : 'onHeroOverviewTap',
                'close'           : 'onCloseHeroTap'
            },
            'herodetail'       : {
                'skillTap' : 'onSkillTap',
                'itemTap'  : 'onItemTap'
            },
            'herodetailheader button' : {
                'tap' : 'onCloseHeroDetailTap'
            }
        }
    },
    onCloseHeroTap : function(panel) {
        var parentContainer = panel.up('container');
        parentContainer.up('container').animateActiveItem(0, {type : 'slide', direction: 'down'});
        setTimeout(function() {
            parentContainer.destroy();
        }, 0);
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
        var me              = this,
            main            = this.getMain(),
            heroesContainer = main.getActiveItem().down('heroescontainer') || me.getHeroesContainer(),
            heroDetail;
        main.getTabBar().getActiveTab().setTitle(record.get('name'));
        heroDetail = heroesContainer.add({
            xtype : 'herodetail',
            hero  : me.checkPreviousHero(record.getData())
        });
        // since these are 'cards', we flip them around to see the details
        heroesContainer.animateActiveItem(heroDetail, { type : 'flip' });
        Ext.Viewport.setMasked(false);
    },
    checkPreviousHero : function(recordData) {
        var heroId           = recordData.id,
            previousHero     = localStorage[heroId],
            previousHeroData = previousHero && JSON.parse(previousHero);

        if(previousHeroData && previousHeroData.lastUpdated < recordData.lastUpdated ) {
            recordData = this.calculateStatDeltas(recordData, previousHeroData);
        }
        localStorage[heroId] = JSON.stringify(recordData);
        return recordData;

    },
    calculateStatDeltas   : function(newRecord, oldRecord) {
        var deltas = newRecord.statDeltas = {},
            key;
        newRecord.statDeltas.lastUpdated = Ext.Date.format(Ext.Date.parse(oldRecord.lastUpdated, 'U'), 'n/j/Y \\a\\t h:i A');
        for(key in newRecord.stats) {
            deltas[key] = newRecord.stats[key] - oldRecord.stats[key];
        }
        return newRecord;
    },
    onHeroLoadFailure     : function (error) {
        Ext.Msg.alert('Error', 'Error Loading Hero, please try again.', Ext.emptyFn);
        Ext.Viewport.setMasked(false);
    },
    onCloseHeroDetailTap  : function () {
        var heroesContainer = this.getMain().getActiveItem().down('heroescontainer') || this.getHeroesContainer();
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
        Ext.Viewport.add({
            xtype : 'itemtooltip',
            data  : itemInfo
        }).show();

    },
    showTooltip           : function (tooltipHtml) {
        Ext.Viewport.add({
            xtype : 'tooltip',
            html  : tooltipHtml
        }).show();

    }
});
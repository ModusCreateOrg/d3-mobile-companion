Ext.define('D3Mobile.controller.Hero', {
    extend                : 'Ext.app.Controller',
    config                : {
        views   : [
            'HeroDetail',
            'tooltip.Tooltip',
            'tooltip.Item'
        ],
        refs    : {
            main            : 'main',
            heroes          : 'heroes',
            heroesContainer : 'heroescontainer',
            heroDetail      : 'herodetail',
            tooltip         : 'tooltip'
        },
        control : {
            'heroes'                  : {
                'heroOverviewTap' : 'onHeroOverviewTap',
                'close'           : 'onCloseHeroTap'
            },
            'herodetail'              : {
                'skillTap' : 'onSkillTap',
                'itemTap'  : 'onItemTap'
            },
            'herodetailheader button' : {
                'tap' : 'onCloseHeroDetailTap'
            },
            'tooltip'                 : {
                'close' : 'onTooltipCloseTap'
            }

        }
    },
    onCloseHeroTap : function(panel) {
        var parentContainer = panel.up('container');

        parentContainer.up('container').animateActiveItem(0, {type : 'slide', direction : 'down'});
        setTimeout(function() {
            parentContainer.destroy();
        }, 0);
    },
    onHeroOverviewTap     : function (battleTag, heroId) {
        var me     = this,
            region = me.getApplication().region;

        Ext.ModelMgr.getModel('D3Mobile.model.Hero').load(heroId, {
            url     : 'http://' + region + '.battle.net/api/d3/profile/' + battleTag + '/hero/' + heroId,
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

        me.loadHeroSockets(record);
    },
    loadHeroSockets : function(record) {
        var me          = this,
            items       = record.get('items'),
            callback    = me.onGetItemSockets;
        items.itemSocketCount = 0;
        items.itemCheckCount  = 0;

        items.head        && ++items.itemSocketCount && me.getItemInfo(items.head.tooltipParams,        callback, {item : items.head,        items : items, record : record});
        items.torso       && ++items.itemSocketCount && me.getItemInfo(items.torso.tooltipParams,       callback, {item : items.torso,       items : items, record : record});
        items.legs        && ++items.itemSocketCount && me.getItemInfo(items.legs.tooltipParams,        callback, {item : items.legs,        items : items, record : record});
        items.mainHand    && ++items.itemSocketCount && me.getItemInfo(items.mainHand.tooltipParams,    callback, {item : items.mainHand,    items : items, record : record});
        items.offHand     && ++items.itemSocketCount && me.getItemInfo(items.offHand.tooltipParams,     callback, {item : items.offHand,     items : items, record : record});
        items.rightFinger && ++items.itemSocketCount && me.getItemInfo(items.rightFinger.tooltipParams, callback, {item : items.rightFinger, items : items, record : record});
        items.leftFinger  && ++items.itemSocketCount && me.getItemInfo(items.leftFinger.tooltipParams,  callback, {item : items.leftFinger,  items : items, record : record});
        items.neck        && ++items.itemSocketCount && me.getItemInfo(items.neck.tooltipParams,        callback, {item : items.neck,        items : items, record : record});
    },
    onGetItemSockets : function(success, itemInfo, e, request) {
        if(success) {
            var callbackExtras = request.callbackExtras,
                items          = callbackExtras.items,
                itemsLength    = items.itemSocketCount,
                item           = callbackExtras.item,
                record         = callbackExtras.record;

            item.gems = itemInfo.gems;
            items.itemCheckCount++;
            if(itemsLength == items.itemCheckCount ) {
                this.showHeroDetail(record);
            }
        }
    },
    showHeroDetail : function (record) {
        var heroesContainer = this.getMain().getActiveItem().down('heroescontainer') || this.getHeroesContainer(),
            heroDetail;

        heroDetail = heroesContainer.add({
            xtype : 'herodetail',
            hero  : this.checkPreviousHero(record.getData())
        });

        heroesContainer.animateActiveItem(heroDetail, { type : 'slide', direction : 'left' });
        Ext.Viewport.setMasked(false);
    },
    getItemInfo : function(tooltipUrl, callback, callbackExtras) {
        var region = this.getApplication().region,
            url    = "http://" + region + ".battle.net/api/d3/data/" + tooltipUrl;
        Ext.data.JsonP.request({
            url            : url,
            callback       : callback,
            callbackExtras : callbackExtras,
            scope          : this
        });
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
        var mainPanel       = this.getMain(),
            activeItem      = mainPanel.getActiveItem(),
            heroesContainer = activeItem.down('heroescontainer') || this.getHeroesContainer();

        mainPanel.getTabBar().getActiveTab().setTitle(activeItem.getTitle());

        heroesContainer.animateActiveItem(0, { type : 'slide', direction : 'right' });
        setTimeout(function () {
            heroesContainer.remove(heroesContainer.down('herodetail'), true);
        }, 0);

    },
    onSkillTap            : function (tooltipUrl, runeType) {
        var me     = this,
            region = me.getApplication().region,
            url    = "http://" + region + ".battle.net/d3/en/tooltip/" + tooltipUrl + "?format=jsonp";

        D3Mobile.data.JsonP.request({
            url            : url,
            callback       : me.onSkillTooltipSuccess,
            callbackExtras : runeType,
            scope          : me
        });
    },
    onSkillTooltipSuccess : function (success, response, notSure, request) {
        if (request.callbackExtras) {
            var me     = this,
                region = me.getApplication().region,
                url    = 'http://' + region + '.battle.net/d3/en/tooltip/rune/' + response.params.key + '/' + request.callbackExtras + '?format=jsonp';

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
        this.getItemInfo(tooltipUrl, this.onItemTooltipSuccess);
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
    },
    onTooltipCloseTap : function() {
        this.getTooltip().hide();
    }
});
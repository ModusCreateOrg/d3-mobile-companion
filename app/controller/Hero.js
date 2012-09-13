Ext.define('D3Mobile.controller.Hero', {
    extend               : 'Ext.app.Controller',
    config               : {
        views   : [
            'HeroDetail'
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
                'close' : 'onCloseHeroDetailTap'
            }
        }
    },
    onHeroOverviewTap    : function (battleTag, heroId) {
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
    onHeroLoadSuccess    : function (record) {
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
    onHeroLoadFailure    : function (error) {
        console.log('fail', arguments);
        Ext.Viewport.setMasked(false);
    },
    onCloseHeroDetailTap : function () {
        var heroesContainer = this.getHeroesContainer();
        heroesContainer.animateActiveItem(0, { type : 'flip' });
        setTimeout( function() {
            heroesContainer.remove(heroesContainer.down('herodetail'), true);
        }, 0);

    }
});
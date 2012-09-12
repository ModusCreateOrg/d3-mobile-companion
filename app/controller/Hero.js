Ext.define('D3Mobile.controller.Hero', {
    extend            : 'Ext.app.Controller',
    config            : {
        views   : [
            'HeroDetail'
        ],
        refs    : {
            main   : 'main',
            heroes : 'heroes'
        },
        control : {
            'heroes' : {
                'heroOverviewTap' : 'onHeroOverviewTap'
            }
        }
    },
    onHeroOverviewTap : function (battleTag, heroId) {
        var me = this;
        Ext.ModelMgr.getModel('D3Mobile.model.Hero').load(heroId, {
            url     : 'http://us.battle.net/api/d3/profile/' + battleTag + '/hero/' + heroId,
            success : me.onHeroLoadSuccess,
            failure : me.onHeroLoadFailure,
            scope   : me
        });
    },
    onHeroLoadSuccess : function (record) {
        var activeHero = this.getHeroes().getActiveItem(),
            heroDetail;

        heroDetail = this.getMain().add({
            xtype : 'herodetail',
            hero  : record.getData()
        });

        // since these are 'cards', we flip them around to see the details
        this.getMain().animateActiveItem(heroDetail, { type: 'flip' });

    },
    onHeroLoadFailure : function (error) {
        console.log('fail', arguments);
    }
});
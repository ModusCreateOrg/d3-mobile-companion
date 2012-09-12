Ext.define('D3Mobile.controller.Hero', {
    extend            : 'Ext.app.Controller',
    config            : {
        refs    : {
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
//            url     : 'http://us.battle.net/api/d3/profile/' +  battleTag + '/hero/',
            success : me.onHeroLoadSuccess,
            failure : me.onHeroLoadFailure,
            scope   : me
        });
    },
    onHeroLoadSuccess : function (record) {
        alert('woot');
        console.log('woot', arguments);
    },
    onHeroLoadFailure : function(error) {
        alert('fail');
        console.log('fail', arguments);
    }
});
Ext.define('D3Mobile.controller.Main', {
    extend                    : 'Ext.app.Controller',
    config                    : {
        models  : [
            'Account',
            'Hero'
        ],
        stores  : [
            'CurrentUser',
            'Friends',
            'Heroes'
        ],
        views   : [
            'Main',
            'Login'
        ],
        refs    : {
            login   : 'login',
            main    : 'main',
            heroes  : 'heroes',
            friends : 'friends',
            news    : 'news',
            servers : 'servers'
        },
        control : {
            'login button' : {
                'tap' : 'onLoginTap'
            },
            'main' : {
                activeitemchange : 'onMainActiveItemChange'
            }
        }
    },
    launch                    : function () {
        var battleTag = localStorage.battleTag;
        if(battleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(battleTag);
        } else {
            Ext.Viewport.add({
                xtype : 'login'
            });
        }

    },
    onLoginTap                : function () {
        var login          = this.getLogin(),
            loginEl        = login.element,
            validBattleTag = login.isValid();

        if (validBattleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(validBattleTag);
        }
    },
    loadUser                  : function (battleTag) {
        var me = this;
        battleTag = "stan229-1441";
        Ext.getStore("CurrentUser").load({
//            url      : 'http://us.battle.net/api/d3/profile/' + battleTag + '/',
            callback : me.onCurrentUserLoadCallback,
            scope    : me
        });
    },
    onCurrentUserLoadCallback : function (records, operation, success) {
        if (records[0].get('heroes')) {
            var record    = records[0],
                battleTag = record.get('battleTag').replace('#', '-'),
                login     = this.getLogin();
            localStorage.battleTag = battleTag;
            login && login.destroy();
            Ext.Viewport.add({
                xtype : 'main'
            });
            this.getHeroes().buildCards(battleTag, record.get('heroes'));
            Ext.Viewport.setMasked(false);
        } else {
            Ext.Msg.alert("Invalid BattleTag", "Battle Tag Not Found, please try again.", Ext.emptyFn);
        }
    },
    onMainActiveItemChange : function(main, newPanel, oldPanel) {
        if(newPanel.action == "logOut") {
            this.onLogOut();
        }
    },
    onLogOut : function() {
        localStorage.clear();
        window.location.reload();
    }

});
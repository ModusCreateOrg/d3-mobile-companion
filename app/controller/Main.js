Ext.define('D3Mobile.controller.Main', {
    extend                    : 'Ext.app.Controller',
    config                    : {
        models  : [
            'Account',
            'Hero',
            'Article'
        ],
        stores  : [
            'CurrentUser',
            'Friends',
            'Heroes',
            'Articles'
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
        var validBattleTag = this.getLogin().isValid();

        if (validBattleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(validBattleTag);
        }
    },
    loadUser                  : function (battleTag) {
        var me = this;
//        battleTag = "stan229-1441";
        Ext.getStore("CurrentUser").load({
            url      : 'http://us.battle.net/api/d3/profile/' + battleTag + '/',
            callback : me.onCurrentUserLoadCallback,
            scope    : me
        });
    },
    onCurrentUserLoadCallback : function (records, operation, success) {
        if (records[0].get('heroes')) {
            var me        = this,
                record    = records[0],
                battleTag = record.get('battleTag').replace('#', '-'),
                login     = me.getLogin();
            me.loadLocalStorage(battleTag);
            login && login.destroy();
            Ext.Viewport.add({
                xtype : 'main'
            });
            me.getHeroes().buildCards(battleTag, record.get('heroes'), false);
        } else {
            Ext.Msg.alert("Invalid BattleTag", "BattleTag Not Found, please try again.", Ext.emptyFn);
        }
        Ext.Viewport.setMasked(false);
    },
    loadLocalStorage              : function (battleTag) {
        localStorage.battleTag = battleTag;

        var localStorageFriends = (localStorage.friends) ? JSON.parse(localStorage.friends) :  this.initLocalStorageFriends(battleTag),
            userFriends         = localStorageFriends[battleTag];

        if (userFriends.length > 0) {
            Ext.getStore("Friends").add(userFriends);
        }
    },
    initLocalStorageFriends : function(battleTag) {
        var friends = {};
        friends[battleTag] = [];
        localStorage.friends = JSON.stringify(friends);
        return friends;
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
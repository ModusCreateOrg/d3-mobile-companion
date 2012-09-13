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
            }
        }
    },
    launch                    : function () {
        Ext.Viewport.add({
            xtype : 'login'
        });
    },
    onLoginTap                : function () {
        var login          = this.getLogin(),
            loginEl        = login.element,
            validBattleTag = login.isValid();
        if (validBattleTag) {
            login.destroy();
            Ext.Viewport.add({
                xtype : 'main'
            });
            this.loadUser(validBattleTag);
        }
    },
    loadUser                : function (battleTag) {
        var me = this;

        Ext.getStore("CurrentUser").load({
            url      : 'http://us.battle.net/api/d3/profile/' + battleTag + '/',
            callback : me.onCurrentUserLoadCallback,
            scope    : me
        });
    },
    onCurrentUserLoadCallback : function (records, operation, success) {
        console.log(arguments);
        if (records[0].get('heroes')) {
            var record = records[0];
            this.getHeroes().buildCards(record.get('battleTag').replace('#', '-'), record.get('heroes'));
        } else {
            alert('YOu suck');
        }
    }

});
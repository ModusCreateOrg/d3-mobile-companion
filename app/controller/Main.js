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
            heroes  : 'heroes',
            friends : 'friends',
            news    : 'news',
            servers : 'servers'
        },
        control : {

        }
    },
    launch                    : function () {
        Ext.Viewport.add({
            xtype : 'login'
        });

//        this.loadStores();
    },
    loadStores                : function () {
        var me = this;
        Ext.getStore("CurrentUser").load({
            callback : me.onCurrentUserLoadCallback,
            scope    : me
        });
    },
    onCurrentUserLoadCallback : function (records, operation, success) {
        if (success) {
            var record = records[0];
            this.getHeroes().buildCards(record.get('battleTag').replace('#', '-'), record.get('heroes'));
        }
    }

});
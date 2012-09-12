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
            xtype : 'main'
        });

        this.loadStores();
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
            this.getHeroes().buildCards(records[0].get("heroes"));
        }
    }

});
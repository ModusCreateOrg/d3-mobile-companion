Ext.define('D3Mobile.view.Main', {
    extend   : 'Ext.tab.Panel',
    requires : ['D3Mobile.view.Heroes','D3Mobile.view.Friends','D3Mobile.view.News','D3Mobile.view.Servers'],
    config   : {
        fullscreen     : true,
        tabBarPosition : 'bottom',
        ui             : 'mainTabBar',
        cls            : 'navBar',
        defaults : {
            iconMask: true
        },
        items          : [
            {
                xtype : 'heroes'
            },
            {
                xtype : 'friends'
            },
            {
                xtype : 'news'
            },
            {
                xtype : 'servers'
            }
        ]
        
    }
});

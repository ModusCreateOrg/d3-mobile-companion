Ext.define('D3Mobile.view.Main', {
    extend   : 'Ext.tab.Panel',
    xtype    : 'main',
    requires : [
        'D3Mobile.view.HeroesContainer',
        'D3Mobile.view.Friends',
        'D3Mobile.view.News',
        'D3Mobile.view.Servers'
    ],
    config   : {
        fullscreen     : true,
        tabBarPosition : 'bottom',
        ui             : 'mainTabBar',
        cls            : 'navBar',
        defaults       : {
            iconMask : true
        },
        items          : [
            {
                iconCls : 'refresh',
                xtype   : 'heroescontainer'
            },
            {
                iconCls : 'refresh',
                xtype   : 'friends'
            },
            {
                iconCls : 'refresh',
                xtype   : 'news'
            },
            {
                iconCls : 'refresh',
                xtype   : 'servers'
            },
            {
                iconCls : 'power_on',
                xtype   : 'component',
                title   : 'Log Out',
                action  : 'logOut'
            }
        ]

    }
});

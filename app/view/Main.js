Ext.define('D3Mobile.view.Main', {
    extend   : 'Ext.tab.Panel',
    xtype    : 'main',
    requires : [
        'D3Mobile.view.HeroesContainer',
        'D3Mobile.view.FriendsContainer',
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
                iconCls : 'heart',
                xtype   : 'heroescontainer'
            },
            {
                iconCls : 'user_fave',
                xtype   : 'friendscontainer'
            },
            {
                iconCls : 'list',
                xtype   : 'news'
            },
            {
                iconCls : 'cloud_black',
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

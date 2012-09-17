Ext.define('D3Mobile.view.Main', {
    extend   : 'Ext.tab.Panel',
    xtype    : 'main',
    requires : [
        'D3Mobile.view.HeroesContainer',
        'D3Mobile.view.FriendsContainer',
        'D3Mobile.view.NewsContainer',
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
                xtype   : 'newscontainer'
            },
//            Taking out servers until theres an API or we can embed the frame
//            {
//                iconCls : 'cloud_black',
//                xtype   : 'servers'
//            },
            {
                iconCls : 'power_on',
                xtype   : 'component',
                title   : 'Log Out',
                action  : 'logOut'
            }
        ]

    }
});

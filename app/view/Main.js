// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.view.Main', {
    extend   : 'Ext.tab.Panel',
    xtype    : 'main',
    requires : [
        'D3Mobile.view.HeroesContainer',
        'D3Mobile.view.FriendsContainer',
        'D3Mobile.view.NewsContainer',
        'D3Mobile.view.Servers',
        'D3Mobile.view.MoreOptions'
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
                iconCls : 'd3-heroes',
                xtype   : 'heroescontainer'
            },
            {
                iconCls : 'd3-friends',
                xtype   : 'friendscontainer'
            },
            {
                iconCls : 'd3-news',
                xtype   : 'newscontainer'
            },
            // {
            //     iconCls: 'home',
            //     xtype: 'itemmaxstats'
            // },
            {
                iconCls : 'd3-servers',
                xtype   : 'servers',
                action  : 'servers'
            },
            {
                iconCls : 'more',
                xtype   : 'moreoptions',
                title   : 'More'
            }
        ]

    }
});

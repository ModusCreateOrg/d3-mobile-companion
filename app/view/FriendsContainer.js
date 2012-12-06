// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 11:49 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.FriendsContainer', {
    extend   : 'Ext.Container',
    xtype    : 'friendscontainer',
    requires : ['D3Mobile.view.Friends'],
    config   : {
        title  : 'Friends',
        cls    : 'friends-container',
        layout : 'card',
        items  : [
            {
                xtype : 'friends'
            }
        ]
    }
});
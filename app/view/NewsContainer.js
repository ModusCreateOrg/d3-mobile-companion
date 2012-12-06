// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 4:39 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.NewsContainer', {
    extend   : 'Ext.Container',
    xtype    : 'newscontainer',
    requires : [
        'D3Mobile.view.News',
        'D3Mobile.view.ArticleDetail'
    ],
    config   : {
        layout : 'card',
        cls    : 'news-container',
        title  : 'News',
        items  : [
            {
                xtype : 'news'
            }
        ]
    }
});
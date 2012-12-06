// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

/**
 * Feed URL : http://us.battle.net/d3/en/feed/news
 */
Ext.define('D3Mobile.view.News', {
    extend : 'Ext.List',
    xtype  : 'news',
    config : {
        title            : 'News',
        cls              : 'news',
        store            : 'Articles',
        itemTpl          : '<h3>{title} <div class="disclosure"></div></h3>',
        itemCls          : 'news-list-item',
        styleHtmlContent : true,
        items            : [
            {
                xtype  : 'titlebar',
                title  : 'News',
                docked : 'top'
            }
        ]
    }
});
// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.store.Articles', {
    extend   : 'Ext.data.Store',
    requires : ['Ext.data.reader.Xml'],
    config   : {
        model    : 'D3Mobile.model.Article',
        autoLoad : true,
        proxy    : {
            type   : 'ajax',
//            url    : 'data/news.xml',
            url    : 'http://us.battle.net/d3/en/feed/news',
            reader : {
                type         : 'xml',
                record       : 'entry',
                rootProperty : 'feed'
            }
        }
    }
});
// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 2:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.model.Article', {
    extend : 'Ext.data.Model',
    config : {
        fields : [
            {
                name : 'title',
                type : 'string'
            },
            {
                name : 'published',
                type : 'date'
            },
            {
                name : 'updated',
                type : 'date'
            },
            {
                name : 'id',
                type : 'integer'
            },
            {
                name : 'link',
                type : 'string'
            },
            {
                name : 'summary',
                type : 'auto'
            },
            {
                name : 'content',
                type : 'auto'
            }
        ]
    }
});
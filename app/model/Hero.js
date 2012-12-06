// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.model.Hero', {
    extend : 'Ext.data.Model',
    config : {
        fields : [
            {
                name : 'id',
                type : 'int'
            },
            {
                name : 'name',
                type : 'string'
            },
            {
                name : 'hardcore',
                type : 'boolean'
            },
            {
                name : 'class',
                type : 'string'
            },
            {
                name : 'level',
                type : 'int'
            },
            {
                name : 'paragonLevel',
                type : 'int'
            },
            {
                name : 'gender',
                type : 'int'
            },
            {
                name : 'skills',
                type : 'auto'
            },
            {
                name : 'items',
                type : 'auto'
            },
            {
                name : 'followers',
                type : 'auto'
            },
            {
                name : 'stats',
                type : 'auto'
            },
            {
                name : 'kills',
                type : 'auto'
            },
            {
                name : 'progress',
                type : 'auto'
            },
            {
                name : 'dead',
                type : 'boolean'
            },
            {
                name    : 'lastUpdated',
                type    : 'integer',
                mapping : 'last-updated'
            }
        ],
        proxy  : {
            type    : 'jsonp',
            noCache : false,
            reader  : {
                type : 'json'
            }
        }
    }
});

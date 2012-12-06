// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.model.Account', {
    extend : 'Ext.data.Model',
    config : {
        fields : [
            {
                name : 'battleTag',
                type : 'string'
            },
            {
                name : 'heroes',
                type : 'auto'
            },
            {
                name : 'fallenHeroes',
                type : 'auto'
            },
            {
                name : 'artisans',
                type : 'auto'
            },
            {
                name : 'hardcoreArtisans',
                type : 'auto'
            },
            {
                name : 'progression',
                type : 'auto'
            },
            {
                name : 'hardcoreProgression',
                type : 'auto'
            },
            {
                name : 'lastHeroPlayed',
                type : 'id'
            },
            {
                name : 'kills',
                type : 'auto'
            },
            {
                name : 'timePlayed',
                type : 'auto'
            },
            {
                name : 'lastUpdated',
                type : 'integer'
            }
        ],
        proxy : {
            type : 'jsonp'
        }
    }
});
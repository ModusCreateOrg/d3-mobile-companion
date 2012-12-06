// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.store.Friends', {
    extend : 'Ext.data.Store',
    config : {
        model : 'D3Mobile.model.Account',
        proxy : {
            type : 'memory'
        }
    }
});
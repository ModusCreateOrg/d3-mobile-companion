Ext.define('D3Mobile.store.Friends', {
    extend : 'Ext.data.Store',
    config : {
        model : 'D3Mobile.model.Account',
        proxy : {
            type : 'memory'
        }
    }
});
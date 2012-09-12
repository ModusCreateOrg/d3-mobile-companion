Ext.define('D3Mobile.store.Heroes', {
    extend : 'Ext.data.Store',
    config : {
        model : 'D3Mobile.model.Hero',
        proxy : {
            type : 'ajax',
            url  : 'data/heroes.json'
        }
    }
});
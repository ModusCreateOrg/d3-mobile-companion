Ext.define('D3Mobile.store.Heroes', {
	extend : 'Ext.data.Store',
	config : {
		storeId : 'heroes',
		model   : 'D3Mobile.model.Hero',
		autoLoad : true,
		proxy    : {
			type : 'ajax',
			url  : 'data/heroes.json'
		}
	}
});
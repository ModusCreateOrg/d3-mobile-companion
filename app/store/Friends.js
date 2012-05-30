Ext.define('D3Mobile.store.Friends', {
	extend : 'Ext.data.Store',
	config : {
		storeId  : 'friends',
		model    : 'D3Mobile.model.Account',
		autoLoad : false,
		proxy    : {
			type : 'memory'
		}
	}
});
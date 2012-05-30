Ext.define('D3Mobile.store.CurrentUser', {
	extend : 'Ext.data.Store',
	config : {
		storeId  : 'currentUser',
		model    : 'D3Mobile.model.Account',
		autoLoad : true,
		proxy    : {
			type : 'ajax',
			url  : 'data/account.json'
		}
	}
});
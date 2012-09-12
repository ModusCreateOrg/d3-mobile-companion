Ext.define('D3Mobile.store.CurrentUser', {
	extend : 'Ext.data.Store',
	config : {
		model    : 'D3Mobile.model.Account',
		proxy    : {
			type : 'ajax',
			url  : 'data/account.json'
		}
	}
});
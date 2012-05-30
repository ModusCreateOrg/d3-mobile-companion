Ext.define('D3Mobile.model.Account', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
			{name : 'account',      type    : 'string'},
			{name : 'lastModified', mapping : 'last_modified'},
			{name : 'kills'},
			{name : 'time-played'}
		]
	}
});
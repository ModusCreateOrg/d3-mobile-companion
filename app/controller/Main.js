Ext.define('D3Mobile.controller.Main', {
	extend  : 'Ext.app.Controller',
	config  : {
		models  : [
			'Account',
			'Hero'
		],
		stores  : [
			'CurrentUser',
			'Friends'
		],
		views   : [
		],
		refs    : {
			heroes  : 'heroes',
			friends : 'friends',
			news    : 'news',
			servers : 'servers'
		},
		control : {
			
		}
	},
	init    : function() {
		
	}
});
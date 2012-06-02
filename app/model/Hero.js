Ext.define('D3Mobile.model.Hero', {
	extend   : 'Ext.data.Model',
	requires : ['D3Mobile.model.Hireling'],
	config   : {
		fields  : [
			{name : 'id', type : 'int'},
			{name : 'name', type : 'string'},
			{name : 'hardcore', type : 'boolean'},
			{name : 'hero_class', type : 'int'},
			{name : 'level', type : 'int'},
			{name : 'gender', type : 'int'},
			{name : 'create_time', type : 'int'},
			{name : 'update_time', type : 'int'},
			{name : 'elites_killed', type : 'int'},
			{name : 'attributes'},
			{name : 'skills'}
		],
		hasMany : {model : 'D3Mobile.model.Hireling', name : 'hireling', associationKey: 'hireling' }
		
	}
});

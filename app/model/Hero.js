Ext.define('D3Mobile.model.Hero', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
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
			{name : 'hirelings'},
			{name : 'skills'}
		]
	}
});
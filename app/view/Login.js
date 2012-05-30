Ext.define('D3Mobile.view.Login', {
	extend   : 'Ext.Container',
	xtype    : 'login',
	requires : ['Ext.field.Text','Ext.TitleBar','Ext.form.FieldSet','Ext.Button'],
	config   : {
		items : [
			{
				xtype    : 'titlebar',
				docked   : 'top',
				title    : 'Diablo 3 Mobile Companion'
				},
			{
				xtype    : 'fieldset',
				width    : 400,
				centered : true,
				items    : [
					{
						xtype  : 'textfield',
						name   : 'battletag',
						label  : 'Please Enter Your BattleTag',
						labelAlign : 'top'
					},
					{
						xtype : 'button',
						ui    : 'confirm',
						text  : 'Log In'
					}
				]
			}
		]
	},
	initialize : function() {
		this.callParent();
	}
});
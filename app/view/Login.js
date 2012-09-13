Ext.define('D3Mobile.view.Login', {
    extend     : 'Ext.Container',
    xtype      : 'login',
    requires   : ['Ext.form.Panel', 'Ext.field.Text', 'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.Button'],
    config     : {
        fullscreen : true,
        items      : [
            {
                xtype            : 'component',
                docked           : 'top',
                html             : "<h1>Diablo 3 Mobile Companion</h1>",
                styleHtmlContent : true
            },
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="login">',
                        '<div class="battle-tag-label">Please enter your BattleTag</div>',
                        '<div class="battle-tag-input">',
                                '<input type="text" name="battleTag" placeholder="Battle Tag"/>',
                                '<input type="number" name="battleTagNum" placeholder="####"/>',
                        '</div>',
                    '</div>'
                )
            },
            {
                xtype : 'button',
                text  : 'Log In'
            }
        ]
    },
    initialize : function () {
        this.callParent();
    }
});
Ext.define('D3Mobile.view.Login', {
    extend     : 'Ext.Container',
    xtype      : 'login',
    requires   : ['Ext.form.Panel', 'Ext.field.Text', 'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.Button'],
    config     : {
        fullscreen : true,
        cls: 'login',
        padding: 10,
        items      : [
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="login-container">',
                        '<h1 class="d3-color-orange">Mobile Companion</h1>',
                        '<div class="d3-logo"></div>',
                        '<div class="battle-tag-input">',
                            '<form>',
                                '<input type="text" name="battleTag" placeholder="Battle Tag" required />',
                                '<input type="text" name="battleTagNum" placeholder="####" required />',
                            '</form>',
                        '</div>',
                    '</div>'
                )
            },
            {
                xtype : 'button',
                cls: 'loginBtn',
                ui: 'loginButton',
                text  : 'Log In'
            }
        ]
    },
    initialize : function () {
        this.callParent();
    }
});
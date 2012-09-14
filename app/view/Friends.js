Ext.define('D3Mobile.view.Friends', {
    extend   : 'Ext.List',
    xtype    : 'friends',
    requires : ['Ext.TitleBar'],
    config   : {
        title   : 'Friends',
        store   : 'D3Mobile.store.Friends',
        itemTpl : '{battleTag}',
        mode    : 'default',
        items   : [
            {
                xtype    : 'titlebar',
                title    : 'Friends',
                defaults : {
                    iconMask : true,
                    ui       : 'plain'
                },
                items    : [
                    {
                        xtype   : 'button',
                        iconCls : 'user_remove2',
                        align   : 'left',
                        action  : 'remove'
                    },
                    {
                        xtype   : 'button',
                        iconCls : 'user_add',
                        align   : 'right',
                        action  : 'add'
                    }
                ]
            }
        ]
    }
});
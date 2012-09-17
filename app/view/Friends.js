Ext.define('D3Mobile.view.Friends', {
    extend   : 'Ext.List',
    xtype    : 'friends',
    requires : ['Ext.TitleBar'],
    config   : {
        title            : 'Friends',
        cls              : 'friends',
        store            : 'Friends',
        itemTpl          : '<h3>{battleTag}</h3>',
        styleHtmlContent : true,
        itemCls          : 'friends-list-item',
        status           : 'default',
        items            : [
            {
                xtype    : 'titlebar',
                docked   : 'top',
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
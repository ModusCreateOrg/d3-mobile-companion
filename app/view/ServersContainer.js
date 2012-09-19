/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 4:39 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.ServersContainer', {
    extend   : 'Ext.Container',
    xtype    : 'serverscontainer',
    requires : [
        'D3Mobile.view.Servers'
    ],
    config   : {
        layout : 'card',
        cls    : 'servers-container',
        title  : 'Servers',
        items  : [
            {
                xtype : 'servers'
            }
        ]
    }
});
/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/13/12
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.controller.Friend', {
    extend             : 'Ext.app.Controller',
    config             : {
        views   : [
            'AddFriendModal'
        ],
        refs    : {
            friends        : 'friends',
            addFriendModal : 'addfriendmodal'
        },
        control : {
            'friends titlebar button' : {
                tap : 'onFriendsButtonTap'
            }
        }
    },
    onFriendsButtonTap : function (button) {
        console.log(arguments);
        var action = button.action;
        console.log(action);
        if (action == "add") {
            Ext.Viewport.add({
                xtype : 'addfriendmodal'
            });

        } else if (action == "remove") {

        }
    }
});
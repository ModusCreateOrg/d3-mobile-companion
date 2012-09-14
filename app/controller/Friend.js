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
        refs    : {
            friends : 'friends'
        },
        control : {
            'friends titlebar button[action="add"]'    : {
                tap : 'onFriendsAddTap'
            },
            'friends titlebar button[action="remove"]' : {
                tap : 'onFriendsRemoveTap'
            }
        }
    },
    onFriendsAddTap    : function () {

    },
    onFriendsRemoveTap : function () {

    }
});
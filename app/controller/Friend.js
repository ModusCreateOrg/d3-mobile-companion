/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/13/12
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.controller.Friend', {
    extend                    : 'Ext.app.Controller',
    config                    : {
        views   : [
            'AddFriendModal',
            'Heroes'
        ],
        refs    : {
            main           : 'main',
            friends        : 'friends',
            addFriendModal : 'addfriendmodal'
        },
        control : {
            'friends titlebar button' : {
                tap : 'onFriendsButtonTap'
            },
            'friends'                 : {
                itemtap : 'onFriendsItemTap'
            },
            'addfriendmodal button'   : {
                tap : 'onAddFriendModalButtonTap'
            }

        }
    },
    onFriendsButtonTap        : function (button) {
        console.log(arguments);
        var action = button.action;
        console.log(action);
        if (action == "add") {
            Ext.Viewport.add({
                xtype : 'addfriendmodal'
            });

        } else if (action == "remove") {
            this.getFriends().setMode('remove');
        }
    },
    onAddFriendModalButtonTap : function (button) {
        var action = button.action,
            validBattleTag;

        if (action == "add") {
            validBattleTag = this.getAddFriendModal().isValid();

            if (validBattleTag) {
                Ext.Viewport.setMasked({
                    xtype : 'loadmask'
                });
                this.loadFriend(validBattleTag);
            }
        } else if (action == "cancel") {
            this.getAddFriendModal().destroy();
        }
    },
    loadFriend                : function (battleTag) {
        var friend = Ext.ModelMgr.getModel("D3Mobile.model.Account").load(null, {
            url     : 'http://us.battle.net/api/d3/profile/' + battleTag + '/',
            success : this.onFriendAccountLoad,
            scope   : this
        });
    },
    onFriendAccountLoad       : function (record) {
        console.log('record', record);
        if (record.get('heroes')) {
            debugger;
            var battleTag    = localStorage.battleTag,
                friendsStore = Ext.getStore("Friends"),
                localStorageFriends,
                currentUserFriends;

            if (friendsStore.find('battleTag', record.get('battleTag')) == -1) {
                localStorageFriends = JSON.parse(localStorage.friends);
                currentUserFriends = localStorageFriends[battleTag];
                currentUserFriends.push(record.getData());
                localStorage.friends = JSON.stringify(localStorageFriends);
                friendsStore.add(record);
                this.getAddFriendModal().destroy();
            }
        } else {
            Ext.Msg.alert("Invalid BattleTag", "BattleTag Not Found, please try again.", Ext.emptyFn);
        }
        Ext.Viewport.setMasked(false);

    },
    onFriendsItemTap          : function (list, record, index, evt) {
        if (list.getMode() == "default") {
            console.log('open friend');
            this.showFriendsHeroes(record);
        } else if (list.getMode() == "remove") {
            console.log('remove friend');
            Ext.getStore("Friends").remove(record);
            Ext.Array.remove(localStorage.friends[localStorage.battleTag], record);
        }
    },
    showFriendsHeroes : function(record) {
        var friends         = this.getFriends(),
            heroesContainer = friends.add({
                xtype : 'heroescontainer'
            });
        heroesContainer.down('heroes').buildCards(record.battleTag.replace("#",'-'), record.get('heroes'));
        friends.setActiveItem(heroesContainer);
    }
});
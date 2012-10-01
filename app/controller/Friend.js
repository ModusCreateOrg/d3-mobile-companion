/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/13/12
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.controller.Friend', {
    extend                         : 'Ext.app.Controller',
    config                         : {
        views   : [
            'AddFriendModal',
            'Heroes'
        ],
        refs    : {
            main             : 'main',
            friends          : 'friends',
            friendsContainer : 'friendscontainer',
            addFriendModal   : 'addfriendmodal'
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
    onFriendsButtonTap             : function (button) {
        var action     = button.config.action,
            hasFriends = Ext.getStore("Friends").getCount() > 0;
        if (action == "add") {
            Ext.Viewport.add({
                xtype : 'addfriendmodal'
            });
        } else if (action == "remove" && hasFriends) {
            this.toggleFriendsRemoveButtonPressed(button);
        }
    },
    toggleFriendsRemoveButtonPressed : function (button) {
        var friends       = this.getFriends(),
            pressingCls   = 'x-button-pressing',
            baseItemCls   = 'friends-list-item',
            itemRemoveCls = 'friends-item-remove';

        if (button.getCls()) {
            button.removeCls(pressingCls);
            friends.setStatus('default');
            friends.setItemCls(baseItemCls);
        } else {
            button.addCls(pressingCls);
            friends.setStatus('remove');
            friends.setItemCls(baseItemCls + ' ' + itemRemoveCls);
        }
    },
    onAddFriendModalButtonTap      : function (button) {
        var action = button.config.action,
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
    loadFriend                     : function (battleTag) {
        var me     = this,
            region = this.getApplication().region;

        Ext.ModelMgr.getModel("D3Mobile.model.Account").load(null, {
            url     : 'http://' + region + '.battle.net/api/d3/profile/' + battleTag + '/',
            success : me.onFriendAccountLoad,
            scope   : me
        });
    },
    onFriendAccountLoad            : function (record) {
        if (record.get('heroes')) {
            var battleTag    = localStorage.battleTag,
                friendsStore = Ext.getStore("Friends"),
                localStorageFriends,
                currentUserFriends;

            if (friendsStore.find('battleTag', record.get('battleTag')) == -1) {
                localStorageFriends = JSON.parse(localStorage.friends);
                currentUserFriends  = localStorageFriends[battleTag];
                currentUserFriends.push(record.getData());
                localStorage.friends = JSON.stringify(localStorageFriends);
                friendsStore.add(record);
                this.getAddFriendModal().destroy();
            } else {
                Ext.Msg.alert("Duplicate BattleTag", "A friend with this BattleTag already exists, please try again.", Ext.emptyFn);
            }
        } else {
            Ext.Msg.alert("Invalid BattleTag", "BattleTag Not Found, please try again.", Ext.emptyFn);
        }
        Ext.Viewport.setMasked(false);

    },
    onFriendsItemTap               : function (list, index, target, record, evt) {
        var me = this;
        if (list.getStatus() == "default") {
            me.showFriendsHeroes(record);
        } else if (list.getStatus() == "remove") {
            var battleTag           = localStorage.battleTag,
                localStorageFriends = JSON.parse(localStorage.friends),
                friendsStore        = Ext.getStore("Friends");

            Ext.getStore("Friends").remove(record);
            me.removeLocalStorageFriendRecord(record.getData());
            if(friendsStore.getCount() == 0) {
                me.toggleFriendsRemoveButtonPressed(list.down('button[action="remove"]'));
            }
        }
    },
    removeLocalStorageFriendRecord : function (record) {
        var battleTag                = localStorage.battleTag,
            localStorageFriends      = JSON.parse(localStorage.friends),
            currentUserFriends       = localStorageFriends[battleTag],
            currentUserFriendsLength = currentUserFriends.length,
            removeIndex,
            i;

        for (i = 0; i < currentUserFriendsLength; i++) {
            if (currentUserFriends[i].id == record.id) {
                removeIndex = i;
                break;
            }
        }

        Ext.Array.erase(currentUserFriends, removeIndex, 1);
        localStorage.friends = JSON.stringify(localStorageFriends);
        return removeIndex;
    },
    showFriendsHeroes              : function (record, activeIndex, heroId) {
        var me     = this,
            region = me.getApplication().region;

        Ext.Viewport.setMasked({
            xtype : 'loadmask'
        });

        Ext.ModelMgr.getModel("D3Mobile.model.Account").load(null, {
            url            : 'http://' + region + '.battle.net/api/d3/profile/' + record.get('battleTag').replace("#", '-') + '/',
            success        : me.onShowFriendsHeroesLoad,
            scope          : me,
            callbackExtras : (activeIndex) ? {
                activeIndex : activeIndex,
                heroId      : heroId
            } : undefined
        });

    },
    onShowFriendsHeroesLoad : function(record, operation) {
        var friendsContainer  = this.getFriendsContainer(),
            battleTag         = record.get('battleTag'),
            heroes            = record.get('heroes'),
            friendsStore      = Ext.getStore("Friends"),
            friendStoreRecord = friendsStore.findRecord("battleTag", battleTag),
            friendHeroes      = friendStoreRecord.get('heroes'),
            callbackExtras    = operation.config.callbackExtras,
            heroesContainer   = friendsContainer.add({
                xtype : 'heroescontainer'
            }),
            heroesView        = heroesContainer.down('heroes'),
            localStorageFriends,
            currentUserFriends,
            removeIndex;

        if (JSON.stringify(friendHeroes).length != JSON.stringify(heroes).length) {
            removeIndex = this.removeLocalStorageFriendRecord(friendStoreRecord);
            friendStoreRecord.setData(record);
            localStorageFriends = JSON.parse(localStorage.friends);
            currentUserFriends  = localStorageFriends[battleTag];
            Ext.Array.insert(currentUserFriends, removeIndex, record);
            localStorage.friends = JSON.stringify(localStorageFriends);
        }

        Ext.Viewport.setMasked(false);

        heroesView.buildCards(battleTag.replace("#", '-'), record.get('heroes'), true);
        friendsContainer.animateActiveItem(heroesContainer, { type : 'slide', direction : 'down'});
        if (callbackExtras) {
            heroesView.setActiveItem(callbackExtras.activeIndex);
            callbackExtras.heroId && heroesView.fireEvent('heroOverviewTap', battleTag.replace("#", '-'), callbackExtras.heroId);
        }
    },
    updateFriend : function() {
        var me               = this,
            friendsContainer = me.getFriendsContainer(),
            heroesContainer  = friendsContainer.down('heroescontainer'),
            heroes           = friendsContainer.down('heroes'),
            hero             = friendsContainer.down('herodetail'),
            battleTag        = heroes.getBattleTag(),
            activeItem       = heroes.getActiveItem(),
            activeIndex      = heroes.getActiveIndex(),
            friendRecord     = Ext.getStore("Friends").findRecord("battleTag",battleTag.replace("-", "#"));

        if(heroes) {
            hero && hero.down('herodetailheader').down('button').fireEvent('tap');
            setTimeout(function() {
                friendsContainer.remove(heroesContainer, true);
            }, 0);



            me.showFriendsHeroes(friendRecord, activeIndex, (hero) ? activeItem.getData().id : null);
        }
    }
});
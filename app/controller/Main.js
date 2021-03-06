// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.controller.Main', {
    extend                     : 'Ext.app.Controller',
    config                     : {
        models        : [
            'Account',
            'Hero'
        ],
        stores        : [
            'CurrentUser',
            'Friends',
            'Heroes'
        ],
        views         : [
            'Main',
            'Login',
            'tooltip.About',
            'Legal'
        ],
        refs          : {
            login           : 'login',
            main            : 'main',
            heroesContainer : 'heroescontainer',
            heroes          : 'heroes',
            friends         : 'friends',
            news            : 'news',
            servers         : 'servers',
            moreOptions     : 'moreoptions',
            legal           : 'legal'
        },
        control       : {
            'login'        : {
                'about' : 'onAboutTap'
            },
            'login button' : {
                'tap' : 'onLoginTap'
            },
            'main'         : {
                activeitemchange : 'onMainActiveItemChange'
            },
            'abouttooltip' : {
                openAboutLink : 'onOpenAboutLink'
            },
            'moreoptions'  : {
                logout : 'onLogOutTap',
                legal  : 'onLegalTap'
            },
            'legal button'        : {
                tap  : 'onLegalClose'
            }
        },
        previousPanel : null
    },
    launch                     : function () {
        var battleTag = localStorage.battleTag,
            region    = localStorage.region ? localStorage.region : this.getApplication().region;

        if (battleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(battleTag, region);
        } else {
            Ext.Viewport.add({
                xtype : 'login'
            });
        }

    },
    onLoginTap                 : function () {
        var login          = this.getLogin(),
            validBattleTag = login.isValid(),
            region         = login.element.down('select').dom.value;

        if (validBattleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(validBattleTag, region);
        }
    },
    loadUser                   : function (battleTag, region) {
        var me = this;

        localStorage.region = me.getApplication().region = region;

        Ext.getStore("CurrentUser").load({
            url      : 'http://' + region + '.battle.net/api/d3/profile/' + battleTag + '/',
            callback : me.onCurrentUserLoadCallback,
            scope    : me
        });
    },
    onCurrentUserLoadCallback  : function (records, operation, success) {
        if (records[0].get('heroes')) {
            var me        = this,
                record    = records[0],
                battleTag = record.get('battleTag').replace('#', '-'),
                login     = me.getLogin();
            me.loadLocalStorage(battleTag);
            login && login.destroy();

            Ext.Viewport.add({
                xtype : 'main'
            });
            me.getHeroes().buildCards(battleTag, record.get('heroes'), false);
        } else {
            Ext.Msg.alert("Invalid BattleTag", "BattleTag Not Found, please try again.", Ext.emptyFn);
        }
        Ext.Viewport.setMasked(false);
    },
    loadLocalStorage           : function (battleTag) {
        localStorage.battleTag = battleTag;

        var localStorageFriends = (localStorage.friends) ? JSON.parse(localStorage.friends) : this.initLocalStorageFriends(battleTag),
            userFriends         = localStorageFriends[battleTag];

        if (userFriends && userFriends.length > 0) {
            Ext.getStore("Friends").add(userFriends);
        } else {
            localStorageFriends[battleTag] = [];
            localStorage.friends = JSON.stringify(localStorageFriends);
        }
    },
    initLocalStorageFriends    : function (battleTag) {
        var friends = {};

        friends[battleTag] = [];
        localStorage.friends = JSON.stringify(friends);
        return friends;
    },
    updateUser                 : function() {
        var me               = this,
            battleTag        = localStorage.battleTag,
            region           = me.getApplication().region,
            currentUserStore = Ext.getStore("CurrentUser");

        Ext.Viewport.setMasked({
            xtype : 'loadmask'
        });

        currentUserStore.removeAll();

        currentUserStore.load({
            url      : 'http://' + region + '.battle.net/api/d3/profile/' + battleTag + '/',
            callback : me.onUpdateUserCallback,
            scope    : me
        });

    },
    onUpdateUserCallback       : function(records, operation, success) {
        var record          = records[0],
            battleTag       = record.get('battleTag').replace('#', '-'),
            heroesContainer = this.getHeroesContainer(),
            activeHero      = heroesContainer.down('herodetail'),
            heroes          = heroesContainer.down('heroes'),
            activeIndex     = heroes.getActiveIndex();

        heroes.buildCards(battleTag, record.get('heroes'), false);
        heroes.setActiveItem(activeIndex);
        if(activeHero) {
            activeHero.down('herodetailheader').down('button').fireEvent('tap');
            heroes.fireEvent('heroOverviewTap', battleTag, activeHero.getHero().id);
        }

        Ext.Viewport.setMasked(false);
    },
    onMainActiveItemChange     : function (main, newPanel, oldPanel) {
        var action = newPanel.config.action;
        this.setPreviousPanel(oldPanel);

        if (action == "servers") {
            this.loadServerStatus();
        }
    },
    loadServerStatus           : function () {
        Ext.Viewport.setMasked({
            xtype : 'loadmask'
        });

        Ext.Ajax.request({
            url      : 'http://us.battle.net/d3/en/status',
            callback : this.onLoadServerStatusCallback,
            scope    : this
        });
    },
    onLoadServerStatusCallback : function (request, success, response) {
        Ext.Viewport.setMasked(false);
        this.getServers().setHtml(response.responseXML.getElementsByClassName("server-status")[0]);
    },
    onLogOutTap                : function () {
        Ext.Msg.confirm('Log Out', 'Are you sure you want to log out?', this.onLogOutConfirm, this);
    },
    onLogOutConfirm            : function (button, value, scope) {
        if (button == "yes") {
            delete localStorage.battleTag;
            window.location.reload();
        } else if (button == "no") {
            this.getMain().setActiveItem(this.getPreviousPanel());
        }
    },
    onAboutTap                 : function () {
        Ext.Viewport.add({
            xtype   : 'abouttooltip',
            width   : Ext.Viewport.windowWidth - 30,
            padding : '20 0 0 0'
        }).show();
    },
    onOpenAboutLink            : function (url) {
        window.open(url);
    },
    onLegalTap                 : function() {
        var moreOptions = this.getMoreOptions(),
            legal       = moreOptions.add({
                xtype : 'legal'
            });

        moreOptions.setActiveItem(legal);
    },
    onLegalClose               : function() {
        var legal       = this.getLegal(),
            moreOptions = this.getMoreOptions();

        legal.destroy();
    }


});
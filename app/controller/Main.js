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
            'Login'
        ],
        refs          : {
            login   : 'login',
            main    : 'main',
            heroes  : 'heroes',
            friends : 'friends',
            news    : 'news',
            servers : 'servers'
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
            }
        },
        previousPanel : null
    },
    launch                     : function () {
        var battleTag = localStorage.battleTag;
        if (battleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(battleTag);
        } else {
            Ext.Viewport.add({
                xtype : 'login'
            });
        }

    },
    onLoginTap                 : function () {
        var validBattleTag = this.getLogin().isValid();

        if (validBattleTag) {
            Ext.Viewport.setMasked({
                xtype : 'loadmask'
            });
            this.loadUser(validBattleTag);
        }
    },
    loadUser                   : function (battleTag) {
        var me = this;
        Ext.getStore("CurrentUser").load({
            url      : 'http://us.battle.net/api/d3/profile/' + battleTag + '/',
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
            userFriends = localStorageFriends[battleTag];

        if (userFriends.length > 0) {
            Ext.getStore("Friends").add(userFriends);
        }
    },
    initLocalStorageFriends    : function (battleTag) {
        var friends = {};

        friends[battleTag] = [];
        localStorage.friends = JSON.stringify(friends);
        return friends;
    },
    onMainActiveItemChange     : function (main, newPanel, oldPanel) {
        var action = newPanel.config.action;

        if (action == "logOut") {
            this.onLogOut(oldPanel);
        } else if (action == "servers") {
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
    onLogOut                   : function (oldPanel) {
        this.setPreviousPanel(oldPanel);
        Ext.Msg.confirm('Log Out', 'Are you sure you want to log out?', this.onLogOutConfirm, this);
    },
    onLogOutConfirm            : function (button, value, scope) {
        if (button == "yes") {
            localStorage.clear();
            window.location.reload();
        } else if (button == "no") {
            this.getMain().setActiveItem(this.getPreviousPanel());
        }
    },
    onAboutTap                 : function() {
        var html = ''.concat(
            '<div class="close-button">x</div>',
            '<div class="stage">',
                '<p class="far-far-away">Diablo 3 Mobile Companion <br/><a href="http://www.moduscreate.com">By Modus Create</a></p>',
                '<div class="crawl">',
                    '<p class="episode">Modus<p>',
                    '<p class="episode">Create<p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>Don\'t </p>',
                    '<p>Forget </p>',
                    '<p>to be</p>',
                    '<p>AWESOME</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>&nbsp</p>',
                    '<p>All Your</p>',
                    '<p>Base</p>',
                    '<p>Are Belong</p>',
                    '<p>To Us</p>',
                '</div>',
            '</div>'
        );
        Ext.Viewport.add({
            xtype  : 'tooltip',
            html   : html,
            width  : Ext.Viewport.windowWidth - 10,
            height : Ext.Viewport.windowHeight - 10
        }).show();
    }

});
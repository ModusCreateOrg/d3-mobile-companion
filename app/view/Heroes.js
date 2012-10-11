Ext.define('D3Mobile.view.Heroes', {
    extend     : 'Ext.Carousel',
    xtype      : 'heroes',
    config     : {
        title           : 'Heroes',
        battleTag       : null,
        cardTpl         : ''.concat(
            '<div class="hero-overview hero-overview-{class}_{gender} animated fadeIn" data-id="{id}" data-battletag="{battleTag}">',
                '<div class="hero-header">',
//                    '<tpl if="showCloseButton">',
//                        '<div class="animated fadeIn friends-bar"><span class="bnet-icon"></span>{battleTag} <a href="#">Compare</a></div>',
//                    '</tpl>',
                    '<tpl if="showCloseButton">',
                        '<div class="hero-back hero-overview-back"></div>',
                    '</tpl>',
                    '<div class="hero-header-name flex1">{name}</div>',
                    '<div class="hero-header-level flex1">{level}',
                        '<tpl if="paragonLevel &gt; 0">',
                            '<span class="hero-header-paragon_level">({paragonLevel})</span>',
                        '</tpl>',
                    '</div>',
                '</div>',
                '<tpl if="hardcore">',
                    '<div class="hero-header">',
                        '<div class="hero-header-hardcore flex1">Hardcore</div>',
                        '<tpl if="dead">',
                            '<div class="hero-header-hardcore dead flex1">Dead</div>',
                        '</tpl>',
                    '</div>',
                '</tpl>',
            '</div>'
        )
    },
    initialize : function () {
        var me = this;
        me.callParent();
        me.element.on({
            tap        : me.onHeroTap,
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            scope      : me,
            delegate   : '.hero-overview'
        });

    },
    onHeroTap  : function(evtObj) {
        var me      = this,
            dataset = evtObj.delegatedTarget.dataset;

        if(evtObj.getTarget('.hero-back')) {
            me.fireEvent('close', me);
        } else {
            me.fireEvent('heroOverviewTap', dataset.battletag, dataset.id);
        }

    },
    onTouchStart : function(evtObj) {
        var target = evtObj.getTarget();
        if (target) {
            Ext.fly(target).addCls('tapped');
        }
    },

    onTouchEnd : function(evtObj) {
        var target = evtObj.getTarget();
        if (target) {
            Ext.fly(target).removeCls('tapped');
        }
    },
    buildCards : function (battleTag, heroes, showCloseButton) {
        var me              = this,
            heroesCount     = heroes.length,
            hero,
            i;

        me.removeAll(true);
        if(showCloseButton) {
            me.add(me.buildFriendsBar(battleTag));
        }

        for (i = 0; i < heroesCount; i++) {
            hero = heroes[i];
            hero.battleTag = battleTag;
            hero.showCloseButton = showCloseButton;
            me.add(me.buildCard(hero));
        }

        me.setBattleTag(battleTag);
        me.setActiveItem(0);

    },
    buildCard  : function (hero) {
        return {
            xtype            : 'container',
            cls              : 'hero-overview-card',
            data             : hero,
            tpl              : this.getCardTpl(),
            styleHtmlContent : true
        };
    },
    buildFriendsBar : function(battleTag) {
        return {
            xtype  : 'component',
            docked : 'top',
            tpl    : '<div class="animated fadeIn friends-bar"><span class="bnet-icon"></span>{battleTag} <a href="#">Compare</a></div>',
            data   : {
                battleTag : battleTag.replace("-","#")
            }
        };
    }
});
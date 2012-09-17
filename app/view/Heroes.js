Ext.define('D3Mobile.view.Heroes', {
    extend     : 'Ext.Carousel',
    xtype      : 'heroes',
    config     : {
        title           : 'Heroes',
        cardTpl         : ''.concat(
            '<div class="hero-overview hero-overview-{class}_{gender}" data-id="{id}" data-battletag="{battleTag}">',
                '<div class="hero-header">',
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
            '</div>'
        )
    },
    initialize : function () {
        var me = this;
        me.callParent();
        me.element.on({
            tap      : me.onHeroTap,
            scope    : me,
            delegate : '.hero-overview'
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
    buildCards : function (battleTag, heroes, showCloseButton) {
        var me              = this,
            heroesCount     = heroes.length,
            hero,
            i;
        me.removeAll(true);
        for (i = 0; i < heroesCount; i++) {
            hero = heroes[i];
            hero.battleTag = battleTag;
            hero.showCloseButton = showCloseButton;
            me.add(me.buildCard(hero));
        }
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
    }
});
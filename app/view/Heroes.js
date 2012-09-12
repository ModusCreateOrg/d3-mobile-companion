Ext.define('D3Mobile.view.Heroes', {
    extend     : 'Ext.Carousel',
    xtype      : 'heroes',
    config     : {
        title   : 'Heroes',
        cardTpl : ''.concat(
            '<div class="hero-overview hero-overview-{class}_{gender}" data-id="{id}" data-battletag="{battleTag}">',
                '<div class="hero-header">',
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
        var dataset = evtObj.delegatedTarget.dataset;
        this.fireEvent('heroOverviewTap', dataset.battletag, dataset.id);
    },
    buildCards : function (battleTag, heroes) {
        var me = this,
            heroesCount = heroes.length,
            i;
        me.removeAll(true);
        for (i = 0; i < heroesCount; i++) {
            heroes[i].battleTag = battleTag;
            me.add(me.buildCard(heroes[i]));
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
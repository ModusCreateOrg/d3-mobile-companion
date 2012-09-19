Ext.define('D3Mobile.view.HeroDetail', {
    extend              : 'Ext.Carousel',
    xtype               : 'herodetail',
    requires            : [
        'D3Mobile.view.hero.Attributes',
        'D3Mobile.view.hero.Items',
        'D3Mobile.view.hero.Skills'
    ],
    config              : {
        hero              : null
    },
    initialize          : function () {
        var me = this;
        me.config.title = this.getHero().name;
        me.add(me.buildAttributesCard());
        me.add(me.buildItemsCard());
        me.add(me.buildSkillsCard());

        me.element.on({
            tap        : me.onTap,
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            scope      : me
        });

        me.callParent();
    },


    onTap : function(evtObj) {
        var backButton = evtObj.getTarget('.hero-detail-back'),
            skill      = evtObj.getTarget('.skill'),
            item       = evtObj.getTarget('.item');
        if(backButton) {
            this.fireEvent('close');
        } else if(skill) {
            this.fireEvent('skillTap', skill.dataset.tooltipurl, skill.dataset.runetype);
        } else if(item) {
            this.fireEvent('itemTap', item.dataset.tooltipparams);
        }
    },

    onTouchStart : function(evtObj) {
        var target = evtObj.getTarget('.item');
        if (target) {
            Ext.fly(target).addCls('tapped');
        }
    },

    onTouchEnd : function(evtObj) {
        var target = evtObj.getTarget('.item');
        if (target) {
            Ext.fly(target).removeCls('tapped');
        }
    },

    buildAttributesCard : function () {
        return {
            xtype : 'attributes',
            data  : this.getHero(),
            items : [
                this.buildHeader('Attributes')
            ]
        };
    },
    buildItemsCard      : function () {
        return {
            xtype : 'items',
            data  : this.getHero(),
            items : [
                this.buildHeader('Items')
            ]
        };
    },
    buildSkillsCard     : function () {
        return {
            xtype : 'skills',
            data  : this.getHero(),
            items : [
                this.buildHeader('Skills')
            ]
        };
    },
    buildHeader : function (type) {
        return {
            xtype  : 'component',
            cls    : 'hero-detail-header',
            tpl    : ''.concat(
                '<div class="header">',
                    '<div class="hero-detail-back hero-back">Heros</div>',
                        type,
                    '<div class="sub" style="margin-top: 0;">{name} - {level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></tpl> - {class}</div>',
                '</div>'
            ),
            data   : this.getHero(),
            docked : 'top'
        };
    }
});
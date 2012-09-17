Ext.define('D3Mobile.view.ArticleDetail', {
    extend     : 'Ext.Container',
    xtype      : 'articledetail',
    config     : {
        scrollable : {
            direction : 'vertical'
        },
        tpl        : new Ext.XTemplate(
            ''.concat(
                '<div class="article-detail" style="color:yellow;">',
                    '<div class="article-header">',
                        '<div class="hero-detail-back hero-back"></div>',
                        '<div class="article-header-title">{title}</div>',
                        '<div class="article-header-pub">{published}</div>',
                    '</div>',
                    '<div class="article-content">{[this.getContent(values.id)]}</div>',
                    '<div class="article-footer>"',
                        '<div class="article-more-button">SOURCE</div>',
                    '</div>',
                '</div>'
            ), {
                getContent : function (id) {
                    return Ext.getStore("Articles").findRecord('id',id).raw.getElementsByTagName("content")[0];
                }
            })
    },
    initialize : function () {
        var me = this;
        me.callParent();
        me.element.on({
            tap   : me.onTap,
            scope : me
        });

    },
    onTap      : function (evtObj) {
        console.log('whe')
        if(evtObj.getTarget('.hero-back')) {
            this.fireEvent('close');
        }
    }
});
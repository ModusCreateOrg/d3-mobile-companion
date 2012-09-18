Ext.define('D3Mobile.view.ArticleDetail', {
    extend     : 'Ext.Container',
    xtype      : 'articledetail',
    config     : {
        scrollable : {
            direction : 'vertical'
        },
        tpl        : ''.concat(
            '<div class="article-detail">',
                '<div class="inner">',
                    '<div class="article-header">',
                        '<div class="hero-detail-back hero-back"></div>',
                        '<div class="article-header-title">{title}</div>',
                        '<div class="article-header-pub">{published}</div>',
                    '</div>',
                    '<div class="article-content" data-articleid="{id}"></div>',
                    '<div class="article-footer>"',
                        '<div class="article-source-btn" data-url="{link}">SOURCE</div>',
                    '</div>',
                '</div>',
            '</div>'
        )
    },
    initialize : function () {
        var me = this;
        me.callParent();
        me.loadArticleContent();
        me.element.on({
            tap   : me.onTap,
            scope : me
        });
    },
    loadArticleContent : function() {
        var content    = this.element.down('.article-content'),
            contentDom = content.dom,
            article    = Ext.getStore("Articles").findRecord('id',contentDom.dataset['articleid']);

        contentDom.appendChild(article.raw.getElementsByTagName("content")[0]);
    },
    onTap      : function (evtObj) {
        var backButton = evtObj.getTarget('.hero-back'),
            sourceButton = evtObj.getTarget('.article-source-btn');

        if (backButton) {
            this.fireEvent('close');
        } else if(sourceButton) {
            debugger;
            window.open(sourceButton.dom.dataset['link']);
        }
    }
});
/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/17/12
 * Time: 4:34 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.controller.News', {
    extend        : 'Ext.app.Controller',
    config        : {
        views   : [
            'NewsContainer',
            'News',
            'ArticleDetail'
        ],
        models  : [
            'Article'
        ],
        stores  : [
            'Articles'
        ],
        refs    : {
            newsContainer : 'newscontainer',
            news          : 'news',
            articleDetail : 'articledetail'
        },
        control : {
            'news' : {
                itemtap : 'onNewsItemTap'
            },
            'articledetail' : {
                close : 'onArticleDetailCloseTap'
            }
        }
    },
    onNewsItemTap : function (list, index, target, record, evt) {
        console.log(record);


        var newsContainer = this.getNewsContainer(),
            articleDetail = newsContainer.add({
                xtype  : 'articledetail',
                record : record,
                data   : record.getData()
            });

        newsContainer.animateActiveItem(articleDetail, { type: 'slide', direction: 'down' });
    },
    onArticleDetailCloseTap : function() {
        console.log('wtf');
        this.getNewsContainer().remove(this.getArticleDetail(),true);
    }
});
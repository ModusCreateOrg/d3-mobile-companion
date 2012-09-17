/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/12/12
 * Time: 8:40 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define("D3Mobile.view.HeroesContainer", {
    extend      : 'Ext.Container',
    xtype       : 'heroescontainer',
    requires    : ['D3Mobile.view.Heroes'],
    config      : {
        title           : 'Heroes',
        cls             : 'heroes-container',
        layout          : 'card',
        items           : [
            {
                xtype : 'heroes'
            }
        ]
    }
});
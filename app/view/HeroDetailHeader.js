/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/24/12
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.HeroDetailHeader', {
    extend : 'Ext.TitleBar',
    xtype  : 'herodetailheader',
    config : {
        docked   : 'top',
        titleTpl : '<div class="header-title"><span class="class-icon {class}">{class}</span> {name} - {level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></tpl></div>',
        items    : [
            {
                ui     : 'back',
                text   : 'Heroes',
                action : 'back',
                align  : 'left'
            }
        ]
    },
    initialize : function() {
        var me = this;
        me.setTitle(new Ext.XTemplate(this.getTitleTpl()).apply(me.getData()));
        me.callParent();
    }
});
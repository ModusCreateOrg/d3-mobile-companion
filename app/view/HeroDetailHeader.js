// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

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
        titleTpl : ''.concat(
            '<div class="header-title">',
                '<span class="class-icon {class}_{gender}">{class}</span> ',
                '<span class="hero-name">{name}</span> ',
                '<span class="levels">{level} <tpl if="paragonLevel &gt; 0"><span class="paragonLevel">({paragonLevel})</span></span></tpl>',
            '</div>'),
        items    : [
            {
                iconCls  : 'd3-back',
                iconMask : true,
                action   : 'back',
                align    : 'left',
                ui       : 'plain'
            }
        ]
    },
    initialize : function() {
        var me = this;
        me.setTitle(new Ext.XTemplate(this.getTitleTpl()).apply(me.getData()));
        me.callParent();
    }
});
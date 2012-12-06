// Copyright (c) 2012 Modus Create, Inc.
// This file is licensed under the terms of the MIT license.
// See the file license.txt for more details.

Ext.define('D3Mobile.view.Login', {
    extend     : 'Ext.Container',
    xtype      : 'login',
    requires   : ['Ext.form.Panel', 'Ext.field.Text', 'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.Button'],
    config     : {
        fullscreen : true,
        cls        : 'login',
        items      : [
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="login-container animated fadeIn">',
                        '<div class="d3-logo"></div>',
                        '<div class="form">',
                        '<h1>Mobile Companion</h1>',
                        '<div class="battle-tag-input">',
                            '<form>',
                                '<input type="text" name="battleTag" placeholder="Battle Tag" autocorrect="off" autocapitalize="off" required />',
                                '<input type="tel" name="battleTagNum" placeholder="####" autocorrect="off" autocapitalize="off" maxlength="4" required />',
                                '<br/>',
                                '<select name="region" required />',
                                    '<option value="us" selected>Americas</option>',
                                    '<option value="eu">Europe</option>',
                                    '<option value="tw">Taiwan</option>',
                                    '<option value="kr">Korea</option>',
                                '</select>',

                            '</form>',
                        '</div>',
                        '</div>', // end .form
                    '</div>'
                )
            },
            {
                xtype : 'button',
                cls   : 'loginBtn animated fadeIn',
                ui    : 'loginButton',
                text  : 'Log In'
            },
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="footer animated fadeIn">',
                        '<div class="about-link">Built by Modus Create</div>',
                        '<div class="non-trademark">Not an official Blizzard product!</div>',
                    '</div>'
                )
            }
        ]
    },
    initialize : function() {
        var me = this;
        me.element.on({
            tap   : me.onTap,
            scope : me
        });
    },
    onTap      : function (evtObj) {
        var aboutLink = evtObj.getTarget('.about-link');
        aboutLink && this.fireEvent('about');
    },
    isValid    : function () {
        var element         = this.element,
            battleTag       = element.down('input[name="battleTag"]'),
            battleTagVal    = battleTag.dom.value,
            battleTagNum    = element.down('input[name="battleTagNum"]'),
            battleTagNumVal = battleTagNum.dom.value,
            isValid         = (battleTag && battleTagNumVal && battleTagNumVal.length == 4);

        this.markValid(battleTag, battleTagVal);
        this.markValid(battleTagNum, battleTagNumVal && battleTagNumVal.length == 4);

        if(isValid) {
            return battleTagVal + "-" + battleTagNumVal;
        } else {
            return false;
        }
    },
    markValid : function (el, valid) {
        if (valid) {
            el.removeCls("invalid");
        } else {
            el.addCls("invalid");
        }
    }
});
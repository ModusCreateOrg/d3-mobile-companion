Ext.define('D3Mobile.view.Login', {
    extend     : 'Ext.Container',
    xtype      : 'login',
    requires   : ['Ext.form.Panel', 'Ext.field.Text', 'Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.Button'],
    config     : {
        fullscreen : true,
        cls        : 'login',
        padding    : 10,
        items      : [
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="login-container">',
                        '<h1>Diablo 3 <br />Mobile Companion</h1>',
                        '<div class="d3-logo"></div>',
                        '<div class="battle-tag-input">',
                            '<form>',
                                '<input type="text" name="battleTag" placeholder="Battle Tag" autocorrect="off" autocapitalize="off" required />',
                                '<input type="tel" name="battleTagNum" placeholder="####" autocorrect="off" autocapitalize="off" maxlength="4" required />',
                            '</form>',
                        '</div>',
                    '</div>'
                )
            },
            {
                xtype : 'button',
                cls   : 'loginBtn',
                ui    : 'loginButton',
                text  : 'Log In'
            }
        ]
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
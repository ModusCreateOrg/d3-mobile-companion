/**
 * Created with JetBrains WebStorm.
 * User: stan229
 * Date: 9/13/12
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('D3Mobile.view.AddFriendModal', {
    extend : 'Ext.Panel',
    xtype  : 'addfriendmodal',
    config : {
        modal    : true,
        centered : true,
        cls      : 'add-friend-modal',
        defaults : {
            styleHtmlContent : true
        },
        items    : [
            {
                xtype  : 'component',
                html   : '<h3 class="d3-color-orange">Add Friend</h1>',
                docked : 'top'
            },
            {
                xtype : 'component',
                html  : ''.concat(
                    '<div class="login-container">',
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
                xtype  : 'button',
                cls    : 'loginBtn',
                ui     : 'loginButton',
                text   : 'Add Friend',
                action : 'add',
                style   : 'margin-bottom: 10px;'
            },
            {
                xtype  : 'button',
                cls    : 'loginBtn',
                ui     : 'loginButton',
                text   : 'Cancel',
                action : 'cancel',
                ui     : 'decline'
            }
        ]
    },
    // This is a copy from Login... should refactor if I find time
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
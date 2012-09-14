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
        items    : [
            {
                xtype            : 'component',
                styleHtmlContent : true,
                html             : ''.concat(
                    '<div class="battle-tag-input">',
                        '<form>',
                            '<input type="text" name="battleTag" placeholder="Battle Tag" autocorrect="off" autocapitalize="off" required />',
                            '<input type="tel" name="battleTagNum" placeholder="####" autocorrect="off" autocapitalize="off" maxlength="4" required />',
                        '</form>',
                    '</div>'
                )
            }
        ]
    }
});
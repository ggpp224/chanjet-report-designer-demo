/**
 * Created by guopeng on 16/9/2.
 */
import React, {PropTypes}  from 'react';
import {autobind} from 'core-decorators';
import Page from '../../BasePage';
import List from 'chanjet-ui/lib/List';
import ListItem from 'chanjet-ui/lib/ListItem';
import Alert from 'chanjet-ui/lib/Alert';


class ListPage extends Page{

    title = 'UI List';

    navBar = {
        right: {
            type: 'menu',
            item:[
                {text: '菜单项', onClick: this.onMenuItemClick},
            ]
        }
    };

    renderContent(){
        return(
            <List>
                <ListItem primaryText="Inbox" />
                <ListItem primaryText="Starred"  />
                <ListItem primaryText="Sent mail" />
                <ListItem primaryText="Drafts" />
                <ListItem primaryText="Inbox"  />
            </List>
        );
    }

    @autobind
    onMenuItemClick(){
        Alert.show({msg:'click'});
    }

}

export default ListPage;
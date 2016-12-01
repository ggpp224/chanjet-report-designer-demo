/**
 * Created by guopeng on 16/9/2.
 */

import React  from 'react';
import Page from 'chanjet-ui/lib/Page';


class BasePage extends Page {

    static childContextTypes = {
        navigationController: React.PropTypes.object
    };

    getChildContext() {
        return {navigationController: this.props.navigationController};
    }

}

export default BasePage;
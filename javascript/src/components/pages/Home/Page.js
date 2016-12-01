/**
 * Created by guopeng on 16/9/2.
 */

import React, {PropTypes}  from 'react';
import Page from '../../BasePage';
import {autobind} from 'core-decorators';
import Button from 'chanjet-ui/lib/Button';
import Divider from 'chanjet-ui/lib/Divider';
import {routes} from '../../../app-routes';
import './page.less';

export default class Home extends Page{

    title = '首页';

    renderContent(){
        return(
            <div>
                <h1 style={{textAlign:'center', margin:'50px'}}>wellcome to chanjet !</h1>
                <p>默认dpr=1时文字大小15px</p>
                <p>默认dpr=2时文字大小30px</p>
                <p>默认dpr=3时文字大小45px</p>
                <hr style={{height: '1rpx'}} />
                <div className="rpx">边框和分割线无论在何种机型上都是1px</div>
                <Divider />
                <div style={{position: 'relative'}}>
                    <Button
                        label="下一页"
                        primary={true}
                        style={{position:'absolute', right:'40px', top:'20px'}}
                        onTouchTap={this.onButtonClick}
                    />
                </div>
            </div>

        );
    }

    @autobind
    onButtonClick(){
       this.navigationController.push(routes.list);
    }

}


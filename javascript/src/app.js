/*
 *  应用入口
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mutants from 'chanjet-mutants';
import {setConfig, config} from 'chanjet-ui/lib/config';
import NavigationController from 'chanjet-ui/lib/navigation/NavigationController';
import theme from './theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {appRoutes} from './app-routes'
import './www/css/main.less';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei,"微软雅黑",sans-serif',
    palette: {
        textColor: '#000000',
    },
    appBar: {
        height: 50,
    },
});

import {ReportDesigner, DataSource, DataTable, DataTypeEnum, DataField, DataRelation, DataRelationShip,ReportDesignMode} from 'chanjet-reports-designer-debug';



class App extends Component {

    createMockDataSource() {
        const createField = (parent, name, displayText, dataType) => {
            const field = new DataField();
            field.name = name;
            field.displayText = displayText;
            field.dataType = dataType;
            field.parent = parent;
            return field;
        };

        const createRelationShip = (parent, name, parentRelation, childRelation) => {
            const relationship = new DataRelationShip(parentRelation, childRelation);
            relationship.parent = parent;
            relationship.name = name;
            return relationship;
        };

        const ds = new DataSource();
        ds.name = 'Order';
        ds.displayText = '订单';
        ds.description = '';

        // 客户表
        const customerTable = new DataTable();
        customerTable.name = 'Customer';
        customerTable.displayText = '客户';
        customerTable.fields.push(createField(customerTable, 'ID', 'ID', DataTypeEnum.Long));
        customerTable.fields.push(createField(customerTable, 'Name', '名称', DataTypeEnum.String));
        customerTable.fields.push(createField(customerTable, 'Address', '地址', DataTypeEnum.String));
        customerTable.fields.push(createField(customerTable, 'Contact', '联系方式', DataTypeEnum.String));

        // 客户联系方式表
        const contactTable = new DataTable();
        contactTable.name = 'Contact';
        contactTable.displayText = '联系方式';
        contactTable.fields.push(createField(contactTable, 'ID', 'ID', DataTypeEnum.Long));
        contactTable.fields.push(createField(contactTable, 'TelPhone', '手机号码', DataTypeEnum.String));
        contactTable.fields.push(createField(contactTable, 'BusinessNumber', '公司电话', DataTypeEnum.String));
        contactTable.fields.push(createField(contactTable, 'HomeNumber', '家庭电话', DataTypeEnum.String));

        customerTable.relations.push(createRelationShip(
            customerTable, 'Customer-Contact',
            new DataRelation(contactTable.name, 'ID'), new DataRelation(customerTable.name, 'Contact')
        ));

        // 商品表
        const productTable = new DataTable();
        productTable.name = 'Product';
        productTable.displayText = '商品详细';
        productTable.fields.push(createField(productTable, 'ID', 'ID', DataTypeEnum.Long));
        productTable.fields.push(createField(productTable, 'Name', '名称', DataTypeEnum.String));
        productTable.fields.push(createField(productTable, 'Mark', '规格、型号', DataTypeEnum.String));
        productTable.fields.push(createField(productTable, 'Unit', '单位', DataTypeEnum.String));
        productTable.fields.push(createField(productTable, 'Price', '价格', DataTypeEnum.Number));

        // 订单头
        const masterTable = new DataTable();
        const detailTable = new DataTable();

        // 订单行
        detailTable.name = 'OrderDetail';
        detailTable.displayText = '订单行';
        detailTable.fields.push(createField(masterTable, 'No', '行号', DataTypeEnum.String));
        detailTable.fields.push(createField(masterTable, 'OrderID', '订单ID', DataTypeEnum.Long));
        detailTable.fields.push(createField(masterTable, 'Product', '商品', DataTypeEnum.Long));
        detailTable.fields.push(createField(masterTable, 'Price', '单价', DataTypeEnum.Number));
        detailTable.fields.push(createField(masterTable, 'Amount', '数量', DataTypeEnum.Number));
        detailTable.fields.push(createField(masterTable, 'Money', '金额', DataTypeEnum.Number));
        detailTable.relations.push(createRelationShip(
            detailTable, 'OrderDetail-Products',
            new DataRelation(productTable.name, 'ID'), new DataRelation(detailTable.name, 'Product')
        ));

        masterTable.name = 'OrderHeader';
        masterTable.displayText = '订单头';
        masterTable.fields.push(createField(masterTable, 'No', '订单编号', DataTypeEnum.String));
        masterTable.fields.push(createField(masterTable, 'Date', '订货日期', DataTypeEnum.DateTime));
        masterTable.fields.push(createField(masterTable, 'OrderCustomer', '订货客户', DataTypeEnum.Long));
        masterTable.fields.push(createField(masterTable, 'Money', '订单金额', DataTypeEnum.Number));
        masterTable.relations.push(createRelationShip(
            masterTable, 'Order-Customer',
            new DataRelation(customerTable.name, 'ID'), new DataRelation(masterTable.name, 'OrderCustomer')
        ));
        // masterTable.relations.push(createRelationShip(
        //     masterTable, 'Order-Details',
        //     new DataRelation(masterTable.name, 'ID'), new DataRelation(detailTable.name, 'OrderID')
        // ));

        ds.addTable(customerTable);
        ds.addTable(productTable);
        ds.addTable(masterTable);
        ds.addTable(detailTable);
        ds.addTable(contactTable);

        ds.entryTableNames = [masterTable.name, detailTable.name];

        return ds;
    }

    render() {

        /**
         * 模拟一个数据源
         * @type {DataSource}
         */
        const mockDataSource = this.createMockDataSource;


        const mockData = {
            //设计器的配置
            config: {
                //不需要使用的band类型
                reportMode: ReportDesignMode.ChineseTable,
            },
            //使用的数据源
            dataSource: mockDataSource,
            //与设计器对接的事件回调方法,比如要调用外部的部件
            //需要上传图片
            uploadImage: (callback) => {
                callback('http://hiphotos.baidu.com/zhixin/pic/item/00a82701213fb80e560a65af34d12f2eb83894ab.jpg');
            },
            //发生变化时,通知外部最新的数据
            onReportChange: (designData, printData) => {
                console.info('--------------------- 报表数据发生变化 ---------------');
                console.info('设计模板', designData);
                console.info('打印模板', printData);
            }
        };

        const reportData = require("json-loader!./demo-data.json");

        return (
            <ReportDesigner
                config={mockData.config}
                model={reportData}
                dataSource={mockData.dataSource}
                uploadImage={mockData.uploadImage}
                onReportChange={mockData.onReportChange}
            />
        );

    }

}

/*
 *  mutants准备完成后，启动正式的应用入口
 */
mutants.ready((error) => {
    if(error)return;

    // 初始化Page和导航栏的主题
    setConfig({
        theme: {
            page: {
                navbar: {
                    backgroundColor: theme.palette.primary1Color,
                    color: theme.palette.alternateTextColor
                }
            }
        }
    });

    console.log(appRoutes);

    ReactDOM.render(
        <MuiThemeProvider muiTheme={muiTheme}>
             <App />
        </MuiThemeProvider>     
      , document.getElementById('app')
    );

});

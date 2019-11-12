import React from 'react';
import {Cascader, Divider, Form, Input} from "antd";

const {TextArea} = Input;
import {RegionData} from "@/assert/regionData";
import {FormComponentProps} from "antd/lib/form";
import QueueAnim from "rc-queue-anim";
import {IState} from '@/store';
import {useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        lastInfo: state.GetVoucherInvoice.lastInfo
    };
};

interface InvoiceFormProps extends FormComponentProps {
    setForm?: Function;
}

const InvoiceInfoFormWrapper: React.ComponentType<InvoiceFormProps> = (props: InvoiceFormProps) => {
    const {lastInfo} = useMappedState(mapState);
    const changeData: any = (data: any) => {
        const dataMap = data;
        function _change(item: any) {
            for(let i = 0; i < item.length; i++) {
                item[i].value = item[i].label;
                if(item[i].children && item[i].children.length > 0) {
                    _change(item[i].children);
                }
            }
        }
        _change(dataMap);
        return dataMap;
    };
    const formItemLayout: object = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 5},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
        style: {
            padding: '10px 20px'
        }
    };
    const {getFieldDecorator} = props.form;

    return (
        <QueueAnim delay={100} component={Form} {...formItemLayout}>
            <Divider key={1}>开票信息</Divider>
            <Form.Item label="发票抬头" key={2}>
                {getFieldDecorator('top', {
                    initialValue: lastInfo.top || '',
                    rules: [{required: true, message: '请填写发票抬头'}]
                })(
                    <Input placeholder={"请输入发票抬头"}/>
                )}
            </Form.Item>
            <Form.Item label="企业税号" key={3}>
                {getFieldDecorator('num', {
                    initialValue: lastInfo.company_info && lastInfo.company_info.num || '',
                })(
                    <Input placeholder={"请输入企业税号"}/>
                )}
            </Form.Item>
            <Form.Item label="开户银行" key={4}>
                {getFieldDecorator('bank', {
                    initialValue: lastInfo.company_info && lastInfo.company_info.bank || '',
                })(
                    <Input placeholder={"请输入开户行名称"}/>
                )}
            </Form.Item>
            <Form.Item label="开户行账户" key={5}>
                {getFieldDecorator('account', {
                    initialValue: lastInfo.company_info && lastInfo.company_info.account || '',
                })(
                    <Input placeholder={"请输入开户行账户"}/>
                )}
            </Form.Item>
            <Form.Item label="公司地址" key={6}>
                {getFieldDecorator('location', {
                    initialValue: lastInfo.company_info && lastInfo.company_info.location || '',
                })(
                    <Input placeholder={"请输入公司地址"}/>
                )}
            </Form.Item>
            <Form.Item label="公司电话" key={7}>
                {getFieldDecorator('call', {
                    initialValue: lastInfo.company_info && lastInfo.company_info.call || '',
                })(
                    <Input placeholder={"请输入公司电话"}/>
                )}
            </Form.Item>
            <Divider key={8}>收件人信息</Divider>
            <Form.Item label="收件人姓名">
                {getFieldDecorator('name', {
                    initialValue: lastInfo.users_info && lastInfo.users_info.name || '',
                    rules: [{required: true, message: '请填写收件人姓名'}]
                })(
                    <Input autoComplete={'off'} placeholder={"请输入收件人姓名"}/>
                )}
            </Form.Item>
            <Form.Item label="地区" key={9}>
                {getFieldDecorator('userLocation', {
                    initialValue: lastInfo.users_info && lastInfo.users_info.userLocation || [],
                    rules: [{required: true, message: '请选择收件地区'}]
                })(
                    <Cascader options={changeData(RegionData)} placeholder={"请选择地区"}/>
                )}
            </Form.Item>
            <Form.Item label="详细地址" key={10}>
                {getFieldDecorator('detailedLocation', {
                    initialValue: lastInfo.users_info && lastInfo.users_info.detailedLocation || '',
                    rules: [{required: true, message: '请填写详细地址'}]
                })(
                    <Input placeholder={"请输入详细地址"}/>
                )}
            </Form.Item>
            <Form.Item label="邮政编码" key={11}>
                {getFieldDecorator('postalCode', {
                    initialValue: lastInfo.users_info && lastInfo.users_info.postalCode || '',
                })(
                    <Input placeholder={"请输入邮政编码"}/>
                )}
            </Form.Item>
            <Form.Item label="手机号" key={12}>
                {getFieldDecorator('phone', {
                    initialValue: lastInfo.users_info && lastInfo.users_info.phone || '',
                    rules: [{required: true, message: '请填写手机号码'}]
                })(
                    <Input placeholder={"请输入手机号"}/>
                )}
            </Form.Item>
            <Form.Item label="备注" key={13}>
                {getFieldDecorator('remarks', {
                })(
                    <TextArea placeholder={"其他信息"} rows={4}/>
                )}
            </Form.Item>
        </QueueAnim>
    );
};
const InvoiceInfoForm = Form.create<InvoiceFormProps>()(InvoiceInfoFormWrapper);
export {
    InvoiceInfoForm
};
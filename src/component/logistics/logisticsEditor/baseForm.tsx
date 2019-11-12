import React from 'react';
import {DatePicker, Form, Select, Input} from "antd";

const {Option} = Select;
const {TextArea} = Input;
import {FormComponentProps} from "antd/lib/form";
import TimeRanger from "@/component/timeRange";
import {
    BaseFormWrapper
} from './ui';
import {Scrollbars} from "react-custom-scrollbars";

interface BaseFormProps extends FormComponentProps {
    propsSetBaseForm?: any;
}

const BaseForm: React.ComponentType<BaseFormProps> = (props: BaseFormProps) => {
    const formItemLayout: object = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 4},
            sm: {span: 16, offset: 6},
        },
    };
    const {getFieldDecorator} = props.form;
    return (
        <BaseFormWrapper>
            <Scrollbars>
                <Form {...formItemLayout}>
                    <Form.Item label="服务时间">
                        {getFieldDecorator('serveDate', {
                            rules: [{required: true, message: '请选择服务日期'}],
                        })(
                            <DatePicker style={{width: '100%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        {getFieldDecorator('serveTime', {
                            rules: [{type: 'object', required: true, message: '请选择服务时间'}],
                        })(
                            <TimeRanger format={"HH:mm"}/>
                        )}
                    </Form.Item>
                    <Form.Item label="服务地点">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请选择服务地点'}],
                        })(
                            <Select placeholder={"请选择服务地点"}>
                                <Option value={'0'}>0</Option>
                                <Option value={'1'}>1</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="备注">
                        {getFieldDecorator('description', {})(
                            <TextArea placeholder={"请输入备注"} rows={4}/>
                        )}
                    </Form.Item>
                    <Form.Item label="服务人员">
                        {getFieldDecorator('attendant', {
                            rules: [{required: true, message: '请选择服务人员'}],
                        })(
                            <Select placeholder={"请选择服务人员"}>
                                <Option value={'0'}>0</Option>
                                <Option value={'1'}>1</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Scrollbars>
        </BaseFormWrapper>
    );
};

const WrappedBaseForm = Form.create<BaseFormProps>()(BaseForm);
export {
    WrappedBaseForm
};
import React from 'react';
import {
    Form,
    Input,
    Select,
} from 'antd';
import {FormComponentProps} from "antd/lib/form";

const {Option} = Select;

interface UserTypeFormProps extends FormComponentProps {
    data?: any;
}

const UserTypeForm: React.ComponentType<UserTypeFormProps> = (props: UserTypeFormProps) => {
    const {getFieldDecorator} = props.form;
    const formItemLayout: any = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
        style: {
            paddingTop: '20px'
        }
    };

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"用户类型"}>
                {getFieldDecorator('subject', {
                    rules: [{required: true, message: '请输入名称'}],
                })(
                    <Input
                        placeholder="请输入名称"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"设备组"}>
                {getFieldDecorator('meeting', {
                    rules: [{required: true, message: '请选择设备组'}],
                    initialValue: ""
                })(
                    <Select placeholder={"请选择设备组"}>
                        <Option value={"1"}>1</Option>
                    </Select>
                )}
            </Form.Item>
        </Form>
    );
};

const WrappedUserTypeForm = Form.create<UserTypeFormProps>()(UserTypeForm);

export {
    WrappedUserTypeForm
};

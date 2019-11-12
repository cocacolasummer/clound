import React, {useState} from 'react';
import {
    Form, Icon,
    Input,
    Select, Upload
} from 'antd';
import {FormComponentProps} from "antd/lib/form";

const {Option} = Select;

const UserBlackForm: React.ComponentType<FormComponentProps> = (props: FormComponentProps) => {
    const [fileList, setFileList] = useState([]);
    const {getFieldDecorator} = props.form;
    const formItemLayout = {
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
    const normFile = (e: any): any => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        e && setFileList(e.fileList);
        return e && e.fileList;
    };

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"证件号码"}>
                {getFieldDecorator('code', {
                    rules: [{required: true, message: '请输入证件号码'}],
                })(
                    <Input
                        placeholder="请输入证件号码"
                    />,
                )}
            </Form.Item>
            <Form.Item label="人员照片">
                {getFieldDecorator('image', {
                    rules: [{required: true, message: '请选上传人员照片'}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" listType="picture-card" action="/upload.do">
                        {fileList.length === 1 ? null : <div>
                            <Icon type="plus"/>
                            <div className="ant-upload-text">上传图片</div>
                        </div>}
                    </Upload>
                )}
            </Form.Item>
            <Form.Item label={"员工姓名"}>
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请选择设员工'}],
                })(
                    <Select placeholder={"请选择设员工"}>
                        <Option value={"1"}>1</Option>
                    </Select>
                )}
            </Form.Item>
        </Form>
    );
};

const WrappedUserBlackForm = Form.create<FormComponentProps>()(UserBlackForm);

export {
    WrappedUserBlackForm
};

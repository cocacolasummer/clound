import React, {useState, useEffect} from 'react';
import {
    Form, Icon,
    Input,
    Upload,
    Select
} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import TimePickerRange from '@/component/timeRange';
import moment from "moment";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface AccessManageEditorFormProps extends FormComponentProps {
    data?: any;
    setPropsForm: (form: WrappedFormUtils) => void;
}

const {Option} = Select;
const AccessManageEditorForm: React.ComponentType<AccessManageEditorFormProps> = (props: AccessManageEditorFormProps) => {
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
    useEffect(() => {
        props.setPropsForm(props.form);
    }, [props]);
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
            <Form.Item label={"设备名称"}>
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入设备组名称'}],
                })(
                    <Input
                        placeholder="请输入名称"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"设备组"}>
                {getFieldDecorator('group', {
                    rules: [{required: true, message: '请选择是否抓拍'}],
                    initialValue: "lucy"
                })(
                    <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={"通行类型"}>
                {getFieldDecorator('passType', {
                    rules: [{required: true, message: '请选择通行类型'}],
                    initialValue: ["lucy"]
                })(
                    <Select mode="multiple">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={"周一时段"}>
                {getFieldDecorator('monday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周二时段"}>
                {getFieldDecorator('tuesday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周三时段"}>
                {getFieldDecorator('wednesday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周四时段"}>
                {getFieldDecorator('thursday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周五时段"}>
                {getFieldDecorator('friday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周六时段"}>
                {getFieldDecorator('saturday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周日时段"}>
                {getFieldDecorator('sunday', {
                    rules: [{required: true, message: '请选择通行时间'}],
                    initialValue: {start: moment('02:00:00', 'HH:mm:ss'), end: moment('23:00:00', 'HH:mm:ss')}
                })(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label="封面图片">
                {getFieldDecorator('image', {
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
        </Form>
    );
};

const WrappedAccessManageForm = Form.create<AccessManageEditorFormProps>()(AccessManageEditorForm);

export {
    WrappedAccessManageForm
};

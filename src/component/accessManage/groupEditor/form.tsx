import React, {useState} from 'react';
import {
    Form, Icon,
    Input,
    Radio, Upload
} from 'antd';

const {TextArea} = Input;
import {FormComponentProps} from "antd/lib/form";
import {warningModal} from "@/util/golbalModalMessage";
import {getBase64, isImage} from "@/util/antdUploadGetBase64";
import Viewer from "viewerjs";

interface AccessGroupEditorFormProps extends FormComponentProps {
    data?: any;
}

const AccessGroupEditorForm: React.ComponentType<AccessGroupEditorFormProps> = (props: AccessGroupEditorFormProps) => {
    let viewer: Viewer | undefined;
    const [bgFileList, setBgFileList] = useState([]);
    const [fileList, setfileList] = useState([]);

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
    const bgNormFile = (e: any): any => {
        if (!isImage(e.file.type)) {
            warningModal(`文件格式${e.file.type}不是支持的类型`, '只能上传图片文件');
            e && setBgFileList(e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid));
            return e && e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid);
        }
        if (Array.isArray(e)) {
            return e;
        }
        e && setBgFileList(e.fileList);
        return e && e.fileList;
    };
    const normFile = (e: any): any => {

        if (!isImage(e.file.type)) {
            warningModal(`文件格式${e.file.type}不是支持的类型`, '只能上传图片文件');
            e && setfileList(e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid));
            return e && e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid);
        }
        if (Array.isArray(e)) {
            return e;
        }
        e && setfileList(e.fileList);
        return e && e.fileList;
    };

    const handlePreview = async(file: any) => {
        if (!file.url) {
            const preview: any = await getBase64(file.originFileObj);
            const img = document.createElement('img');
            img.alt = file.name;
            img.src = preview;
            viewer && viewer.destroy();
            viewer = new Viewer(img);
            viewer.view();
        } else {
            const img = document.createElement('img');
            img.alt = file.name;
            img.src = file.url;
            viewer && viewer.destroy();
            viewer = new Viewer(img);
            viewer.view();
        }
    };

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"设备组名称"}>
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入设备组名称'}],
                })(
                    <Input
                        placeholder="请输入名称"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"是否抓拍"}>
                {getFieldDecorator('isSnapshot', {
                    rules: [{required: true, message: '请选择是否抓拍'}],
                    initialValue: "0"
                })(
                    <Radio.Group>
                        <Radio value={"1"}>是</Radio>
                        <Radio value={"0"}>否</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label={"设备组描述"}>
                {getFieldDecorator('description', {})(
                    <TextArea rows={4}/>
                )}
            </Form.Item>
            <Form.Item label="封面图片">
                {getFieldDecorator('image', {
                    valuePropName: 'fileList',
                    getValueFromEvent: bgNormFile,
                })(
                    <Upload name="logo" onPreview={handlePreview} listType="picture-card" action="/upload.do">
                        {bgFileList.length === 1 ? null : <div>
                            <Icon type="plus"/>
                            <div className="ant-upload-text">上传图片</div>
                        </div>}
                    </Upload>
                )}
            </Form.Item>
            <Form.Item label="背景图片">
                {getFieldDecorator('bgimage', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="logo" onPreview={handlePreview} listType="picture-card" action="/upload.do">
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

const WrappedAccessGroupForm = Form.create<AccessGroupEditorFormProps>()(AccessGroupEditorForm);

export {
    WrappedAccessGroupForm
};

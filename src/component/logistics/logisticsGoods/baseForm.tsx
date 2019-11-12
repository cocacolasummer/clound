import React, {useState} from 'react';
import {Form, Select, Input, Upload, Icon} from "antd";

const {Option} = Select;
import {FormComponentProps} from "antd/lib/form";
import {
    BaseFormWrapper
} from '@/component/logistics/logisticsEditor/ui';
import {Scrollbars} from "react-custom-scrollbars";
import {getBase64, isImage} from "@/util/antdUploadGetBase64";
import {warningModal} from "@/util/golbalModalMessage";
import Viewer from "viewerjs";

interface BaseFormProps extends FormComponentProps {
    propsSetBaseForm?: any;
}

const BaseForm: React.ComponentType<BaseFormProps> = (props: BaseFormProps) => {
    let viewer: Viewer | undefined;
    const [bgFileList, setBgFileList] = useState([]);
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

    const {getFieldDecorator} = props.form;

    const bgNormFile = (e: any): any => {
        if (!isImage(e.file.type)) {
            warningModal('只能上传图片文件', `文件格式${e.file.type}不是支持的类型`);
            e && setBgFileList(e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid));
            return e && e.fileList.filter((fileItem: any) => e.file.uid !== fileItem.uid);
        }
        if (Array.isArray(e)) {
            return e;
        }
        e && setBgFileList(e.fileList);
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
        <BaseFormWrapper>
            <Scrollbars>
                <Form {...formItemLayout}>
                    <Form.Item label="物品分类">
                        {getFieldDecorator('classify', {
                            rules: [{required: true, message: '请选择物品分类'}],
                        })(
                            <Select placeholder={"请选择物品分类"}>
                                <Option value={'0'}>0</Option>
                                <Option value={'1'}>1</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="物品名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入物品名称'}],
                        })(
                            <Input placeholder={"请输入物品名称"}/>
                        )}
                    </Form.Item>
                    <Form.Item label="物品价格">
                        {getFieldDecorator('price', {
                            rules: [{required: true, message: '请输入物品价格'}],
                        })(
                            <Input placeholder={"请输入物品价格"}/>
                        )}
                    </Form.Item>
                    <Form.Item label="物品图片">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: bgNormFile,
                            rules: [{required: true, message: '请上传物品图片'}],
                        })(
                            <Upload name="logo" onPreview={handlePreview} listType="picture-card" action="/upload.do">
                                {bgFileList.length === 4 ? null : <div>
                                    <Icon type="plus"/>
                                    <div className="ant-upload-text">上传图片{`(${bgFileList.length}/4)`}</div>
                                </div>}
                            </Upload>
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

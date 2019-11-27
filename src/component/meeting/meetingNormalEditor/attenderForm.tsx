import React, { useEffect, useRef, useState, Fragment } from 'react';
import { useMappedState } from "redux-react-hook";

import { funTransitionHeight } from '@/util/animateUtil';

import { IState } from "@/store";

import UploadFileServices from '@/services/uploadFileServices';

const _uploadFileServices = new UploadFileServices();

const mapEditorState = (state: IState) => {
    return {
        isEdit: state.MeetingEditor.isEdit,
        id: state.MeetingEditor.id,
        data: state.MeetingEditor.data,
        userList: state.MeetingEditor.userList,
        roomList: state.MeetingEditor.roomList
    };
};

import {
    Button,
    Form, Icon, Input, Popconfirm,
    TreeSelect, Upload
} from 'antd';
import {error, success} from "@/util/golbalModalMessage";

import {
    FormWrapper,
    FormItemHeader,
    FormItemTitle,
    FormContent,
    ExteriorWrapper,
    ExteriorClose
} from './ui';
import { CrowClose } from "@/baseUI/Crow";
import { CSSTransition } from "react-transition-group";
import { FormComponentProps } from "antd/lib/form";

interface MeetingAttenderFormProps extends FormComponentProps {
    propsSetAttenderForm: any;
}

function MeetingAttenderForm(props: MeetingAttenderFormProps) {
    const attenderWrapper: any = useRef(null);
    const [exteriorList, setExteriorList] = useState<any[]>([]);
    const [showContent, setShowContent] = useState<boolean>(true);
    const [attenderState, setAttenderState] = useState();
    const [fileListState, setFileListState] = useState<any[]>([]);

    useEffect(() => {
        funTransitionHeight(attenderWrapper.current, 0.8);
    }, [showContent, exteriorList, attenderState]);

    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(attenderWrapper.current, 0.8);
        }, 1500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(attenderWrapper.current, 0.8);
        }, 150);
    }, [fileListState]);

    const {
        userList,
        data
    } = useMappedState(mapEditorState);

    const tProps = {
        treeData: userList,
        treeCheckable: true,
        searchPlaceholder: '请选择人员'
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        setFileListState(e.fileList);
        return e && e.fileList;
    };
    useEffect(() => {
        if (data && data.detail && data.detail.external) {
            setExteriorList(data.detail.external);
        }
    }, [data]);

    useEffect(() => {
        props.propsSetAttenderForm(props.form);
    });
    const { getFieldDecorator } = props.form;

    const formItemLayout: object = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const removeExterior = (index: number): void => {
        const newExterior = exteriorList.slice();
        newExterior.splice(index, 1);
        setExteriorList(newExterior);
    };

    const addExterior = () => {
        const newExterior = exteriorList.slice();
        newExterior.push({});
        setExteriorList(newExterior);
    };

    const ExteriorListItems = exteriorList.map((item, index) => {
        return (
            <Fragment key={index}>
                <CSSTransition
                    in={true}
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                >
                    <ExteriorWrapper>
                        <ExteriorClose>
                            <Popconfirm title={`确定删除吗？`} onConfirm={() => removeExterior(index)}>
                                <Button icon={'delete'} shape={'circle'} />
                            </Popconfirm>
                        </ExteriorClose>
                        <Form.Item label="姓名">
                            {getFieldDecorator(`exterior[${index}.user_name]`, {
                                initialValue: item.user_name,
                                rules: [{ required: true, message: '请输入姓名' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="联系方式">
                            {getFieldDecorator(`exterior[${index}.mobile]`, {
                                initialValue: item.mobile,
                                rules: [{ required: true, message: '请输入联系方式' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator(`exterior[${index}.email]`, {
                                initialValue: item.email,
                                rules: [{ required: true, message: '请输入邮箱' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </ExteriorWrapper>
                </CSSTransition>
            </Fragment>
        );
    });

    return (
        <FormWrapper ref={attenderWrapper}>
            <FormItemHeader>
                <FormItemTitle>参会人员</FormItemTitle>
                <CrowClose>
                    <Button size={"small"} onClick={(e) => setShowContent(!showContent)}
                        shape="circle"
                        icon={showContent ? "up" : "down"} />
                </CrowClose>
            </FormItemHeader>
            <FormContent isShow={showContent}>
                <Form {...formItemLayout}>
                    <Form.Item label="参会人员">
                        {getFieldDecorator('attend', {
                            initialValue: data && data.detail && data.detail.attender.map((item: any) => `${item.user_id}:salt`),
                            rules: [{ required: true, message: '请选择参会人员' }],
                        })(
                            <TreeSelect onChange={(value) => setAttenderState(value)} {...tProps} />
                        )}
                    </Form.Item>
                    <Form.Item label="导入人员" extra="请按照指定的模板导入联系人">
                        {getFieldDecorator('file', {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        })(
                            <Upload name="logo" showUploadList={false} customRequest={(e: any) => {
                                const formData = new FormData();
                                formData.set("file", e.file);
                                _uploadFileServices.meetingImportUsers({
                                    data: formData
                                }, (res: any) => {
                                    const newExterior = exteriorList.slice();
                                    res.data.map((item: any) => {
                                        newExterior.push(item);
                                    });
                                    setExteriorList(newExterior);
                                    e.onSuccess(res);
                                    success('导入外部联系人成功！')
                                }, (err: any) => {
                                    e.onError(err);
                                    error(err.message)
                                });
                                }} listType="picture">
                                <Button>
                                    <Icon type="upload" /> 上传文件
                                </Button>
                            </Upload>
                        )}
                        <a title="外部联系人导入模板" href="/file/外部联系人导入表.xlsx" style={{ right: '-200px', position: 'absolute', top: '-7px' }}>外部联系人模板</a>
                    </Form.Item>
                    {ExteriorListItems}
                    <Button type="dashed"
                        onClick={() => addExterior()}
                        style={{ width: '380px', marginLeft: '50px', marginBottom: '20px' }}>
                        <Icon type="plus" />添加外部人员
                    </Button>
                </Form>
            </FormContent>
        </FormWrapper>
    );
}

const WrappedAttenderForm = Form.create<MeetingAttenderFormProps>()(MeetingAttenderForm);

export {
    WrappedAttenderForm
};
import React, {useEffect, useRef, useState, Fragment} from 'react';
import {useMappedState} from "redux-react-hook";

import {funTransitionHeight} from '@/util/animateUtil';

import {IState} from "@/store";

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

import {
    FormWrapper,
    FormItemHeader,
    FormItemTitle,
    FormContent,
    ExteriorWrapper,
    ExteriorClose
} from './ui';
import {CrowClose} from "@/baseUI/Crow";
import {CSSTransition} from "react-transition-group";
import {FormComponentProps} from "antd/lib/form";

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
    const {getFieldDecorator} = props.form;

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
                                <Button icon={'delete'} shape={'circle'}/>
                            </Popconfirm>
                        </ExteriorClose>
                        <Form.Item label="姓名">
                            {getFieldDecorator(`exterior[${index}.name]`, {
                                initialValue: item.name
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="联系方式">
                            {getFieldDecorator(`exterior[${index}.phone]`, {
                                initialValue: item.phone
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator(`exterior[${index}.email]`, {
                                initialValue: item.email
                            })(
                                <Input/>
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
                            icon={showContent ? "up" : "down"}/>
                </CrowClose>
            </FormItemHeader>
            <FormContent isShow={showContent}>
                <Form {...formItemLayout}>
                    <Form.Item label="参会人员">
                        {getFieldDecorator('attend', {
                            initialValue: data && data.detail && data.detail.attender.map((item: any) => `${item.user_id}:salt`),
                            rules: [{required: true, message: '请选择参会人员'}],
                        })(
                            <TreeSelect onChange={(value) => setAttenderState(value)} {...tProps}/>
                        )}
                    </Form.Item>
                    <Form.Item label="导入人员" extra="请按照指定的模板导入联系人">
                        {getFieldDecorator('file', {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        })(
                            <Upload name="logo" listType="picture">
                                <Button>
                                    <Icon type="upload"/> 上传文件
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    {ExteriorListItems}
                    <Button type="dashed"
                            onClick={() => addExterior()}
                            style={{width: '380px', marginLeft: '50px', marginBottom: '20px'}}>
                        <Icon type="plus"/>添加外部人员
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
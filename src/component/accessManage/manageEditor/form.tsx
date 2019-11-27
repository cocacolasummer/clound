import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import { FormComponentProps } from "antd/lib/form";

import { WrappedFormUtils } from "antd/lib/form/Form";

import { useDispatch, useMappedState } from "redux-react-hook";
import { IState } from '@/store';
import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();

import { error } from '@/util/golbalModalMessage';

interface AccessManageEditorFormProps extends FormComponentProps {
    data?: any;
    setPropsForm: (form: WrappedFormUtils) => void;
}

const { Option } = Select;

const AccessManageEditorForm: React.ComponentType<AccessManageEditorFormProps> = (props: AccessManageEditorFormProps) => {
    const mapState = (state: IState): {
        roomdata: any[];
        grouplist: any[];
    } => {
        return {
            roomdata: state.AccessManageEditor.roomdata,
            grouplist: state.AccessManageEditor.grouplist,
        };
    };
    const dispatch = useDispatch();
    const {
        roomdata,
        grouplist
    } = useMappedState(mapState);
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        style: {
            paddingTop: '20px'
        }
    };
    useEffect(() => {
        props.setPropsForm(props.form);
    }, [props]);

    useEffect(() => {
        _accessServices.allDeviceGroup((res: any) => {
            dispatch({
                type: 'change accessManageEditor grouplist',
                grouplist: res.data
            });
        }, () => {
            error('错误！');
        });
    }, [dispatch]);

    useEffect(() => {
        _accessServices.meetingroom((res: any) => {
            dispatch({
                type: 'change accessManageEditor roomdata',
                roomdata: res.data[0]
            });
        }, () => {
            error('错误！');
        });
    }, [dispatch]);

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"设备名称"}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入设备名称' }],
                })(
                    <Input
                        placeholder="请输入名称"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"设备组"}>
                {getFieldDecorator('group', {
                    rules: [{ required: true, message: '请选择设备组' }],
                    initialValue: []
                })(
                    <Select mode="multiple">
                        {
                            grouplist.map((item, index) => {
                                return (
                                    <Option value={item.id} key={index}>{item.name}</Option>
                                );
                            })
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={"设备序列号"}>
                {getFieldDecorator('mac', {
                    rules: [{ required: true, message: '请输入设备序列号' }],
                })(
                    <Input
                        placeholder="请输入设备序列号"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"门禁地点"}>
                {getFieldDecorator('room', {
                    rules: [{ required: true, message: '请选择地点' }],
                    initialValue: ''
                })(
                <Select>
                    {
                        roomdata.map((item, index) => {
                            return (
                                <Option value={item.id} key={index}>{item.name}</Option>
                            );
                        })
                    }
                </Select>
                )}
            </Form.Item>
        </Form>
    );
};

const WrappedAccessManageForm = Form.create<AccessManageEditorFormProps>()(AccessManageEditorForm);

export {
    WrappedAccessManageForm
};

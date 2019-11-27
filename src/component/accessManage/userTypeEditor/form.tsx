import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Select,
} from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import TimePickerRange from '@/component/timeRange';

const { Option } = Select;

import { useDispatch, useMappedState } from "redux-react-hook";
import { IState } from '@/store';
import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();

import { error } from '@/util/golbalModalMessage';
interface UserTypeFormProps extends FormComponentProps {
    data?: any;
    setPropsForm: (form: WrappedFormUtils) => void;
}

const UserTypeForm: React.ComponentType<UserTypeFormProps> = (props: UserTypeFormProps) => {
    const mapState = (state: IState): {
        grouplist: any[];
    } => {
        return {
            grouplist: state.AccessManageEditor.grouplist,
        };
    };
    const {
        grouplist
    } = useMappedState(mapState);
    const dispatch = useDispatch();
    const { getFieldDecorator } = props.form;

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
    const formItemLayout: any = {
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

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"用户类型"}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称' }],
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
            <Form.Item label={"通行类型"}>
                {getFieldDecorator('passType', {
                    rules: [{ required: true, message: '请选择通行类型' }],
                    initialValue: []
                })(
                    <Select mode="multiple">
                          <Option value="1" key="0">人脸识别</Option>
                          <Option value="2" key="1">刷卡</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={"周一时段"}>
                {getFieldDecorator('monday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周二时段"}>
                {getFieldDecorator('tuesday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周三时段"}>
                {getFieldDecorator('wednesday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周四时段"}>
                {getFieldDecorator('thursday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周五时段"}>
                {getFieldDecorator('friday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周六时段"}>
                {getFieldDecorator('saturday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
            <Form.Item label={"周日时段"}>
                {getFieldDecorator('sunday', {})(
                    <TimePickerRange/>
                )}
            </Form.Item>
        </Form>
    );
};

const WrappedUserTypeForm = Form.create<UserTypeFormProps>()(UserTypeForm);

export {
    WrappedUserTypeForm
};

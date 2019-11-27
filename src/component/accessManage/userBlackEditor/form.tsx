import React, {useEffect} from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";
import {
    Form,
    Select, 
    TreeSelect
} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";

import { IState } from "@/store";

const {Option} = Select;

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { error } from '@/util/golbalModalMessage';

interface UserBlackFormProps extends FormComponentProps {
    data?: any;
    setPropsForm: (form: WrappedFormUtils) => void;
}

const mapEditorState = (state: IState) => {
    return {
        userList: state.AccessUserBlackEditor.userList,
        devices: state.AccessUserBlackEditor.devices,
    };
};

const UserBlackForm: React.ComponentType<UserBlackFormProps> = (props: UserBlackFormProps) => {
    const {getFieldDecorator} = props.form;
    const dispatch = useDispatch();
    const {
        userList,
        devices
    } = useMappedState(mapEditorState);

    useEffect(() => {
        props.setPropsForm(props.form);
    }, [props]);

    useEffect(() => {
        _accessServices.allDevice((res: any) => {
            dispatch({
                type: 'change accessUserBlackEditor devices',
                devices: res.data
            });
        }, () => {
            error('错误！');
        });
    }, [dispatch]);

    useEffect(() => {
        _accessServices.getResUserList((res: any) => {
            dispatch({
                type: 'change accessUserBlackEditor userList',
                userList: res
            });
        }, () => {

        });
    }, [dispatch]);

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
    const tProps = {
        treeData: userList,
        treeCheckable: true,
        searchPlaceholder: '请选择人员'
    };

    return (
        <Form {...formItemLayout}>
            <Form.Item label="指定人员">
                        {getFieldDecorator('users', {
                            initialValue: [],
                            rules: [{ required: true, message: '请选择人员' }],
                        })(
                            <TreeSelect  {...tProps} />
                        )}
                    </Form.Item>
            <Form.Item label={"指定设备"}>
                    {getFieldDecorator('devices', {
                        rules: [{required: true, message: '请选择设备'}],
                    })(
                        <Select mode="multiple" placeholder={"请选择设备"}>
                        {
                            devices.map((item, index) => {
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

const WrappedUserBlackForm = Form.create<UserBlackFormProps>()(UserBlackForm);

export {
    WrappedUserBlackForm
};

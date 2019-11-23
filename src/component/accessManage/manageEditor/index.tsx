import React, {Fragment} from 'react';
import {CSSTransition} from "react-transition-group";

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowFooter,
    CrowContent
} from '@/baseUI/Crow';
import {Button} from "antd";

import {WrappedAccessManageForm} from './form';
import {Scrollbars} from "react-custom-scrollbars";
import {WrappedFormUtils} from "antd/lib/form/Form";

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();

import {error, success} from "@/util/golbalModalMessage";

interface AccessManageEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const AccessManageEditor: React.ComponentType<AccessManageEditorProps> = (props: AccessManageEditorProps) => {
    let propsForm: WrappedFormUtils;
    const setPropsForm = (form: WrappedFormUtils): void => {
        propsForm = form;
    };
    const saveAccessManage = (): void => {
        propsForm.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
                _accessServices.deviceAdd({
                    id: '',
                    name: values.name,
                    mac: values.mac,
                    groupId: values.group.join(','),
                    position_id: values.room,
                    position_name: '',
                }, (res: any) => {
                    props.close();
                    success('添加设备成功');
                }, (err: any) => {
                    error(err && err.message ? err.message : err.toString());
                })
            }
        });
    };
    return (
        <Fragment>
            <CSSTransition
                in={props.show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={(): void => props.unmount()}
            >
                <CrowWrapper>
                    <Fragment>
                        <CSSTransition
                            in={props.show}
                            timeout={1000}
                            unmountOnExit
                            appear={true}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>添加设备</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                                        <WrappedAccessManageForm
                                            setPropsForm={(form: WrappedFormUtils): void => setPropsForm(form)}/>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"} onClick={(): void => saveAccessManage()}>保存</Button>
                                </CrowFooter>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    AccessManageEditor
};
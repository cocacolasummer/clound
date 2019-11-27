import React, {Fragment} from 'react';

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

import {WrappedUserTypeForm} from './form';
import {CSSTransition} from "react-transition-group";
import {WrappedFormUtils} from "antd/lib/form/Form";

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();

import {error, success} from "@/util/golbalModalMessage";

interface UserTypeEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const UserTypeEditor: React.ComponentType<UserTypeEditorProps> = (props: UserTypeEditorProps) => {
    let propsForm: WrappedFormUtils;
    const setPropsForm = (form: WrappedFormUtils): void => {
        propsForm = form;
    };
    const saveusrType = (): void => {
        propsForm.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
                const time = {
                    "monday": `${values.monday ? values.monday.startstr : '00:00:00'}-${values.monday ? values.monday.endstr : '23:59:59'}`,
                    "tuesday": `${values.tuesday ? values.tuesday.startstr : '00:00:00'}-${values.tuesday ? values.tuesday.endstr : '23:59:59'}`,
                    "wednesday": `${values.wednesday ? values.wednesday.startstr : '00:00:00'}-${values.wednesday ? values.wednesday.endstr : '23:59:59'}`,
                    "thursday": `${values.thursday ? values.thursday.startstr : '00:00:00'}-${values.thursday ? values.thursday.endstr : '23:59:59'}`,
                    "friday": `${values.friday ? values.friday.startstr : '00:00:00'}-${values.friday ? values.friday.endstr : '23:59:59'}`,
                    "saturday": `${values.saturday ? values.saturday.startstr : '00:00:00'}-${values.saturday ? values.saturday.endstr : '23:59:59'}`,
                    "weekday": `${values.weekday ? values.weekday.startstr : '00:00:00'}-${values.weekday ? values.weekday.endstr : '23:59:59'}`,
                };
                _accessServices.groupAdd({
                    id: '',
                    name: values.name,
                    deviceGroup: values.group.join(','),
                    passType: values.passType.join(','),
                    passTime: JSON.stringify(time) 
                }, (res: any) => {
                    props.close();
                    success('添加用户组成功');
                }, (err: any) => {
                    error(err && err.message ? err.message : err.toString());
                });
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
                                    <CrowTitle>添加用户类型</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <WrappedUserTypeForm
                                    setPropsForm={(form: WrappedFormUtils): void => setPropsForm(form)}/>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"} onClick={(): void => saveusrType()}>保存</Button>
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
    UserTypeEditor
};
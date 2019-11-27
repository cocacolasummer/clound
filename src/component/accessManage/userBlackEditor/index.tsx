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

import {WrappedUserBlackForm} from './form';
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CSSTransition} from "react-transition-group";
import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import {error, success} from "@/util/golbalModalMessage";

interface AccessUserBlackEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const AccessUserBlackEditor: React.ComponentType<AccessUserBlackEditorProps> = (props: AccessUserBlackEditorProps) => {
    let propsForm: WrappedFormUtils;
    const setPropsForm = (form: WrappedFormUtils): void => {
        propsForm = form;
    };

    const saveblack = (): void => {
        propsForm.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
                const users=values.users.map((item: string): string => {
                    return item.split(':')[0];
                });
                _accessServices.addBlack({
                    id: '',
                    userIds: users.join(','),
                    deviceIds: values.devices.join(','),
                }, (res: any) => {
                    props.close();
                    success('添加黑名单成功');
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
                                    <CrowTitle>添加黑名单</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <WrappedUserBlackForm 
                                     setPropsForm={(form: WrappedFormUtils): void => setPropsForm(form)}/>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"} onClick={(): void => saveblack()}>保存</Button>
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
    AccessUserBlackEditor
};
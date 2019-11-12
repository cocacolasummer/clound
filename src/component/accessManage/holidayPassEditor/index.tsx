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

import {WrappedAccessHolidayPassForm} from './form';
import {Scrollbars} from "react-custom-scrollbars";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface AccessHolidayPassEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const AccessHolidayPassEditor: React.ComponentType<AccessHolidayPassEditorProps> = (props: AccessHolidayPassEditorProps) => {
    let propsForm: WrappedFormUtils;
    const setPropsForm = (form: WrappedFormUtils): void => {
        propsForm = form;
    };
    const saveAccessManage = (): void => {
        propsForm.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
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
                                    <CrowTitle>添加假期通行</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                                        <WrappedAccessHolidayPassForm
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
    AccessHolidayPassEditor
};
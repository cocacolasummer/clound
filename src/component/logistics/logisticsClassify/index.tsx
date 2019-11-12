import React, {Fragment} from 'react';
import {CSSTransition} from "react-transition-group";
import {WrappedClassifyForm} from './form';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowFooterNoPading,
    CrowContent
} from '@/baseUI/Crow';

import {Button} from "antd";
import Scrollbars from "react-custom-scrollbars";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface LogisticsClassifyProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const LogisticsClassify: React.ComponentType<LogisticsClassifyProps> = (props: LogisticsClassifyProps) => {

    let formWrap: WrappedFormUtils;
    const setForm = (form: WrappedFormUtils): void => {
        formWrap = form;
    };

    const saveClassify = (): void => {
        formWrap.validateFields((err: any, values: any) => {
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
                                    <CrowTitle>物品分类</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars>
                                        <WrappedClassifyForm setForm={(form: WrappedFormUtils): void => setForm(form)}/>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooterNoPading>
                                    <Button type={"primary"} onClick={(): void => saveClassify()}>保存</Button>
                                </CrowFooterNoPading>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    LogisticsClassify
};

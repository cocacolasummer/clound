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

import {WrappedAccessGroupForm} from './form';

interface AccessGroupEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const AccessGroupEditor: React.ComponentType<AccessGroupEditorProps> = (props: AccessGroupEditorProps) => {
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
                                    <CrowTitle>添加设备组</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <WrappedAccessGroupForm/>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"}>保存</Button>
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
    AccessGroupEditor
};
import React, {Fragment} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import Viewer from 'viewerjs';
import {
    Tabs,
    Button
} from "antd";

import {
    ModelOne
} from '@/assert/img/seat';

import {
    SeatImgItem
} from './ui';

const {TabPane} = Tabs;

import {
    CrowWrapper,
    CrowMiddleLarge,
    CrowMidLargeContent,
    CrowFooter
} from '@/baseUI/Crow';
import {CSSTransition} from "react-transition-group";

interface MeetingSeatProps {
    show: boolean;
    closeFn: () => void;
    unmountFn: () => void;
}

const MeetingSeat: React.ComponentType<MeetingSeatProps> = (props: MeetingSeatProps) => {
    let viewer: Viewer | undefined;

    const imgPreview = (url: string, title: string) => {
        const img = document.createElement('img');
        img.alt = title;
        img.src = url;
        viewer && viewer.destroy();
        viewer = new Viewer(img);
        viewer.view();
    };
    return (
        <Fragment>
            <CSSTransition
                in={props.show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => props.unmountFn()}
            >
                <CrowWrapper>
                    <Fragment>
                        <CSSTransition
                            in={props.show}
                            timeout={1000}
                            unmountOnExit
                            appear={true}
                        >
                            <CrowMiddleLarge>
                                <CrowMidLargeContent>
                                    <Tabs defaultActiveKey="1">
                                        {[...Array(30).keys()].map((i) => (
                                            <TabPane tab={`第${i + 1}议程`} key={i.toString()}>
                                                <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                                                    <SeatImgItem draggable={false}
                                                                 onClick={() => {
                                                                     imgPreview(ModelOne, `第${i + 1}议程`);
                                                                 }}
                                                                 src={ModelOne} alt=""/>
                                                </Scrollbars>
                                            </TabPane>
                                        ))}
                                    </Tabs>
                                </CrowMidLargeContent>
                                <CrowFooter>
                                    <Button type={'primary'} onClick={() => props.closeFn()}>关闭</Button>
                                </CrowFooter>
                            </CrowMiddleLarge>
                        </CSSTransition>
                    </Fragment>
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    MeetingSeat
};
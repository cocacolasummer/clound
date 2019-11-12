import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {WrappedBaseForm} from './baseForm';
import {GoodsList} from './goodsList';
import {Cart} from "./cart";
import {AnimateBall} from './animateBall';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowFooterNoPading,
    CrowHiddenContent
} from '@/baseUI/Crow';
import {
    FormTabs,
    FormTabsItem,
    FormTabsItemLine,
    FormTabContent
} from './ui';
import {Button} from "antd";

interface LogisticsEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

enum TabsKey {
    BASE,
    GOODS
}

const LogisticsEditor: React.ComponentType<LogisticsEditorProps> = (props: LogisticsEditorProps) => {
    const [tabsKey, setTabsKey] = useState(TabsKey.BASE);
    const [balls, setBalls] = useState<any[]>([]);
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
                                    <CrowTitle>发起后勤</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowHiddenContent>
                                    <FormTabs>
                                        <FormTabsItem type={tabsKey === TabsKey.BASE ? 'active' : ''}
                                                      onClick={() => setTabsKey(TabsKey.BASE)}>基本信息</FormTabsItem>
                                        <FormTabsItem type={tabsKey === TabsKey.GOODS ? 'active' : ''}
                                                      onClick={() => setTabsKey(TabsKey.GOODS)}>后勤物品</FormTabsItem>
                                        <FormTabsItemLine index={tabsKey}/>
                                    </FormTabs>
                                    <FormTabContent index={tabsKey}>
                                        <WrappedBaseForm/>
                                        <GoodsList
                                            addAnimate={(startX: number, startY: number, endX: number, endY: number) => {
                                                const tmpBalls = balls.slice();
                                                if (tmpBalls.length === 0) {
                                                    tmpBalls.push(<AnimateBall key={tmpBalls.length}
                                                                               startX={startX}
                                                                               startY={startY}
                                                                               endX={endX}
                                                                               index={tmpBalls.length}
                                                                               endY={endY} onComplete={(index) => {
                                                        const tmpBallsDel = balls.slice();
                                                        tmpBallsDel.splice(index, 1);
                                                        setBalls(tmpBallsDel);
                                                    }}/>);
                                                    setBalls(tmpBalls);
                                                }
                                            }}/>
                                    </FormTabContent>
                                </CrowHiddenContent>
                                <CrowFooterNoPading>
                                    <Cart/>
                                </CrowFooterNoPading>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                    {balls}
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    LogisticsEditor
};

import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {GoodsList} from '@/component/logistics/logisticsEditor/goodsList';
import {WrappedBaseForm} from './baseForm';
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
} from '@/component/logistics/logisticsEditor/ui';
import {Button} from "antd";

interface LogisticsGoodsProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

enum TabsKey {
    BASE,
    GOODS
}

const LogisticsGoods: React.ComponentType<LogisticsGoodsProps> = (props: LogisticsGoodsProps) => {
    const [tabsKey, setTabsKey] = useState(TabsKey.BASE);
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
                                                      onClick={(): void => setTabsKey(TabsKey.BASE)}>后勤物品</FormTabsItem>
                                        <FormTabsItem type={tabsKey === TabsKey.GOODS ? 'active' : ''}
                                                      onClick={(): void => setTabsKey(TabsKey.GOODS)}>创建物品</FormTabsItem>

                                        <FormTabsItemLine index={tabsKey}/>
                                    </FormTabs>
                                    <FormTabContent index={tabsKey}>
                                        <GoodsList isManage={true}/>
                                        <WrappedBaseForm/>
                                    </FormTabContent>
                                </CrowHiddenContent>
                                <CrowFooterNoPading>
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
    LogisticsGoods
};

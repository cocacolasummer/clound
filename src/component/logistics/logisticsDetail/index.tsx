import React, {Fragment} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {CSSTransition} from 'react-transition-group';

import {Avatar, Button} from 'antd';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowContent,
    CrowFooterNoPading
} from '@/baseUI/Crow';
import {
    DetailBaseContent,
    DetailBaseItem,
    DetailBaseItemContent,
    DetailBaseLabel, DetailBaseUser,
} from "@/component/meeting/meetingDetail/ui";
import {ImgAddress, ImgDescription, ImgTime, ImgUser} from "@/assert/img/meeting/detail";
import {
    GoodsListWrapper,
    GoodsListItem,
    GoodsListItemImg,
    GoodsListItemInfo,
    GoodsListItemName,
    GoodsListItemPrice,
    GoodsListItemCount,
    GoodsDetailTotal,
    GoodsDetailCount
} from './ui';

interface LogisticsDetailProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const LogisticsDetail: React.ComponentType<LogisticsDetailProps> = (props: LogisticsDetailProps) => {

    return (
        <Fragment>
            <CSSTransition
                in={props.show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => {
                }}
            >
                <CrowWrapper>
                    <Fragment>
                        <CSSTransition
                            in={props.show}
                            timeout={1000}
                            appear={true}
                            onExited={(): void => {
                                props.unmount();
                            }}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>后勤详情</CrowTitle>
                                    <CrowClose>
                                        <Button onClick={(): void => {
                                            props.close();
                                        }}
                                                shape="circle" icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars>
                                        <DetailBaseContent>
                                            <DetailBaseItem>
                                                <DetailBaseLabel>
                                                    <img src={ImgTime} alt=""/>
                                                    <strong>服务时间</strong>
                                                </DetailBaseLabel>
                                                <DetailBaseItemContent>
                                                    2019-04-18 09:00
                                                </DetailBaseItemContent>
                                            </DetailBaseItem>
                                            <DetailBaseItem>
                                                <DetailBaseLabel>
                                                    <img src={ImgAddress} alt=""/>
                                                    <strong>服务地点</strong>
                                                </DetailBaseLabel>
                                                <DetailBaseItemContent>
                                                    北京 北京市 朝阳区
                                                </DetailBaseItemContent>
                                            </DetailBaseItem>
                                            <DetailBaseItem>
                                                <DetailBaseLabel>
                                                    <img src={ImgDescription} alt=""/>
                                                    <strong>备注</strong>
                                                </DetailBaseLabel>
                                                <DetailBaseItemContent>
                                                    无
                                                </DetailBaseItemContent>
                                            </DetailBaseItem>
                                            <DetailBaseItem>
                                                <DetailBaseLabel>
                                                    <img src={ImgUser} alt=""/>
                                                    <strong>服务人员</strong>
                                                </DetailBaseLabel>
                                                <DetailBaseItemContent>
                                                    <DetailBaseUser>
                                                        <strong>
                                                            <Avatar
                                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                            <small>张三</small>
                                                        </strong>
                                                    </DetailBaseUser>
                                                </DetailBaseItemContent>
                                            </DetailBaseItem>
                                            <GoodsListWrapper>
                                                <GoodsListItem>
                                                    <GoodsListItemImg
                                                        src={'https://i0.hdslb.com/bfs/article/c85d71135efc582ed5021e208605e42e03a3c6b1.jpg@1320w_980h.webp'}
                                                        alt={""}/>
                                                    <GoodsListItemInfo>
                                                        <GoodsListItemName>
                                                            柠檬水
                                                        </GoodsListItemName>
                                                        <GoodsListItemPrice>
                                                            ¥45
                                                        </GoodsListItemPrice>
                                                        <GoodsListItemCount>
                                                            x3
                                                        </GoodsListItemCount>
                                                    </GoodsListItemInfo>
                                                </GoodsListItem>
                                            </GoodsListWrapper>
                                        </DetailBaseContent>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooterNoPading>
                                    <GoodsDetailTotal>
                                        共5个物品，总计：
                                        <GoodsDetailCount>¥45</GoodsDetailCount>
                                    </GoodsDetailTotal>
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
    LogisticsDetail
};

import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {Avatar, Button} from 'antd';
import {funTransitionHeight} from '@/util/animateUtil';

import {
    ImgChairperson,
    ImgTime,
    ImgUser,
    ImgAgenda, ImgSeat
} from '@/assert/img/meeting/detail';

import {
    DetailBaseContent,
    DetailBaseItem,
    DetailBaseLabel,
    DetailBaseItemContent,
    DetailBaseUser,
    DetailAgendaTime, DetailBaseSeat
} from './ui';

import {
    CrowChildHeader,
    CrowChildTitle,
    CrowClose
} from '@/baseUI/Crow';

interface AgendaUser {
    readonly name: string;
    readonly avatar: string;
}

interface AgendaData {
    readonly agendaUser: AgendaUser[];
    readonly agendaContent: string;
    readonly agendaChairperson: AgendaUser;
    readonly agendaTime: string;
}

interface BaseAgendaProps {
    readonly data: AgendaData;
}

const BaseAgenda: React.ComponentType<BaseAgendaProps> = (props: BaseAgendaProps) => {
    const agendaWrapper: any = useRef(null);
    const [showContent, setShowContent] = useState<boolean>(true);

    useEffect(() => {
        funTransitionHeight(agendaWrapper.current, 0.8);
    }, [showContent]);

    return (

        <aside>
            <CrowChildHeader>
                <CrowChildTitle>
                    第1议程
                </CrowChildTitle>
                <CrowClose>
                    <Button size={"small"} onClick={(e) => setShowContent(!showContent)}
                            shape="circle"
                            icon={showContent ? "up" : "down"}/>
                </CrowClose>
            </CrowChildHeader>
            <div ref={agendaWrapper} style={{overflow: 'hidden'}}>
                {
                    showContent ? <DetailBaseContent>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgChairperson} alt=""/>
                                <strong>主持人</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseUser>
                                    <strong>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        <small>张三</small>
                                    </strong>
                                </DetailBaseUser>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgUser} alt=""/>
                                <strong>参会人员</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseUser>
                                    <strong>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        <small>张三</small>
                                    </strong>
                                    <strong>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        <small>张三</small>
                                    </strong>
                                    <strong>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        <small>张三</small>
                                    </strong>
                                    <strong>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        <small>张三</small>
                                    </strong>
                                </DetailBaseUser>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgTime} alt=""/>
                                <strong>议程时间</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailAgendaTime>09:00</DetailAgendaTime>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgAgenda} alt=""/>
                                <strong>议程内容</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                产品需求模块分析汇报
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgSeat} alt=""/>
                                <strong>会议坐席</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent
                                className={"meeting-res-detail-base-item-right meeting-res-detail-seat"}>
                                <DetailBaseSeat>点击查看</DetailBaseSeat>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                    </DetailBaseContent> : null
                }
            </div>
        </aside>
    );
};

export {
    BaseAgenda
};
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Fragment} from 'react';
import {Avatar} from 'antd';

import {BaseAgenda} from './baseAgenda';

import {
    ImgSubject,
    ImgAddress,
    ImgAudit,
    ImgChairperson,
    ImgDescription,
    ImgFile,
    ImgTime,
    ImgUser,
    ImgTxt
} from '@/assert/img/meeting/detail';

import {
    DetailBaseWrapper,
    DetailBaseContent,
    DetailBaseItem,
    DetailBaseLabel,
    DetailBaseItemContent,
    DetailBaseSubject,
    DetailBaseTimeSmall,
    DetailBaseUser,
    DetailBaseFile,
    DetailBaseDes
} from './ui';

import {
    CrowChildHeader,
    CrowChildTitle
} from '@/baseUI/Crow';

const agendaData = {
    agendaUser: [{
        name: '111',
        avatar: '222'
    }],
    agendaContent: '1111111',
    agendaChairperson: {
        name: '111',
        avatar: '222'
    },
    agendaTime: '08:00'
};

function DetailMeetingBase() {
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <DetailBaseWrapper>
                    <CrowChildHeader>
                        <CrowChildTitle>会议基础内容</CrowChildTitle>
                    </CrowChildHeader>
                    <DetailBaseContent>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgSubject} alt=""/>
                                <strong>会议主题</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseSubject>研发部周一例会</DetailBaseSubject>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgTime} alt=""/>
                                <strong>会议时间</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                2019-04-18 09:00-11:00
                                <DetailBaseTimeSmall>每周周一、周三 2019-04-18至2019-05-18</DetailBaseTimeSmall>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgAddress} alt=""/>
                                <strong>会议地点</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent className={"meeting-res-detail-base-item-right"}>
                                杭州市西湖区紫东创意园4幢402
                            </DetailBaseItemContent>
                        </DetailBaseItem>
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
                                <img src={ImgAudit} alt=""/>
                                <strong>审核人</strong>
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
                                <img src={ImgFile} alt=""/>
                                <strong>会议附件</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseFile>
                                    <img src={ImgTxt}/>
                                    <a>test.txt</a>
                                </DetailBaseFile>
                                <DetailBaseFile>
                                    <img src={ImgTxt}/>
                                    <a>test.txt</a>
                                </DetailBaseFile>
                                <DetailBaseFile>
                                    <img src={ImgTxt}/>
                                    <a>test.txt</a>
                                </DetailBaseFile>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgDescription} alt=""/>
                                <strong>会议详情</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseDes>
                                    例会详情内容例会详情内容例会详情内容例会详情
                                    内容例会详情内容例会详情内容例会详情内容
                                </DetailBaseDes>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                    </DetailBaseContent>
                    <BaseAgenda data={agendaData}/>
                </DetailBaseWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    DetailMeetingBase
};
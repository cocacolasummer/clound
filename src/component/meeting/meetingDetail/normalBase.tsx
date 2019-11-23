import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {funTransitionHeight} from "@/util/animateUtil";
import {Fragment} from 'react';
import {Avatar, Button} from 'antd';

import {
    ImgSubject,
    ImgAddress,
    ImgAgenda,
    ImgAudit,
    ImgChairperson,
    ImgDescription,
    ImgFile,
    ImgTime,
    ImgUser,
    ImgTxt,
    ImgXls,
    ImgJpg,
    ImgMp3,
    ImgPdf,
    ImgPpt,
    ImgRar,
    ImgDoc
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
    DetailBaseDes,
    DetailBaseOuterWrapper,
    DetailBaseAgenda
} from './ui';

import {
    CrowChildHeader,
    CrowChildTitle,
    CrowChildWrapper, CrowClose
} from '@/baseUI/Crow';
import {IState} from '@/store';
import {useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        data: state.MeetingDetail.data
    };
};

function DetailNormalMeetingBase() {
    const {
        data
    } = useMappedState(mapState);
    const iconDir = {
        'txt': ImgTxt,
        'xls': ImgXls,
        'jpg': ImgJpg,
        'mp3': ImgMp3,
        'pdf': ImgPdf,
        'ppt': ImgPpt,
        'rar': ImgRar,
        'doc': ImgDoc
    };
    const getIcon = (filename: string) => {
        if (/\.(png)|(jpg)|(jpeg)|(webp)|(svg)$/i.test(filename)) {
            return iconDir['jpg'];
        }
        if (/\.(csv)|(xlsx)|(xls)$/i.test(filename)) {
            return iconDir['xls'];
        }
        if (/\.(pdf)$/i.test(filename)) {
            return iconDir['pdf'];
        }
        if (/\.(mp3)$/i.test(filename)) {
            return iconDir['mp3'];
        }
        if (/\.(ppt)|(pptx)$/i.test(filename)) {
            return iconDir['ppt'];
        }
        if (/\.(rar)|(zip)|(tar)$/i.test(filename)) {
            return iconDir['rar'];
        }
        if (/\.(doc)|(docx)$/i.test(filename)) {
            return iconDir['doc'];
        }

        return iconDir['txt'];
    };
    const settingWrapper: any = useRef(null);
    const attenderWrapper: any = useRef(null);
    const [showSettingContent, setShowSettingContent] = useState<boolean>(true);
    const [showAttenderContent, setShowAttenderContent] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(settingWrapper.current, 0.5);
        }, 400);
    }, [showSettingContent]);

    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(attenderWrapper.current, 0.5);
        }, 200);
    }, [showAttenderContent]);
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
                                <DetailBaseSubject>{data.subject}</DetailBaseSubject>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgTime} alt=""/>
                                <strong>会议时间</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                {`${data.start_time}~${data.end_time && data.end_time.split(' ')[1]}`}
                                <DetailBaseTimeSmall> </DetailBaseTimeSmall>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>
                                <img src={ImgAddress} alt=""/>
                                <strong>会议地点</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent className={"meeting-res-detail-base-item-right"}>
                                {data.detail && data.detail.room.name}
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                        <DetailBaseItem>
                            <DetailBaseLabel>

                                <img src={ImgChairperson} alt=""/>
                                <strong>主持人</strong>
                            </DetailBaseLabel>
                            <DetailBaseItemContent>
                                <DetailBaseUser>
                                    {
                                        data.detail && data.detail.leader && data.detail.leader.length > 0 ? data.detail.leader.map((item: any, index: number) => {
                                            return (
                                                <strong style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }} key={index}>
                                                    <Avatar src={item.avatar}/>
                                                    <small>{item.displayname}</small>
                                                </strong>
                                            );
                                        }) : null
                                    }

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
                                    {
                                        data.detail && data.detail.auditor && data.detail.auditor.length > 0 ? data.detail.auditor.map((item: any, index: number) => {
                                            return (
                                                <strong style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }} key={index}>
                                                    <Avatar src={item.avatar}/>
                                                    <small>{item.displayname}</small>
                                                </strong>
                                            );
                                        }) : null
                                    }
                                </DetailBaseUser>
                            </DetailBaseItemContent>
                        </DetailBaseItem>
                    </DetailBaseContent>

                    <CrowChildWrapper ref={attenderWrapper}>
                        <CrowChildHeader>
                            <CrowChildTitle>参会人员</CrowChildTitle>
                            <CrowClose>
                                <Button size={"small"} onClick={(e) => setShowAttenderContent(!showAttenderContent)}
                                        shape="circle"
                                        icon={showAttenderContent ? "up" : "down"}/>
                            </CrowClose>
                        </CrowChildHeader>
                        {
                            showAttenderContent ? <DetailBaseContent>
                                <DetailBaseItem>
                                    <DetailBaseLabel>
                                        <img src={ImgUser} alt=""/>
                                        <strong>参会人员</strong>
                                    </DetailBaseLabel>
                                    <DetailBaseItemContent>
                                        <DetailBaseUser>
                                            {
                                                data.detail && data.detail.attender && data.detail.attender.length > 0 ? data.detail.attender.map((item: any, index: number) => {
                                                    return (
                                                        <strong style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }} key={index}>
                                                            <Avatar src={item.avatar}/>
                                                            <small>{item.displayname}</small>
                                                        </strong>
                                                    );
                                                }) : `无参会人员`
                                            }
                                        </DetailBaseUser>
                                    </DetailBaseItemContent>
                                </DetailBaseItem>
                                <DetailBaseItem>
                                    <DetailBaseLabel>
                                        <img src={ImgUser} alt=""/>
                                        <strong>外部人员</strong>
                                    </DetailBaseLabel>
                                    <DetailBaseItemContent>
                                        <DetailBaseUser>
                                            {
                                                data.detail && data.detail.external && data.detail.external.length > 0 ? data.detail.external.map((item: any, index: number) => {
                                                    return (
                                                        <DetailBaseOuterWrapper key={index}>
                                                            <span>{index + 1}</span>
                                                            <small>{item.user_name}</small>
                                                            <strong>{item.mobile}</strong>
                                                            <i>{item.email}</i>
                                                        </DetailBaseOuterWrapper>
                                                    );
                                                }) : `无外部人员`
                                            }
                                        </DetailBaseUser>
                                    </DetailBaseItemContent>
                                </DetailBaseItem>
                            </DetailBaseContent> : null
                        }
                    </CrowChildWrapper>
                    <CrowChildWrapper ref={settingWrapper}>
                        <CrowChildHeader>
                            <CrowChildTitle>会议设置及详情</CrowChildTitle>
                            <CrowClose>
                                <Button size={"small"} onClick={(e) => setShowSettingContent(!showSettingContent)}
                                        shape="circle"
                                        icon={showSettingContent ? "up" : "down"}/>
                            </CrowClose>
                        </CrowChildHeader>
                        {
                            showSettingContent ? <DetailBaseContent>
                                <DetailBaseItem>
                                    <DetailBaseLabel>
                                        <img src={ImgDescription} alt=""/>
                                        <strong>会议详情</strong>
                                    </DetailBaseLabel>
                                    <DetailBaseItemContent>
                                        <DetailBaseDes>
                                            {data.summary}
                                        </DetailBaseDes>
                                    </DetailBaseItemContent>
                                </DetailBaseItem>
                                <DetailBaseItem>
                                    <DetailBaseLabel>
                                        <img src={ImgFile} alt=""/>
                                        <strong>会议附件</strong>
                                    </DetailBaseLabel>
                                    <DetailBaseItemContent>
                                        {
                                            data.files && data.files.length > 0 ? data.files.map((item: any, index: number) => {
                                                console.log(item);
                                                return (
                                                    <DetailBaseFile key={index}>
                                                        <img src={getIcon(item)}/>
                                                        <a target={"blank"}
                                                           href={`/meetingcloud/remote.php/webdav/${encodeURIComponent(item)}`}>{item.replace(/^\/.+\//, '')}</a>
                                                    </DetailBaseFile>
                                                );
                                            }) : `无文件`
                                        }
                                    </DetailBaseItemContent>
                                </DetailBaseItem>
                                <DetailBaseItem>
                                    <DetailBaseLabel>
                                        <img src={ImgAgenda} alt=""/>
                                        <strong>会议议程</strong>
                                    </DetailBaseLabel>
                                    <DetailBaseItemContent>
                                        {
                                            data.agenda && data.agenda.length > 0 ? data.agenda.map((item: any, index: number) => {
                                                return (
                                                    <DetailBaseAgenda key={index}>
                                                        <small>{index + 1}</small> {item.name}
                                                        <time>{item.time}</time>
                                                    </DetailBaseAgenda>
                                                );
                                            }) : null
                                        }
                                    </DetailBaseItemContent>
                                </DetailBaseItem>
                            </DetailBaseContent> : null
                        }
                    </CrowChildWrapper>
                </DetailBaseWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    DetailNormalMeetingBase
};
import React, {Fragment, useEffect} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {CSSTransition} from 'react-transition-group';
import {useDispatch, useMappedState} from "redux-react-hook";

import {Avatar, Button, Progress, Tag} from 'antd';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowContent,
    CrowFooter,
} from '@/baseUI/Crow';
import {
    VoteCreator
} from './ui';
import {
    DetailBaseContent,
    DetailBaseItem, DetailBaseItemContent,
    DetailBaseLabel, DetailBaseSubject, DetailBaseUser,
    DetailBaseWrapper, DetailVoteCard, DetailVoteContent, DetailVoteLabel, DetailVoteTitle, DetailVoteUserName
} from "@/component/meeting/meetingDetail/ui";
import {
    ImgLink,
    ImgSubject,
    ImgTime,
    ImgUser
} from "@/assert/img/meeting/detail";

interface VoteDetailProps {
    show: boolean;
}
import VoteServices from '@/services/voteServices';

const _voteService = new VoteServices();
import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";
const mapState = (state: IState) => {
    return {
        detailId: state.VoteDetail.detailId,
        data: state.VoteDetail.data
    };
};

const VoteDetail: React.ComponentType<VoteDetailProps> = (props: VoteDetailProps) => {
    const {detailId, data} = useMappedState(mapState);
    const dispatch = useDispatch();
    useEffect(() => {
        _voteService.getVoteDetail(detailId, (res: any) => {
            dispatch({
                type: 'change voteDetail data',
                data: res.data
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, []);

    let totalCount = 0;
    data.allVote && data.allVote.forEach((item: any) => {
       totalCount += item.num;
    });
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
                            onExited={() => {
                                dispatch({
                                    type: 'change voteDetail unmount'
                                });
                            }}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>投票详情</CrowTitle>
                                    <CrowClose>
                                        <Button onClick={() => {
                                            dispatch({
                                                type: 'change voteDetail hide'
                                            });
                                        }}
                                                shape="circle" icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars>
                                        <DetailBaseWrapper>
                                            <DetailBaseContent>
                                                <DetailBaseItem>
                                                    <DetailBaseLabel>
                                                        <img src={ImgSubject} alt=""/>
                                                        <strong>投票主题</strong>
                                                    </DetailBaseLabel>
                                                    <DetailBaseItemContent>
                                                        <DetailBaseSubject>{data.subject}</DetailBaseSubject>
                                                        <div><Tag color="blue">{data.choose_type}项</Tag><Tag color="geekblue">{data.anonymous === '1' ? '匿名' : '不匿名'}</Tag>
                                                        </div>
                                                        <VoteCreator>{data.display_name}</VoteCreator>
                                                    </DetailBaseItemContent>
                                                </DetailBaseItem>
                                                <DetailBaseItem>
                                                    <DetailBaseLabel>
                                                        <img src={ImgLink} alt=""/>
                                                        <strong>关联会议</strong>
                                                    </DetailBaseLabel>
                                                    <DetailBaseItemContent>
                                                        {data.meeting_id === '0' ? '无关联会议' : data.meeting_id}
                                                    </DetailBaseItemContent>
                                                </DetailBaseItem>
                                                <DetailBaseItem>
                                                    <DetailBaseLabel>
                                                        <img src={ImgTime} alt=""/>
                                                        <strong>起止时间</strong>
                                                    </DetailBaseLabel>
                                                    <DetailBaseItemContent>
                                                        {`${data.start_time} ~ ${data.end_time}`}
                                                    </DetailBaseItemContent>
                                                </DetailBaseItem>
                                                <DetailBaseItem>
                                                    <DetailBaseLabel>
                                                        <img src={ImgUser} alt=""/>
                                                        <strong>参与人员</strong>
                                                    </DetailBaseLabel>
                                                    <DetailBaseItemContent>
                                                        <DetailBaseUser>
                                                            {
                                                                data.attender && data.attender.map((item: any, index: number) => {
                                                                    return (
                                                                        <strong key={index}>
                                                                            <Avatar
                                                                                src={item.avatar}/>
                                                                            <small>{item.display_name}</small>
                                                                        </strong>
                                                                    );
                                                                })
                                                            }
                                                        </DetailBaseUser>
                                                    </DetailBaseItemContent>
                                                </DetailBaseItem>
                                            </DetailBaseContent>
                                        </DetailBaseWrapper>
                                        <DetailBaseWrapper>
                                            <DetailVoteTitle>投票选项</DetailVoteTitle>
                                                {
                                                    data.options && data.options.map((item: any, index: number) => {
                                                        const num = data.allVote.filter((item: any) => item.option_id == index)[0];
                                                        const count = (num && data.allVote.filter((item: any) => item.option_id == index)[0].num) || 0;
                                                        return (
                                                            <DetailVoteCard key={index}>
                                                                <DetailVoteLabel>{item}</DetailVoteLabel>
                                                                <DetailVoteContent>
                                                                    <Progress
                                                                        strokeColor={{
                                                                            '0%': '#108ee9',
                                                                            '100%': '#87d068',
                                                                        }}
                                                                        status="active"
                                                                        percent={Math.floor((count / totalCount) * 100)}
                                                                    />
                                                                    {
                                                                        data.anonymous == '1' ? null : <DetailVoteUserName>
                                                                            {
                                                                                num && num.attender && num.attender.map((item: any, index: number) => {
                                                                                    return (
                                                                                        <span key={index}>{item.display_name}</span>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </DetailVoteUserName>
                                                                    }

                                                                </DetailVoteContent>
                                                            </DetailVoteCard>
                                                        );
                                                    })
                                                }

                                        </DetailBaseWrapper>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"} onClick={() => {
                                        dispatch({
                                            type: 'change voteDetail hide'
                                        });
                                    }}>关闭</Button>
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
    VoteDetail
};

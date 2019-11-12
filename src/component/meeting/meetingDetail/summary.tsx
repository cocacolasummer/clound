import React, {useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Fragment} from 'react';
import {Button, Avatar} from 'antd';
import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingReservationServices = new MeetingReservationServices();
import {useDispatch, useMappedState} from "redux-react-hook";
import {IState} from "@/store";
import {getXlsxblob} from '@/util/generateXlsx';

const mapState = (state: IState) => {
    return {
        id: state.MeetingDetail.id,
        meeting: state.MeetingDetail.data,
        summary: state.MeetingDetail.summary
    };
};

import {
    DetailBaseWrapper,
    DetailSummaryList,
    DetailSummaryListItem,
    DetailSummaryListHeader,
    DetailSummaryListOperate,
    DetailSummaryListContent,
    DetailSummaryListTime
} from './ui';

import {
    CrowChildHeader,
    CrowChildTitle,
    CrowClose
} from '@/baseUI/Crow';
import {error} from "@/util/golbalModalMessage";
import moment from "moment";
import {CustomEmpty} from "@/component/customEmpty";

function DetailMeetingSummary() {
    const dispatch = useDispatch();
    const {
        id,
        summary,
        meeting
    } = useMappedState(mapState);
    useEffect(() => {
        _meetingReservationServices.getMeetingSummaryById(id, (res: any) => {
            dispatch({
                type: 'change meetingDetail summary',
                summary: res.data
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
    }, [dispatch, id]);
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
                        <CrowChildTitle>会议纪要</CrowChildTitle>
                        <CrowClose>
                            {
                                !summary ? <Button size={"small"}
                                                   onClick={() => {
                                                       dispatch({
                                                           type: 'change meetingDetail summaryEditor',
                                                           summaryEditor: 'add'
                                                       });
                                                       dispatch({
                                                           type: 'open meetinglist summaryEdit'
                                                       });
                                                   }}
                                                   type={"primary"}>创建会议纪要</Button> : null
                            }

                        </CrowClose>
                    </CrowChildHeader>
                    {
                        summary ? <DetailSummaryList>
                            <DetailSummaryListItem>
                                <DetailSummaryListHeader>
                                    <strong>
                                        <Avatar>{summary && summary.lastEditBy.display_name}</Avatar>
                                        <small>{summary && summary.lastEditBy.display_name}</small>
                                    </strong>
                                    <DetailSummaryListOperate>
                                        <Button type="primary" ghost onClick={() => {
                                            const blob = getXlsxblob([
                                                [`${meeting.subject}会议纪要.xlsx`],
                                                ['会议主题', meeting.subject],
                                                ['会议时间', `${meeting.start_time}~${meeting.end_time && meeting.end_time.split(' ')[1]}`],
                                                ['参会地点', meeting.detail.room.name],
                                                ['主持人', meeting.detail && meeting.detail.leader && meeting.detail.leader.length > 0 && meeting.detail.leader.map((item: any, index: number) => {
                                                    return item.displayname;
                                                }).join(',')],
                                                ['参会人员', meeting.detail && meeting.detail.attender && meeting.detail.attender.length > 0 && meeting.detail.attender.map((item: any, index: number) => {
                                                    return item.displayname;
                                                }).join(',')],
                                                ['会议议程', meeting.agenda && meeting.agenda.length > 0 && meeting.agenda.map((item: any, index: number) => {
                                                    return [index, item.name, item.time];
                                                })],
                                                ['会议详情', meeting.summary],
                                                ['会议纪要', summary.filecontents]
                                            ], `会议纪要`);
                                            const a = document.createElement('a');
                                            a.href = URL.createObjectURL(blob);
                                            a.download = `${meeting.subject}会议纪要.xlsx`;
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                        }} size={"small"}>下载</Button>
                                        <Button type="primary" ghost size={"small"}
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'change meetingDetail summaryEditor',
                                                        summaryEditor: 'show'
                                                    });
                                                    dispatch({
                                                        type: 'open meetinglist summaryEdit'
                                                    });
                                                }}
                                        >查看</Button>
                                        {
                                            summary && summary.writeable ? <Button type="primary"
                                                                                   onClick={() => {
                                                                                       dispatch({
                                                                                           type: 'change meetingDetail summaryEditor',
                                                                                           summaryEditor: 'editor'
                                                                                       });
                                                                                       dispatch({
                                                                                           type: 'open meetinglist summaryEdit'
                                                                                       });
                                                                                   }}
                                                                                   ghost
                                                                                   size={"small"}>编辑</Button> : null
                                        }
                                    </DetailSummaryListOperate>
                                </DetailSummaryListHeader>
                                <DetailSummaryListContent>
                                    {
                                        summary && summary.filecontents
                                    }
                                </DetailSummaryListContent>
                                <DetailSummaryListTime>更新时间 {summary && moment(new Date(summary.mtime * 1000)).format('YYYY-MM-DD hh:mm:ss')}</DetailSummaryListTime>
                            </DetailSummaryListItem>
                        </DetailSummaryList> : <CustomEmpty/>
                    }
                </DetailBaseWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    DetailMeetingSummary
};
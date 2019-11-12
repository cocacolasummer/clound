import React, {Fragment, useEffect} from 'react';
import {useMappedState, useDispatch} from "redux-react-hook";
import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingReservationServices = new MeetingReservationServices();
import {
    CrowTwoLvWrapper,
    CrowMiddle,
    CrowHeader,
    CrowFooter,
    CrowMidContent,
    CrowTitle, CrowClose
} from '@/baseUI/Crow';

import {Avatar, Form, Input} from 'antd';

const {TextArea} = Input;

import {Button} from "antd";
import {CSSTransition} from "react-transition-group";

import {IState} from "@/store";
import {error, success} from "@/util/golbalModalMessage";
import Scrollbars from "react-custom-scrollbars";
import {DetailBaseAgenda} from "@/component/meeting/meetingDetail/ui";

const mapState = (state: IState) => {
    return {
        id: state.MeetingDetail.id,
        meeting: state.MeetingDetail.data,
        summary: state.MeetingDetail.summary,
        summaryEditor: state.MeetingDetail.summaryEditor,
        summaryEditShow: state.MeetingList.summaryEditShow,
    };
};

const SummaryEditForm = (props: any) => {
    const dispatch = useDispatch();
    const {
        summaryEditShow,
        summaryEditor,
        id,
        summary,
        meeting
    } = useMappedState(mapState);
    let title = '';
    const {getFieldDecorator} = props.form;
    switch (summaryEditor) {
        case 'show':
            title = '查看';
            break;
        case 'editor':
            title = '编辑';
            break;
        case 'add':
            title = '创建';
            break;
    }
    useEffect(() => {
        if (summaryEditor === 'editor' || summaryEditor === 'show') {
            _meetingReservationServices.getMeetingSummaryById(id, (res: any) => {
                dispatch({
                    type: 'change meetingDetail summary',
                    summary: res.data
                });
            }, (err: any) => {
                error(err.message ? err.message : err.toString());
            });
        }
    }, [dispatch, id, summaryEditor]);
    const formItemLayout: object = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 4},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 20},
        },
    };
    const saveSummary = () => {
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                if (summaryEditor === 'add') {
                    _meetingReservationServices.createMeetingSummaryById(id, {
                        content: values.summary
                    }, (res: any) => {
                        dispatch({
                            type: 'close meetinglist summaryEdit'
                        });
                        success('创建会议纪要成功');
                        _meetingReservationServices.getMeetingSummaryById(id, (res: any) => {
                            dispatch({
                                type: 'change meetingDetail summary',
                                summary: res.data
                            });
                        }, (err: any) => {
                            error(err.message ? err.message : err.toString());
                        });
                    }, (err: any) => {
                        error(err.message ? err.message : err.toString());
                    });
                } else if (summaryEditor === 'editor') {
                    _meetingReservationServices.updateMeetingSummaryById(id, {
                        content: values.summary,
                        mtime: `${summary.mtime}`
                    }, (res: any) => {
                        dispatch({
                            type: 'close meetinglist summaryEdit'
                        });
                        _meetingReservationServices.getMeetingSummaryById(id, (res: any) => {
                            dispatch({
                                type: 'change meetingDetail summary',
                                summary: res.data
                            });
                        }, (err: any) => {
                            error(err.message ? err.message : err.toString());
                        });
                    }, (err: any) => {
                        error(err.message ? err.message : err.toString());
                    });
                }
            }
        });

    };
    return (
        <Fragment>
            <CSSTransition
                in={summaryEditShow}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => {
                    dispatch({
                        type: 'unmount meetinglist summaryEdit'
                    });
                }}
            >
                <CrowTwoLvWrapper>
                    <Fragment>
                        <CSSTransition
                            in={summaryEditShow}
                            timeout={1000}
                            unmountOnExit
                            appear={true}
                        >
                            <CrowMiddle>
                                <CrowHeader>
                                    <CrowTitle>{title}会议纪要</CrowTitle>
                                    <CrowClose>
                                        <Button shape="circle"
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'close meetinglist summaryEdit'
                                                    });
                                                }}
                                                icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowMidContent>
                                    <Scrollbars>
                                        <Form {...formItemLayout} style={{padding: 20}}>
                                            <Form.Item style={{marginBottom: 0}} label="会议主题">
                                                <p style={{marginBottom: 0}}>
                                                    {meeting.subject}
                                                </p>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="会议时间">
                                                <time>
                                                    {`${meeting.start_time}~${meeting.end_time && meeting.end_time.split(' ')[1]}`}
                                                </time>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="会议地点">
                                                <p style={{marginBottom: 0}}>
                                                    {meeting.detail && meeting.detail.room.name}
                                                </p>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="主持人">
                                                <p style={{marginBottom: 0}}>
                                                    {
                                                        meeting.detail && meeting.detail.leader && meeting.detail.leader.length > 0 ? meeting.detail.leader.map((item: any, index: number) => {
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
                                                </p>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="参会人员">
                                                <p style={{marginBottom: 0}}>
                                                    {
                                                        meeting.detail && meeting.detail.attender && meeting.detail.attender.length > 0 ? meeting.detail.attender.map((item: any, index: number) => {
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
                                                </p>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="会议议程">
                                                <p style={{marginBottom: 0}}>
                                                    {
                                                        meeting.agenda && meeting.agenda.length > 0 ? meeting.agenda.map((item: any, index: number) => {
                                                            return (
                                                                <DetailBaseAgenda key={index}>
                                                                    <small>{index + 1}</small> {item.name}
                                                                    <time>{item.time}</time>
                                                                </DetailBaseAgenda>
                                                            );
                                                        }) : null
                                                    }
                                                </p>
                                            </Form.Item>
                                            <Form.Item style={{marginBottom: 0}} label="会议详情">
                                            <pre style={{marginBottom: 0}}>
                                                {meeting.summary}
                                            </pre>
                                            </Form.Item>
                                            {
                                                summaryEditor === 'show' ?
                                                    <Form.Item style={{marginBottom: 0}} label="会议纪要">
                                                    <pre>
                                                        {summary && summary.filecontents}
                                                    </pre>
                                                    </Form.Item> :
                                                    <Form.Item label="会议纪要">
                                                        {getFieldDecorator('summary', {
                                                            initialValue: summaryEditor === 'editor' && summary ? summary.filecontents : ''
                                                        })(
                                                            <TextArea rows={4}/>
                                                        )}
                                                    </Form.Item>
                                            }
                                        </Form>
                                    </Scrollbars>
                                </CrowMidContent>

                                <CrowFooter>
                                    {
                                        summaryEditor === 'show' ? <Button onClick={() => {
                                            dispatch({
                                                type: 'close meetinglist summaryEdit'
                                            });
                                        }} type={"primary"}>确定</Button> : <Button onClick={() => {
                                            saveSummary();
                                        }} type={"primary"}>保存</Button>
                                    }

                                </CrowFooter>
                            </CrowMiddle>
                        </CSSTransition>
                    </Fragment>
                </CrowTwoLvWrapper>
            </CSSTransition>
        </Fragment>
    );
};
const SummaryEdit = Form.create()(SummaryEditForm);
export {
    SummaryEdit
};
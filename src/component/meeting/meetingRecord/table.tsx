import React, {Fragment, useState} from 'react';
import {Button, Table, Input} from 'antd';
import {CSSTransition} from 'react-transition-group';
import {useMappedState, useDispatch} from "redux-react-hook";

const {TextArea} = Input;
import {MeetingStatus} from "./status";

import {
    ContentWrapper
} from './ui';

import {IState} from "@/store";
import {success, error, waringConfirm, waringConfirmCustom} from '@/util/golbalModalMessage';
import MeetingReservationServices from "@/services/meetingReservationServices";

const _meetingResServices = new MeetingReservationServices();
const mapState = (state: IState) => {
    return {
        list: state.MeetingRecord.list,
        kind: state.MeetingRecord.kind,
        total: state.MeetingRecord.total
    };
};

const mapGlobalState = (state: IState) => {
    return {
        loginUserId: state.Global.loginUserId,
    };
};

const MeetingTable = () => {

    const dispatch = useDispatch();
    const [refuseDesc, setRefuseDesc] = useState('');

    const {
        list,
        kind,
        total
    } = useMappedState(mapState);
    const {
        loginUserId
    } = useMappedState(mapGlobalState);

    const cancelMeeting = (id: string) => {
        _meetingResServices.cancelMeeting(id, (res: any) => {
            success(`取消会议${res.message}`);
            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
        }, (err: any) => {
            error(err.toString());
        });
    };
    const passMeeting = (id: string, pass: number) => {
        const params = {
            pass: pass
        };
        if (!pass) {
            params['desc'] = refuseDesc;
        }
        _meetingResServices.passMeeting(id, params, (res: any) => {
            if (pass) {
                success(`通过会议${res.message}`);
            } else {
                success(`拒绝会议${res.message}`);
            }

            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
        }, (err: any) => {
            error(err.toString());
        });
    };

    const replayMeeting = (id: string, status: number, force?: number) => {
        const param: any = {
            status: status
        };
        if (force) {
            param['force'] = force;
        }
        _meetingResServices.replayMeeting(id, param, (res: any) => {
            if (status) {
                success(`同意参加会议${res.message}`);
            } else {
                success(`拒绝参加会议${res.message}`);
            }

            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
        }, (err: any) => {
            if (err.data.name) {
                waringConfirm('时间冲突确认', `和待进行的会议时间冲突，确定接受邀请吗？`, () => {
                    replayMeeting(id, status, 1);
                });
            } else {
                error(err.toString());
            }
        });
    };
    const tabHeaders = [
        {
            title: '序号',
            key: 'id',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => index + 1
        },
        {
            title: '会议主题',
            dataIndex: 'subject',
            key: 'subject',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => <a onClick={() => {
                dispatch({
                    type: 'change meetingDetail id',
                    id: record.id
                });
                dispatch({
                    type: 'change meetingDetail show'
                });
            }}>{text}</a>
        },
        {
            title: '发起人',
            key: 'creator',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return `${record.detail.creator.displayname}`;
            }
        },
        {
            title: '会议时间',
            key: 'meetingTime',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return `${record.start_time}~${record.end_time.split(' ')[1]}`;
            }
        },
        {
            title: '会议地点',
            key: 'meetingAddress',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return `${record.detail.room.name}`;
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return (<MeetingStatus type={text} key={index}/>);
            }
        },
        {
            title: '操作',
            key: 'operate',
            // eslint-disable-next-line react/display-name
            render: (text: any, item: any, index: number): React.ReactElement => {
                let menu;
                if (loginUserId === item.creator && (item.status === '3' || item.status === '0') && kind === '1') {
                    menu = (
                        <Fragment>
                            <Button type={"primary"}
                                    onClick={() => {
                                        dispatch({
                                            type: 'open timepicker editor'
                                        });
                                        dispatch({
                                            type: 'change meetingeditor isEdit',
                                            isEdit: 'edit',
                                            id: item.id
                                        });
                                    }}
                                    style={{marginRight: 5}} size={"small"}>修改</Button>
                            <Button type={"danger"} onClick={(): void => {
                                waringConfirm('警告', `确定取消会议<${item.subject}>吗？`, () => {
                                    cancelMeeting(item.id);
                                });
                            }} size={"small"}>取消</Button>
                        </Fragment>
                    );
                } else if (item.detail.attender.map((item: any) => item.user_id).indexOf(loginUserId) !== -1 &&
                    item.status === '3' && kind === '2' && loginUserId !== item.creator && !item.attender_status
                ) {
                    menu = (
                        <Fragment>
                            <Button type={"primary"} onClick={() => {
                                waringConfirm('警告', `确定接受会议<${item.subject}>吗？`, () => {
                                    replayMeeting(item.id, 1);
                                });

                            }} style={{marginRight: 5}} size={"small"}>接受</Button>
                            <Button type={"danger"} onClick={() => {
                                waringConfirmCustom(`确定拒绝会议<${item.subject}>吗？`, <TextArea
                                    placeholder={"拒绝请输入拒绝理由（非必填）"}
                                    onChange={(e) => {
                                        setRefuseDesc(e.target.value);
                                    }}
                                    rows={4}/>, () => {
                                    replayMeeting(item.id, 0);
                                });
                            }} size={"small"}>拒绝</Button>
                        </Fragment>
                    );
                } else if (item.detail.auditor.map((item: any) => item.user_id).indexOf(loginUserId) !== -1 &&
                    item.status === '0' && kind === '3') {
                    menu = (
                        <Fragment>
                            <Button type={"primary"} onClick={() => {
                                waringConfirm('警告', `确定审核通过会议<${item.subject}>吗？`, () => {
                                    passMeeting(item.id, 1);
                                });

                            }} style={{marginRight: 5}} size={"small"}>同意</Button>
                            <Button type={"danger"} onClick={() => {
                                waringConfirmCustom(`确定拒绝通过会议<${item.subject}>吗？`, <TextArea
                                    placeholder={"拒绝请输入拒绝理由（非必填）"}
                                    onChange={(e) => {
                                        setRefuseDesc(e.target.value);
                                    }}
                                    rows={4}/>, () => {
                                    passMeeting(item.id, 0);
                                });
                            }} size={"small"}>拒绝</Button>
                        </Fragment>
                    );
                } else {
                    menu = null;
                }
                let reCreate;
                if (loginUserId === item.creator && item.status === '5' && kind === '1') {
                    reCreate = (
                        <Button type={"primary"}
                                onClick={() => {
                                    dispatch({
                                        type: 'open timepicker editor'
                                    });
                                    dispatch({
                                        type: 'change meetingeditor isEdit',
                                        isEdit: 'recreate',
                                        id: item.id
                                    });
                                }}
                                style={{marginRight: 5}} size={"small"}>重新发起</Button>
                    );
                }

                return (
                    <Fragment>
                        {menu}
                        {reCreate}
                    </Fragment>
                );
            }
        }
    ];

    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <ContentWrapper>
                    <Table dataSource={list}
                           rowKey={(record): string => record.id + ''}
                           pagination={false} columns={tabHeaders}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );

};

export {
    MeetingTable
};
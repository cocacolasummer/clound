import React, {Fragment, useState} from 'react';
import {Icon, Avatar, Button, Input} from 'antd';
import {CustomEmpty} from '@/component/customEmpty';
import MeetingReservationServices from "@/services/meetingReservationServices";

const _meetingResServices = new MeetingReservationServices();
import {CSSTransition} from 'react-transition-group';

const {TextArea} = Input;
import {MeetingStatus} from "./status";
import {CheckStatus} from "./checkStatus";

import {SeatImg} from '@/assert/img/meeting';

import {
    ContentWrapper,
    CardList,
    CardListItem,
    CardTitle,
    CardIconLine,
    CardCreator,
    CardAttender,
    CardAvatar,
    CardOperate,
    CardSeact
} from './ui';

import {useMappedState, useDispatch} from "redux-react-hook";
import {IState} from "@/store";
import {error, success, waringConfirm, waringConfirmCustom} from "@/util/golbalModalMessage";

const mapState = (state: IState) => {
    return {
        list: state.MeetingList.list,
        kind: state.MeetingList.kind,
        needCheck: state.MeetingList.needCheck,
        total: state.MeetingList.total
    };
};

const mapGlobalState = (state: IState) => {
    return {
        loginUserId: state.Global.loginUserId
    };
};

const MeetingCard = () => {

    const dispatch = useDispatch();
    const [refuseDesc, setRefuseDesc] = useState('');
    const checkStateItem = (type: number | string) => {
        let types: number;
        if (typeof type === 'string') {
            types = parseInt(type);
        } else {
            types = type;
        }
        switch (types) {
            case 0: {
                return <CheckStatus type={0}/>;
            }
            case 6: {
                return <CheckStatus type={1}/>;
            }
            case 3: {
                return <CheckStatus type={2}/>;
            }
            case 4: {
                return <CheckStatus type={2}/>;
            }
            default: {
                return null;
            }
        }
    };

    const {
        list,
        kind,
        total,
        needCheck
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

    const finishMeeting = (id: string) => {
        _meetingResServices.finishMeeting(id, (res: any) => {
            success(`结束会议${res.message}`);
            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
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

    const listItem = list && list.map((item: any, index) => {
        const avatarListItem = item.detail.attender && item.detail.attender.map((avatar: any, key: number) => {
            if (key === 10) {
                return <CardAvatar key={key}><Avatar
                    style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}>+{item.detail.attender.length - 10}</Avatar></CardAvatar>;
            } else if (key > 10) {
                return;
            }
            return <CardAvatar key={key}>{avatar.avatar ?
                <Avatar src={avatar.avatar} style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}/> :
                <Avatar style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}>{avatar.displayname}</Avatar>}</CardAvatar>;
        });

        let menu;
        if (loginUserId === item.creator && (item.status === '3' || item.status === '0') && kind === '1') {
            menu = (
                <Fragment>
                    <Button type={"primary"}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch({
                                    type: "change meetingeditor show"
                                });
                                dispatch({
                                    type: 'change meetingeditor isEdit',
                                    isEdit: 'edit',
                                    id: item.id
                                });
                            }}
                            style={{marginRight: 5}} size={"small"}>修改</Button>
                    <Button type={"danger"} onClick={(e): void => {
                        e.stopPropagation();
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
                    <Button type={"primary"} onClick={(e) => {
                        e.stopPropagation();
                        waringConfirm('警告', `确定接受会议<${item.subject}>吗？`, () => {
                            replayMeeting(item.id, 1);
                        });

                    }} style={{marginRight: 5}} size={"small"}>接受</Button>
                    <Button type={"danger"} onClick={(e) => {
                        e.stopPropagation();
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
                    <Button type={"primary"} onClick={(e) => {
                        e.stopPropagation();
                        waringConfirm('警告', `确定审核通过会议<${item.subject}>吗？`, () => {
                            passMeeting(item.id, 1);
                        });

                    }} style={{marginRight: 5}} size={"small"}>同意</Button>
                    <Button type={"danger"} onClick={(e) => {
                        e.stopPropagation();
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
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                                type: "change meetingeditor show"
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
        if (loginUserId === item.creator && item.status === '4' && kind === '1') {
            reCreate = (
                <Button type={"danger"} onClick={(e): void => {
                    e.stopPropagation();
                    waringConfirm('警告', `确定结束会议<${item.subject}>吗？`, () => {
                        finishMeeting(item.id);
                    });
                }} size={"small"}>结束会议</Button>
            );
        }
        return (
            <CardListItem key={index} onClick={() => {
                dispatch({
                    type: 'change meetingDetail id',
                    id: item.id
                });
                dispatch({
                    type: 'change meetingDetail show'
                });
            }}>
                <CardTitle>
                    {item.subject}
                </CardTitle>
                <CardCreator>{item.detail.creator.displayname}</CardCreator>
                <CardIconLine>
                    <Icon type="clock-circle"/>
                    <span>{`${item.start_time}~${item.end_time.split(' ')[1]}`}</span>
                </CardIconLine>
                <CardIconLine>
                    <Icon type="environment"/>
                    <span>{item.detail.room.name}</span>
                </CardIconLine>
                <CardAttender>
                    <strong>参会人员</strong>
                    <small>
                        {avatarListItem}
                    </small>
                </CardAttender>
                <CardOperate>
                    <span style={{marginRight: '15px', lineHeight: '30px'}}>
                        {menu}
                        {reCreate}
                    </span>
                    <MeetingStatus type={item.status}/>
                </CardOperate>
                {needCheck ? checkStateItem(item.status) : null}
                {parseInt(item.hasSeat) === 1 ? <CardSeact src={SeatImg}/> : null}
            </CardListItem>
        );
    });

    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <ContentWrapper>

                    {list && list.length > 0 ? <CardList>{listItem}</CardList> : <CustomEmpty/>}

                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );

};

export {
    MeetingCard
};
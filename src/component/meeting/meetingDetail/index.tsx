import React, {useState, Fragment, useEffect} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {CSSTransition} from 'react-transition-group';
import {useMappedState, useDispatch} from "redux-react-hook";
import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingReservationServices = new MeetingReservationServices();

import {Button, Input} from 'antd';

const {TextArea} = Input;
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        loginUserId: state.Global.loginUserId,
        detailShow: state.MeetingDetail.show,
        summaryEditMount: state.MeetingList.summaryEditShow,
        detailId: state.MeetingDetail.id,
        data: state.MeetingDetail.data,
        total: state.MeetingList.total,
        loginUser: state.Global.globalUser,
        date: state.MeetingTimePicker.date,
        addressKey: state.MeetingTimePicker.addressKey
    };
};

import {SummaryEdit} from './summaryEdit';

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowHiddenContent,
    CrowFooter
} from '@/baseUI/Crow';

import {
    DetailTabs,
    DetailContent,
    DetailTabsItem,
    DetailTabsImgWrap
} from './ui';

import {DetailMeetingBase} from "./base";
import {DetailMeetingRemark} from "./remark";
import {DetailMeetingSummary} from "./summary";
import {DetailNormalMeetingBase} from "./normalBase";

import {
    ImgBase,
    ImgBaseActive,
    ImgRemark,
    ImgRemarkActive,
    ImgSummary,
    ImgSummaryActive,
} from '@/assert/img/meeting';
import {error, success, waringConfirm, waringConfirmCustom, warning} from "@/util/golbalModalMessage";

interface MeetingDetailProps {
    type?: string;
    isAdmin?: boolean;
}

const MeetingDetail = (props: MeetingDetailProps) => {
    const dispatch = useDispatch();
    const [refuseDesc, setRefuseDesc] = useState('');
    const {
        detailShow, summaryEditMount, detailId,
        loginUserId, data, total, loginUser,
        date, addressKey
    } = useMappedState(mapState);

    const getData = (): void => {
        _meetingReservationServices.getMeetingDetailById(detailId, (res: any) => {
            dispatch({
                type: 'change meetingDetail data',
                data: res.data
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const [tabsSelect, setTabsSelect] = useState<number>(1);
    const contentItemArr: object[] = [
        <DetailMeetingBase key={1}/>,
        <DetailMeetingRemark key={2}/>,
        <DetailMeetingSummary key={3}/>,
    ];
    const contentNormalItemArr: object[] = [
        <DetailNormalMeetingBase key={1}/>,
        <DetailMeetingRemark key={2}/>,
        <DetailMeetingSummary key={3}/>,
    ];

    const cancelMeeting = (id: string) => {
        _meetingReservationServices.cancelMeeting(id, (res: any) => {
            success(`取消会议${res.message}`);
            getData();
            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
            _meetingReservationServices.getResRoomListInfo({
                locationId: addressKey,
                date: date,
                meetingType: 0
            }, (res: any) => {
                dispatch({
                    type: 'change meetingeditor hide'
                });
                dispatch({
                    type: 'change timepicker roomlist',
                    roomList: res.data
                });
            }, () => {
                warning('数据获取失败');
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
        _meetingReservationServices.passMeeting(id, params, (res: any) => {
            if (pass) {
                success(`通过会议${res.message}`);
            } else {
                success(`拒绝会议${res.message}`);
            }
            getData();

            dispatch({
                type: 'change meetingList total',
                total: total + 1
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
    };

    const replayMeeting = (id: string, status: number, force?: number) => {
        const param: any = {
            status: status
        };
        if (force) {
            param['force'] = force;
        }
        _meetingReservationServices.replayMeeting(id, param, (res: any) => {
            if (status) {
                success(`同意参加会议${res.message}`);
            } else {
                success(`拒绝参加会议${res.message}`);
            }
            getData();
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
                error(err.message ? err.message : err.toString());
            }
        });
    };

    const btnGroup = [];
    let reCreate;
    if ((loginUser && loginUser.isAdmin && loginUser.isCompanyAdmin === 'false') && props.isAdmin) {
        if (data && (data.status === '3' || data.status === '0')) {
            btnGroup.push(
                <Button type={"primary"}
                        onClick={() => {
                            dispatch({
                                type: 'change meetingDetail hide'
                            });
                            dispatch({
                                type: "change meetingeditor show"
                            });
                            dispatch({
                                type: 'change meetingeditor isEdit',
                                isEdit: 'edit',
                                id: data.id
                            });
                        }}
                        style={{marginRight: 5}}>修改</Button>
            );
            btnGroup.push(
                <Button type={"danger"} onClick={(): void => {
                    waringConfirm('警告', `确定取消会议<${data.subject}>吗？`, () => {
                        cancelMeeting(data.id);
                    });
                }}>取消</Button>
            );
        }

        if (data.status === '5') {
            reCreate = (
                <Button type={"primary"}
                onClick={() => {
                    dispatch({
                        type: "change meetingeditor show"
                    });
                    dispatch({
                        type: 'change meetingeditor isEdit',
                        isEdit: 'recreate',
                        id: data.id
                    });
                }}
                style={{marginRight: 5}} size={"small"}>重新发起</Button>
            );
        }
    } else {
        if (data && loginUserId === data.creator && (data.status === '3' || data.status === '0')) {
            btnGroup.push(
                <Button type={"primary"}
                        onClick={() => {
                            dispatch({
                                type: 'change meetingDetail hide'
                            });
                            dispatch({
                                type: "change meetingeditor show"
                            });
                            dispatch({
                                type: 'change meetingeditor isEdit',
                                isEdit: 'edit',
                                id: data.id
                            });
                        }}
                        style={{marginRight: 5}}>修改</Button>
            );
            btnGroup.push(
                <Button type={"danger"} onClick={(): void => {
                    waringConfirm('警告', `确定取消会议<${data.subject}>吗？`, () => {
                        cancelMeeting(data.id);
                    });
                }}>取消</Button>
            );
        }

        if (data.detail && data.detail.attender.map((item: any) => item.user_id).indexOf(loginUserId) !== -1 &&
            data.status === '3' && loginUserId !== data.creator && !data.attend_status) {
            btnGroup.push(
                <Button type={"primary"} onClick={() => {
                    waringConfirm('警告', `确定接受会议<${data.subject}>吗？`, () => {
                        replayMeeting(data.id, 1);
                    });

                }} style={{marginRight: 5}}>接受</Button>
            );
            btnGroup.push(
                <Button type={"danger"} onClick={() => {
                    waringConfirmCustom(`确定拒绝会议<${data.subject}>吗？`, <TextArea
                        placeholder={"拒绝请输入拒绝理由（非必填）"}
                        onChange={(e) => {
                            setRefuseDesc(e.target.value);
                        }}
                        rows={4}/>, () => {
                        replayMeeting(data.id, 0);
                    });
                }}>拒绝</Button>
            );
        }

        if (data.detail && data.detail.auditor.map((item: any) => item.user_id).indexOf(loginUserId) !== -1 &&
            data.status === '0') {
            btnGroup.push(
                <Button type={"primary"} onClick={() => {
                    waringConfirm('警告', `确定审核通过会议<${data.subject}>吗？`, () => {
                        passMeeting(data.id, 1);
                    });

                }} style={{marginRight: 5}}>同意</Button>
            );
            btnGroup.push(
                <Button type={"danger"} onClick={() => {
                    waringConfirmCustom(`确定拒绝通过会议<${data.subject}>吗？`, <TextArea
                        placeholder={"拒绝请输入拒绝理由（非必填）"}
                        onChange={(e) => {
                            setRefuseDesc(e.target.value);
                        }}
                        rows={4}/>, () => {
                        passMeeting(data.id, 0);
                    });
                }}>拒绝</Button>
            );
        }

        if (loginUserId === data.creator && data.status === '5') {
            reCreate = (
                <Button type={"primary"}
                onClick={() => {
                    dispatch({
                        type: "change meetingeditor show"
                    });
                    dispatch({
                        type: 'change meetingeditor isEdit',
                        isEdit: 'recreate',
                        id: data.id
                    });
                }}
                style={{marginRight: 5}} size={"small"}>重新发起</Button>
            );
        }
    }

    return (
        <Fragment>
            <CSSTransition
                in={detailShow}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => {
                }}
            >
                <CrowWrapper>
                    <Fragment>
                        <CSSTransition
                            in={detailShow}
                            timeout={1000}
                            appear={true}
                            onExited={() => {
                                dispatch({
                                    type: 'change meetingDetail unmount'
                                });
                            }}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>会议详情</CrowTitle>
                                    <CrowClose>
                                        <Button onClick={() => {
                                            dispatch({
                                                type: 'change meetingDetail hide'
                                            });
                                        }}
                                                shape="circle" icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowHiddenContent>
                                    <DetailTabs>
                                        <DetailTabsItem
                                            type={tabsSelect === 1 ? 'active' : ''}
                                            onClick={(e) => setTabsSelect(1)}
                                        >
                                            <DetailTabsImgWrap>
                                                <img src={tabsSelect !== 1 ? ImgBase : ImgBaseActive} alt=""/>
                                            </DetailTabsImgWrap>
                                            <strong>基本信息</strong>
                                        </DetailTabsItem>
                                        <DetailTabsItem
                                            type={tabsSelect === 2 ? 'active' : ''}
                                            onClick={(e) => setTabsSelect(2)}
                                        >
                                            <DetailTabsImgWrap>
                                                <img src={tabsSelect !== 2 ? ImgRemark : ImgRemarkActive} alt=""/>
                                            </DetailTabsImgWrap>
                                            <strong>会议签到</strong>
                                        </DetailTabsItem>
                                        <DetailTabsItem
                                            type={tabsSelect === 3 ? 'active' : ''}
                                            onClick={(e) => setTabsSelect(3)}
                                        >
                                            <DetailTabsImgWrap>
                                                <img src={tabsSelect !== 3 ? ImgSummary : ImgSummaryActive} alt=""/>
                                            </DetailTabsImgWrap>
                                            <strong>会议纪要</strong>
                                        </DetailTabsItem>
                                    </DetailTabs>
                                    <DetailContent>
                                        <Scrollbars>
                                            {props.type === 'normal' ? contentNormalItemArr[tabsSelect - 1] : contentItemArr[tabsSelect - 1]}
                                        </Scrollbars>
                                    </DetailContent>
                                </CrowHiddenContent>
                                <CrowFooter>
                                    {
                                        btnGroup
                                    }
                                    {
                                        reCreate
                                    }
                                </CrowFooter>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                    {summaryEditMount ? <SummaryEdit/> : null}
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    MeetingDetail
};
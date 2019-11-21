import * as React from 'react';
import {useState, Fragment, useEffect} from 'react';
import {Button, Spin} from 'antd';
import {CSSTransition} from 'react-transition-group';
import {useMappedState, useDispatch} from "redux-react-hook";
import {Scrollbars} from 'react-custom-scrollbars';
import MeetingReservationServices from '@/services/meetingReservationServices';

import {WrappedBaseMeetingForm} from './baseForm';
import {WrappedAttenderForm} from './attenderForm';
import {WrappedSettingsForm} from './settingForm';

import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        isEdit: state.MeetingEditor.isEdit,
        total: state.MeetingList.total,
        id: state.MeetingEditor.id,
        addressKey: state.MeetingTimePicker.addressKey,
        date: state.MeetingTimePicker.date,
        show: state.MeetingEditor.show
    };
};

const _meetingResServices = new MeetingReservationServices();

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowContent,
    CrowFooter
} from '@/baseUI/Crow';
import {error, success, waringConfirm, warning} from "@/util/golbalModalMessage";
import {SavingWrapper} from "@/baseUI/SavingWrapper";

interface EditorData {
    isAdmin: boolean;
}

function MeetingNormalEditor(props: EditorData): any {
    const dispatch = useDispatch();
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingRoom, setLoadingRoom] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const {
        isEdit,
        total,
        id,
        date,
        addressKey,
        show
    } = useMappedState(mapState);
    useEffect(() => {
        setLoadingUser(true);
        _meetingResServices.getResUserList((res: any) => {
            dispatch({
                type: 'change meetingeditor userList',
                userList: res
            });
            setLoadingUser(false);
        }, (err: any) => {
            setLoadingUser(false);
            error(err && err.message ? err.message : err.toString());
        });
        setLoadingRoom(true);
        _meetingResServices.getResMeetingRoomList((res: any) => {
            dispatch({
                type: 'change meetingeditor roomList',
                roomList: res.data
            });
            setLoadingRoom(false);
        }, (err: any) => {
            setLoadingRoom(false);
            error(err && err.message ? err.message : err.toString());
        });

        if (isEdit === 'edit' || isEdit === 'recreate') {
            setLoadingData(true);
            _meetingResServices.getMeetingDetailById(id, (res: any) => {
                console.log(res);
                dispatch({
                    type: 'change meetingeditor defaultvalues',
                    data: res.data
                });
                setLoadingData(false);
            }, () => {
                setLoadingData(false);
            });
        }
    }, [dispatch, id, isEdit]);

    let baseFormWrapper: any = null;
    let attenderFormWrapper: any = null;
    let settingsFormWrapper: any = null;

    const propsSetBaseForm = (form: any) => {
        baseFormWrapper = form;
    };
    const propsSetAttenderForm = (form: any) => {
        attenderFormWrapper = form;
    };
    const propsSetSettingsForm = (form: any) => {
        settingsFormWrapper = form;
    };
    const saveData = (force?: number): void => {
        const validateArr: boolean[] = [];
        const outArr: any = [];
        const data = {};
        baseFormWrapper.validateFields((err: any, values: any) => {
            if (!err) {
                data['subject'] = values.subject;
                data['startTime'] = `${values.meeting_date.format('YYYY-MM-DD')} ${values.meeting_time.start.format('HH:mm')}`;
                data['endTime'] = `${values.meeting_date.format('YYYY-MM-DD')} ${values.meeting_time.end.format('HH:mm')}`;
                data['roomId'] = values.address;
                data['meeting_type'] = 0;
                data['leaders'] = values.chairperson ? values.chairperson.map((item: string): string => {
                    return item.split(':')[0];
                }) : [];

                validateArr.push(true);
            } else {
                validateArr.push(false);
            }
        });

        attenderFormWrapper.validateFields((err: any, values: any) => {
            if (!err) {
                data['attenders'] = values.attend.map((item: string): string => {
                    return item.split(':')[0];
                });
                values.exterior.map((item: any): any => {
                    if(item.name){
                        outArr.push(item);
                    }
                });
                data['external'] = outArr;
                validateArr.push(true);
            } else {
                validateArr.push(false);
            }
        });

        settingsFormWrapper.validateFields((err: any, values: any) => {
            if (!err) {
                data['checkin'] = values.meeting_signin;
                data['checkinAheadMinute'] = values.signin_time;
                data['smsTime'] = values.begin_remind.join(',');
                data['smsType'] = values.smsType.join(',');
                data['endSmsTime'] = values.end_remind.join(',');
                data['checkinStopMinute'] = values.end_sign_time ? values.end_sign_time.format('HH:mm') : '';
                data['files'] = values.file ? values.file.map((item: any) => {
                    return item.item ? item.item : item.response;
                }) : [];
                data['summary'] = values.description;
                data['agenda'] = values.agenda && values.agenda.map((item: any) => {
                    return {
                        name: item.name,
                        time: item.time.format('HH:mm')
                    };
                });
                validateArr.push(true);
            } else {
                validateArr.push(false);
            }
        });

        if (validateArr.every(item => item)) {
            if (force) {
                data['force'] = force;
            }
            setSaveLoading(true);
            if (isEdit === 'edit') {
                _meetingResServices.updateMeetingWithAgenda(id, data, (res: any) => {
                    setSaveLoading(false);
                    dispatch({
                        type: 'change meetingeditor hide'
                    });
                    success('保存成功');
                    if (props.isAdmin) {
                        dispatch({
                            type: 'change meetingRecord total',
                            total: total + 1
                        });
                    } else {
                        dispatch({
                            type: 'change meetingList total',
                            total: total + 1
                        });
                    }
                }, (err: any) => {
                    setSaveLoading(false);
                    if (err.data && err.data.name) {
                        waringConfirm('重复确认', `存在会议时间冲突的人员${err.data.name}，确定继续邀请吗？`, () => {
                            saveData(1);
                        });
                    } else {
                        error(err.message ? err.message : err.toString());
                    }
                });
            } else {
                _meetingResServices.addMeetingWithAgenda(data, (res: any) => {
                    setSaveLoading(false);
                    success('保存成功');
                    if (props.isAdmin) {
                        dispatch({
                            type: 'change meetingRecord total',
                            total: total + 1
                        });
                    } else {
                        dispatch({
                            type: 'change meetingList total',
                            total: total + 1
                        });
                    }
                    _meetingResServices.getResRoomListInfo({
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
                    setSaveLoading(false);
                    console.log(err);
                    if (err.data && err.data.name) {
                        waringConfirm('重复确认', `存在会议时间冲突的人员${err.data.name}，确定继续邀请吗？`, () => {
                            saveData(1);
                        });
                    } else {
                        error(err.message ? err.message : err.toString());
                    }
                });
            }
        }
    };
    const saveMeeting = (): void => {
        saveData();
    };

    return (
        <Fragment>
            <CSSTransition
                in={show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => {
                    dispatch({
                        type: 'change meetingeditor unmount'
                    });
                    dispatch({
                        type: 'change timepicker restore'
                    });
                }}
            >
                <CrowWrapper>
                    {
                        saveLoading ? <SavingWrapper>
                            <Spin tip={"正在执行数据同步...."} spinning={saveLoading}/>
                        </SavingWrapper> : null
                    }
                    <Fragment>
                        <CSSTransition
                            in={show}
                            timeout={1000}
                            appear={true}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>{isEdit === 'edit' ? `修改会议` : `发起会议`}</CrowTitle>
                                    <CrowClose>
                                        <Button onClick={() => {
                                            dispatch({
                                                type: 'change meetingeditor hide'
                                            });
                                        }} shape={"circle"} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars autoHide>
                                        <Spin spinning={!(!loadingUser && !loadingRoom && !loadingData)}
                                              style={{
                                                  position: 'fixed',
                                                  width: '100%',
                                                  height: '100%',
                                                  lineHeight: '100%'
                                              }}>
                                            <WrappedBaseMeetingForm propsSetBaseForm={propsSetBaseForm}/>
                                            <WrappedAttenderForm propsSetAttenderForm={propsSetAttenderForm}/>
                                            <WrappedSettingsForm propsSettingsForm={propsSetSettingsForm}/>
                                        </Spin>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooter className={"meeting-res-add-footer"}>
                                    <Button type={"primary"}
                                            onClick={() => saveMeeting()}>{isEdit === 'edit' ? `保存修改` : `发起会议`}</Button>
                                </CrowFooter>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    MeetingNormalEditor
};
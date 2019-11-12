import * as React from 'react';
import {useState, Fragment, useEffect} from 'react';
import {Button, Icon, Spin} from 'antd';
import {CSSTransition} from 'react-transition-group';
import {useMappedState, useDispatch} from "redux-react-hook";
import {Scrollbars} from 'react-custom-scrollbars';
import MeetingReservationServices from '@/services/meetingReservationServices';
import {SavingWrapper} from '@/baseUI/SavingWrapper';
import {IState} from "@/store";
import {success, error} from '@/util/golbalModalMessage';

const mapState = (state: IState) => {
    return {
        isEdit: state.MeetingEditor.isEdit
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

import {
    ThemeOrange
} from '@/baseUI/ButtonWrap';

import {
    FormBase
} from './ui';

import {WrappedBaseMeetingResForm} from './form';

import {WrappedBaseAgendaForm} from './agenda';

interface EditorData {
    type: string;
    startTime: string;
    endTime: string;
    closeFun: any;
    in: boolean;
    propsAgendaCount: number;
    editorOnExited: any;
}

function MeetingEditor(props: EditorData): any {
    const dispatch = useDispatch();
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingRoom, setLoadingRoom] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [agendaList, setAgendaList] = useState([{}]);
    const [saveLoading, setSaveLoading] = useState(false);
    const {
        isEdit
    } = useMappedState(mapState);

    useEffect(() => {
        setLoadingUser(true);
        _meetingResServices.getResUserList((res: any) => {
            dispatch({
                type: 'change meetingeditor userList',
                userList: res
            });
            setLoadingUser(false);
        }, () => {
            setLoadingUser(false);
        });
        setLoadingRoom(true);
        _meetingResServices.getResMeetingRoomList((res: any) => {
            dispatch({
                type: 'change meetingeditor roomList',
                roomList: res.data
            });
            setLoadingRoom(false);
        }, () => {
            setLoadingRoom(false);
        });
        if (isEdit) {
            setLoadingData(true);
            _meetingResServices.getResMeetingById({
                id: 1
            }, (res: any) => {
                dispatch({
                    type: 'change meetingeditor defaultvalues',
                    id: res.data.id,
                    subject: res.data.subject,
                    date: res.data.date,
                    address: res.data.address,
                    chairperson: res.data.chairperson,
                    checkperson: res.data.checkperson,
                    attender: res.data.attender,
                    circle: res.data.circle,
                    circleDate: res.data.circleDate,
                    isRemark: res.data.isRemark,
                    remind: res.data.remind,
                    remarkTime: res.data.remarkTime,
                    fileList: res.data.fileList,
                    description: res.data.description,
                    agenda: res.data.agenda,
                    status: res.data.status
                });
                setLoadingData(false);
            }, () => {
                setLoadingData(false);
            });
        }
    }, [dispatch, isEdit]);

    const addAgenda = () => {
        const newAgenda = agendaList.slice();
        newAgenda.push({});
        setAgendaList(newAgenda);
    };

    let baseFormWrapper: any = null;
    const agendaFormWrapper: any = [];

    const removeAgenda = (index: number): void => {
        const newAgenda = agendaList.slice();
        newAgenda.splice(index, 1);
        setAgendaList(newAgenda);
    };

    const propsSetBaseForm = (form: any) => {
        baseFormWrapper = form;
    };

    const propsSetAgendaForm = (form: any, index: number) => {
        agendaFormWrapper[index] = form;
    };

    const saveData = (add: boolean): void => {
        const validateArr: boolean[] = [];
        const data = {};
        baseFormWrapper.validateFields((err: any, values: any) => {
            if (!err) {
                data['subject'] = values.subject;
                data['startTime'] = `${values.meeting_date.format('YYYY-MM-DD')} ${values.meeting_time.start.format('HH:mm')}`;
                data['endTime'] = `${values.meeting_date.format('YYYY-MM-DD')} ${values.meeting_time.end.format('HH:mm')}`;
                data['roomId'] = values.address;
                data['checkin'] = values.meeting_signin;
                data['checkinAheadMinute'] = values.signin_time;
                data['endSmsTime'] = values.end_remind;
                data['meeting_type'] = 1;
                data['files'] = values.file.map((item: any) => {
                    return item.response;
                });
                validateArr.push(true);
            } else {
                validateArr.push(false);
            }
        });
        data['agenda'] = [];
        for (let i = 0; i < agendaFormWrapper.length; i++) {
            agendaFormWrapper[i].validateFields((err: any, values: any) => {
                if (!err) {
                    data['agenda'].push({
                        'leader': values.chairperson,
                        'time': values.agenda_time.format('HH:mm'),
                        'content': values.description,
                        'attenders': values.attend.map((item: string): string => {
                            return item.split(':')[0];
                        })
                    });
                    validateArr.push(true);
                } else {
                    validateArr.push(false);
                }
            });
        }
        if (validateArr.every(item => item)) {
            setSaveLoading(true);
            if (add) {
                _meetingResServices.addMeetingWithAgenda(data, (res: any) => {
                    setSaveLoading(false);
                    success('保存成功');
                    props.closeFun();
                }, (err: any) => {
                    setSaveLoading(false);
                    error(err);
                });
            } else {
                _meetingResServices.addMeetingTempWithAgenda(data, (res: any) => {
                    setSaveLoading(false);
                    success('保存成功');
                    props.closeFun();
                }, (err: any) => {
                    setSaveLoading(false);
                    error(err);
                });
            }
        }
    };

    const saveMeeting = (): void => {
        saveData(true);
    };
    const saveTemplate = (): void => {
        saveData(false);
    };

    const agendaListItem = [];
    for (let i = 0; i < agendaList.length; i++) {
        agendaListItem.push(<WrappedBaseAgendaForm
            data={agendaList[i]}
            propsSetAgendaForm={(form: any, index: any) => propsSetAgendaForm(form, index)}
            hasDelete={agendaList.length !== 1}
            deleteAction={(index: number) => removeAgenda(index)}
            index={i + 1}
            key={i}/>);
    }

    return (
        <Fragment>
            <CSSTransition
                in={props.in}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={props.editorOnExited}
            >
                <CrowWrapper>
                    {
                        saveLoading ? <SavingWrapper>
                            <Spin tip={"正在执行数据同步...."} spinning={saveLoading}/>
                        </SavingWrapper> : null
                    }
                    <Fragment>
                        <CSSTransition
                            in={props.in}
                            timeout={1000}
                            appear={true}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>发起会议</CrowTitle>
                                    <CrowClose>
                                        <Button onClick={props.closeFun} shape={"circle"} icon={"close"}/>
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
                                            <FormBase className={"meeting-res-add-base"}>
                                                <WrappedBaseMeetingResForm propsSetBaseForm={propsSetBaseForm}/>
                                            </FormBase>
                                            <div>
                                                {agendaListItem}
                                            </div>
                                            <Button type="dashed" style={{width: '400px', marginLeft: '50px'}}
                                                    onClick={addAgenda}>
                                                <Icon type="plus"/>添加议程
                                            </Button>
                                        </Spin>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooter className={"meeting-res-add-footer"}>
                                    <ThemeOrange>
                                        <Button type={"primary"} onClick={() => saveTemplate()}>保存为模板</Button>
                                    </ThemeOrange>
                                    <Button type={"primary"} onClick={() => saveMeeting()}>发起会议</Button>
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
    MeetingEditor
};
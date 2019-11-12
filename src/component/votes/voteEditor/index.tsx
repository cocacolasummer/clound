import React, {Fragment, useEffect, useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {CrowClose, CrowContent, CrowFooter, CrowHeader, CrowTitle, CrowWrapper, RightCrow} from "@/baseUI/Crow";
import {Button, Spin} from "antd";
import {Scrollbars} from "react-custom-scrollbars";

import {WrappedVoteForm} from './form';
import {useDispatch} from "redux-react-hook";
import MeetingReservationServices from "@/services/meetingReservationServices";
import {error, success} from "@/util/golbalModalMessage";
const _meetingResServices = new MeetingReservationServices();
import VoteServices from '@/services/voteServices';
import {SavingWrapper} from "@/baseUI/SavingWrapper";

const _voteService = new VoteServices();

interface VoteEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const VoteEditor: React.ComponentType<VoteEditorProps> = (props: VoteEditorProps) => {
    const dispatch = useDispatch();
    const formRef: any = useRef();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        _meetingResServices.getResUserList((res: any) => {
            dispatch({
                type: 'change voteeditor userList',
                userList: res
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, []);
    const saveVote = () => {
        const form = formRef.current.getForm();
        form.validateFields((errs: any, values: any) => {
            if(!errs) {
                setLoading(true);
                _voteService.postNewVote({
                    anonymous: values.anonymous,
                    attenders: values.attenders.map((item: any) => item.split(':')[0].toString()),
                    chooseType: values.selectCount,
                    endTime: values.startEndTime[1].format('YYYY-MM-DD HH:mm:ss'),
                    meetingId: values.meeting,
                    options: values.options,
                    startTime: values.startEndTime[0].format('YYYY-MM-DD HH:mm:ss'),
                    statisticalGraph: values.statisticalGraph,
                    subject: values.subject
                }, (res: any) => {
                    success('添加投票成功');
                    setLoading(false);
                    props.close();

                }, (err: any) => {
                    setLoading(false);
                    error(err && err.message ? err.message : err.toString());
                });
            }
        });
    };
    return (
        <Fragment>
            <CSSTransition
                in={props.show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={() => props.unmount()}
            >
                <CrowWrapper>
                    {
                        loading ? <SavingWrapper>
                            <Spin tip={"正在执行数据同步...."} spinning={loading}/>
                        </SavingWrapper> : null
                    }
                    <Fragment>
                        <CSSTransition
                            in={props.show}
                            timeout={1000}
                            appear={true}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>发起投票</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={() => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <Scrollbars autoHide>
                                        <Spin spinning={false}
                                              style={{
                                                  position: 'fixed',
                                                  width: '100%',
                                                  height: '100%',
                                                  lineHeight: '100%'
                                              }}>
                                            <WrappedVoteForm ref={formRef}/>
                                        </Spin>
                                    </Scrollbars>
                                </CrowContent>
                                <CrowFooter className={"meeting-res-add-footer"}>
                                    <Button type={"primary"} onClick={() => {
                                        saveVote();
                                    }}>发起投票</Button>
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
    VoteEditor
};
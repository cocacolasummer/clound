import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Fragment} from 'react';
import {Avatar, Carousel, Button, Typography, Progress} from 'antd';

const {Title} = Typography;
import {CustomEmpty} from "@/component/customEmpty";
import QRCode from 'qrcode.react';
import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingReservationServices = new MeetingReservationServices();
import {error} from '@/util/golbalModalMessage';

import {
    DetailBaseWrapper,
    DetailRemarkQR,
    DetailRemarkUserList,
    DetailRemarkUserTitle,
    DetailRemarkUser
} from './ui';

import {
    ImgBeforeBegin,
    ImgNotRemark
} from '@/assert/img/meeting/detail';
import {IState} from '@/store';
import {useDispatch, useMappedState} from "redux-react-hook";
import moment from "moment";

const mapState = (state: IState) => {
    return {
        id: state.MeetingDetail.id,
        data: state.MeetingDetail.data,
        qrcode: state.MeetingDetail.qrcode,
        remarkList: state.MeetingDetail.remarkList
    };
};

function DetailMeetingRemark() {
    const dispatch = useDispatch();
    const {
        data,
        id,
        remarkList,
        qrcode
    } = useMappedState(mapState);
    const cal: any = useRef(null);

    useEffect(() => {
        _meetingReservationServices.getQRcodeByMeetingId(id, (res: any) => {
            dispatch({
                type: 'change meetingDetail qrcode',
                qrcode: res.data.code
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
        _meetingReservationServices.getRemarkDetailList(id, (res: any) => {
            dispatch({
                type: 'change meetingDetail remarkList',
                remarkList: res.data
            });
        }, (err: any) => {
            error(err.message ? err.message : err.toString());
        });
    }, [dispatch, id]);
    const remarkStateItem = (status: string, msg?: string, startTime?: string, QRValue?: string, aheadTime?: number) => {
        const agendaShow = msg && (<span>{msg}</span>);
        let stat;
        const beginRemark = moment(startTime).subtract(aheadTime, "minutes");
        const nowDate = moment(new Date());
        if (['0', '2', '6', '7'].indexOf(data.status) === -1) {
            if (status === '0') {
                stat = 1;
            } else if (status === '1' && nowDate.isBefore(beginRemark)) {
                stat = 2;
            } else if (status === '1' && beginRemark.isBefore(nowDate) && data.status !== '5') {
                stat = 3;
            } else if (status === '1' && data.status === '5') {
                stat = 4;
            }
        } else {
            stat = 5;
        }

        switch (stat) {
            case 1: {
                return (<DetailRemarkQR>
                    <img src={ImgNotRemark} alt=""/>
                    <span>本次会议无需签到</span>
                    {agendaShow}
                </DetailRemarkQR>);
            }
            case 2: {
                return (<DetailRemarkQR>
                    <img src={ImgBeforeBegin} alt=""/>
                    <time>{beginRemark.format("YYYY-MM-DD HH:mm")}</time>
                    <span>未到签到时间哦</span>
                    {agendaShow}
                </DetailRemarkQR>);
            }
            case 3: {
                return (<DetailRemarkQR>
                    <QRCode
                        value={QRValue ? QRValue : ''}
                        size={300}
                        fgColor="#000000"
                    />
                    <span>APP扫码签到</span>
                    {agendaShow}
                </DetailRemarkQR>);
            }
            case 4: {
                return (
                    <DetailRemarkQR>
                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            format={(percent) => {
                                return (
                                    <Fragment>
                                        <Title>{percent + '%'}</Title>
                                        <Title level={3}>签到率</Title>
                                    </Fragment>
                                );
                            }}
                            width={300} strokeWidth={10} type="circle"
                            percent={remarkList && Math.ceil((remarkList.filter((item: any) => item.checkin_time).length / remarkList.length) * 100)}/>
                        <span>签到已停止</span>
                    </DetailRemarkQR>
                );
            }
        }
        return <CustomEmpty/>;
    };
    let contentItem;
    if (data.meeting_type !== '1') {
        contentItem = (
            <div>
                {remarkStateItem(data.checkin, '', data.start_time, qrcode, parseInt(data.checkin_ahead_minute))}
                {
                    (data.checkin === '1' && ['0', '2', '6', '7'].indexOf(data.status) === -1) ? <DetailRemarkUserList>
                        <DetailRemarkUserTitle>
                            <strong>已签到:</strong><span>{remarkList && remarkList.filter((item: any) => item.checkin_time).length}</span>
                        </DetailRemarkUserTitle>
                        <DetailRemarkUser>
                            {
                                remarkList && remarkList.filter((item: any) => item.checkin_time).map((item: any, index: number) => {
                                    return (
                                        <strong
                                            style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                                            key={index}>
                                            <Avatar src={item.avatar}/>
                                            <small>{item.displayname}</small>
                                        </strong>
                                    );
                                })
                            }
                        </DetailRemarkUser>
                        <DetailRemarkUserTitle>
                            <strong>未签到:</strong><span>{remarkList && remarkList.filter((item: any) => !item.checkin_time).length}</span>
                        </DetailRemarkUserTitle>
                        <DetailRemarkUser>
                            {
                                remarkList && remarkList.filter((item: any) => !item.checkin_time).map((item: any, index: number) => {
                                    return (
                                        <strong
                                            style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                                            key={index}>
                                            <Avatar src={item.avatar}/>
                                            <small>{item.displayname}</small>
                                        </strong>
                                    );
                                })
                            }
                        </DetailRemarkUser>
                    </DetailRemarkUserList> : null
                }
            </div>
        );
    }

    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <DetailBaseWrapper>
                    {data.agenda.length > 1 && data.meeting_type === '1' ? <Button size={"large"}
                                                                                   style={{
                                                                                       position: "absolute",
                                                                                       top: 170,
                                                                                       left: 50,
                                                                                       zIndex: 1001
                                                                                   }}
                                                                                   onClick={() => {
                                                                                       cal.current.prev();
                                                                                   }}
                                                                                   shape="circle" icon="left"/> : null}
                    {data.agenda.length > 1 && data.meeting_type === '1' ? <Button size={"large"}
                                                                                   style={{
                                                                                       position: "absolute",
                                                                                       top: 170,
                                                                                       right: 50,
                                                                                       zIndex: 1001
                                                                                   }}
                                                                                   onClick={() => {
                                                                                       cal.current.next();
                                                                                   }}
                                                                                   shape="circle" icon="right"/> : null}
                    <Carousel dots={false} ref={cal}>
                        {contentItem}
                    </Carousel>
                </DetailBaseWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    DetailMeetingRemark
};
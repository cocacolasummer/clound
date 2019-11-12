import React, {Fragment, useEffect, useRef, useState} from "react";
import {Radio, Spin, DatePicker, Button, Popover} from 'antd';
import {CustomEmpty} from '@/component/customEmpty';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import {CustomScrollBar} from './SpringScrollBar';
import {error, warning} from '@/util/golbalModalMessage';

import TimePickUtil from '@/util/timePickUtil';

const _timePickUtil = new TimePickUtil();

import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingResServices = new MeetingReservationServices();

import {
    UICol,
    UIRow
} from '@/baseUI/Grid';

import {
    SectionTimeWrapper,
    WrapperTimePick,
    WrapperTimeSet,
    WrapperTimeScale,
    TimeScale,
    TimeSelectSpan,
    TimeOPWrapper,
    TimeOPListWrapper,
    RoomAddressWrapper,
    TimeHeaderOPRight,
    ColorShowLabel,
    TimeColorShow,
    ColorShow,
    RoomNameWrapper,
    RoomName,
    MoreWrapper
} from './ui';

import {
    PageHeaderWrapper
} from "@/baseUI/PageHeaderWrapper";

import {useMappedState, useDispatch} from "redux-react-hook";
import {IState} from '@/store';
import {MeetingRoom} from "@/store/meeting/meetingTimePicker";

const mapState = (state: IState) => {
    return {
        roomList: state.MeetingTimePicker.roomList,
        startIndex: state.MeetingTimePicker.startIndex,
        endIndex: state.MeetingTimePicker.endIndex,
        selectedEnabled: state.MeetingTimePicker.selectedEnabled,
        selectRoom: state.MeetingTimePicker.selectRoom,
        addressList: state.MeetingTimePicker.addressList,
        addressKey: state.MeetingTimePicker.addressKey,
        date: state.MeetingTimePicker.date,
        showMore: state.MeetingTimePicker.showMore,
        showMeeting: state.MeetingTimePicker.showMeeting
    };
};

import {DeviceImg, VRImg} from '@/assert/img/meeting';

const dateFormat = 'YYYY年MM月DD日';

interface MeetingTimePickerProps {
    type?: string;
}

const MeetingTimePicker = (props: MeetingTimePickerProps) => {
    const dispatch = useDispatch();
    const scrollBar: any = useRef();
    const [deviceHover, setDeviceHover] = useState();
    const [deviceShow, setDeviceShow] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        roomList, startIndex,
        selectRoom, addressKey, addressList, date,
        endIndex, selectedEnabled, showMore, showMeeting
    } = useMappedState(mapState);

    const showMeetingContent = (
        <Fragment>
            {
                showMeeting && showMeeting.detail ? <Fragment>
                    <p><strong>预约人：</strong>{showMeeting.detail && showMeeting.detail.creator.displayname}</p>
                    <p><strong>预约时间：</strong>{showMeeting && `${showMeeting.start_time}~${showMeeting.end_time}`}</p>
                    <p><strong>会议室：</strong>{showMeeting.detail && showMeeting.detail.room.name}</p>
                </Fragment> : <CustomEmpty/>
            }
        </Fragment>
    );

    const selectValInUsed = (i: number, timeUsed: any) => {
        const roomUsedIndexArr = [];
        const selectIndexArr = [];
        if (timeUsed) {
            for (let i = 0; i < timeUsed.length; i++) {
                const startTimeArr = timeUsed[i].start_time.split(':');
                const endTimeArr = timeUsed[i].end_time.split(':');
                const startIndexO = parseInt(startTimeArr[0]) * 4
                    + Math.floor(parseInt(startTimeArr[1]) / 15);
                const endIndexO = (parseInt(endTimeArr[0])) * 4 + parseInt(endTimeArr[1]) / 15;
                for (let j = startIndexO; j < endIndexO; j++) {
                    roomUsedIndexArr.push(j);
                }
            }
        }
        let startIndexN = -1;
        let endIndexN = -1;
        if (i >= startIndex) {
            startIndexN = startIndex;
            endIndexN = i;
        } else {
            startIndexN = i;
            endIndexN = startIndex;
        }
        for (let i = startIndexN; i < endIndexN; i++) {
            selectIndexArr.push(i);
        }
        const roomUsedIndexSet = new Set(roomUsedIndexArr);
        const selectIndexSet = new Set(selectIndexArr);
        const result = new Set([...roomUsedIndexSet].filter(x => selectIndexSet.has(x)));
        return result.size === 0;
    };

    useEffect(() => {
        if (deviceHover) {
            _meetingResServices.getRoomDeviceById((res: any) => {
                setDeviceShow(res.data.data.filter((item: any) => {
                    return item.belong == deviceHover;
                }));
            }, (err: any) => {
                warning(err);
            });
        }
    }, [deviceHover]);
    useEffect(() => {
        _meetingResServices.getResAddressListInfo((res: any) => {
            dispatch({
                type: 'init timepicker addresslist',
                addressList: res.data
            });
        }, () => {
            warning('数据获取失败');
        });
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        const meetingType = props.type === 'normal' ? 0 : 1;
        _meetingResServices.getResRoomListInfo({
            locationId: addressKey,
            date: date,
            meetingType: meetingType
        }, (res: any) => {
            dispatch({
                type: 'change timepicker roomlist',
                roomList: res.data
            });
            setLoading(false);
        }, () => {
            warning('数据获取失败');
            setLoading(false);
        });
    }, [addressKey, date, dispatch, props.type]);

    useEffect(() => {
        const date = moment(new Date()).format('HH:mm');
        const index = _timePickUtil.timeStringToIndex(date);
        scrollBar.current && scrollBar.current.scrollLeft(index * 25);
    }, [roomList]);

    const selectRoomFn = (id: string | number): any => {
        for (let i = 0; i < roomList.length; i++) {
            if (id == roomList[i].id) {
                return roomList[i];
            }
        }
    };

    const roomTimeClick = (e: any) => {
        const type = e.target.getAttribute('data-type');
        const roomId = parseInt(e.currentTarget.getAttribute('data-roomid'));
        if (['enabled', 'selected'].indexOf(type) === -1) {
            return;
        }
        if (!selectedEnabled) {
            dispatch({
                type: 'change timepicker select',
                selectRoom: parseInt(e.currentTarget.getAttribute('data-roomid')),
                startIndex: parseInt(e.target.getAttribute('data-index')),
                endIndex: parseInt(e.target.getAttribute('data-index')),
                selectedEnabled: true
            });
        } else {
            if (parseInt(e.currentTarget.getAttribute('data-roomid')) !== selectRoom) {
                warning('请选择同一会议室的时间段');
                dispatch({
                    type: 'change timepicker select',
                    selectRoom: null,
                    startIndex: -1,
                    endIndex: -1,
                    selectedEnabled: false
                });
                return;
            }
            if (selectValInUsed(parseInt(e.target.getAttribute('data-index')), selectRoomFn(roomId) && selectRoomFn(roomId).usage.appointTime)) {
                dispatch({
                    type: 'select timepicker complete',
                    endIndex: parseInt(e.target.getAttribute('data-index')),
                    selectedEnabled: false
                });
                dispatch({
                    type: 'change meetingeditor isEdit',
                    isEdit: 'add',
                    id: ''
                });
                dispatch({
                    type: "change meetingeditor show"
                });
            } else {
                warning('选择的时间段中存在已被占用时间，请重新选择');
                dispatch({
                    type: 'change timepicker select',
                    selectRoom: null,
                    startIndex: -1,
                    endIndex: -1,
                    selectedEnabled: false
                });
            }
        }

    };
    const roomTimeMouseMove = (e: any) => {
        if (selectedEnabled) {
            const roomId: number = parseInt(e.currentTarget.getAttribute('data-roomid'));
            const room: MeetingRoom = selectRoomFn(roomId);
            if (roomId === selectRoom && ['enabled', 'selected'].indexOf(e.target.getAttribute('data-type')) !== -1 &&
                selectValInUsed(parseInt(e.target.getAttribute('data-index')),
                    room && room.appointTime)) {
                dispatch({
                    type: 'mouse timepicker move',
                    endIndex: parseInt(e.target.getAttribute('data-index'))
                });
            }
        }
    };
    const roomTimeMouseOut = (e: any) => {
        if (selectedEnabled) {
            dispatch({
                type: 'mouse timepicker move',
                endIndex: startIndex
            });
        }
    };

    // 地址标签列表生成
    const addressListItem = addressList.map((item, index) => {
        return (
            <Radio.Button value={item.id} key={index}>{item.name}</Radio.Button>
        );
    });

    // 控制列表长度
    const roomTempList = !showMore && (roomList && roomList.length > 5) ? roomList.slice(0, 5) : roomList;

    // 时间选择列表生成
    const roomListItem = (roomTempList && roomTempList.length) && roomTempList.map((item: any, index) => {
        const roomInfo = new Array(96);
        if (item.usage.spareTime) {
            for (let i = 0; i < item.usage.spareTime.length; i++) {
                const startTimeArr = item.usage.spareTime[i].start_time.split(':');
                const endTimeArr = item.usage.spareTime[i].end_time.split(':');
                const startIndexItem = parseInt(startTimeArr[0]) * 4
                    + Math.ceil(parseInt(startTimeArr[1]) / 15);
                const endIndexItem = (parseInt(endTimeArr[0])) * 4 + parseInt(endTimeArr[1]) / 15;
                for (let j = startIndexItem; j < endIndexItem; j++) {
                    roomInfo[j] = 'enabled';
                }
            }
        }
        if (item.usage.appointTime) {
            for (let i = 0; i < item.usage.appointTime.length; i++) {
                const startTimeArr = item.usage.appointTime[i].start_time.split(':');
                const endTimeArr = item.usage.appointTime[i].end_time.split(':');
                const startIndexItem = parseInt(startTimeArr[0]) * 4
                    + Math.floor(parseInt(startTimeArr[1]) / 15);
                const endIndexItem = (parseInt(endTimeArr[0])) * 4 + parseInt(endTimeArr[1]) / 15;
                for (let j = startIndexItem; j < endIndexItem; j++) {
                    roomInfo[j] = 'used';
                }
            }
        }
        if (item.usage.forbiddenTime) {
            for (let i = 0; i < item.usage.forbiddenTime.length; i++) {
                const startTimeArr = item.usage.forbiddenTime[i].start_time.split(':');
                const endTimeArr = item.usage.forbiddenTime[i].end_time.split(':');
                const startIndexItem = parseInt(startTimeArr[0]) * 4
                    + Math.floor(parseInt(startTimeArr[1]) / 15);
                const endIndexItem = (parseInt(endTimeArr[0])) * 4 + parseInt(endTimeArr[1]) / 15;
                for (let j = startIndexItem; j < endIndexItem; j++) {
                    roomInfo[j] = 'disabled';
                }
            }
        }
        if (item.id == selectRoom) {
            if (startIndex > endIndex) {
                for (let i = endIndex; i < startIndex + 1; i++) {
                    (roomInfo[i] === 'enabled') && (roomInfo[i] = 'selected');
                }
            } else {
                for (let i = startIndex; i < endIndex + 1; i++) {
                    (roomInfo[i] === 'enabled') && (roomInfo[i] = 'selected');
                }
            }
        }

        const timeSetItem = roomInfo.map((item, index) => {
            if (item === 'used') {
                return (
                    <Popover title={'会议信息'} content={showMeetingContent}>
                        <TimeSelectSpan
                            onMouseEnter={(e: any) => {
                                _meetingResServices.getMeetingByTimeInterval({
                                    roomId: e.target.parentNode.getAttribute('data-roomId'),
                                    startTime: `${date} ${_timePickUtil.indexToTimeString(index, true)}:00`,
                                    endTime: `${date} ${_timePickUtil.indexToTimeString(index + 1, true)}:00`,
                                }, (res: any) => {
                                    dispatch({
                                        type: 'change timepicker showMeeting',
                                        showMeeting: res.data
                                    });
                                }, (err: any) => {
                                    error(err && err.message ? err.message : err.toString());
                                });
                            }}
                            type={item}
                            data-type={item}
                            key={index}
                            data-index={index}/>
                    </Popover>
                );
            }
            return (
                <TimeSelectSpan type={item}
                                data-type={item}
                                key={index}
                                data-index={index}/>
            );
        });
        return (
            <WrapperTimeSet key={index} onMouseOver={(e) => roomTimeMouseMove(e)}
                            onMouseLeave={(e) => roomTimeMouseOut(e)}
                            onClick={(e) => roomTimeClick(e)} data-roomid={item.id}>
                {timeSetItem}
            </WrapperTimeSet>
        );
    });

    // 时间刻度生成
    const roomListTimeSetArr = [];
    for (let i = 0; i < 24; i++) {
        const timeStr = i < 10 ? '0' + i + ':00' : i + ':00';
        roomListTimeSetArr.push(
            <TimeScale key={i}>{timeStr}</TimeScale>
        );
    }
    const roomListTimeSet = <QueueAnim delay={200} component={WrapperTimeScale}>{roomListTimeSetArr}</QueueAnim>;

    // 会议室名称列表生成
    const roomNameListItem = (roomTempList && roomTempList.length) && roomTempList.map((item, index) => {
        return (
            <RoomName key={index}>{item.name}</RoomName>
        );
    });
    const roomNameList = <QueueAnim delay={200} component={RoomNameWrapper}>{roomNameListItem}</QueueAnim>;

    // 会议室对应操作列表
    const roomLinkListItem = (roomTempList && roomTempList.length) && roomTempList.map((item: any, index) => {
        const content = (
            <div>
                {
                    (deviceShow && deviceShow.length > 0) ? deviceShow.map((item: any, index: number) => {
                        return (
                            <p key={index}>{item.name}</p>
                        );
                    }) : <CustomEmpty/>
                }

            </div>
        );
        return (
            <TimeOPWrapper key={index}>
                <Popover content={content} title="设备列表">
                    <Button onMouseEnter={(e) => {
                        setDeviceHover(item.id);
                    }}><img src={DeviceImg} alt=""/></Button>
                </Popover>
                <Button onClick={(e): void => {
                    if (!item.vr_link) {
                        warning('该会议室没有VR链接');
                    } else {
                        const a = document.createElement('a');
                        a.target = '_blank';
                        a.href = item.vr_link;
                        a.click();
                    }
                }}><img src={VRImg} alt=""/></Button>
            </TimeOPWrapper>
        );
    });
    const roomLinkList = <QueueAnim delay={200} component={TimeOPListWrapper}>{roomLinkListItem}</QueueAnim>;

    return (
        <SectionTimeWrapper>
            <Spin spinning={loading}>
                <PageHeaderWrapper>
                    <RoomAddressWrapper>
                        <Radio.Group value={addressKey} onChange={e => dispatch({
                            type: 'change timepicker address',
                            addressKey: e.target.value
                        })}>
                            <Radio.Button value="">所有</Radio.Button>
                            {addressListItem}
                        </Radio.Group>
                    </RoomAddressWrapper>
                    <TimeHeaderOPRight>
                        <DatePicker allowClear={false} onChange={(date: any) => dispatch(
                            {
                                type: 'change timepicker date',
                                date: date.format('YYYY-MM-DD')
                            }
                        )} value={moment(date, dateFormat)} format={dateFormat}/>
                    </TimeHeaderOPRight>
                </PageHeaderWrapper>
                <TimeColorShow>
                    <ColorShowLabel><ColorShow type={"disabled"}/>禁用</ColorShowLabel>
                    <ColorShowLabel><ColorShow type={"enabled"}/>可用</ColorShowLabel>
                    <ColorShowLabel><ColorShow type={"used"}/>占用</ColorShowLabel>
                </TimeColorShow>
                {
                    roomTempList && roomTempList.length > 0 ? <UIRow>
                        <UICol span={3}>
                            {roomNameList}
                        </UICol>
                        <UICol span={19}>
                            <CustomScrollBar ref={scrollBar}>
                                <QueueAnim delay={100} component={WrapperTimePick}>
                                    {roomListTimeSet}
                                    {roomListItem}
                                </QueueAnim>
                            </CustomScrollBar>
                        </UICol>
                        <UICol span={2}>
                            {roomLinkList}
                        </UICol>
                    </UIRow> : <CustomEmpty/>
                }
                {
                    roomList && roomList.length <= 5 || !roomList ? null : <MoreWrapper>
                        <Button type="primary"
                                onClick={(): void => {
                                    dispatch({
                                        type: 'change timepicker showMore',
                                        showMore: !showMore
                                    });
                                }}
                                icon={showMore ? "up-circle" : "down-circle"}>
                            {showMore ? "收起" : "查看更多"}
                        </Button>
                    </MoreWrapper>
                }
            </Spin>
        </SectionTimeWrapper>
    );
};
export {
    MeetingTimePicker
};

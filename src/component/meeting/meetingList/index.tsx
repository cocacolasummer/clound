import React, {useEffect, useState} from 'react';
import moment from "moment";
import {useMappedState, useDispatch} from "redux-react-hook";

import {
    Form,
    Icon,
    Input,
    Button,
    Radio,
    Select,
    DatePicker,
    message,
    Spin,
    Pagination
} from 'antd';

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListTitle,
    ShowListOperate,
    ShowListOperateLeft,
    ShowListOperateCenter,
    ShowListFooter
} from '@/baseUI/BaseShowList';

import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingResServices = new MeetingReservationServices();

import {MeetingTable} from './table';
import {MeetingCard} from './card';

import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        total: state.MeetingList.total,
        page: state.MeetingList.page,
        limit: state.MeetingList.limit,
        kind: state.MeetingList.kind,
        status: state.MeetingList.status,
        search: state.MeetingList.search,
        date: state.MeetingList.date,
        showType: state.MeetingList.showType,
        needCheck: state.MeetingList.needCheck,
        canCheck: state.MeetingList.canCheck
    };
};

const {Option} = Select;
const {Search} = Input;

const warning = (msg: string) => {
    message.warning(msg);
};

interface MeetingListProps {
    type?: string;
}

const MeetingList = (props: MeetingListProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        kind, search, status, date,
        showType, needCheck,
        canCheck, total, limit,
        page
    } = useMappedState(mapState);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const meetingType = props.type === 'normal' ? 0 : 1;
        _meetingResServices.getResMeetingList({
            page: 1,
            limit: limit,
            search: search,
            type: kind,
            status: status,
            date: date,
            'meeting_type': meetingType
        }, (res: any) => {
            dispatch({
                type: 'change meetinglist data',
                list: res.data.list,
                total: parseInt(res.data.count),
                page: page,
                limit: limit
            });
            setLoading(false);
        }, () => {
            warning('数据获取失败');
        });
    }, [search, kind, status, date, total, dispatch, props.type, limit, page]);
    useEffect(() => {
        setLoading(true);
        const meetingType = props.type === 'normal' ? 0 : 1;
        _meetingResServices.getResMeetingList({
            page: page,
            limit: limit,
            search: search,
            type: kind,
            status: status,
            date: date,
            'meeting_type': meetingType
        }, (res: any) => {
            dispatch({
                type: 'change meetinglist data',
                list: res.data.list,
                total: parseInt(res.data.count),
                page: page,
                limit: limit
            });
            setLoading(false);
        }, () => {
            warning('数据获取失败');
        });
    }, [page, limit, dispatch, props.type, search, kind, status, date]);
    const meetingStatusOptions = (status: number | string | undefined) => {
        const items: object[] = [];
        let newStatus: number;
        if (status) {
            typeof status === 'string' ? newStatus = parseInt(status) : newStatus = status;
            switch (newStatus) {
                case 1: {
                    items.push(<Option key={100} value={"100"}>会议状态(全部)</Option>);
                    items.push(<Option key={1} value="1">已预约</Option>);
                    items.push(<Option key={5} value="5">已结束</Option>);
                    items.push(<Option key={2} value="2">已取消</Option>);
                    items.push(<Option key={6} value="6">已拒绝</Option>);
                    break;
                }
                case 2: {
                    items.push(<Option key={100} value={"100"}>会议状态(全部)</Option>);
                    items.push(<Option key={1} value="1">已预约</Option>);
                    items.push(<Option key={5} value="5">已结束</Option>);
                    items.push(<Option key={2} value="2">已取消</Option>);
                    items.push(<Option key={6} value="6">已拒绝</Option>);

                    break;
                }
                case 3: {
                    items.push(<Option key={100} value={"100"}>会议状态(全部)</Option>);
                    items.push(<Option key={1} value="1">已预约</Option>);
                    items.push(<Option key={5} value="5">已结束</Option>);
                    items.push(<Option key={2} value="2">已取消</Option>);
                    items.push(<Option key={6} value="6">已拒绝</Option>);
                }
            }
        }
        return items;
    };
    return (
        <ShowListWrapper style={{marginTop: '15px'}}>
            <Spin spinning={loading}>

                <ShowListHeader>
                    <ShowListTitle>历史会议</ShowListTitle>
                    <ShowListOperateCenter>
                        <Form.Item>
                            <Radio.Group defaultValue={kind}
                                         onChange={(e: any) => dispatch({
                                             type: 'change meetinglist kind',
                                             kind: e.target.value
                                         })}
                                         buttonStyle="solid">
                                <Radio.Button value="2">我参加的</Radio.Button>
                                <Radio.Button value="1">我发起的</Radio.Button>
                                {
                                    needCheck && canCheck ? <Radio.Button value="3">我审核的</Radio.Button> : null
                                }
                            </Radio.Group>
                        </Form.Item>
                    </ShowListOperateCenter>
                    <ShowListOperate>
                        <Form layout="inline">
                            <Form.Item>
                                <Button target={"_blank"}
                                        href={`/meetingcloud/apps/meeting/api/v1/meetingListNew?isExport=true&date=${date}`}
                                        type={"primary"}>导出Excel</Button>
                            </Form.Item>
                        </Form>
                    </ShowListOperate>
                </ShowListHeader>
                <ShowListHeader>
                    <ShowListOperateLeft>
                        <Form layout="inline">
                            <Form.Item>
                                <Select placeholder={'会议状态'} value={status} style={{minWidth: 150}}
                                        onChange={(val: string) => dispatch({
                                            type: 'change meetinglist status',
                                            status: val
                                        })}>
                                    {meetingStatusOptions(kind)}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <DatePicker placeholder={"会议日期"}
                                            value={moment(date, 'YYYY年MM月DD日')}
                                            onChange={(value: any) => {
                                                dispatch({
                                                    type: 'change meetinglist date',
                                                    date: value.format('YYYY-MM-DD')
                                                });
                                            }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Search
                                    placeholder="搜索"
                                    onSearch={(value: string) => {
                                        dispatch({
                                            type: 'change meetinglist search',
                                            search: value
                                        });
                                    }}
                                    style={{width: '150px'}}
                                />
                            </Form.Item>
                        </Form>
                    </ShowListOperateLeft>
                    <ShowListOperate>
                        <Form layout="inline">
                            <Form.Item>
                                <Radio.Group value={showType} onChange={(e) => {
                                    dispatch({
                                        type: 'change meetinglist showtype',
                                        showType: e.target.value
                                    });
                                }}>
                                    <Radio.Button value="table">
                                        <Icon type="unordered-list"/>
                                    </Radio.Button>
                                    <Radio.Button value="card">
                                        <Icon type="appstore" theme="filled"/>
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </ShowListOperate>
                </ShowListHeader>
                {
                    showType === 'table' ? <MeetingTable/> : <MeetingCard/>
                }
                <ShowListFooter>
                    <Pagination showSizeChanger
                                current={page}
                                pageSize={limit}
                                onChange={page => dispatch({
                                    type: 'change meetinglist page',
                                    page: page,
                                })}
                                onShowSizeChange={(page, limit) => dispatch({
                                    type: 'change meetinglist limit',
                                    limit: limit,
                                    page: page
                                })}
                                pageSizeOptions={['8', '16']}
                                total={total}/>
                </ShowListFooter>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    MeetingList
};
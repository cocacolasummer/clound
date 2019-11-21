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
    TreeSelect,
    Spin,
    Pagination
} from 'antd';

const {RangePicker} = DatePicker;
import {
    ShowListWrapper,
    ShowListHeader,
    ShowListTitle,
    ShowListOperate,
    ShowListOperateLeft,
    ShowListFooter
} from '@/baseUI/BaseShowList';

import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingResServices = new MeetingReservationServices();

import {MeetingTable} from './table';
import {MeetingCard} from './card';

import {IState} from "@/store";
import {error} from "@/util/golbalModalMessage";

const mapState = (state: IState) => {
    return {
        total: state.MeetingRecord.total,
        page: state.MeetingRecord.page,
        limit: state.MeetingRecord.limit,
        kind: state.MeetingRecord.kind,
        status: state.MeetingRecord.status,
        search: state.MeetingRecord.search,
        date: state.MeetingRecord.date,
        showType: state.MeetingRecord.showType,
        needCheck: state.MeetingRecord.needCheck,
        canCheck: state.MeetingRecord.canCheck,
        department: state.MeetingRecord.department,
        user: state.MeetingRecord.user,
        userKey: state.MeetingRecord.userKey,
        departmentKey: state.MeetingRecord.departmentKey
    };
};

const {Option} = Select;
const {Search} = Input;

interface MeetingListProps {
    type?: string;
}

const MeetingRecord = (props: MeetingListProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        kind, search, status, date, user, userKey,
        showType, total, department, departmentKey,
        limit, page
    } = useMappedState(mapState);

    const dispatch = useDispatch();

    useEffect(() => {
        _meetingResServices.getDepartment((res: any) => {
            dispatch({
                type: 'change meetingRecord department',
                department: res.data && res.data.map((item: any) => {
                    return {
                        id: item.id,
                        pId: item.parent_id,
                        title: item.name,
                        value: item.id,
                        key: item.id
                    };
                })
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        const meetingType = props.type === 'normal' ? 0 : 1;
        _meetingResServices.getResMeetingList({
            page: 1,
            pagesize: limit,
            search: search,
            type: kind,
            status: status,
            date: encodeURIComponent(date.join('~')),
            'department_id': departmentKey.join(','),
            'search_user_id': userKey.join(','),
            'meeting_type': meetingType
        }, (res: any) => {
            if (res.data) {
                dispatch({
                    type: 'change meetingRecord data',
                    list: res.data.list,
                    total: parseInt(res.data.count),
                    page: page,
                    limit: limit
                });
            }
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, [search, kind, userKey, departmentKey, status, date, total, dispatch, props.type, limit, page]);
    useEffect(() => {
        setLoading(true);
        const meetingType = props.type === 'normal' ? 0 : 1;
        _meetingResServices.getResMeetingList({
            page: page,
            pagesize: limit,
            search: search,
            type: kind,
            status: status,
            date: encodeURIComponent(date.join('~')),
            'department_id': departmentKey.join(','),
            'search_user_id': userKey.join(','),
            'meeting_type': meetingType
        }, (res: any) => {
            console.log(res);
            if (res.data) {
                dispatch({
                    type: 'change meetingRecord data',
                    list: res.data.list,
                    total: parseInt(res.data.count),
                    page: page,
                    limit: limit
                });
            }
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, [page, limit, dispatch, props.type, search, kind, status, date, departmentKey, userKey]);
    return (
        <ShowListWrapper>
            <Spin spinning={loading}>
                <ShowListHeader>
                    <ShowListTitle>会议记录</ShowListTitle>
                    <ShowListOperate>
                        <Form layout="inline">
                            <Form.Item>
                                <Button target={"_blank"}
                                        href={`/meetingcloud/apps/meeting/api/v1/meetingListNew?isExport=true&page=-1&date=${encodeURIComponent(date.join('~'))}`}
                                        type={"primary"}>导出Excel</Button>
                            </Form.Item>
                        </Form>
                    </ShowListOperate>
                </ShowListHeader>
                <ShowListHeader>
                    <ShowListOperateLeft>
                        <Form layout="inline">

                            <Form.Item>
                                <TreeSelect treeDataSimpleMode={true}
                                            maxTagCount={1}
                                            maxTagPlaceholder={`+${departmentKey.length - 1}`}
                                            treeCheckable={true}
                                            value={departmentKey}
                                            placeholder={"请选择部门"}
                                            onChange={(value) => {
                                                dispatch({
                                                    type: 'change meetingRecord departmentKey',
                                                    departmentKey: value
                                                });
                                            }}
                                            style={{minWidth: 150}}
                                            treeData={department}/>
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    mode="multiple"
                                    style={{minWidth: 150}}
                                    disabled={departmentKey.length < 1}
                                    placeholder="请选择人员"
                                    maxTagCount={1}
                                    maxTagTextLength={50}
                                    value={userKey}
                                    maxTagPlaceholder={`+${userKey.length - 1}`}
                                    onChange={(value: any) => {
                                        dispatch({
                                            type: 'change meetingRecord userKey',
                                            userKey: value
                                        });
                                    }}
                                    onFocus={() => {
                                        _meetingResServices.getUserByDepartment(departmentKey, (data: any) => {
                                            dispatch({
                                                type: 'change meetingRecord user',
                                                user: data
                                            });
                                        }, (err: any) => {
                                            error(err.message ? err.message : err.toString());
                                        });
                                    }}
                                >
                                    {
                                        user.map((item: any, index: number) => {
                                            console.log(user);
                                            return (
                                                <Option key={index}
                                                        value={item.uid}>{item.displayname && item.displayname.value}</Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </ShowListOperateLeft>
                </ShowListHeader>
                <ShowListHeader>
                    <ShowListOperateLeft>
                        <Form layout="inline">
                            <Form.Item>
                                <Select placeholder={'会议状态'} value={status} style={{minWidth: 150}}
                                        onChange={(val: string) => dispatch({
                                            type: 'change meetingRecord status',
                                            status: val
                                        })}>
                                    <Option key={100} value={"100"}>会议状态(全部)</Option>
                                    <Option key={1} value="1">已预约</Option>
                                    <Option key={5} value="5">已结束</Option>
                                    <Option key={2} value="2">已取消</Option>
                                    <Option key={6} value="6">已拒绝</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <RangePicker
                                    value={[moment(date[0]), moment(date[1])]}
                                    onChange={(dates: any) => {
                                        dispatch({
                                            type: 'change meetingRecord date',
                                            date: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Search
                                    placeholder="搜索"
                                    onSearch={(value: string) => {
                                        dispatch({
                                            type: 'change meetingRecord search',
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
                                        type: 'change meetingRecord showType',
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
                                    type: 'change meetingRecord page',
                                    page: page,
                                })}
                                onShowSizeChange={(page, limit) => dispatch({
                                    type: 'change meetingRecord limit',
                                    limit: limit,
                                    page: page
                                })}
                                pageSizeOptions={['10', '15']}
                                total={total}/>
                </ShowListFooter>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    MeetingRecord
};
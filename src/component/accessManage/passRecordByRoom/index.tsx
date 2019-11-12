import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Input, Select, DatePicker, Pagination, Spin} from "antd";

const {Search} = Input;
const {RangePicker} = DatePicker;
const {Option} = Select;

import {PassRecordByRoomTable} from './table';

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListFooter,
    ShowListOperateNoForm,
    ShowListTitle
} from '@/baseUI/BaseShowList';

import {IState} from '@/store';

const mapState = (state: IState): {
    page: number;
    limit: number;
    total: number;
    loading: boolean;
} => {
    return {
        page: state.AccessPassRecordByRoom.page,
        limit: state.AccessPassRecordByRoom.limit,
        total: state.AccessPassRecordByRoom.total,
        loading: state.AccessPassRecordByRoom.loading
    };
};

const AccessPassRecordByRoom: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        page,
        limit,
        total,
        loading
    } = useMappedState(mapState);
    console.log(page, limit);
    return (
        <ShowListWrapper>
            <Spin spinning={loading} delay={100}>
                <ShowListHeader>
                    <ShowListTitle>通行记录</ShowListTitle>
                    <ShowListOperateNoForm>
                        <RangePicker format="YYYY-MM-DD" style={{marginRight: 15}} onChange={(dates): void => {
                            if (dates && dates[0] && dates[1]) {
                                dispatch({
                                    type: 'change accessPassRecordByRoom date',
                                    date: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                                });
                            }
                        }}/>
                        <Select placeholder={"用户类型"} style={{marginRight: 15, minWidth: 150}}
                                onChange={(value): void => {
                                    dispatch({
                                        type: 'change accessPassRecordByRoom userType',
                                        userType: value
                                    });
                                }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(val): void => {
                                    dispatch({
                                        type: 'change accessPassRecordByRoom search',
                                        search: val
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                        <Button type={"primary"}
                        >导出</Button>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <PassRecordByRoomTable/>
                <ShowListFooter>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        pageSize={limit}
                        onChange={(page): void => {
                            dispatch({
                                type: 'change accessPassRecordByRoom page',
                                page: page
                            });
                        }}
                        onShowSizeChange={(page, limit): void => {
                            dispatch({
                                type: 'change accessPassRecordByRoom limit',
                                page: page,
                                limit: limit
                            });
                        }}
                        pageSizeOptions={['10', '15']}
                        total={total}
                    />
                </ShowListFooter>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    AccessPassRecordByRoom
};
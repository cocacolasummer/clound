import React from 'react';
import {ListOperate, ListWrapper} from "@/component/seat/seatList/ui";
import {ShowListFooter, ShowListHeader, ShowListTitle, ShowListWrapper} from "@/baseUI/BaseShowList";
import {Button, Pagination, Spin, Input, DatePicker, Select, Radio} from "antd";

const {Option} = Select;
const {Search} = Input;
import QueueAnim from "rc-queue-anim";
import {CustomEmpty} from "@/component/customEmpty";
import {
    LogisticsListWrapperUI
} from './ui';

import {
    LogisticsListItem
} from './item';

import {IState} from '@/store';
import {Status, LogisticsType, StatusSetting, LogisticsTypeOptions} from '@/store/logistics/logisticsList';
import {useDispatch, useMappedState} from "redux-react-hook";
import moment from 'moment';
import {ThemeGreen, ThemeYellow, ThemeOrange} from '@/baseUI/ButtonWrap';

const mapState = (state: IState) => {
    return {
        list: state.LogisticsList.list,
        page: state.LogisticsList.page,
        limit: state.LogisticsList.limit,
        total: state.LogisticsList.total,
        loading: state.LogisticsList.loading,
        date: state.LogisticsList.date
    };
};

const LogisticsList: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        page,
        limit,
        total,
        loading,
        date
    } = useMappedState(mapState);

    const logisticsListItems = list && list.map((item: any, index: number) => {
        return (
            <LogisticsListItem key={index} data={item}/>
        );
    });

    const statusOptions = [];

    for (const status in Status) {
        statusOptions.push(<Option key={Status[status]}
                                   value={Status[status]}>{StatusSetting[Status[status]].name}</Option>);
    }

    const typeOptions = [];

    for (const type in LogisticsType) {
        typeOptions.push(<Radio.Button key={LogisticsType[type]}
                                       value={LogisticsType[type]}>{LogisticsTypeOptions[LogisticsType[type]].name}</Radio.Button>);
    }
    return (
        <ListWrapper>
            <ShowListWrapper>
                <Spin delay={100} spinning={loading}>
                    <ShowListHeader>
                        <ShowListTitle>后勤管理</ShowListTitle>
                        <ListOperate>
                            <Radio.Group
                                buttonStyle="solid">
                                {typeOptions}
                            </Radio.Group>
                            <Select style={{minWidth: '150px', marginRight: '15px', marginLeft: '15px'}}
                                    placeholder={'后勤状态'}
                            >
                                {statusOptions}
                            </Select>
                            <DatePicker value={moment(date, 'YYYY-MM-DD')}
                                        allowClear={false}
                                        onChange={(date) => {
                                            dispatch({
                                                type: 'change logisticsList date',
                                                date: date && date.format('YYYY-MM-DD')
                                            });
                                        }}
                                        style={{marginRight: '15px'}}/>
                            <Search
                                placeholder="搜索"
                                onSearch={(value: string): void => {
                                    dispatch({
                                        type: 'change logisticsList search',
                                        search: value
                                    });
                                }}
                                style={{width: '150px', marginRight: '15px'}}
                            />
                            <ThemeOrange>
                                <Button onClick={
                                    (): void => {
                                        dispatch({
                                            type: 'change logisticsGoods show'
                                        });
                                    }
                                }>后勤物品</Button>
                            </ThemeOrange>
                            <ThemeGreen>
                                <Button onClick={
                                    (): void => {
                                        dispatch({
                                            type: 'change logisticsClassify show'
                                        });
                                    }
                                }>物品分类</Button>
                            </ThemeGreen>
                            <ThemeYellow>
                                <Button>导出</Button>
                            </ThemeYellow>
                            <Button type={'primary'}
                                    onClick={(): void => {
                                        dispatch({
                                            type: 'change logisticsEditor add'
                                        });
                                    }}
                                    style={{marginRight: '20px'}}>发起后勤</Button>
                        </ListOperate>
                    </ShowListHeader>
                    <QueueAnim delay={200} component={LogisticsListWrapperUI}>
                        {(list && list.length > 0) ? logisticsListItems : <CustomEmpty/>}
                    </QueueAnim>
                    <ShowListFooter>
                        <Pagination showSizeChanger
                                    showQuickJumper
                                    current={page}
                                    pageSize={limit}
                                    total={total}
                                    onChange={(page): void => {
                                        dispatch({
                                            type: 'change logisticsList page',
                                            page: page
                                        });
                                    }}
                                    pageSizeOptions={['8', '16']}
                                    onShowSizeChange={(page, limit): void => {
                                        dispatch({
                                            type: 'change logisticsList limit',
                                            page: page,
                                            limit: limit
                                        });
                                    }}
                        />
                    </ShowListFooter>
                </Spin>
            </ShowListWrapper>
        </ListWrapper>
    );
};

export {
    LogisticsList
};
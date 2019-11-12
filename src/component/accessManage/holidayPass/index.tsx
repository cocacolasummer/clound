import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Input, Pagination, Spin, Select} from "antd";

const {Search} = Input;
const {Option} = Select;

import {HolidayPassTable} from './table';

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
    selectRows: string[];
} => {
    return {
        page: state.AccessHolidayPass.page,
        limit: state.AccessHolidayPass.limit,
        total: state.AccessHolidayPass.total,
        loading: state.AccessHolidayPass.loading,
        selectRows: state.AccessHolidayPass.selectRows
    };
};

const AccessHolidayPass: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        page,
        limit,
        total,
        loading,
        selectRows
    } = useMappedState(mapState);
    return (
        <ShowListWrapper>
            <Spin spinning={loading} delay={100}>
                <ShowListHeader>
                    <ShowListTitle>假期通行</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Select style={{marginRight: 15, minWidth: 150}} defaultValue={""}>
                            <Option value={""}>全部</Option>
                        </Select>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(search): void => {
                                    dispatch({
                                        type: 'change accessHolidayPass search',
                                        search: search
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                        <Button type={"danger"}
                                disabled={selectRows.length === 0}>批量删除</Button>
                        <Button type={"primary"} style={{marginLeft: 15}}
                                onClick={(): void => {
                                    dispatch({
                                        type: 'change accessHolidayPassEditor show'
                                    });
                                }}
                        >添加</Button>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <HolidayPassTable/>
                <ShowListFooter>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        pageSize={limit}
                        onChange={(page): void => {
                            dispatch({
                                type: 'change accessHolidayPass page',
                                page: page
                            });
                        }}
                        onShowSizeChange={(page, limit): void => {
                            dispatch({
                                type: 'change accessHolidayPass limit',
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
    AccessHolidayPass
};

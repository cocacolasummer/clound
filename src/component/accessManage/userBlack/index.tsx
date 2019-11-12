import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Input, Pagination, Spin} from "antd";

const {Search} = Input;

import {UserBlackTable} from './table';

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
        page: state.AccessUserBlack.page,
        limit: state.AccessUserBlack.limit,
        total: state.AccessUserBlack.total,
        loading: state.AccessUserBlack.loading,
        selectRows: state.AccessUserBlack.selectRows
    };
};

const AccessUserBlack: React.ComponentType = () => {
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
                    <ShowListTitle>黑名单</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(search): void => {
                                    dispatch({
                                        type: 'change accessUserBlack search',
                                        search: search
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                        <Button type={"danger"} style={{marginRight: 15}}
                                disabled={selectRows.length === 0}>批量删除</Button>
                        <Button type={"primary"} style={{marginLeft: 15}}
                                onClick={(): void => {
                                    dispatch({
                                        type: 'change accessUserBlackEditor show'
                                    });
                                }}
                        >添加</Button>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <UserBlackTable/>
                <ShowListFooter>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        pageSize={limit}
                        onChange={(page): void => {
                            dispatch({
                                type: 'change accessUserBlack page',
                                page: page
                            });
                        }}
                        onShowSizeChange={(page, limit): void => {
                            dispatch({
                                type: 'change accessUserBlack limit',
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
    AccessUserBlack
};

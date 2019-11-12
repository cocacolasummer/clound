import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Input, Pagination, Spin} from "antd";

const {Search} = Input;

import {UserTypeTable} from './table';

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
        page: state.AccessUserType.page,
        limit: state.AccessUserType.limit,
        total: state.AccessUserType.total,
        loading: state.AccessUserType.loading
    };
};

const AccessUserType: React.ComponentType = () => {
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
                    <ShowListTitle>用户类型</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(val): void => {
                                    dispatch({
                                        type: 'change accessUserType search',
                                        search: val
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                        <Button type={"primary"}
                                onClick={(): void => {
                                    dispatch({
                                        type: 'change userTypeEditor show'
                                    });
                                }}
                        >添加</Button>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <UserTypeTable/>
                <ShowListFooter>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        pageSize={limit}
                        onChange={(page): void => {
                            dispatch({
                                type: 'change accessUserType page',
                                page: page
                            });
                        }}
                        onShowSizeChange={(page, limit): void => {
                            dispatch({
                                type: 'change accessUserType limit',
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
    AccessUserType
};
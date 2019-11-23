import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Icon, Input, Pagination, Radio, Spin} from "antd";

const {Search} = Input;

import {GroupTable} from './table';
import {GroupCard} from './card';

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListFooter,
    ShowListOperateNoForm,
    ShowListTitle
} from '@/baseUI/BaseShowList';

import {IState} from '@/store';

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { success, error, } from '@/util/golbalModalMessage';

const mapState = (state: IState): {
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    listType: string;
    selectRows: string[];
} => {
    return {
        page: state.AccessGroup.page,
        limit: state.AccessGroup.limit,
        total: state.AccessGroup.total,
        loading: state.AccessGroup.loading,
        listType: state.AccessGroup.listType,
        selectRows: state.AccessGroup.selectRows
    };
};

const AccessGroup: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        page,
        limit,
        total,
        loading,
        listType,
        selectRows
    } = useMappedState(mapState);

    const delgroups = (ids: any) => {
    _accessServices.deviceGroupDel({ ids: ids.join(',')}, (res: any) => {
        success(`删除设备组成功！`);
            _accessServices.deviceGroupList({
                page: 1,
                pagesize: limit,
                name: '',
            }, (data: any) => {
                dispatch({
                    type: 'change accessGroup list',
                    list: data.data.list,
                    page: 1,
                    total: data.data.count,
                    limit: limit
                });
            }, (err: any) => {
                console.log(err);
            });
    }, (err: any) => {
        error(err.message);
    });
};
    return (
        <ShowListWrapper>
            <Spin spinning={loading} delay={100}>
                <ShowListHeader>
                    <ShowListTitle>设备群组</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(search): void => {
                                    dispatch({
                                        type: 'change accessGroup search',
                                        search: search
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                        <Button type={"danger"} disabled={selectRows.length === 0} onClick={(): void => {
                                delgroups(selectRows);
                            }}>批量删除</Button>
                        <Button type={"primary"} style={{marginLeft: 15}}
                                onClick={(): void => {
                                    dispatch({
                                        type: 'change accessGroupEditor show',
                                        editorType: 'add',
                                        data: ''
                                    });
                                }}
                        >添加</Button>
                        <Radio.Group value={listType} style={{marginLeft: 15}} onChange={(e): void => {
                            dispatch({
                                type: 'change accessGroup listType',
                                listType: e.target.value
                            });
                        }}>
                            <Radio.Button value="table">
                                <Icon type="unordered-list"/>
                            </Radio.Button>
                            <Radio.Button value="card">
                                <Icon type="appstore" theme="filled"/>
                            </Radio.Button>
                        </Radio.Group>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                {listType === 'table' ? <GroupTable/> : <GroupCard/>}
                <ShowListFooter>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={page}
                        pageSize={limit}
                        onChange={(page): void => {
                            dispatch({
                                type: 'change accessGroup page',
                                page: page
                            });
                        }}
                        onShowSizeChange={(page, limit): void => {
                            dispatch({
                                type: 'change accessGroup limit',
                                page: page,
                                limit: limit
                            });
                        }}
                        pageSizeOptions={['8', '16']}
                        total={total}
                    />
                </ShowListFooter>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    AccessGroup
};

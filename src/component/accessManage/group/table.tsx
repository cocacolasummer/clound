import React, {Fragment} from 'react';
import {Button, Table, Popconfirm} from 'antd';
import {TableRowSelection} from "antd/lib/table";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

import {useDispatch, useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/groupList';

import {IState} from '@/store';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    selectRows: string[];
} => {
    return {
        list: state.AccessGroup.list,
        selectRows: state.AccessGroup.selectRows
    };
};

const GroupTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        selectRows
    } = useMappedState(mapState);

    const rowSelection: TableRowSelection<ListObjects> = {
        onChange: (selectedRowKeys) => {
            dispatch({
                type: 'change accessGroup selectRows',
                selectRows: selectedRowKeys
            });
        },
        selectedRowKeys: selectRows
    };

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '编辑时间',
            dataIndex: 'updateTime',
            key: 'updateTime'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                    <span>
                        <Button size={"small"} style={{marginRight: 10}} onClick={(): void => {
                            dispatch({
                                type: 'change accessGroupEditor show',
                                userTypeId: record.id,
                                editorType: 'edit'
                            });
                        }} type={"primary"} key={index}>编辑</Button>
                        <Popconfirm title={`确定删除“${record.name}”吗`} okText="确定" cancelText="取消">
                            <Button size={"small"} type={"danger"}>删除</Button>
                        </Popconfirm>
                    </span>
                );
            }
        }
    ];
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <ContentWrapper>
                    <Table rowSelection={rowSelection} rowKey={(record: ListObjects): string => record.id}
                           dataSource={list} pagination={false} columns={columns}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    GroupTable
};
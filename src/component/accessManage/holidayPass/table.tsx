import React, {Fragment} from 'react';
import {Button, Table, Popconfirm} from 'antd';
import {TableRowSelection} from "antd/lib/table";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

import {useDispatch, useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/accessHolidayPass';

import {IState} from '@/store';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    selectRows: string[];
} => {
    return {
        list: state.AccessHolidayPass.list,
        selectRows: state.AccessHolidayPass.selectRows
    };
};

const HolidayPassTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        selectRows
    } = useMappedState(mapState);

    const rowSelection: TableRowSelection<ListObjects> = {
        onChange: (selectedRowKeys) => {
            dispatch({
                type: 'change accessHolidayPass selectRows',
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
            title: '假期名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '设备组',
            dataIndex: 'group',
            key: 'group'
        },
        {
            title: '通行类型',
            dataIndex: 'passType',
            key: 'passType'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                    <span>
                        <Button size={"small"} type={"primary"} style={{marginRight: 10}}>编辑</Button>
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
    HolidayPassTable
};
import React, { Fragment} from 'react';
import { Button, Table, } from 'antd';
import { TableRowSelection } from "antd/lib/table";
import { CSSTransition } from "react-transition-group";
import { ContentWrapper } from "@/component/meeting/meetingList/ui";

import { useDispatch, useMappedState } from 'redux-react-hook';

import { ListObjects } from '@/store/access/groupList';

import { IState } from '@/store';

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { success, error, waringConfirm, } from '@/util/golbalModalMessage';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    listLimit: number;
    selectRows: string[];
    listtotal: number;
    listSearch: any;
} => {
    return {
        list: state.AccessGroup.list,
        listLimit: state.AccessGroup.limit,
        selectRows: state.AccessGroup.selectRows,
        listtotal: state.AccessGroup.total,
        listSearch: state.AccessGroup.search,
    };
};

const GroupTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        selectRows,
        listSearch,
        listLimit,
    } = useMappedState(mapState);

    const delgroup = (id: string) => {
        _accessServices.deviceGroupDel({ ids: id }, (res: any) => {
            success(`删除设备组成功！`);
            _accessServices.deviceGroupList({
                page: 1,
                pagesize: listLimit,
                name: listSearch
            }, (data: any) => {
                dispatch({
                    type: 'change accessGroup list',
                    list: data.data.list,
                    page: 1,
                    total: data.data.count,
                    limit: listLimit
                });
            }, (err: any) => {
                console.log(err);
            });
        }, (err: any) => {
            error(err.message.toString());
        });
    };

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
            dataIndex: 'updated_time',
            key: 'updated_time'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                    <span>
                        <Button size={"small"} style={{ marginRight: 10 }} onClick={(): void => {
                            dispatch({
                                type: 'change accessGroupEditor show',
                                groupId: record.id,
                                editorType: 'edit'
                            });
                        }} type={"primary"} key={index}>编辑</Button>
                        <Button type={"danger"} onClick={(): void => {
                            waringConfirm('警告', `确定删除${record.name}设备组吗？`, () => {
                                delgroup(record.id);
                            });
                        }} size={"small"}>删除</Button>
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
                        dataSource={list} pagination={false} columns={columns} />
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    GroupTable
};
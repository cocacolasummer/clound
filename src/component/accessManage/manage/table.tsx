import React, {Fragment} from 'react';
import {Button, Table, Switch} from 'antd';
import {TableRowSelection} from "antd/lib/table";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

import {useDispatch, useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/accessManage';

import {IState} from '@/store';
import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { success, error, waringConfirm, } from '@/util/golbalModalMessage';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    selectRows: string[];
} => {
    return {
        list: state.AccessManage.list,
        selectRows: state.AccessManage.selectRows
    };
};

const deldevices = (id: string) => {
    _accessServices.deviceDel({ ids: id }, (res: any) => {
        success(`删除设备成功！`);
    }, (err: any) => {
        error(err.message.toString());
    });
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
                type: 'change accessManage selectRows',
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
            title: '设备组',
            dataIndex: 'group_name',
            key: 'group_name'
        },
        {
            title: '状态',
            dataIndex: 'online_status',
            key: 'online_status'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                    <span>
                        <Button size={"small"} style={{marginRight: 10}} onClick={(): void => {
                            dispatch({
                                type: 'change accessManageEditor show',
                                manageId: record.id,
                                editorType: 'edit'
                            });
                        }} type={"primary"} key={index}>编辑</Button>
                        <Button type={"danger"} onClick={(): void => {
                            waringConfirm('警告', `确定删除${record.name}设备吗？`, () => {
                                deldevices(record.id);
                            });
                        }} size={"small"}>删除</Button>
                       <Switch style={{marginLeft: 10}}/>
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
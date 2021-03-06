import React, {Fragment} from 'react';
import {Button, Table} from 'antd';
import {TableRowSelection} from "antd/lib/table";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

import {useDispatch, useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/accessUserBlack';

import {IState} from '@/store';
import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { success, error, waringConfirm, } from '@/util/golbalModalMessage';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    selectRows: string[];
} => {
    return {
        list: state.AccessUserBlack.list,
        selectRows: state.AccessUserBlack.selectRows
    };
};

const delblack = (id: string) => {
    _accessServices.delBlack({ ids: id }, (res: any) => {
        success(`删除黑名单成功！`);
    }, (err: any) => {
        error(err.message.toString());
    });
};

const UserBlackTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        selectRows
    } = useMappedState(mapState);

    const rowSelection: TableRowSelection<ListObjects> = {
        onChange: (selectedRowKeys) => {
            dispatch({
                type: 'change accessUserBlack selectRows',
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
            title: '姓名',
            dataIndex: 'displayname',
            key: 'displayname'
        },
        {
            title: '门禁',
            dataIndex: 'device_name',
            key: 'device_name'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                <span>
                <Button size={"small"} style={{marginRight: 10}} onClick={(): void => {
                    dispatch({
                        type: 'change accessUserBlackEditor show'
                    });
                }} type={"primary"} key={index}>编辑</Button>
                <Button type={"danger"} onClick={(): void => {
                    waringConfirm('警告', `确定删除该黑名单吗？`, () => {
                        delblack(record.id);
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
                           dataSource={list} pagination={false} columns={columns}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    UserBlackTable
};
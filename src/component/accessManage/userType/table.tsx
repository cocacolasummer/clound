import React, { Fragment } from 'react';
import { Button, Table } from 'antd';

import { useDispatch, useMappedState } from 'redux-react-hook';

import { ListObjects } from '@/store/access/userType';

import { IState } from '@/store';
import { CSSTransition } from "react-transition-group";
import { ContentWrapper } from "@/component/meeting/meetingList/ui";

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();
import { success, error, waringConfirm, } from '@/util/golbalModalMessage';

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    listLimit: number;
    listSearch: any;
} => {
    return {
        list: state.AccessUserType.list,
        listLimit: state.AccessGroup.limit,
        listSearch: state.AccessGroup.search,
    };
};

const UserTypeTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list,
        listLimit,
        listSearch,
    } = useMappedState(mapState);
    const delgroup = (id: string) => {
        _accessServices.deviceGroupDel({ ids: id }, (res: any) => {
            if(res.code == -1){
                success(`删除用户类型成功！`);
                _accessServices.groupIndex({
                    page: 1,
                    pagesize: listLimit,
                    name: listSearch
                }, (data: any) => {
                    dispatch({
                        type: 'change accessUserType list',
                        list: data.data.list,
                        page: 1,
                        total: data.data.count,
                        limit: listLimit
                    });
                }, (err: any) => {
                    console.log(err);
                });
            }else{
                error(res.message); 
            }

        }, (err: any) => {
            error(err.message.toString());
        });
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
            title: '关联用户',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                <Button type={"primary"} key={index}>添加用户</Button>
                );
            }
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
                                type: 'change userTypeEditor show',
                                userTypeId: record.id,
                                editorType: 'edit'
                            });
                        }} type={"primary"} key={index}>编辑</Button>
                        <Button type={"danger"} onClick={(): void => {
                            waringConfirm('警告', `确定删除${record.name}用户类型吗？`, () => {
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
                    <Table rowKey={(record: ListObjects): string => record.id} dataSource={list} pagination={false}
                        columns={columns} />
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    UserTypeTable
};
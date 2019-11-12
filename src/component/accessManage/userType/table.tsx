import React, {Fragment} from 'react';
import {Button, Table} from 'antd';

import {useDispatch, useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/userType';

import {IState} from '@/store';
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
} => {
    return {
        list: state.AccessUserType.list
    };
};

const UserTypeTable: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        list
    } = useMappedState(mapState);

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
            title: '编辑时间',
            dataIndex: 'updateTime',
            key: 'updateTime'
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (<Button onClick={(): void => {
                    dispatch({
                        type: 'change userTypeEditor show',
                        userTypeId: record.id,
                        editorType: 'edit'
                    });
                }} type={"primary"} key={index}>编辑</Button>);
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
                           columns={columns}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    UserTypeTable
};
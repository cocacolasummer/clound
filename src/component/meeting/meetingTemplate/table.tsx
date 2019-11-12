import React, {Fragment} from "react";
import {Table, Button, Popconfirm} from 'antd';
import {CSSTransition} from 'react-transition-group';
import {useMappedState, useDispatch} from "redux-react-hook";

import {IState} from "@/store";

import {
    ContentWrapper,
} from "@/component/meeting/meetingList/ui";

const mapState = (state: IState) => {
    return {
        list: state.MeetingTemp.list
    };
};

const MeetingTempTable = () => {
    const {
        list
    } = useMappedState(mapState);
    const dispatch = useDispatch();

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '会议主题',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: '发起人',
            dataIndex: 'startUser',
            key: 'creator'
        },
        {
            title: '会议地点',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'editor',
            // eslint-disable-next-line react/display-name
            render: (id: any, record: any, index: number) => {
                return (
                    <span>
                    <Button type={"primary"}
                            onClick={() => {
                                dispatch({
                                    type: 'change meetingeditor isEdit',
                                    isEdit: true,
                                    id: record.id
                                });
                                dispatch({
                                    type: 'open meetingtemp editor',
                                    editorId: record.id
                                });
                            }}
                            style={{marginRight: "10px"}}
                            size={"small"}>编辑</Button>
                    <Popconfirm title="确定删除吗？" onConfirm={() => {
                    }}>
                        <Button type={"danger"} size={"small"}>删除</Button>
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
                    <Table dataSource={list} rowKey={(record) => record.id} pagination={false} columns={columns}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>

    );
};

export {
    MeetingTempTable
};
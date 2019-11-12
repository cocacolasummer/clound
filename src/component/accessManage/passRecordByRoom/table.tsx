import React, {Fragment} from 'react';
import {Button, Table} from 'antd';
import Viewer from "viewerjs";

import {useMappedState} from 'redux-react-hook';

import {ListObjects} from '@/store/access/accessPassRecordByRoom';

import {IState} from '@/store';
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
} => {
    return {
        list: state.AccessPassRecordByRoom.list
    };
};

const PassRecordByRoomTable: React.ComponentType = () => {
    let viewer: Viewer | undefined;
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
            title: '通行人',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: '通行类型',
            dataIndex: 'passType',
            key: 'passType'
        },
        {
            title: '通行时间',
            dataIndex: 'passTime',
            key: 'passTime'
        },
        {
            title: '抓拍图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            // eslint-disable-next-line react/display-name
            render: (text: string | undefined, record: ListObjects, index: number): React.ReactElement => {
                return (
                    <span>
                        {
                            record.imgUrl ? <Button icon={"picture"} onClick={(): void => {
                                const img = document.createElement('img');
                                img.alt = record.name;
                                record.imgUrl && (img.src = record.imgUrl);
                                viewer && viewer.destroy();
                                viewer = new Viewer(img);
                                viewer.view();
                            }}/> : null
                        }
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
                           columns={columns}/>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    PassRecordByRoomTable
};
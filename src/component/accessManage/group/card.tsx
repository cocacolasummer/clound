import React, {Fragment} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Popconfirm} from "antd";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";
import QueueAnim from 'rc-queue-anim';
import {IState} from "@/store";
import {ListObjects} from '@/store/access/groupList';

const mapState = (state: IState): {
    list: ListObjects[];
    selectRows: string[];
} => {
    return {
        list: state.AccessGroup.list,
        selectRows: state.AccessGroup.selectRows
    };
};

import {
    GroupCardWrapper,
    GroupCardItem,
    GroupCardItemImg,
    GroupCardItemInfo,
    GroupCardItemTitle,
    GroupCardItemDesc,
    GroupCardItemTime,
    GroupCardItemOperate
} from './ui';

const GroupCard: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {list, selectRows} = useMappedState(mapState);
    const groupCardItems = list.map((item, index) => {
        const hasSelected = selectRows.indexOf(item.id) !== -1;
        return (
            <GroupCardItem key={index} type={hasSelected ? 1 : 0} onClick={(): void => {
                const newSelectRows = selectRows.slice();
                const indexOf = newSelectRows.indexOf(item.id);
                if (indexOf === -1) {
                    newSelectRows.push(item.id);
                } else {
                    newSelectRows.splice(indexOf, 1);
                }
                dispatch({
                    type: 'change accessGroup selectRows',
                    selectRows: newSelectRows
                });
            }}>
                <GroupCardItemImg src={item.imgUrl} alt={'设备图片'}/>
                <GroupCardItemInfo>
                    <GroupCardItemTitle>{item.name}</GroupCardItemTitle>
                    <GroupCardItemDesc>{item.description}</GroupCardItemDesc>
                    <GroupCardItemTime>{item.updateTime}</GroupCardItemTime>
                    <GroupCardItemOperate>
                        <Button type={"primary"} onClick={(e): void => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch({
                                type: 'change accessGroupEditor show',
                                userTypeId: item.id,
                                editorType: 'edit'
                            });
                        }} style={{marginRight: 10}} size={"small"}>编辑</Button>
                        <Popconfirm title={`确定删除“${item.name}”吗`} onCancel={(e): void => {
                            e && e.preventDefault();
                            e && e.stopPropagation();
                        }} okText="确定"
                                    onConfirm={(e): void => {
                                        e && e.preventDefault();
                                        e && e.stopPropagation();
                                    }}
                                    cancelText="取消">
                            <Button type={"danger"} onClick={(e): void => {
                                e.preventDefault();
                                e.stopPropagation();
                            }} size={"small"}>删除</Button>
                        </Popconfirm>
                    </GroupCardItemOperate>
                </GroupCardItemInfo>
            </GroupCardItem>)
            ;
    });
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <ContentWrapper>
                    <QueueAnim component={GroupCardWrapper}>
                        {groupCardItems}
                    </QueueAnim>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    GroupCard
};
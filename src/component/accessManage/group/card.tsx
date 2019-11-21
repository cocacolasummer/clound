import React, {Fragment} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button} from "antd";
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";
import QueueAnim from 'rc-queue-anim';
import {IState} from "@/store";
import {ListObjects} from '@/store/access/groupList';

import { success, error, waringConfirm, } from '@/util/golbalModalMessage';

import AccessServices from '@/services/accessServices';
const _accessServices = new AccessServices();

const mapState = (state: IState): {
    list: ListObjects[];
    selectRows: string[];
    listtotal: number;
    listSearch: any;
    listLimit: number;
} => {
    return {
        list: state.AccessGroup.list,
        selectRows: state.AccessGroup.selectRows,
        listLimit: state.AccessGroup.limit,
        listtotal: state.AccessGroup.total,
        listSearch: state.AccessGroup.search,
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
                                groupId: item.id,
                                editorType: 'edit'
                            });
                        }} style={{marginRight: 10}} size={"small"}>编辑</Button>
                        <Button type={"danger"} onClick={(): void => {
                            waringConfirm('警告', `确定删除${item.name}设备组吗？`, () => {
                                delgroup(item.id);
                            });
                        }} size={"small"}>删除</Button>
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
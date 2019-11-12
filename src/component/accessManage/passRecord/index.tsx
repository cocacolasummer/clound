import React, {Fragment} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {Button, Input, Spin} from "antd";
import {Link} from 'react-router-dom';
import {DataObjects} from '@/store/access/accessPassRecord';

const {Search} = Input;

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListOperateNoForm,
    ShowListTitle
} from '@/baseUI/BaseShowList';

import {IState} from '@/store';

import {
    AddressWrapper,
    AddressHeader,
    CharListWrapper,
    CharListItem,
    CharListItemHeader,
    CharListItemFooter
} from './ui';

const mapState = (state: IState): {
    loading: boolean;
    data: DataObjects[];
} => {
    return {
        loading: state.AccessPassRecord.loading,
        data: state.AccessPassRecord.data
    };
};

import {CharItem} from './charItem';
import {CSSTransition} from "react-transition-group";
import {ContentWrapper} from "@/component/meeting/meetingList/ui";

const AccessPassRecord: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        loading,
        data
    } = useMappedState(mapState);
    console.log(data);
    const charItems = data.map((item, index) => {
        return (
            <AddressWrapper key={index}>
                <AddressHeader>{item.addressName}</AddressHeader>
                <CharListWrapper>
                    {
                        item.roomList.map((items, indexs) => {
                            return (
                                <CharListItem key={indexs}>
                                    <CharListItemHeader>{items.name}</CharListItemHeader>
                                    <CharItem data={items.charData}/>
                                    <CharListItemFooter>
                                        <Button type={"primary"} size={"small"}><Link
                                            to={`/access/record/${items.id}/`}>查看通行记录</Link></Button>
                                    </CharListItemFooter>
                                </CharListItem>
                            );
                        })
                    }
                </CharListWrapper>
            </AddressWrapper>
        );
    });

    return (
        <ShowListWrapper>
            <Spin spinning={loading} delay={100}>
                <ShowListHeader>
                    <ShowListTitle>通行统计</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Search placeholder={"请输入搜索内容"}
                                onSearch={(val): void => {
                                    dispatch({
                                        type: 'change accessPassRecord search',
                                        search: val
                                    });
                                }}
                                style={{width: 150, marginRight: 15}}/>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <Fragment>
                    <CSSTransition
                        in={true}
                        timeout={1000}
                        unmountOnExit
                        appear={true}
                    >
                        <ContentWrapper>
                            {charItems}
                        </ContentWrapper>
                    </CSSTransition>
                </Fragment>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    AccessPassRecord
};
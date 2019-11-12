import React, {useEffect, useState} from 'react';
import {useMappedState, useDispatch} from "redux-react-hook";
import SeatServices from "@/services/seatServices";
import {Link} from 'react-router-dom';
import {waringConfirm} from '@/util/golbalModalMessage';
import {CustomEmpty} from '@/component/customEmpty';
import {
    Input, Button,
    Spin,
    Pagination, Icon, Dropdown, Menu
} from 'antd';

const {Search} = Input;

const _seatServices = new SeatServices();

import {IState} from '@/store';

const mapState = (state: IState) => {
    return {
        limit: state.SeatList.limit,
        page: state.SeatList.page,
        total: state.SeatList.total,
        list: state.SeatList.list,
        search: state.SeatList.search
    };
};

import {
    ListWrapper,
    ListOperate,
    SeatListWrapper,
    SeatListItem,
    SeatListItemImgWrap,
    ShowListItemTitle,
    ShowListItemOperate
} from './ui';

import {
    ShowListWrapper,
    ShowListHeader,
    ShowListTitle,
    ShowListFooter
} from '@/baseUI/BaseShowList';
import QueueAnim from "rc-queue-anim";

const SeatList = () => {
    const [loading, setLoading] = useState(false);
    const {
        total, page, limit, list, search
    } = useMappedState(mapState);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        _seatServices.getSeatList({
            page: page,
            pageSize: limit,
            seatName: search
        }, (res: any) => {
            dispatch({
                type: 'change seatlist data',
                list: res.data.list,
                limit: res.data.pageSize,
                total: res.data.total,
                page: res.data.page
            });
            setLoading(false);
        }, (err: any) => {
            console.log(err);
            setLoading(false);
        });
    }, [page, limit, search, total, dispatch]);

    const seatListItems = list && list.map((item: any, index: number) => {
        const menu = (
            <Menu key={index}>
                <Menu.Item onClick={(e: any) => {
                    e.domEvent.stopPropagation();
                }}>
                    <Link to={`/seat/editor?id=${item.id}`}>编辑</Link>
                </Menu.Item>
                <Menu.Item onClick={(e: any) => {
                    e.domEvent.stopPropagation();
                    waringConfirm(`确定要删除${item.seat_name}吗？`, ``, () => {
                        _seatServices.deleteSeat({
                            id: item.id
                        }, (res: any) => {
                            dispatch({
                                type: 'change seatlist delete'
                            });
                        }, (err: any) => {
                            console.log(err);
                        });
                    });
                }}>
                    删除
                </Menu.Item>
            </Menu>
        );
        return (
            <SeatListItem key={index}>
                <SeatListItemImgWrap>
                    <img src={item.seat_pic} alt={item.seat_name}/>
                </SeatListItemImgWrap>
                <ShowListItemTitle>
                    {item.seat_name}
                </ShowListItemTitle>
                <ShowListItemOperate>
                    <Dropdown overlay={menu}>
                        <Icon type="more" style={{fontSize: '30px'}}/>
                    </Dropdown>
                </ShowListItemOperate>
            </SeatListItem>
        );
    });

    return (
        <ListWrapper>
            <ShowListWrapper>
                <Spin spinning={loading}>
                    <ShowListHeader>
                        <ShowListTitle>坐席管理</ShowListTitle>
                        <ListOperate>
                            <Search
                                placeholder="搜索"
                                onSearch={(value: string) => {
                                    dispatch({
                                        type: 'change seatlist search',
                                        search: value
                                    });
                                }}
                                style={{width: '150px', marginRight: '15px'}}
                            />
                            <Button type={'primary'} style={{marginRight: '20px'}}><Link to={"/seat/editor"}>新增坐席</Link></Button>
                        </ListOperate>
                    </ShowListHeader>
                    <QueueAnim delay={200} component={SeatListWrapper}>
                        {seatListItems && seatListItems.length === 0 ? <CustomEmpty/> : seatListItems}
                    </QueueAnim>
                    <ShowListFooter>
                        <Pagination showSizeChanger
                                    showQuickJumper
                                    current={page}
                                    pageSize={limit}
                                    onChange={page => {
                                        dispatch({
                                            type: 'change seatlist page',
                                            page: page
                                        });
                                    }}
                                    onShowSizeChange={(page, limit) => {
                                        dispatch({
                                            type: 'change seatlist limit',
                                            page: page,
                                            limit: limit
                                        });
                                    }}
                                    pageSizeOptions={['8', '16']}
                                    total={total}/>
                    </ShowListFooter>
                </Spin>
            </ShowListWrapper>
        </ListWrapper>
    );
};

export {
    SeatList
};
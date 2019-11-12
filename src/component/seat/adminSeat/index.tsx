import React, {useEffect, useRef, useState} from 'react';
import {Button, Radio, Avatar, Input, Tooltip} from 'antd';
import {Scrollbars} from "react-custom-scrollbars";
import QueueAnim from 'rc-queue-anim';
import {CanvasEditor} from '@/component/seat/seatEditor/canvas';

const {Search} = Input;

import {MODEL_ONE} from './example/model-one-json';

import {SeatIcon} from '@/assert/img/seat/index';

import {
    SeatPickerWrapper,
    SeatPickerContent,
    SeatPickerOperate,
    SeatPickerEditor,
    SeatPickerOpHeader,
    SortByContent,
    SeatUserListWrapper,
    SearchUserWrapper,
    SeatUserTabs,
    SeatUserTabsItem,
    UserTabsItemLine,
    SeatUserList,
    SeatUserListItem,
    SeatUserListName,
    SeatUserInfo,
    SeatUserInfoNum,
    SeatUserListRandom
} from './ui';

import {
    ShowListTitle,
    ShowListHeader,
    ShowListFooter
} from '@/baseUI/BaseShowList';
import {
    ShowListItemOperate
} from "@/component/seat/seatList/ui";

import {
    ThemeOrange
} from '@/baseUI/ButtonWrap';
import {SeatCanvasEditor} from "@/component/seat/seatEditor/ui";

const userListOne = [
    {
        id: 1,
        name: '测试1',
        seatName: 3
    },
    {
        id: 2,
        name: '测试2',
        seatName: 4
    }
];

const userListTwo = [
    {
        id: 3,
        name: '测试3',
        seatName: null
    },
    {
        id: 4,
        name: '测试4',
        seatName: null
    }
];

const AdminSeat: React.ComponentType = () => {
    const canvas: any = useRef();
    const [listSelectKey, setListSelectKey] = useState(0);
    const [showSortList, setShowSortList] = useState<any>([]);
    const [showNoSortList, setShowNoSortList] = useState<any>([]);
    const [sortList, setSortList] = useState<any[]>([]);
    const [noSortList, setNoSortList] = useState<any[]>([]);
    const [baseSortList, setBaseSortList] = useState<any[]>([]);
    const [noBaseSortList, setBaseNoSortList] = useState<any[]>([]);
    const [randomList, setRandomList] = useState<any[]>([]);
    const [dragInfo, setDragInfo] = useState<{ id: any; name: any }>({
        id: null,
        name: null
    });

    const [search, setSearch] = useState<string>('');
    const setUserSeatName = (id: any, name: string) => {

        setDragInfo({
            id: id,
            name: name
        });

    };

    useEffect(() => {
        setShowSortList(baseSortList.slice().concat(noSortList.slice()));
        setBaseNoSortList([]);
    }, [baseSortList, noSortList, randomList]);

    useEffect(() => {
        if (dragInfo.id) {
            const showSortArr = baseSortList.slice();
            const showNoSortArr = noBaseSortList.slice();
            const randomArr = randomList.slice();
            let m, n, k;
            for (let i = 0; i < showSortArr.length; i++) {
                if (showSortArr[i].id == dragInfo.id) {
                    m = i;
                }
            }
            for (let i = 0; i < randomArr.length; i++) {
                if (randomArr[i].id == dragInfo.id) {
                    k = i;
                }
            }
            for (let i = 0; i < showNoSortArr.length; i++) {
                if (showNoSortArr[i].id == dragInfo.id) {
                    n = i;
                }
            }
            if (m === 0 || m) {
                showSortArr[m].seatName = dragInfo.name;
            }
            if (n === 0 || n) {
                showNoSortArr[n].seatName = dragInfo.name;
                showSortArr.push(showNoSortArr.splice(n, 1)[0]);
            }
            if (k === 0 || k) {
                randomArr[k].seatName = dragInfo.name;
                showSortArr.push(randomArr.splice(k, 1)[0]);
                setRandomList(randomArr);
            }
            setBaseSortList(showSortArr);
            setBaseNoSortList(showNoSortArr);
        }
        setSearch('');
    }, [baseSortList, dragInfo, noBaseSortList, randomList]);

    useEffect(() => {
        if (search) {
            const searchSortBase = baseSortList.filter((item: any) => {
                return item.name.match(new RegExp(`${search}`));
            });
            const searchSortRandom = randomList.filter((item: any) => {
                return item.name.match(new RegExp(`${search}`));
            });
            const searchNoSort = noBaseSortList.filter((item: any) => {
                return item.name.match(new RegExp(`${search}`));
            });
            setShowSortList(searchSortBase.concat(searchSortRandom));
            setShowNoSortList(searchNoSort);
        } else {
            setShowSortList(baseSortList.slice().concat(randomList.slice()));
            setShowNoSortList(noBaseSortList);
        }
    }, [baseSortList, noBaseSortList, randomList, search]);

    useEffect(() => {
        setShowSortList(baseSortList.slice().concat(randomList.slice()));
    }, [baseSortList, randomList]);
    useEffect(() => {
        setShowNoSortList(noBaseSortList);
    }, [noBaseSortList]);

    useEffect(() => {
        setBaseSortList(userListOne);
        setBaseNoSortList(userListTwo);
    }, [sortList, noSortList]);

    useEffect(() => {
        canvas.current = new CanvasEditor('seatEditor', {
            selection: false
        });
        setSortList(userListOne);
        setNoSortList(userListTwo);
        canvas.current.loadUserJSON(MODEL_ONE.content, () => {
            canvas.current.setObjSelectFalse();
            canvas.current.seatHovering(() => {
                return {
                    name: '测试',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                };
            });
            canvas.current.setUserDrop((id: any, name: string) => {
                setUserSeatName(id, name);
            });
        });

    }, []);

    const userDrag = (e: any, id: any) => {
        e.dataTransfer.setData("id", id);
    };

    const sortListItems = showSortList.map((item: any, index: number) => {
        return (
            <SeatUserListItem key={index} draggable={true} onDragStart={(e) => userDrag(e, item.id)}>
                <Avatar size={40} icon="user"/>
                <SeatUserListName>{item.name}</SeatUserListName>
                <SeatUserInfo>
                    <SeatUserInfoNum>{item.seatName}</SeatUserInfoNum>
                    <img src={SeatIcon} alt=""/>
                </SeatUserInfo>
            </SeatUserListItem>
        );
    });

    const noSortListItems = showNoSortList.map((item: any, index: number) => {
        return (
            <SeatUserListItem key={index} draggable={true} onDragStart={(e) => userDrag(e, item.id)}>
                <Avatar size={40} icon="user"/>
                <SeatUserListName>{item.name}</SeatUserListName>
            </SeatUserListItem>
        );
    });

    const onUserSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const onRandomClick = () => {
        if (showNoSortList.length > 0) {
            setRandomList(canvas.current.setRandomSeat(showNoSortList.slice()));
        } else if (randomList.length > 0) {
            setRandomList(canvas.current.setRandomSeat(randomList.slice()));
        }
        setSearch('');
    };

    return (
        <SeatPickerWrapper>
            <ShowListHeader>
                <ShowListTitle>坐席管理</ShowListTitle>
                <ShowListItemOperate>
                    <Button type={'primary'} onClick={() => window.history.back()}><a>返回</a></Button>
                </ShowListItemOperate>
            </ShowListHeader>
            <SeatPickerContent>
                <SeatPickerEditor>
                    <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                        <SeatCanvasEditor id="seatEditor" width="1920" height="1080">请使用支持HTML5的浏览器</SeatCanvasEditor>
                    </Scrollbars>
                </SeatPickerEditor>
                <SeatPickerOperate>
                    <SeatPickerOpHeader>排座方式</SeatPickerOpHeader>
                    <SortByContent>
                        <Radio.Group defaultValue="0" buttonStyle="solid">
                            <Tooltip title={'由参会人员自己选座'}>
                                <Radio.Button value="0">自定座位</Radio.Button>
                            </Tooltip>
                            <Tooltip title={'只能由会议发起人分配座位'}>
                                <Radio.Button value="1">指定座位</Radio.Button>
                            </Tooltip>
                        </Radio.Group>
                    </SortByContent>

                    <SeatPickerOpHeader>参会人员</SeatPickerOpHeader>
                    <SeatUserListWrapper>
                        <SearchUserWrapper><Search value={search}
                                                   onChange={(e) => onUserSearch(e)}/></SearchUserWrapper>
                        <SeatUserTabs>
                            <SeatUserTabsItem
                                type={listSelectKey === 0 ? 'active' : ''}
                                onClick={() => setListSelectKey(0)}>已排座({showSortList.length})</SeatUserTabsItem>
                            <SeatUserTabsItem
                                type={listSelectKey === 1 ? 'active' : ''}
                                onClick={() => setListSelectKey(1)}>未排座({showNoSortList.length})</SeatUserTabsItem>
                            <UserTabsItemLine index={listSelectKey}/>
                        </SeatUserTabs>
                        <SeatUserList>
                            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                                <QueueAnim delay={200}>
                                    {listSelectKey === 0 ? sortListItems : noSortListItems}
                                </QueueAnim>
                            </Scrollbars>
                        </SeatUserList>
                        <SeatUserListRandom>
                            <Tooltip title={'对未排座的进行随机排座（不包含拖拽排座人员）'}>
                                <Button type={'primary'} block onClick={() => onRandomClick()}>随机排座</Button>
                            </Tooltip>
                        </SeatUserListRandom>
                    </SeatUserListWrapper>
                </SeatPickerOperate>
            </SeatPickerContent>
            <ShowListFooter>
                <ThemeOrange><Button onClick={() => window.location.reload()}>重置</Button></ThemeOrange>
                <Button type={"primary"}>保存</Button>
            </ShowListFooter>
        </SeatPickerWrapper>
    );
};

export {
    AdminSeat
};
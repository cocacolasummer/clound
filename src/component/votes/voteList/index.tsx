import React, {useEffect, useState} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import VoteServices from '@/services/voteServices';

const _voteService = new VoteServices();
import {CustomEmpty} from '@/component/customEmpty';

// import moment from 'moment';
import {
    Button,

    // Pagination,
    Radio,
    Input,
    Spin,

    // DatePicker
} from 'antd';

const {Search} = Input;
import {
    ShowListHeader,
    ShowListTitle,

    // ShowListFooter,
    ShowListWrapper,
    ShowListOperateNoForm
} from '@/baseUI/BaseShowList';

import {IState} from '@/store';

const mapState = (state: IState) => {
    return {
        limit: state.VoteList.limit,
        page: state.VoteList.page,
        total: state.VoteList.total,
        list: state.VoteList.list,
        search: state.VoteList.search,
        listType: state.VoteList.listType,
        date: state.VoteList.date,
        show: state.VoteEditor.show
    };
};
import {
    VoteListContent
} from './ui';
import {VoteListItem} from './item';
import {error} from "@/util/golbalModalMessage";

const VoteList = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {
        limit,
        page,
        show,
        total,
        list,
        search,
        listType,
        date
    } = useMappedState(mapState);

    useEffect(() => {
        setLoading(true);
        _voteService.getVoteList({
            search: search
        }, (res: any) => {
            dispatch({
                type: 'change votelist data',
                list: listType === '1' ? res.data['attendVoteList'] : res.data['createVoteList'],
                limit: limit,
                total: total,
                page: page
            });
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, [search, limit, page, listType, date, show, dispatch]);

    const voteListItems: React.ElementType[] = list.map((item: any, index: any) => {
        return (
            <VoteListItem data={{...item}} key={index}/>
        );
    });

    return (
        <ShowListWrapper>
            <Spin spinning={loading}>
                <ShowListHeader>
                    <ShowListTitle>投票管理</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Radio.Group
                                     style={{
                                         marginRight: '10px'
                                     }}
                                     value={listType}
                                     onChange={(e: any) => {
                                         dispatch({
                                             type: 'change votelist type',
                                             listType: e.target.value
                                         });
                                     }}
                                     buttonStyle="solid">
                            <Radio.Button value="1">我发起的</Radio.Button>
                            <Radio.Button value="2">我参与的</Radio.Button>
                        </Radio.Group>
                        {/*<DatePicker*/}
                        {/*    value={moment(date, 'YYYY-MM-DD')}*/}
                        {/*    onChange={(time: any) => {*/}
                        {/*        dispatch({*/}
                        {/*            type: 'change votelist date',*/}
                        {/*            date: time.format('YYYY-MM-DD')*/}
                        {/*        });*/}
                        {/*    }}*/}
                        {/*    style={{*/}
                        {/*        marginRight: '10px'*/}
                        {/*    }}/>*/}
                        <Search
                            placeholder={"请输入搜索内容"}
                            onSearch={(value) => {
                                dispatch({
                                    type: 'change votelist search',
                                    search: value
                                });
                            }}
                            style={{
                                width: '150px',
                                marginRight: '10px'
                            }}/>
                        <Button type={'primary'} onClick={() => {
                            dispatch({
                                type: 'change voteeditor show'
                            });
                        }}>发起投票</Button>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <VoteListContent>
                    {list.length === 0 ? <CustomEmpty/> : voteListItems}
                </VoteListContent>
                {/*<ShowListFooter>*/}
                {/*    <Pagination showSizeChanger*/}
                {/*                showQuickJumper*/}
                {/*                current={page}*/}
                {/*                pageSize={limit}*/}
                {/*                onChange={page => {*/}
                {/*                    dispatch({*/}
                {/*                        type: 'change votelist page',*/}
                {/*                        page: page*/}
                {/*                    });*/}
                {/*                }}*/}
                {/*                onShowSizeChange={(page, limit) => {*/}
                {/*                    dispatch({*/}
                {/*                        type: 'change votelist limit',*/}
                {/*                        page: page,*/}
                {/*                        limit: limit*/}
                {/*                    });*/}
                {/*                }}*/}
                {/*                pageSizeOptions={['6', '12']}*/}
                {/*                total={total}*/}
                {/*    />*/}
                {/*</ShowListFooter>*/}
            </Spin>
        </ShowListWrapper>
    );
};

export {
    VoteList
};

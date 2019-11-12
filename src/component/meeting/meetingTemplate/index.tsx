import React, {useState, useEffect} from 'react';
import {Pagination, Form, Icon, Input, Radio, Spin, message} from 'antd';
import {ShowListFooter, ShowListHeader, ShowListOperate, ShowListTitle, ShowListWrapper} from "@/baseUI/BaseShowList";
import {useMappedState, useDispatch} from "redux-react-hook";

import {MeetingTempTable} from './table';
import {MeetingTempCard} from './card';

import {MeetingEditor} from '@/component/meeting/meetingEditor';

const {Search} = Input;
const warning = (msg: string) => {
    message.warning(msg);
};

import {IState} from "@/store";

import MeetingTempServices from '@/services/meetingTempServices';
import {MeetingNormalEditor} from "@/component/meeting/meetingNormalEditor";

const _meetingTempServices = new MeetingTempServices();

const mapState = (state: IState) => {
    return {
        total: state.MeetingTemp.total,
        page: state.MeetingTemp.page,
        limit: state.MeetingTemp.limit,
        search: state.MeetingTemp.search,
        showType: state.MeetingTemp.showType,
        editorMount: state.MeetingTemp.editorMount,
        editorShow: state.MeetingTemp.editorShow
    };
};

interface MeetingTemplateProps {
    type?: string;
}

const MeetingTemplate: React.ComponentType<MeetingTemplateProps> = (props: MeetingTemplateProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        total, page, limit,
        showType, search, editorMount, editorShow
    } = useMappedState(mapState);

    useEffect(() => {
        setLoading(true);
        _meetingTempServices.getTempsListInfo({
            limit: limit,
            page: page,
            search: search
        }, (res: any) => {
            dispatch({
                type: 'change meetingtemp data',
                list: res.data.list,
                total: res.data.total,
                page: page,
                limit: limit
            });
            setLoading(false);
        }, () => {
            warning('数据获取失败');
            setLoading(false);
        });
    }, [dispatch, limit, page, search]);

    useEffect(() => {
        setLoading(true);
        _meetingTempServices.getTempsListInfo({
            limit: limit,
            page: page,
            search: search
        }, (res: any) => {
            dispatch({
                type: 'change meetingtemp data',
                list: res.data.list,
                total: res.data.total,
                page: page,
                limit: limit
            });
            setLoading(false);
        }, () => {
            warning('数据获取失败');
            setLoading(false);
        });
    }, [dispatch, limit, page, search]);

    const editorProps = {
        type: '1',
        startTime: '1',
        endTime: '1',
        closeFun: () => {
            dispatch({
                type: 'close meetingtemp editor'
            });
        },
        in: true,
        propsAgendaCount: 1,
        editorOnExited: () => {
            dispatch({
                type: 'unmount meetingtemp editor'
            });
            dispatch({
                type: 'change meetingeditor isEdit',
                isEdit: false,
                id: null
            });
        }
    };

    return (
        <ShowListWrapper>
            <Spin spinning={loading}>
                <ShowListHeader>
                    <ShowListTitle>会议模板</ShowListTitle>
                    <ShowListOperate>
                        <Form layout="inline">
                            <Form.Item>
                                <Search
                                    placeholder="搜索"
                                    onSearch={(value: string) => {
                                        dispatch({
                                            type: 'change meetingtemp search',
                                            search: value
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Radio.Group value={showType} onChange={(e) => {
                                    dispatch({
                                        type: 'change meetingtemp showtype',
                                        showType: e.target.value
                                    });
                                }}>
                                    <Radio.Button value="table">
                                        <Icon type="unordered-list"/>
                                    </Radio.Button>
                                    <Radio.Button value="card">
                                        <Icon type="appstore" theme="filled"/>
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </ShowListOperate>
                </ShowListHeader>
                {showType === 'table' ? <MeetingTempTable/> : <MeetingTempCard/>}
                <ShowListFooter>
                    <Pagination showSizeChanger
                                showQuickJumper
                                current={page}
                                pageSize={limit}
                                onChange={page => dispatch({
                                    type: 'change meetingtemp page',
                                    page: page,
                                })}
                                onShowSizeChange={(page, limit) => dispatch({
                                    type: 'change meetingtemp limit',
                                    limit: limit,
                                    page: page
                                })}
                                pageSizeOptions={['8', '16']}
                                total={total}/>
                </ShowListFooter>
                {
                    editorMount ? (props.type === 'normal' ?
                        <MeetingNormalEditor {...editorProps} in={editorShow}/> :
                        <MeetingEditor {...editorProps} in={editorShow}/>) : null
                }
            </Spin>
        </ShowListWrapper>
    );
};

export {
    MeetingTemplate
};
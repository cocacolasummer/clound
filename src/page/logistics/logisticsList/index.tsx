import React, {useEffect} from "react";
import {useDispatch, useMappedState} from "redux-react-hook";
import {LogisticsList} from '@/component/logistics/logisticsList';
import {LogisticsEditor} from '@/component/logistics/logisticsEditor';
import {LogisticsDetail} from '@/component/logistics/logisticsDetail';
import {LogisticsClassify} from '@/component/logistics/logisticsClassify';
import {LogisticsGoods} from '@/component/logistics/logisticsGoods';
import {IState} from '@/store';
import LogisticServices from '@/services/logisticServices';

const _logisticServices = new LogisticServices();

const mapListState = (state: IState) => {
    return {
        page: state.LogisticsList.page,
        limit: state.LogisticsList.limit,
        listType: state.LogisticsList.listType,
        search: state.LogisticsList.search,
        status: state.LogisticsList.status,
        date: state.LogisticsList.date
    };
};

const mapEditorState = (state: IState) => {
    return {
        editorShow: state.LogisticsEditor.show,
        editorMount: state.LogisticsEditor.mount
    };
};

const mapDetailState = (state: IState) => {
    return {
        detailShow: state.LogisticsDetail.show,
        detailMount: state.LogisticsDetail.mount
    };
};

const mapClassifyState = (state: IState) => {
    return {
        classifyShow: state.LogisticsClassify.show,
        classifyMount: state.LogisticsClassify.mount
    };
};

const mapGoodsState = (state: IState) => {
    return {
        goodsShow: state.LogisticsGoods.show,
        goodsMount: state.LogisticsGoods.mount
    };
};

const LogisticsListPage: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        page,
        limit,
        listType,
        search,
        status,
        date
    } = useMappedState(mapListState);

    const {
        editorShow,
        editorMount
    } = useMappedState(mapEditorState);

    const {
        detailMount,
        detailShow
    } = useMappedState(mapDetailState);

    const {
        classifyMount,
        classifyShow
    } = useMappedState(mapClassifyState);

    const {
        goodsMount,
        goodsShow
    } = useMappedState(mapGoodsState);

    useEffect(() => {
        _logisticServices.getLogisticList({
            page: page,
            limit: limit,
            listType: listType,
            search: search,
            status: status,
            date: date
        }, (data) => {
            dispatch({
                type: 'change logisticsList list',
                page: parseInt(String(data.page)),
                limit: parseInt(String(data.limit)),
                total: parseInt(String(data.total)),
                list: data.list
            });
        }, (err) => {
            console.log(err);
        });

    }, [page, limit, listType, status, dispatch, search, date]);

    useEffect(() => {
        _logisticServices.getLogisticList({
            page: 1,
            limit: limit,
            listType: listType,
            search: search,
            status: status,
            date: date
        }, (data) => {
            dispatch({
                type: 'change logisticsList list',
                page: parseInt(String(data.page)),
                limit: parseInt(String(data.limit)),
                total: parseInt(String(data.total)),
                list: data.list
            });
        }, (err) => {
            console.log(err);
        });

    }, [search, date, dispatch, limit, listType, status]);
    return (
        <div>
            <LogisticsList/>
            {editorMount ? <LogisticsEditor show={editorShow} close={
                (): void => {
                    dispatch({
                        type: 'change logisticsEditor hide'
                    });
                }
            } unmount={
                (): void => {
                    dispatch({
                        type: 'change logisticsEditor unmount'
                    });
                }
            }/> : null}
            {detailMount ? <LogisticsDetail show={detailShow} close={
                (): void => {
                    dispatch({
                        type: 'change logisticsDetail hide'
                    });
                }
            } unmount={
                (): void => {
                    dispatch({
                        type: 'change logisticsDetail unmount'
                    });
                }
            }/> : null}
            {classifyMount ? <LogisticsClassify show={classifyShow} close={
                (): void => {
                    dispatch({
                        type: 'change logisticsClassify hide'
                    });
                }
            } unmount={
                (): void => {
                    dispatch({
                        type: 'change logisticsClassify unmount'
                    });
                }
            }/> : null}
            {goodsMount ? <LogisticsGoods show={goodsShow} close={
                (): void => {
                    dispatch({
                        type: 'change logisticsGoods hide'
                    });
                }
            } unmount={
                (): void => {
                    dispatch({
                        type: 'change logisticsGoods unmount'
                    });
                }
            }/> : null}
        </div>
    );
};

export {
    LogisticsListPage
};

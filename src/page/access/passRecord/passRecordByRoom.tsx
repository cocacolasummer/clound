import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AccessPassRecordByRoom} from '@/component/accessManage/passRecordByRoom';
import {AccessPassStatisticByRoom} from '@/component/accessManage/passStatisticByRoom';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";

const _accessServices = new AccessServices();

const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
    listDate: string[];
    listUserType: string;
    chartType: string;
} => {
    return {
        listPage: state.AccessPassRecordByRoom.page,
        listLimit: state.AccessPassRecordByRoom.limit,
        listSearch: state.AccessPassRecordByRoom.search,
        listDate: state.AccessPassRecordByRoom.date,
        listUserType: state.AccessPassRecordByRoom.userType,
        chartType: state.AccessPassRecordByRoom.chartType
    };

};

const PassRecordByRoom: React.ComponentType<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useDispatch();

    const {
        listPage,
        listSearch,
        listLimit,
        listUserType,
        listDate,
        chartType
    } = useMappedState(mapListState);
    useEffect(() => {
        _accessServices.getPassRecordByRoom({
            id: props.match.params['id'],
            date: listDate,
            userType: listUserType,
            page: listPage,
            limit: listLimit,
            search: listSearch
        }, (data) => {
            dispatch({
                type: 'change accessPassRecordByRoom list',
                list: data.list,
                page: parseInt(String(data.page)),
                total: parseInt(String(data.total)),
                limit: parseInt(String(data.limit))
            });
        }, (err) => {
            console.log(err);
        });
    }, [listPage, listLimit, listUserType, listDate, listSearch, dispatch, props.match.params]);

    useEffect(() => {
        _accessServices.getPassStatisticByRoom({
            chartType: chartType
        }, (data) => {
            dispatch({
                type: 'change accessPassRecordByRoom chartData',
                chartTitle: data.title,
                chartData: data.chartData
            });
        }, (err) => {
            console.log(err);
        });
    }, [chartType, dispatch]);

    return (
        <div>
            <AccessPassStatisticByRoom/>
            <AccessPassRecordByRoom/>
        </div>
    );
};

const PassRecordByRoomItem: any = withRouter(PassRecordByRoom as any);

export {
    PassRecordByRoomItem
};

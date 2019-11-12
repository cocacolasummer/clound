import React from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {
    ShowListHeader,
    ShowListOperateNoForm,
    ShowListTitle,
    ShowListWrapper
} from "@/baseUI/BaseShowList";
import {Radio, Spin} from "antd";
import {IState} from '@/store';
import {CharDataObj} from '@/store/access/accessPassRecordByRoom';
import {CharItem} from '@/component/accessManage/passRecord/charItem';

const mapState = (state: IState): {
    chartLoading: boolean;
    chartType: string;
    chartData: CharDataObj[];
    chartTitle: string;
} => {
    return {
        chartLoading: state.AccessPassRecordByRoom.chartLoading,
        chartType: state.AccessPassRecordByRoom.chartType,
        chartTitle: state.AccessPassRecordByRoom.chartTitle,
        chartData: state.AccessPassRecordByRoom.chartData
    };
};

const AccessPassStatisticByRoom: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        chartLoading,
        chartType,
        chartTitle,
        chartData
    } = useMappedState(mapState);
    return (
        <ShowListWrapper style={{marginBottom: 15}}>
            <Spin spinning={chartLoading} delay={100}>
                <ShowListHeader>
                    <ShowListTitle>{chartTitle}</ShowListTitle>
                    <ShowListOperateNoForm>
                        <Radio.Group value={chartType} onChange={(e): void => {
                            dispatch({
                                type: 'change accessPassRecordByRoom chartType',
                                chartType: e.target.value
                            });
                        }}
                                     buttonStyle="solid" size={"small"}>
                            <Radio.Button value="week">本周</Radio.Button>
                            <Radio.Button value="month">本月</Radio.Button>
                            <Radio.Button value="year">全年</Radio.Button>
                        </Radio.Group>
                    </ShowListOperateNoForm>
                </ShowListHeader>
                <CharItem data={chartData}/>
            </Spin>
        </ShowListWrapper>
    );
};

export {
    AccessPassStatisticByRoom
};
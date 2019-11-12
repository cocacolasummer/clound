import React from 'react';
import {Chart, Tooltip, Axis, SmoothLine, Point} from 'viser-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

import {CharDataObj} from '@/store/access/accessPassRecord';

const scale = [{
    dataKey: 'day',
    min: 0,
    max: 1,
}];

interface CharItemProps {
    data: CharDataObj[];
}

const CharItem: React.ComponentType<CharItemProps> = (props: CharItemProps) => {

    const dv = new DataSet.View().source(props.data);
    dv.transform({
        type: 'rename',
        map: {
            count: "通行统计"
        }
    }).rows;
    dv.transform({
        type: 'fold',
        fields: ['通行统计'],
        key: 'city',
        value: 'temperature',
    });
    const data = dv.rows;
    return (
        <Chart forceFit height={400} data={data} scale={scale}>
            <Tooltip/>
            <Axis/>
            <SmoothLine position="day*temperature" color="city"/>
            <Point position="day*temperature" color="city" shape="circle"/>
        </Chart>
    );
};

export {
    CharItem
};


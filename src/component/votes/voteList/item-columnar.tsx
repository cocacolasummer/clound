import React from 'react';
import {Chart, Tooltip, Axis, Bar} from 'viser-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');
const scale = [{
    dataKey: 'count',
    tickInterval: 20,
}];

interface ItemColumnarProps {
    data: any;
}

const ItemColumnar: React.ComponentType<ItemColumnarProps> = (props: ItemColumnarProps) => {

    const dv = new DataSet.View().source(props.data);
    dv.transform({
        type: 'rename',
        map: {
            count: "票数"
        }
    }).rows;
    const data = dv.rows;
    return (
        <Chart forceFit={true} height={270} padding={"auto"} data={data} scale={scale}>
            <Tooltip/>
            <Axis/>
            <Bar position="item*票数"/>
        </Chart>
    );
};

export {
    ItemColumnar
};
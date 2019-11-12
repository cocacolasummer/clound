import React from "react";
import {Chart, Tooltip, Axis, Bar, Coord} from 'viser-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

interface ItemRowsProps {
    data: any;
}

const ItemRows: React.ComponentType<ItemRowsProps> = (props: ItemRowsProps) => {
    const dv = new DataSet.View().source(props.data);
    dv.transform({
        type: 'rename',
        map: {
            count: "票数"
        }
    }).rows;
    const data = dv.rows;
    return (
        <Chart forceFit={true} height={270} padding={"auto"} data={data}>
            <Coord type="rect" direction="LB"/>
            <Tooltip/>
            <Axis dataKey="item" label={{offset: 12}}/>
            <Bar position="item*票数"/>
        </Chart>
    );
};

export {
    ItemRows
};

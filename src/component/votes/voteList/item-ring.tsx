import React from 'react';
import {Chart, Tooltip, Axis, Legend, Coord, Pie} from 'viser-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
}];

interface ItemRingProps {
    data: any;
}

const ItemRing: React.ComponentType<ItemRingProps> = (props: ItemRingProps) => {
    const dv = new DataSet.View().source(props.data);
    dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
    });
    const data = dv.rows;

    return (
        <Chart forceFit={true} height={270} padding={"auto"} data={data} scale={scale}>
            <Tooltip showTitle={false}/>
            <Axis/>
            <Legend dataKey="item"/>
            <Coord type="theta" radius={0.75} innerRadius={0.6}/>
            <Pie position="percent" color="item" style={{stroke: '#fff', lineWidth: 1}}
            />
        </Chart>
    );
};

export {
    ItemRing
};

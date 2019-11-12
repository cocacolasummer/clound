import React from 'react';
import {Chart, Tooltip, Axis, Legend, Coord, Line, Point, Area} from 'viser-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataSet = require('@antv/data-set');

interface ItemRadarProps {
    data: any;
}

const ItemRadar: React.ComponentType<ItemRadarProps> = (props: ItemRadarProps) => {
    const dv = new DataSet.View().source(props.data);
    dv.transform({
        type: 'rename',
        map: {
            count: "票数"
        }
    }).rows;
    dv.transform({
        type: 'fold',
        fields: ['票数'],
        key: 'user',
        value: 'score',
    });
    const data = dv.rows;

    const scale = [{
        dataKey: 'score',
        min: 0,
    }];
    const axis1Opts: any = {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
            lineStyle: {
                lineDash: null
            },
            hideFirstLine: false,
        }
    };

    const axis2Opts: any = {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
            type: 'polygon',
            lineStyle: {
                lineDash: null,
            },
        },
    };

    const coordOpts: any = {
        type: "polar",
        radius: "0.8",
    };
    return (
        <Chart forceFit={true} height={270} padding={"auto"} data={data} scale={scale}>
            <Tooltip/>
            <Axis {...axis1Opts} />
            <Axis {...axis2Opts} />
            <Legend dataKey="user" marker="circle" offset={30}/>
            <Coord {...coordOpts} />
            <Line position="item*score" color="user" size={2}/>
            <Point position="item*score" color="user" size={4} shape="circle"/>
            <Area position="item*score" color="user"/>
        </Chart>
    );
};

export {
    ItemRadar
};
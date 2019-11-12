export interface ShortMessageStatisticState {
    countData: any;
    chartData: any[];
    chartDate: string;
}

export type ShortMessageStatisticAction =
    | {
    type: 'change shortMessageStatistic countData';
    countData: any;
} | {
    type: 'change shortMessageStatistic chartDate';
    chartDate: string;
} | {
    type: 'change shortMessageStatistic chartData';
    chartData: any[];
}
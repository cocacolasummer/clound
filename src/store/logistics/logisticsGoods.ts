import {Goods, GoodsType} from './logisticsEditor';

export interface LogisticsGoodsState {
    show: boolean;
    mount: boolean;
    classifyList: [];
    selectGoodsType: string;
    goodsList: Goods[];
    goodsTypeList: GoodsType[];
}

export type LogisticsGoodsAction =
    | {
    type: 'change logisticsGoods show';
} | {
    type: 'change logisticsGoods hide';
} | {
    type: 'change logisticsGoods unmount';
} | {
    type: 'change logisticsGoods selectGoodsType';
    selectGoodsType: string;
} | {
    type: 'change logisticsGoods goodsList';
    goodsList: Goods[];
} | {
    type: 'change logisticsGoods goodsTypeList';
    goodsTypeList: GoodsType[];
};

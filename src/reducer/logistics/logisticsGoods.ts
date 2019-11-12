import {LogisticsGoodsAction, LogisticsGoodsState} from '@/store/logistics/logisticsGoods';

const initialState: LogisticsGoodsState = {
    classifyList: [],
    goodsList: [],
    goodsTypeList: [],
    selectGoodsType: "",
    mount: false,
    show: false
};

export default function reducer(
    state: LogisticsGoodsState | null | undefined = initialState,
    action: LogisticsGoodsAction,
): LogisticsGoodsState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change logisticsGoods show": {
            return {
                ...state,
                show: true,
                mount: true
            };
        }
        case "change logisticsGoods hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change logisticsGoods goodsList": {
            return {
                ...state,
                goodsList: action.goodsList
            };
        }
        case "change logisticsGoods goodsTypeList": {
            return {
                ...state,
                goodsTypeList: action.goodsTypeList
            };
        }
        case "change logisticsGoods selectGoodsType": {
            return {
                ...state,
                selectGoodsType: action.selectGoodsType
            };
        }
        case "change logisticsGoods unmount": {
            return {
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
}

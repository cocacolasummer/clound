export enum EditorType {
    EDIT = '0',
    Add = '1'
}

export interface ShoppingCart {
    id: string;
    count: number;
    price: number;
    goodsType: string;
}

export interface GoodsType {
    id: string;
    name: string;
}

export interface Goods {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    type: string;
}

export interface LogisticsEditorState {
    editId: string;
    editorType: EditorType;
    show: boolean;
    mount: boolean;
    addressList: [];
    attendantList: [];
    selectGoodsType: string;
    data: any;
    goodsList: Goods[];
    goodsTypeList: GoodsType[];
    shoppingCart: ShoppingCart[];
    editorShowType: string;
}

export type LogisticsEditorAction =
    | {
    type: 'change logisticsEditor add';
} | {
    type: 'change logisticsEditor edit';
    editId: string;
} | {
    type: 'change logisticsEditor hide';
} | {
    type: 'change logisticsEditor unmount';
} | {
    type: 'change logisticsEditor selectGoodsType';
    selectGoodsType: string;
} | {
    type: 'change logisticsEditor goodsList';
    goodsList: Goods[];
} | {
    type: 'change logisticsEditor goodsTypeList';
    goodsTypeList: GoodsType[];
} | {
    type: 'change logisticsEditor shoppingCart';
    id: string;
    price: number;
    count: number;
    goodsType: string;
};
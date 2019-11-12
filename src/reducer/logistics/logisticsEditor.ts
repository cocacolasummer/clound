import {EditorType, LogisticsEditorAction, LogisticsEditorState} from '@/store/logistics/logisticsEditor';
import {objDeepCopy} from '@/util/zTreeDataToTree';

const initialState: LogisticsEditorState = {
    selectGoodsType: "",
    addressList: [],
    attendantList: [],
    data: undefined,
    editId: "",
    editorShowType: "",
    editorType: EditorType.Add,
    goodsList: [],
    goodsTypeList: [],
    mount: false,
    shoppingCart: [],
    show: false
};

export default function reducer(
    state: LogisticsEditorState | null | undefined = initialState,
    action: LogisticsEditorAction,
): LogisticsEditorState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change logisticsEditor add": {
            return {
                ...state,
                editorType: EditorType.Add,
                show: true,
                mount: true
            };
        }
        case "change logisticsEditor hide": {
            return {
                ...state,
                show: false
            };
        }
        case "change logisticsEditor edit": {
            return {
                ...state,
                editorType: EditorType.EDIT,
                show: true,
                mount: true,
                editId: action.editId
            };
        }
        case "change logisticsEditor unmount": {
            return {
                ...state,
                editorType: EditorType.Add,
                mount: false,
                editId: '',
                shoppingCart: []
            };
        }
        case "change logisticsEditor selectGoodsType": {
            return {
                ...state,
                selectGoodsType: action.selectGoodsType
            };
        }
        case "change logisticsEditor goodsList": {
            return {
                ...state,
                goodsList: action.goodsList
            };
        }
        case "change logisticsEditor goodsTypeList": {
            return {
                ...state,
                goodsTypeList: action.goodsTypeList
            };
        }
        case "change logisticsEditor shoppingCart": {
            const newShoppingCart: any = objDeepCopy(state.shoppingCart);
            let index;
            for (let i = 0; i < newShoppingCart.length; i++) {
                if (action.id === newShoppingCart[i].id) {
                    index = i;
                }
            }
            if (index || index === 0) {
                if (action.count === 0) {
                    newShoppingCart.splice(index, 1);
                } else {
                    newShoppingCart[index] = {
                        id: action.id,
                        price: action.price,
                        count: action.count,
                        goodsType: action.goodsType
                    };
                }
            } else {
                if (action.count) {
                    newShoppingCart.push({
                        id: action.id,
                        count: action.count,
                        price: action.price,
                        goodsType: action.goodsType
                    });
                }
            }
            return {
                ...state,
                shoppingCart: newShoppingCart
            };
        }
        default: {
            return state;
        }
    }
}

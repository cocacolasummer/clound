import {AccessHolidayPassEditorAction, AccessHolidayPassEditorState} from '@/store/access/accessHolidayPassEditor';

const initialState: AccessHolidayPassEditorState = {
    mount: false,
    show: false,
    editorType: 'add',
    holidayPassId: undefined,
    data: null
};

export default function reducer(
    state: AccessHolidayPassEditorState | null | undefined = initialState,
    action: AccessHolidayPassEditorAction,
): AccessHolidayPassEditorState | null {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case "change accessHolidayPassEditor show": {
            return {
                ...state,
                mount: true,
                show: true,
                holidayPassId: action.holidayPassId,
                editorType: action.editorType
            };
        }
        case "change accessHolidayPassEditor hide": {
            return {
                ...state,
                show: false,
                holidayPassId: undefined,
                editorType: 'add'
            };
        }
        case "change accessHolidayPassEditor unmount": {
            return {
                ...state,
                mount: false
            };
        }
        default:
            return state;
    }
}

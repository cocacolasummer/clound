export interface AccessHolidayPassEditorState {
    show: boolean;
    mount: boolean;
    editorType: string;
    holidayPassId: string | number | undefined;
    data: any;
}

export type AccessHolidayPassEditorAction =
    | {
    type: 'change accessHolidayPassEditor show';
    show: boolean;
    mount: boolean;
    holidayPassId: string | number | undefined;
    editorType: string;
} | {
    type: 'change accessHolidayPassEditor unmount';
    mount: boolean;
} | {
    type: 'change accessHolidayPassEditor hide';
    show: boolean;
};

import React, {useEffect} from 'react';
import {AccessHolidayPass} from '@/component/accessManage/holidayPass';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";
import {AccessHolidayPassEditor} from "@/component/accessManage/holidayPassEditor";

const _accessServices = new AccessServices();

const mapEditorState = (state: IState): {
    editorShow: boolean;
    editorMount: boolean;
} => {
    return {
        editorShow: state.AccessHolidayPassEditor.show,
        editorMount: state.AccessHolidayPassEditor.mount
    };
};
const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
} => {
    return {
        listPage: state.AccessHolidayPass.page,
        listLimit: state.AccessHolidayPass.limit,
        listSearch: state.AccessHolidayPass.search
    };
};

const HolidayPassPage: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        editorMount,
        editorShow
    } = useMappedState(mapEditorState);
    const {
        listLimit,
        listPage,
        listSearch
    } = useMappedState(mapListState);
    useEffect(() => {
        _accessServices.getGroupList({
            page: listSearch ? 1 : listPage,
            limit: listLimit,
            search: listSearch
        }, (data) => {
            dispatch({
                type: 'change accessHolidayPass list',
                list: data.list,
                page: parseInt(String(data.page)),
                total: parseInt(String(data.total)),
                limit: parseInt(String(data.limit))
            });
        }, (err) => {
            console.log(err);
        });
    }, [listPage, listLimit, listSearch, dispatch]);
    return (
        <div>
            <AccessHolidayPass/>
            {
                editorMount ? <AccessHolidayPassEditor show={editorShow} close={(): void => {
                    dispatch({
                        type: 'change accessHolidayPassEditor hide'
                    });
                }} unmount={(): void => {
                    dispatch({
                        type: 'change accessHolidayPassEditor unmount'
                    });
                }}/> : null
            }
        </div>
    );
};

export {
    HolidayPassPage
};

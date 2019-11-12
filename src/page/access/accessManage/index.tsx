import React, {useEffect} from 'react';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";

const _accessServices = new AccessServices();
import {AccessManage} from "@/component/accessManage/manage";
import {AccessManageEditor} from '@/component/accessManage/manageEditor';

const mapEditorState = (state: IState): {
    editorShow: boolean;
    editorMount: boolean;
} => {
    return {
        editorShow: state.AccessManageEditor.show,
        editorMount: state.AccessManageEditor.mount
    };
};
const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
} => {
    return {
        listPage: state.AccessManage.page,
        listLimit: state.AccessManage.limit,
        listSearch: state.AccessManage.search
    };
};
const AccessManagePage: React.ComponentType = () => {
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
                type: 'change accessManage list',
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
            <AccessManage/>
            {editorMount ? <AccessManageEditor show={editorShow}
                                               close={(): void => {
                                                   dispatch({
                                                       type: 'change accessManageEditor hide'
                                                   });
                                               }}
                                               unmount={(): void => {
                                                   dispatch({
                                                       type: 'change accessManageEditor unmount'
                                                   });

                                               }}/> : null}
        </div>
    );
};

export {
    AccessManagePage
};

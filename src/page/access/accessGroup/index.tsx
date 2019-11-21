import React, {useEffect} from 'react';
import {AccessGroup} from '@/component/accessManage/group';
import {AccessGroupEditor} from '@/component/accessManage/groupEditor';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";

const _accessServices = new AccessServices();

const mapEditorState = (state: IState): {
    editorShow: boolean;
    editorMount: boolean;
} => {
    return {
        editorShow: state.AccessGroupEditor.show,
        editorMount: state.AccessGroupEditor.mount
    };
};

const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
} => {
    return {
        listPage: state.AccessGroup.page,
        listLimit: state.AccessGroup.limit,
        listSearch: state.AccessGroup.search
    };
};
const AccessGroupPage: React.ComponentType = () => {
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
        _accessServices.deviceGroupList({
            page: listSearch ? 1 : listPage,
            pagesize: listLimit,
            name: listSearch
        }, (data: any) => {
            dispatch({
                type: 'change accessGroup list',
                list: data.data.list,
                page: listPage,
                total: data.data.count,
                limit: listLimit
            });
        }, (err: any) => {
            console.log(err);
        });
    }, [listPage, listLimit, listSearch, dispatch]);
    return (
        <div>
            <AccessGroup/>
            {editorMount ? <AccessGroupEditor show={editorShow}
                                              close={(): void => {
                                                  dispatch({
                                                      type: 'change accessGroupEditor hide'
                                                  });
                                              }}
                                              unmount={(): void => {
                                                  dispatch({
                                                      type: 'change accessGroupEditor unmount'
                                                  });

                                              }}/> : null}
        </div>
    );
};

export {
    AccessGroupPage
};

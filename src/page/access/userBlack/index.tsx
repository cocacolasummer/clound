import React, {useEffect} from 'react';
import AccessServices from '@/services/accessServices';
import {IState} from "@/store";
import {useDispatch, useMappedState} from "redux-react-hook";

const _accessServices = new AccessServices();

import {AccessUserBlack} from '@/component/accessManage/userBlack';
import {AccessUserBlackEditor} from '@/component/accessManage/userBlackEditor';

const mapEditorState = (state: IState): {
    editorShow: boolean;
    editorMount: boolean;
} => {
    return {
        editorShow: state.AccessUserBlackEditor.show,
        editorMount: state.AccessUserBlackEditor.mount
    };
};

const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
} => {
    return {
        listPage: state.AccessUserBlack.page,
        listLimit: state.AccessUserBlack.limit,
        listSearch: state.AccessUserBlack.search
    };
};
const UserBlackPage: React.ComponentType = () => {
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
        _accessServices.blackList({
            page: listSearch ? 1 : listPage,
            pageSize: listLimit,
            name: listSearch
        }, (data: any) => {
            dispatch({
                type: 'change accessUserBlack list',
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
            <AccessUserBlack/>
            {
                editorMount ? <AccessUserBlackEditor show={editorShow} close={(): void => {
                    dispatch({
                        type: 'change accessUserBlackEditor hide'
                    });
                }} unmount={(): void => {
                    dispatch({
                        type: 'change accessUserBlackEditor unmount'
                    });
                }}/> : null
            }
        </div>
    );
};

export {
    UserBlackPage
};

import React, {useEffect} from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';

import AccessServices from '@/services/accessServices';

const _accessServices = new AccessServices();

import {AccessUserType} from '@/component/accessManage/userType';
import {UserTypeEditor} from '@/component/accessManage/userTypeEditor';

import {IState} from '@/store';

const mapEditorState = (state: IState): {
    editorShow: boolean;
    editorMount: boolean;
} => {
    return {
        editorShow: state.AccessUserTypeEditor.show,
        editorMount: state.AccessUserTypeEditor.mount
    };
};

const mapListState = (state: IState): {
    listPage: number;
    listLimit: number;
    listSearch: string | undefined;
} => {
    return {
        listPage: state.AccessUserType.page,
        listLimit: state.AccessUserType.limit,
        listSearch: state.AccessUserType.search
    };

};

const UserTypePage: React.ComponentType = () => {
    const dispatch = useDispatch();
    const {
        editorMount,
        editorShow
    } = useMappedState(mapEditorState);
    const {
        listPage,
        listSearch,
        listLimit
    } = useMappedState(mapListState);
    useEffect(() => {
        _accessServices.groupIndex({
            page: listSearch ? 1 : listPage,
            pageSize: listLimit,
            name: listSearch
        }, (data: any) => {
            dispatch({
                type: 'change accessUserType list',
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
            <AccessUserType/>
            {editorMount ? <UserTypeEditor
                show={editorShow}
                close={(): void => {
                    dispatch({
                        type: 'change userTypeEditor hide'
                    });
                }}
                unmount={(): void => {
                    dispatch({
                        type: 'change userTypeEditor unmount'
                    });
                }}
            /> : null}
        </div>
    );
};

export {
    UserTypePage
};
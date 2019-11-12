import React from 'react';
import {useMappedState, useDispatch} from 'redux-react-hook';

import {IState} from "@/store";

const mapEditorState = (state: IState) => {
    return {
        editorMount: state.VoteEditor.mount,
        editorShow: state.VoteEditor.show
    };
};

const mapDetailState = (state: IState) => {
    return {
        detailMount: state.VoteDetail.mount,
        detailShow: state.VoteDetail.show
    };
};

import {VoteList} from '@/component/votes/voteList';
import {VoteEditor} from "@/component/votes/voteEditor";
import {VoteDetail} from "@/component/votes/voteDetail";

const VoteListPage = () => {
    const dispatch = useDispatch();
    const {
        editorMount,
        editorShow
    } = useMappedState(mapEditorState);
    const {
        detailMount,
        detailShow
    } = useMappedState(mapDetailState);
    return (
        <div>
            <VoteList/>
            {editorMount ? <VoteEditor close={() => {
                dispatch({
                    type: 'change voteeditor hide'
                });
            }} unmount={() => {
                dispatch({
                    type: 'change voteeditor unmount'
                });
            }} show={editorShow}/> : null}
            {detailMount ? <VoteDetail show={detailShow}/> : null}
        </div>
    );
};

export {
    VoteListPage
};

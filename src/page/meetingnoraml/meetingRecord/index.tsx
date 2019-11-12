import React from "react";
import {useMappedState} from 'redux-react-hook';

import {MeetingRecord} from '@/component/meeting/meetingRecord';
import {MeetingDetail} from '@/component/meeting/meetingDetail';
import {MeetingNormalEditor} from "@/component/meeting/meetingNormalEditor";

import {IState} from '@/store';

const mapState = (state: IState) => {
    return {
        detailMount: state.MeetingDetail.mount,
        editorMount: state.MeetingEditor.mount
    };
};

const MeetingRecordPage = () => {

    const {
        detailMount,
        editorMount
    } = useMappedState(mapState);
    return (
        <div>
            <MeetingRecord type={"normal"}/>
            {detailMount ? <MeetingDetail type={"normal"} isAdmin={true}/> : null}
            {editorMount ? <MeetingNormalEditor isAdmin={true}/> : null}
        </div>
    );
};

export {
    MeetingRecordPage
};
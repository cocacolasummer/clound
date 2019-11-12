import React from "react";
import {useDispatch, useMappedState} from 'redux-react-hook';

import {MeetingTimePicker} from '@/component/meeting/meetingTimePicker';
import {MeetingList} from '@/component/meeting/meetingList';
import {MeetingSeat} from "@/component/meeting/meetingSeat";

import {IState} from '@/store';

const mapMeetingSeatState = (state: IState) => {
    return {
        meetingSeatShow: state.MeetingSeat.show,
        meetingSeatMount: state.MeetingSeat.mount
    };
};

const MeetingReservationPage = () => {
    const dispatch = useDispatch();

    const {
        meetingSeatMount,
        meetingSeatShow
    } = useMappedState(mapMeetingSeatState);

    return (
        <div>
            <MeetingTimePicker/>
            <MeetingList/>
            {meetingSeatMount ? <MeetingSeat closeFn={() => {
                dispatch({
                    type: 'change meetingseat hide'
                });
            }}
                                             unmountFn={() => {
                                                 dispatch({
                                                     type: 'change meetingseat unmount'
                                                 });
                                             }}
                                             show={meetingSeatShow}/> : null}
        </div>
    );
};

export {
    MeetingReservationPage
};
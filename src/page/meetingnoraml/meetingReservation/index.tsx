import React, {useEffect} from "react";
import MeetingReservationServices from '@/services/meetingReservationServices';

const _meetingReservationServices = new MeetingReservationServices();
import {MeetingDetail} from '@/component/meeting/meetingDetail';
import {MeetingTimePicker} from '@/component/meeting/meetingTimePicker';
import {MeetingList} from '@/component/meeting/meetingList';
import {MeetingNormalEditor} from "@/component/meeting/meetingNormalEditor";
import {useDispatch, useMappedState} from "redux-react-hook";

import {IState} from '@/store';

const mapGlobalState = (state: IState) => {
    return {
        loginUserId: state.Global.loginUserId,
        detailMount: state.MeetingDetail.mount,
        editorMount: state.MeetingEditor.mount
    };
};

const MeetingReservationPage = () => {
    const dispatch = useDispatch();
    const {
        loginUserId, detailMount, editorMount
    } = useMappedState(mapGlobalState);

    useEffect(() => {
        _meetingReservationServices.getCheckSet((res: any) => {
            dispatch({
                type: 'change meetingList needCheck',
                needCheck: Boolean(res.data.isAudit)
            });
        }, (err: any) => {
            console.log(err);
        });
    }, [dispatch]);
    useEffect(() => {
        _meetingReservationServices.getCheckUserList((res: any) => {
            dispatch({
                type: 'change meetingList canCheck',
                canCheck: res.data.map((item: any) => item.uid).indexOf(loginUserId) !== -1
            });
        }, (err: any) => {
            console.log(err);
        });
    }, [dispatch, loginUserId]);
    return (
        <div>
            <MeetingTimePicker type={'normal'}/>
            <MeetingList type={'normal'}/>
            {detailMount ? <MeetingDetail type={"normal"} isAdmin={false}/> : null}
            {editorMount ? <MeetingNormalEditor isAdmin={false}/> : null}
        </div>
    );
};

export {
    MeetingReservationPage
};
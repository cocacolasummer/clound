import React from "react";
import {Route, Switch} from 'react-router-dom';
import {PageLayoutWrapper} from '@/baseUI/PageLayoutWrapper';
import {PageSider} from "@/baseUI/PageSider";
import {PageMain} from "@/baseUI/PageMain";
import SideBar from "@/component/pageSideBar";

import {MeetingReservationPage} from '@/page/meetingnoraml/meetingReservation';
import {MeetingTempPage} from '@/page/meetingnoraml/meetingTemp';
import {MeetingRecordPage} from '@/page/meetingnoraml/meetingRecord';
import {MeetingStatisticPage} from '@/page/meetingnoraml/meetingStatistic';
import {
    IconRes,
    IconResActive,
    IconStatistic,
    IconStatisticActive,
    IconTemp,
    IconTempActive
} from "@/assert/img/meeting/sidebar";

import {IState} from '@/store';
import {useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        user: state.Global.globalUser
    };
};

const MeetingNormalPageLayout: React.ComponentType<any> = () => {
    const {
        user
    } = useMappedState(mapState);
    const superUser = {
        title: '会议管理',
        defaultKey: '/normalmeeting/res/',
        linkArray: [
            {
                name: '会议预约',
                link: '/normalmeeting/res/',
                icon: IconRes,
                iconActive: IconResActive
            },
            {
                name: '会议记录',
                link: '/normalmeeting/record/',
                icon: IconTemp,
                iconActive: IconTempActive
            },

            // {
            //     name: '会议模板',
            //     link: '/normalmeeting/template/',
            //     icon: IconTemp,
            //     iconActive: IconTempActive
            // },
            {
                name: '会议统计',
                link: '/normalmeeting/statistic/',
                icon: IconStatistic,
                iconActive: IconStatisticActive
            }
        ]
    };
    const normalUser = {
        title: '会议管理',
        defaultKey: '/normalmeeting/res/',
        linkArray: [
            {
                name: '会议预约',
                link: '/normalmeeting/res/',
                icon: IconRes,
                iconActive: IconResActive
            }
        ]
    };

    const NormalMeetingSideBar = user && user.isAdmin && user.isCompanyAdmin === 'false' ? superUser : normalUser;
    return (
        <PageLayoutWrapper>
            <PageSider key={1}>
                <SideBar {...NormalMeetingSideBar}/>
            </PageSider>
            <PageMain key={2}>
                <Switch>
                    <Route exact path="/normalmeeting/res/" component={MeetingReservationPage}/>
                    <Route exact path="/normalmeeting/record/" component={MeetingRecordPage}/>
                    <Route exact path="/normalmeeting/template/" component={MeetingTempPage}/>
                    <Route exact path="/normalmeeting/statistic/" component={MeetingStatisticPage}/>
                </Switch>
            </PageMain>
        </PageLayoutWrapper>
    );
};

export {
    MeetingNormalPageLayout
};
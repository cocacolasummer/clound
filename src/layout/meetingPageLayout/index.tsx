import React from "react";
import {Route, Switch} from 'react-router-dom';
import {PageLayoutWrapper} from '@/baseUI/PageLayoutWrapper';
import {PageSider} from "@/baseUI/PageSider";
import {PageMain} from "@/baseUI/PageMain";
import SideBar from "@/component/pageSideBar/";

import {MeetingReservationPage} from '@/page/meeting/meetingReservation';
import {MeetingTempPage} from '@/page/meeting/meetingTemp';
import {MeetingStatisticPage} from '@/page/meeting/meetingStatistic';

import {
    IconRes,
    IconResActive,
    IconStatistic,
    IconStatisticActive,
    IconTemp,
    IconTempActive
} from '@/assert/img/meeting/sidebar';

const MeetingPageLayout = () => {
    const MeetingSideBar = {
        title: '会议管理',
        defaultKey: '/meeting/res/',
        linkArray: [
            {
                name: '会议预约',
                link: '/meeting/res/',
                icon: IconRes,
                iconActive: IconResActive
            },
            {
                name: '会议模板',
                link: '/meeting/template/',
                icon: IconTemp,
                iconActive: IconTempActive
            },
            {
                name: '会议统计',
                link: '/meeting/statistic/',
                icon: IconStatistic,
                iconActive: IconStatisticActive
            }
        ]
    };
    return (
        <PageLayoutWrapper>
            <PageSider key={1}>
                <SideBar {...MeetingSideBar}/>
            </PageSider>
            <PageMain key={2}>
                <Switch>
                    <Route exact path="/meeting/res/" component={MeetingReservationPage}/>
                    <Route exact path="/meeting/template/" component={MeetingTempPage}/>
                    <Route exact path="/meeting/statistic/" component={MeetingStatisticPage}/>
                </Switch>
            </PageMain>
        </PageLayoutWrapper>
    );
};

export {
    MeetingPageLayout
};
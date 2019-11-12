import React, {Fragment} from 'react';
import QueueAnim from 'rc-queue-anim';
import {CSSTransition} from 'react-transition-group';

import {UserCount} from './userCount';

import {RoomTotal} from './roomTotal';

import {AttendTotal} from './attendTotal';
import {ComRank} from './comRank';

import {
    StatisticWrap,
} from './ui';

import {
    UIGrid,
    UICol
} from '@/baseUI/Grid';

const MeetingStatistic = () => {
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <StatisticWrap>
                    <QueueAnim delay={300}>
                        <UserCount key={1}/>
                        <UIGrid key={2}>
                            <UICol span={12} key={5}>
                                <ComRank key={5}/>
                            </UICol>
                            <UICol span={12} key={7}>
                                <RoomTotal/>
                            </UICol>
                        </UIGrid>
                        <AttendTotal key={3}/>
                    </QueueAnim>
                </StatisticWrap>
            </CSSTransition>
        </Fragment>
    );
};

export {
    MeetingStatistic
};
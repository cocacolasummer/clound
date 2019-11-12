import React from "react";
import {Route, Switch} from 'react-router-dom';
import {FullWinLayoutWrapper} from '@/baseUI/PageLayoutWrapper';

import {SeatEditorPage} from '@/page/seat/seatEditor';
import {SeatListPage} from '@/page/seat/seatList';
import {AdminSeatPage} from '@/page/seat/adminSeat';
import {UserSeatPage} from '@/page/seat/userSeat';

const SeatPageLayout = () => {
    return (
        <FullWinLayoutWrapper>
            <Switch>
                <Route exact path="/seat/" component={SeatListPage}/>
                <Route exact path="/seat/editor/" component={SeatEditorPage}/>
                <Route exact path="/seat/admin/" component={AdminSeatPage}/>
                <Route exact path="/seat/user/" component={UserSeatPage}/>
            </Switch>
        </FullWinLayoutWrapper>
    );
};

export {
    SeatPageLayout
};
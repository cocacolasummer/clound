import React from "react";
import {Route, Switch} from 'react-router-dom';
import {FullWinLayoutWrapper} from '@/baseUI/PageLayoutWrapper';

import {LogisticsListPage} from '@/page/logistics/logisticsList';

const LogisticsPageLayout: React.ComponentType = () => {
    return (
        <FullWinLayoutWrapper>
            <Switch>
                <Route exact path="/logistics/list/" component={LogisticsListPage}/>
            </Switch>
        </FullWinLayoutWrapper>
    );
};

export {
    LogisticsPageLayout
};
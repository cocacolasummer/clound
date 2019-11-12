import React from "react";
import {Route, Switch} from 'react-router-dom';
import {PageLayoutWrapper} from '@/baseUI/PageLayoutWrapper';
import {PageMain} from "@/baseUI/PageMain";

import {VoteListPage} from '@/page/vote/voteList';

const VotePageLayout = () => {
    return (
        <PageLayoutWrapper>
            <PageMain key={2}>
                <Switch>
                    <Route exact path="/vote/" component={VoteListPage}/>
                </Switch>
            </PageMain>
        </PageLayoutWrapper>
    );
};

export {
    VotePageLayout
};

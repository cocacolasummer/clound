import React from 'react';
import {PassRecordItem} from './passRecord';
import {PassRecordByRoomItem} from './passRecordByRoom';
import {Switch, Route} from 'react-router-dom';

const PassRecordPage: React.ComponentType = () => {
    return (
        <Switch>
            <Route exact path={"/access/record/"} component={PassRecordItem}/>
            <Route path={"/access/record/:id/"} component={PassRecordByRoomItem}/>
        </Switch>
    );
};

export {
    PassRecordPage
};

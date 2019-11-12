import React from "react";
import {Route, Switch} from 'react-router-dom';
import {PageLayoutWrapper} from '@/baseUI/PageLayoutWrapper';
import {PageSider} from "@/baseUI/PageSider";
import {PageMain} from "@/baseUI/PageMain";
import SideBar from "@/component/pageSideBar/";

import * as Icon from '@/assert/img/access/sidebar';

import {UserTypePage} from '@/page/access/userType';
import {UserBlackPage} from "@/page/access/userBlack";
import {AccessGroupPage} from "@/page/access/accessGroup";
import {AccessManagePage} from "@/page/access/accessManage";
import {PassRecordPage} from "@/page/access/passRecord";
import {HolidayPassPage} from "@/page/access/holidayPass";

const AccessPageLayout: React.ComponentType<any> = () => {
    const AccessSideBar = {
        title: '门禁管理',
        defaultKey: '/access/user/',
        linkArray: [
            {
                name: '用户类型',
                link: '/access/user/',
                icon: Icon.IconUser,
                iconActive: Icon.IconUserActive
            },
            {
                name: '黑名单',
                link: '/access/black/',
                icon: Icon.IconUserBlack,
                iconActive: Icon.IconUserBlackActive
            },
            {
                name: '设备群组',
                link: '/access/group/',
                icon: Icon.IconGroup,
                iconActive: Icon.IconGroupActive
            },
            {
                name: '设备管理',
                link: '/access/manage/',
                icon: Icon.IconManage,
                iconActive: Icon.IconManageActive
            },
            {
                name: '假期通行',
                link: '/access/pass/',
                icon: Icon.IconPass,
                iconActive: Icon.IconPassActive
            },
            {
                name: '通行记录/统计',
                link: '/access/record/',
                icon: Icon.IconRecord,
                iconActive: Icon.IconRecordActive
            }
        ]
    };
    return (
        <PageLayoutWrapper>
            <PageSider key={1}>
                <SideBar {...AccessSideBar}/>
            </PageSider>
            <PageMain key={2}>
                <Switch>
                    <Route exact path={"/access/user/"} component={UserTypePage}/>
                    <Route exact path={"/access/black/"} component={UserBlackPage}/>
                    <Route exact path={"/access/group/"} component={AccessGroupPage}/>
                    <Route exact path={"/access/manage/"} component={AccessManagePage}/>
                    <Route exact path={"/access/pass/"} component={HolidayPassPage}/>
                    <Route path={"/access/record/"} component={PassRecordPage}/>
                </Switch>
            </PageMain>
        </PageLayoutWrapper>
    );
};

export {
    AccessPageLayout
};

import React from 'react';
import {PageSider} from "@/baseUI/PageSider";
import SideBar from "@/component/pageSideBar";
import {PageMain} from "@/baseUI/PageMain";
import {PageLayoutWrapper} from "@/baseUI/PageLayoutWrapper";
import {Switch, Route, Redirect} from 'react-router-dom';

import {ShotMessageSettingPage} from '@/page/shortMessage/shortMessageSetting';
import {ShortMessageStatisticPage} from '@/page/shortMessage/shortMessageStatistic';
import {VoucherCenterPage} from '@/page/shortMessage/voucherCenter';
import {VoucherRecordPage} from '@/page/shortMessage/voucherRecord';
import {GetVoucherInvoicePage} from '@/page/shortMessage/voucherInvoice/getVoucherInvocie';
import {VoucherInvoiceListPage} from '@/page/shortMessage/voucherInvoice/voucherInvoiceList';

import {
    IconSmsStatistic,
    IconSmsStatisticActive,
    IconVoucherCenter,
    IconVoucherCenterActive,
    IconVoucherRecord,
    IconVoucherRecordActive,
    IconInvoice,
    IconInvoiceActive
} from "@/assert/img/shortMessage";

const ShortMessagePageLayout: React.ComponentType = () => {
    const MeetingSideBar = {
        title: '短信管理',
        defaultKey: '/sms/statistic/',
        linkArray: [
            {
                name: '短信总览',
                link: '/sms/statistic/',
                icon: IconSmsStatistic,
                iconActive: IconSmsStatisticActive
            },
            {
                name: '充值中心',
                link: '/sms/voucherCenter/',
                icon: IconVoucherCenter,
                iconActive: IconVoucherCenterActive
            },
            {
                name: '充值记录',
                link: '/sms/voucherRecord/',
                icon: IconVoucherRecord,
                iconActive: IconVoucherRecordActive
            },
            {
                name: '发票管理',
                link: '/sms/invoice',
                icon: IconInvoice,
                iconActive: IconInvoiceActive,
                children: [
                    {
                        name: '发票索取',
                        link: '/sms/invoice/getInvoice',
                    },
                    {
                        name: '发票列表',
                        link: '/sms/invoice/list',
                    }
                ]
            },
            {
                name: '短信设置',
                link: '/sms/setting/',
                baseIcon: 'setting'
            },
        ]
    };
    return (
        <PageLayoutWrapper>
            <PageSider key={1}>
                <SideBar {...MeetingSideBar}/>
            </PageSider>
            <PageMain key={2}>
                <Switch>
                    <Route exact path={'/sms/'} render={() => <Redirect to="/sms/statistic/"/>}/>
                    <Route exact path={'/sms/statistic/'} component={ShortMessageStatisticPage}/>
                    <Route exact path={'/sms/voucherCenter'} component={VoucherCenterPage}/>
                    <Route exact path={'/sms/voucherRecord'} component={VoucherRecordPage}/>
                    <Route exact path={'/sms/invoice/getInvoice'} component={GetVoucherInvoicePage}/>
                    <Route exact path={'/sms/invoice/list'} component={VoucherInvoiceListPage}/>
                    <Route exat path={'/sms/setting/'} component={ShotMessageSettingPage} />
                </Switch>
            </PageMain>
        </PageLayoutWrapper>
    );
};

export {
    ShortMessagePageLayout
};
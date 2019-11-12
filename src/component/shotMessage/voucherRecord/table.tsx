import React, {Fragment} from 'react';
import {Button, Table} from "antd";
import {useMappedState} from "redux-react-hook";
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        list: state.VoucherRecord.list
    };
};
import {ThemeGreen} from '@/baseUI/ButtonWrap';
import ShortMessageServices from '@/services/shortMessageServices';
import {error, infoModal} from "@/util/golbalModalMessage";
import {withRouter} from "react-router";
const _shortMessageServices = new ShortMessageServices();

const VoucherRecordTable: React.ComponentType = withRouter((props) => {
    const {list} = useMappedState(mapState);

    const continuePay = (id: string, payType: string) => {
        _shortMessageServices.getContinuePay({
            id: id,
            payType: payType
        }, (res: any) => {
            infoModal('支付订单创建成功', '请在新页面中完成支付, 支付完成后请点击下方支付已完成', '支付已完成', () => {
                props.history.push('/sms/voucherRecord/');
            });
            const a = document.createElement('a');
            a.href = res.data;
            a.target = '_blank';
            document.body.append(a);
            a.click();
            document.body.removeChild(a);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    };
    const tableHeader: any = [
        {
            title: '订单号',
            dataIndex: 'order_number',
            key: 'order_number',
            align: 'center'
        },
        {
            title: '充值时间',
            dataIndex: 'success_time',
            key: 'success_time',
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                let content = '';
                switch (record.status) {
                    case -1:
                        content = '充值失败';
                        break;
                    case 0:
                        content = '待充值';
                        break;
                    case 1:
                        content = '充值成功';
                        break;
                }
                return (
                    <span>{content}</span>
                );
            }
        },
        {
            title: '充值金额',
            dataIndex: 'fee',
            key: 'fee',
            align: 'center'
        },
        {
            title: '充值数量',
            dataIndex: 'num',
            key: 'num',
            align: 'center'
        },
        {
            title: '公司名称',
            dataIndex: 'company_name',
            key: 'company_name',
            align: 'center'
        },
        {
            title: '继续支付',
            key: 'operate',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (text: any, record: any, index: number) => {
                return (
                    <Fragment>
                        {
                            record.status === 0 ? <ThemeGreen><Button type={"primary"}
                                                                      onClick={(): void => {
                                                                      }}
                                                                      size={"small"}>微信</Button></ThemeGreen> : null
                        }
                        {
                            record.status === 0 ? <Button type={"primary"}
                                                          onClick={(): void => {
                                                            continuePay(record.id, 'ali');
                                                          }}
                                                          size={"small"}>支付宝</Button> : null
                        }
                    </Fragment>
                );
            }
        },
    ];
    return (
        <Table rowKey={(record: any): string => record.id + ''} dataSource={list} pagination={false} columns={tableHeader}/>
    );
});

export {
    VoucherRecordTable
};
import React, {useEffect, useState} from 'react';
import {Icon, Button, Checkbox, Spin} from 'antd';
import {withRouter} from 'react-router-dom';
import ShortMessageServices from '@/services/shortMessageServices';
const _shortMessageServices = new ShortMessageServices();
import {
    VoucherCenterWrap,
    VoucherCenterHeader,
    VoucherCenterTitle,
    VoucherCenterContent,
    VoucherCenterContentTitle,
    VoucherCenterVoucherType,
    VoucherCenterVoucherTypeItem,
    VoucherTypeTitle,
    VoucherTypeContent,
    VoucherTypeCheck,
    VoucherPayContent,
    VoucherPayItem,
    VoucherPayCheck,
    VoucherFormWrap,
    VoucherFooter,
    VoucherFooterTitle,
    VoucherFooterMoney,
    VoucherFooterUnit
} from './ui';

import {
    VoucherWeChatPay,
    VoucherAlipay
} from '@/assert/img/shortMessage';
import {CSSTransition} from "react-transition-group";
import {error, infoModal} from "@/util/golbalModalMessage";
import {useDispatch, useMappedState} from "redux-react-hook";
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        voucherPackageList: state.VoucherCenter.voucherPackageList
    };
};

const VoucherCenter: React.ComponentType = withRouter((props) => {
    const dispatch = useDispatch();
    const {voucherPackageList} = useMappedState(mapState);
    const [voucherType, setVoucherType] = useState();
    const [voucherPay, setVoucherPay] = useState('ali');
    const [checkRfc, setCheckRfc] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        _shortMessageServices.getVoucherPackageList((res: any) => {
            dispatch({
                type: 'change voucherCenter voucherPackageList',
                voucherPackageList: res.data
            });
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        voucherPackageList && voucherPackageList[0] && setVoucherType(voucherPackageList[0].id);
    }, [voucherPackageList]);

    const getPrice = (id: string | number) => {
        if(voucherPackageList && voucherPackageList.filter(item => item.id === id)[0]) {
            return parseFloat(voucherPackageList.filter(item => item.id === id)[0].fee).toFixed(2);
        }
        return 0;
    };
    return (
        <CSSTransition
            in={true}
            timeout={1000}
            unmountOnExit
            appear={true}
        >
        <VoucherCenterWrap>
            <Spin spinning={loading}>
            <VoucherCenterHeader>
                <VoucherCenterTitle>充值中心</VoucherCenterTitle>
            </VoucherCenterHeader>
            <VoucherCenterContent>
                <VoucherCenterContentTitle>
                    请选择套餐
                </VoucherCenterContentTitle>
                <VoucherCenterVoucherType>
                    {
                        voucherPackageList && voucherPackageList.map((item: any, index: number) => {
                            return (
                                <VoucherCenterVoucherTypeItem key={index} active={voucherType === item.id}
                                                              onClick={() => setVoucherType(item.id)}
                                >
                                    {voucherType === item.id ? <VoucherTypeCheck>
                                        <Icon type="check"/>
                                    </VoucherTypeCheck> : null}
                                    <VoucherTypeTitle>{item.num}条</VoucherTypeTitle>
                                    <VoucherTypeContent>{parseFloat(item.fee).toFixed(2)}元</VoucherTypeContent>
                                </VoucherCenterVoucherTypeItem>
                            );
                        })
                    }
                </VoucherCenterVoucherType>
                <VoucherCenterContentTitle>
                    请选择支付方式
                </VoucherCenterContentTitle>
                <VoucherPayContent>
                    <VoucherPayItem active={voucherPay === 'wx_web'}
                                    onClick={() => setVoucherPay('wx_web')}
                    >
                        {voucherPay === 'wx_web' ? <VoucherPayCheck>
                            <Icon type="check"/>
                        </VoucherPayCheck> : null}
                        <img src={VoucherWeChatPay} alt={'微信支付'}/>
                    </VoucherPayItem>
                    <VoucherPayItem active={voucherPay === 'ali'}
                                    onClick={() => setVoucherPay('ali')}>
                        {voucherPay === 'ali' ? <VoucherPayCheck>
                            <Icon type="check"/>
                        </VoucherPayCheck> : null}
                        <img src={VoucherAlipay} alt={'支付宝支付'}/>
                    </VoucherPayItem>
                </VoucherPayContent>
                <VoucherCenterContentTitle>
                    服务协议
                </VoucherCenterContentTitle>
                <VoucherFormWrap>
                    <Checkbox value={checkRfc} onChange={() => setCheckRfc(!checkRfc)}>阅读并同意<Button
                        type={"link"}>《服务协议》</Button></Checkbox>
                </VoucherFormWrap>
            </VoucherCenterContent>
            <VoucherFooter>
                <VoucherFooterTitle>合计</VoucherFooterTitle>
                <VoucherFooterMoney>¥{getPrice(voucherType)}</VoucherFooterMoney><VoucherFooterUnit>元</VoucherFooterUnit>
                <Button type={'primary'}
                        onClick={() => {
                            setLoading(true);
                            _shortMessageServices.getPayLink({
                                payType: voucherPay,
                                id: voucherType
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
                                setLoading(false);
                            }, (err: any) => {
                                error(err && err.message ? err.message : err.toString());
                                setLoading(false);
                            });
                        }}
                        disabled={Boolean(!(voucherType && voucherPay && checkRfc))}
                        style={{padding: '0 60px', position: 'absolute', right: 40, top: 35}}>去支付</Button>
            </VoucherFooter>
            </Spin>
        </VoucherCenterWrap>
        </CSSTransition>
    );
});

export {
    VoucherCenter
};
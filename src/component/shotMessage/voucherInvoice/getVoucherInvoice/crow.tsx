import React, {useEffect, useRef, useState} from 'react';
import QueueAnim from 'rc-queue-anim';
import {IState} from '@/store';

const mapState = (state: IState) => {
    return {
        crowShow: state.GetVoucherInvoice.crowShow,
        list: state.GetVoucherInvoice.list,
        selectKey: state.GetVoucherInvoice.selectKey,
        date: state.GetVoucherInvoice.date,
        search: state.GetVoucherInvoice.search
    };
};

import ShortMessageServices from '@/services/shortMessageServices';

const _shortMessageServices = new ShortMessageServices();
import {
    CrowWrapper,
    CrowMiddle,
    CrowMidContent,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowFooterNoPading
} from '@/baseUI/Crow';
import {
    StepContent,
    StepSuccessIconWrap,
    StepSuccessText,
    StepInvoicePrice
} from './ui';
import {
    UIGrid,
    UICol
} from '@/baseUI/Grid';
import {
    Button,
    Icon,
    Spin,
    Divider,
    Steps
} from "antd";
import Scrollbars from "react-custom-scrollbars";

const {Step} = Steps;

import {InvoiceInfoForm} from './infoForm';
import {useDispatch, useMappedState} from "redux-react-hook";
import {CSSTransition} from "react-transition-group";
import {error} from "@/util/golbalModalMessage";

const GetInvoiceStepCrow = () => {
    const dispatch = useDispatch();
    const {
        crowShow,
        selectKey,
        list,
        date,
        search
    } = useMappedState(mapState);
    const [stepCurrent, setStepCurrent] = useState(0);
    const [loading, setLoading] = useState(false);

    const formRef: any = useRef();
    useEffect(() => {
        _shortMessageServices.getLastInvoiceLog((res: any) => {
            dispatch({
                type: 'change getVoucherInvoice lastInfo',
                lastInfo: res.data
            });
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
        });
    }, []);
    const getBtnText = (current: number): string => {
        switch (current) {
            case 0: {
                return '下一步';
            }
            case 1: {
                return '确定索取';
            }
            default: {
                return '确定';
            }
        }
    };
    const getSelectTotal = () => {
        const data = list.filter((item: any) => {
            return selectKey.indexOf(item.id + '') !== -1;
        });
        console.log(data);
        let total = 0;
        if(data.length === 1) {
            total = parseFloat(data[0].fee);
        }else if(data.length === 0) {
            total = 0;
        }else {
            total = data.reduce((total: any, item: any, index: number) => {
                if(index === 1) {
                    return parseFloat(total.fee) + parseFloat(item.fee);
                }
                return total + parseFloat(item.fee);
            });
        }
        return {
            total,
            data
        };
    };
    const dataObjc = getSelectTotal();
    const orderList = dataObjc.data && dataObjc.data.map((item: any, index: number) => {
        return (
            <QueueAnim delay={100} key={index} style={{padding: '5px 30px'}}>
                <UIGrid key={1}>
                    <UICol style={{textAlign: 'right'}} span={6}>订单号：</UICol>
                    <UICol span={18}>{item.order_number}</UICol>
                </UIGrid>
                <UIGrid key={2}>
                    <UICol style={{textAlign: 'right'}} span={6}>充值时间：</UICol>
                    <UICol span={18}>{item.success_time}</UICol>
                </UIGrid>
                <UIGrid key={3}>
                    <UICol style={{textAlign: 'right'}} span={6}>产品名称：</UICol>
                    <UICol span={18}>{item.type_name}</UICol>
                </UIGrid>
                <UIGrid key={4}>
                    <UICol style={{textAlign: 'right'}} span={6}>充值金额：</UICol>
                    <UICol span={18}>{item.fee}</UICol>
                </UIGrid>
                <Divider/>
            </QueueAnim>
        );
    });

    const invoiceInfo = <InvoiceInfoForm ref={formRef}/>;

    const result = (
        <QueueAnim delay={100}>
            <StepSuccessIconWrap key={1} style={{textAlign: 'center', paddingTop: '100px'}}>
                <Icon type="check-circle" style={{color: '#52c41a', fontSize: '60px'}} theme="filled"/>
            </StepSuccessIconWrap>
            <StepSuccessText key={2}>发票索取成功，请耐心等待处理。</StepSuccessText>
        </QueueAnim>
    );
    const StepContentArr = [orderList, invoiceInfo, result];
    return (
        <CSSTransition
            in={crowShow}
            timeout={1000}
            unmountOnExit
            appear={true}
            onExited={() => {
                dispatch({
                    type: 'change getVoucherInvoice crowUnMount'
                });
            }}
        >
            <CrowWrapper>
                <CSSTransition
                    in={crowShow}
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                >
                    <CrowMiddle>
                        <Spin style={{height: '100%'}} spinning={loading}>
                            <CrowHeader>
                                <CrowTitle>
                                    索取发票
                                </CrowTitle>
                                <CrowClose>
                                    <Button shape="circle" icon={"close"} onClick={(): void => {
                                        dispatch({
                                            type: 'change getVoucherInvoice crowHide'
                                        });
                                    }}/>
                                </CrowClose>
                            </CrowHeader>
                            <CrowMidContent>
                                <Steps size={"small"} style={{padding: '10px 20px', height: '45px'}}
                                       current={stepCurrent}>
                                    <Step key={0} title={'订单确认'}/>
                                    <Step key={1} title={'开票/收件信息'}/>
                                    <Step key={2} title={'索取成功'}/>
                                </Steps>
                                <StepContent>
                                    <Scrollbars>
                                        {StepContentArr[stepCurrent]}
                                    </Scrollbars>
                                </StepContent>
                            </CrowMidContent>
                            <CrowFooterNoPading>
                                {
                                    stepCurrent === 0 ? <StepInvoicePrice>
                                        开票总金额：<strong>¥{dataObjc.total}</strong>
                                    </StepInvoicePrice> : null
                                }
                                {
                                    stepCurrent === 1 ? <Button
                                        style={{marginRight: 15}}
                                        onClick={() => {
                                            setStepCurrent(stepCurrent - 1);
                                        }}
                                    >
                                        上一步
                                    </Button> : null
                                }
                                <Button type={"primary"} onClick={() => {
                                    if (stepCurrent === 1) {
                                        const form = formRef.current.getForm();
                                        console.log(form.getFieldValue('userLocationCode'));
                                        form.validateFields((errs: any, values: any) => {
                                            if (!errs) {
                                                console.log(values);
                                                setLoading(true);
                                                _shortMessageServices.postInvoiceInfo({
                                                    ...values,
                                                    ids: selectKey
                                                }, (res: any) => {
                                                    setLoading(false);
                                                    setStepCurrent(stepCurrent + 1);
                                                }, (err: any) => {
                                                    setLoading(false);
                                                    error(err && err.message ? err.message : err.toString());
                                                });
                                            }
                                        });
                                    } else if (stepCurrent === 0) {
                                        setStepCurrent(stepCurrent + 1);
                                    } else {
                                        dispatch({
                                            type: 'change getVoucherInvoice crowHide'
                                        });
                                        _shortMessageServices.getCanGetInvoiceVoucher({
                                            'end_time': date[1],
                                            search: search,
                                            'start_time': date[0]
                                        }, (res: any) => {
                                            dispatch({
                                                type: 'change getVoucherInvoice list',
                                                list: res.data.data,
                                                balance: 1
                                            });
                                        }, (err: any) => {
                                            error(err && err.message ? err.message : err.toString());
                                        });
                                    }
                                }}>{getBtnText(stepCurrent)}</Button>
                            </CrowFooterNoPading>
                        </Spin>
                    </CrowMiddle>
                </CSSTransition>
            </CrowWrapper>
        </CSSTransition>
    );
};

export {
    GetInvoiceStepCrow
};
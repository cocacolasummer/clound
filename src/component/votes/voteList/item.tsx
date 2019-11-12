import React, {useState, useEffect, useRef} from 'react';
import moment from "moment";
import VoteServices from '@/services/voteServices';

const _voteService = new VoteServices();

// import {waringConfirm} from '@/util/golbalModalMessage';
import {
    Button,
    Radio,
    Checkbox, Spin
} from "antd";

import {ItemRing} from "./item-ring";
import {ItemColumnar} from "./item-columnar";
import {ItemRows} from "./item-rows";
import {ItemRadar} from "./item-radar";

import {
    VoteListItemWrapper,
    VoteListItemFooter,
    VoteListItemTitle,
    VoteListItemHeader,
    VoteListItemUser,
    VoteListItemInfo,
    VoteListItemOperate,
    VoteListItemContent,
    VoteListItemContentCol
} from './ui';

// import {
//     ThemeOrange,
//     ThemeGreen
// } from '@/baseUI/ButtonWrap';
import {CustomEmpty} from "@/component/customEmpty";
import {Scrollbars} from "react-custom-scrollbars";
import {error, success} from "@/util/golbalModalMessage";

import {IState} from '@/store';
import {useDispatch, useMappedState} from "redux-react-hook";

const mapState = (state: IState) => {
    return {
        total: state.VoteList.total
    };
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 0
};

interface VoteListItemProps {
    data: any;
}

const VoteListItem = (props: VoteListItemProps) => {
    const {total} = useMappedState(mapState);
    const dispatch = useDispatch();
    const [selectNum, setSelectNum] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [charItemArr, setCharItemArr] = useState<any[]>([]);
    const timer: any = useRef();
    const [now, setNow] = useState<any>();
    const isStart = moment(props.data.start_time).isBefore(moment(new Date()));
    const isEnd = moment(props.data.end_time).isBefore(moment(new Date()));
    useEffect(() => {
        const chartData = props.data.options.map((item: any, index: number) => {
            const num = props.data.allVote.filter((item: any) => item.option_id == index)[0];
            return {
                item: item,
                count: (num && props.data.allVote.filter((item: any) => item.option_id == index)[0].num) || 0
            };
        });

        setCharItemArr([
            <ItemRing data={chartData} key={0}/>,
            <ItemColumnar data={chartData} key={1}/>,
            <ItemRows data={chartData} key={2}/>,
            <ItemRadar data={chartData} key={3}/>
        ]);
        if (isEnd) {
            setNow(`投票已结束`);
        } else {
            timer.current = setInterval(() => {
                let _ticks: any = null;
                if (isStart && !isEnd) {
                    _ticks = moment(new Date()).diff(props.data.end_time);
                } else if (!isStart) {
                    _ticks = moment(new Date()).diff(props.data.start_time);
                }
                let t = null;
                let d = null;
                let h = null;
                let m = null;
                let s = null;
                t = Math.abs(_ticks) / 1000;
                d = Math.floor(t / (24 * 3600));
                h = Math.floor((t - 24 * 3600 * d) / 3600);
                m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
                s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
                if (isStart && !isEnd) {
                    setNow(`距离投票结束还有：${d}天${h}小时${m}分钟${s}秒`);
                } else if (!isStart) {
                    setNow(`距离投票开始还有：${d}天${h}小时${m}分钟${s}秒`);
                } else {
                    setNow(`投票已结束`);
                }
            }, 1000);
        }

        return () => {
            clearInterval(timer.current);
        };
    }, [isEnd, isStart, props.data.end_time, props.data.start_time]);
    const checkBoxChange = (value: any) => {
        setSelectNum(value);
    };
    let optionsArr: object[] = [];
    let optionsBlock;

    if (parseInt(props.data.choose_type) > 1) {
        optionsArr = props.data.options.map((item: any, index: number) => {
            return (
                <Checkbox value={index}
                          style={radioStyle}
                          disabled={!(isStart && !isEnd) || props.data.myVote.length > 0 || (selectNum.length >= parseInt(props.data.choose_type) && selectNum.indexOf(index) === -1)}
                          key={index}>{item}</Checkbox>
            );
        });
        optionsBlock = <Checkbox.Group
            onChange={checkBoxChange}
            style={{width: '100%'}}>{optionsArr}</Checkbox.Group>;
    } else {
        optionsArr = props.data.options.map((item: any, index: number) => {
            return (
                <Radio style={radioStyle} disabled={!(isStart && !isEnd) || props.data.myVote.length > 0} value={index}
                       key={index}>{item}</Radio>
            );
        });
        optionsBlock = <Radio.Group onChange={(e) => checkBoxChange([e.target.value])} style={{width: '100%'}}>{optionsArr}</Radio.Group>;
    }
    return (
        <VoteListItemWrapper>
            <Spin spinning={loading}>
            <VoteListItemHeader>
                <VoteListItemTitle>{`${props.data.subject}(可选${props.data.choose_type}项)`}</VoteListItemTitle>
                <VoteListItemUser>{props.data.display_name}</VoteListItemUser>
            </VoteListItemHeader>
            <VoteListItemContent>
                <VoteListItemContentCol>
                    <Scrollbars>
                    {optionsBlock}
                    {isStart && !isEnd && props.data.myVote.length === 0 ? <Button type={'primary'} onClick={(): void => {
                        setLoading(true);
                        _voteService.postMyVoteById(props.data.id, {
                            optionId: selectNum
                        }, (res: any) => {
                            success('投票成功');
                            setLoading(false);
                            dispatch({
                                type: 'change votelist total',
                                total: total + 1
                            });
                        }, (err: any) => {
                            error(err && err.message ? err.message : err.toString());
                            setLoading(false);
                        });
                    }}>投票</Button> : null}
                    </Scrollbars>
                </VoteListItemContentCol>
                <VoteListItemContentCol>
                    { props.data.allVote.length > 0 ? charItemArr[parseInt(props.data.statistical_graph) - 1] : <CustomEmpty/>}
                </VoteListItemContentCol>
            </VoteListItemContent>
            <VoteListItemFooter>
                <VoteListItemInfo>{now}</VoteListItemInfo>
                <VoteListItemOperate>
                    <Button style={{
                        marginRight: '15px'
                    }} type={"primary"}
                            onClick={() => dispatch({
                                type: 'change voteDetail show',
                                detailId: props.data.id
                            })}>查看</Button>
                    {/*{isStart ? null : <ThemeGreen><Button onClick={() => props.editorFn()}>编辑</Button></ThemeGreen>}*/}
                    {/*{isEnd ? null : <ThemeOrange><Button onClick={() => {*/}
                    {/*    waringConfirm('确定结束投票吗', '', () => {*/}

                    {/*    });*/}
                    {/*}*/}
                    {/*}>结束投票</Button></ThemeOrange>}*/}
                </VoteListItemOperate>
            </VoteListItemFooter>
            </Spin>
        </VoteListItemWrapper>
    );
};

export {
    VoteListItem
};

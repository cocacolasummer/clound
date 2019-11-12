import React, {useEffect, useRef, useState} from 'react';
import {LogisticsStatus} from './status';
import {useDispatch} from 'redux-react-hook';
import {
    LogisticsListItemUI,
    LogisticsListItemImg,
    LogisticsListItemInfo,
    LogisticsListCreator,
    LogisticsListTime,
    LogisticsListAddress,
    LogisticsListContentWrap,
    LogisticsListContentLabel,
    LogisticsListContent,
    LogisticsListAttendant,
    LogisticsListFooter,
    LogisticsListFooterTime,
    LogisticsListFooterOp
} from './ui';
import {ImgAddress, ImgTime} from "@/assert/img/meeting/detail";
import {Button} from "antd";
import {Status} from "@/store/logistics/logisticsList";
import moment from "moment";

interface LogisticsListItemProps {
    data: {
        id: string;
        creator: string;
        serveTime: string;
        address: string;
        serveContent: string;
        attendant: string;
        imgUrl: string;
        status: Status;
    };
}

const LogisticsListItem: React.ComponentType<LogisticsListItemProps> = (props: LogisticsListItemProps) => {
    const dispatch = useDispatch();
    const [showTimer, setShowTimer] = useState<string>();
    const timer: any = useRef();
    const getTime = (date: string): string[] => {
        const tmpDate = date.split(' ');
        const tmpTime = tmpDate[1].split('-');

        return [`${tmpDate[0]} ${tmpTime[0]}`, `${tmpDate[0]} ${tmpTime[1]}`];
    };
    useEffect(() => {
        const [startTime, endTime] = getTime(props.data.serveTime);

        timer.current = setInterval(() => {
            const isStart = moment(startTime).isBefore(moment(new Date()));
            const isEnd = moment(endTime).isBefore(moment(new Date()));
            let _ticts = 0;
            if (isStart && !isEnd) {
                _ticts = moment(new Date()).diff(endTime);
            } else if (!isStart) {
                _ticts = moment(new Date()).diff(startTime);
            }
            let t = null;
            let d = null;
            let h = null;
            let m = null;
            let s = null;
            t = Math.abs(_ticts) / 1000;
            d = Math.floor(t / (24 * 3600));
            h = Math.floor((t - 24 * 3600 * d) / 3600);
            m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
            s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
            if (isStart && !isEnd) {
                setShowTimer(`距离服务结束还有：${d}天${h}小时${m}分钟${s}秒`);
            } else if (!isStart) {
                setShowTimer(`距离服务开始还有：${d}天${h}小时${m}分钟${s}秒`);
            } else {
                setShowTimer(`服务已结束`);
            }
        }, 1000);
        return () => {
            clearInterval(timer.current);
        };
    }, [props.data.serveTime]);
    return (
        <LogisticsListItemUI>
            <LogisticsStatus type={props.data.status}/>
            <LogisticsListItemImg src={props.data.imgUrl}/>
            <LogisticsListItemInfo>
                <LogisticsListCreator>发起人：{props.data.creator}</LogisticsListCreator>
                <LogisticsListTime><img src={ImgTime} alt=""/>{props.data.serveTime}</LogisticsListTime>
                <LogisticsListAddress><img src={ImgAddress} alt=""/>{props.data.address}</LogisticsListAddress>
                <LogisticsListContentWrap>
                    <LogisticsListContentLabel>服务内容：</LogisticsListContentLabel>
                    <LogisticsListContent>{props.data.serveContent}</LogisticsListContent>
                </LogisticsListContentWrap>
                <LogisticsListAttendant>服务人员：{props.data.attendant}</LogisticsListAttendant>
            </LogisticsListItemInfo>
            <LogisticsListFooter>
                <LogisticsListFooterTime>{showTimer}</LogisticsListFooterTime>
                <LogisticsListFooterOp>
                    <Button type={"primary"} onClick={
                        (): void => {
                            dispatch({
                                type: 'change logisticsDetail show',
                                showId: props.data.id
                            });
                        }
                    }>查看</Button>
                </LogisticsListFooterOp>
            </LogisticsListFooter>
        </LogisticsListItemUI>
    );
};

export {
    LogisticsListItem
};
import React, {useEffect, useState} from 'react';
import {
    ShowListFooter,
    ShowListHeader,
    ShowListTitle,
    ShowListWrapper
} from "@/baseUI/BaseShowList";
import {Button, Input, Spin} from "antd";
import {
    ContentWrapper,
    ContentTitle
} from './ui';
import ShortMessageServices from '@/services/shortMessageServices';
import {error, success} from "@/util/golbalModalMessage";
import {CSSTransition} from "react-transition-group";
const _shortMessageServices = new ShortMessageServices();

const ShotMessageSetting: React.ComponentType = () => {
    const [userCode, setUserCode] = useState('');
    const [host, setHost] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        _shortMessageServices.getShotMessageSet((res: any) => {
            setUserCode(res.data.userCode);
            setHost(res.data.host);
            setMobile(res.data.mobile);
            setLoading(false);
        }, (err: any) => {
            error(err && err.message ? err.message : err.toString());
            setLoading(false);
        });
    }, []);
    return (
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
        <ShowListWrapper>
            <Spin spinning={loading}>
            <ShowListHeader>
                <ShowListTitle>短信设置</ShowListTitle>
            </ShowListHeader>
            <ContentWrapper>
                <ContentTitle>用户唯一ID</ContentTitle>
                <Input value={userCode} placeholder={"请输入用户唯一ID"} onChange={(e)=>{
                    setUserCode(e.target.value);
                }} style={{width: '250px'}}/>
                <ContentTitle>服务商域名</ContentTitle>
                <Input value={host} placeholder={"请输入服务商域名"} onChange={(e) => {
                    setHost(e.target.value);
                }} style={{width: '250px'}}/>
                <ContentTitle>手机号</ContentTitle>
                <Input value={mobile} placeholder={"请输入手机号"} onChange={(e) => {
                    setMobile(e.target.value);
                }} style={{width: '250px'}}/>
            </ContentWrapper>
            <ShowListFooter>
                <Button type={"primary"} onClick={() => {
                    setLoading(true);
                    _shortMessageServices.postShotMessageSet({
                        userCode: userCode,
                        host: host,
                        mobile: mobile
                    }, (res: any) => {
                        setLoading(false);
                        success('保存短信设置成功');
                    }, (err: any) => {
                        setLoading(false);
                        error(err && err.message ? err.message : err.toString());
                    });
                }}>保存</Button>
            </ShowListFooter>
            </Spin>
        </ShowListWrapper>
            </CSSTransition>
    );
};

export {
    ShotMessageSetting
};
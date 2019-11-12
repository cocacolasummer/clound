import React, {Fragment} from 'react';
import {Icon, Avatar, Button, Popconfirm} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {CSSTransition} from 'react-transition-group';
import {
    CardAvatar,
    ContentWrapper,
    CardList,
    CardTitle,
    CardListItem,
    CardIconLine,
    CardAttender
} from "@/component/meeting/meetingList/ui";

import {
    CardStartUser,
    CardOperate
} from './ui';
import {useMappedState} from "redux-react-hook";
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        list: state.MeetingTemp.list,
    };
};

const MeetingTempCard = () => {
    const {
        list
    } = useMappedState(mapState);

    const listItem = list.map((item: any, index: number) => {
        const avatarListItem = item.attender && item.attender.map((avatar: any, key: number) => {
            if (key === 10) {
                return <CardAvatar key={key}><Avatar
                    style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}>+{item.attender.length - 10}</Avatar></CardAvatar>;
            } else if (key > 10) {
                return;
            }
            return <CardAvatar key={key}>{avatar.avatar ?
                <Avatar src={avatar.avatar} style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}/> :
                <Avatar style={{backgroundColor: 'rgba(35, 146, 255, 1)'}}>{avatar.name}</Avatar>}</CardAvatar>;
        });
        return (
            <CardListItem key={index}>
                <CardTitle>
                    {item.subject}
                </CardTitle>
                <CardIconLine>
                    <Icon type="environment"/>
                    <span>{item.address}</span>
                </CardIconLine>
                <CardAttender>
                    <strong>参会人员</strong>
                    <small>
                        {avatarListItem}
                    </small>
                </CardAttender>
                <CardStartUser>
                    {item.startUser}
                </CardStartUser>
                <CardOperate>
                    <Button type={"primary"} style={{marginRight: "10px"}} size={"small"}>编辑</Button>
                    <Popconfirm title="确定删除吗？" onConfirm={() => {
                    }}>
                        <Button type={"danger"} size={"small"}>删除</Button>
                    </Popconfirm>
                </CardOperate>
            </CardListItem>
        );
    });

    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <ContentWrapper>
                    <QueueAnim delay={200} component={CardList}>
                        {listItem}
                    </QueueAnim>
                </ContentWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    MeetingTempCard
};
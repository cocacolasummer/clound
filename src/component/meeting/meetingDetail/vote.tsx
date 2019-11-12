import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Fragment} from 'react';
import {Progress} from 'antd';

import {
    DetailBaseWrapper,
    DetailVoteTitle,
    DetailVoteCard,
    DetailVoteLabel,
    DetailVoteContent,
    DetailVoteUserName
} from './ui';

function DetailMeetingVote() {
    return (
        <Fragment>
            <CSSTransition
                in={true}
                timeout={1000}
                unmountOnExit
                appear={true}
            >
                <DetailBaseWrapper>
                    <div>
                        <DetailVoteTitle>第1议程</DetailVoteTitle>
                        <DetailVoteCard>
                            <DetailVoteLabel>选项A</DetailVoteLabel>
                            <DetailVoteContent>
                                <Progress
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    status="active"
                                    percent={70}
                                />
                                <DetailVoteUserName>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                </DetailVoteUserName>
                            </DetailVoteContent>
                        </DetailVoteCard>
                        <DetailVoteCard>
                            <DetailVoteLabel>选项B</DetailVoteLabel>
                            <DetailVoteContent>
                                <Progress
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    status="active"
                                    percent={30}
                                />
                                <DetailVoteUserName>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                </DetailVoteUserName>
                            </DetailVoteContent>
                        </DetailVoteCard>
                    </div>
                    <div>
                        <DetailVoteTitle>第2议程</DetailVoteTitle>
                        <DetailVoteCard>
                            <DetailVoteLabel>选项A</DetailVoteLabel>
                            <DetailVoteContent>
                                <Progress
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    status="active"
                                    percent={100}
                                />
                                <DetailVoteUserName>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                    <span>陈晓晓</span>
                                </DetailVoteUserName>
                            </DetailVoteContent>
                        </DetailVoteCard>
                    </div>
                </DetailBaseWrapper>
            </CSSTransition>
        </Fragment>
    );
}

export {
    DetailMeetingVote
};
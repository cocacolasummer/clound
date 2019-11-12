import React from 'react';
import styled from "styled-components";
import {Icon} from 'antd';

interface ColorProps {
    color: string;
}

const CheckStatusWrapper = styled.div`
position: absolute;
right: 10px;
top: 60px;
width: 60px;
height: 60px;
padding: 4px;
border-radius: 50%;
border: 1px solid ${(props: ColorProps) => props.color};
transform: rotateZ(-30deg);
`;

const CheckStatusContent = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
border: 2px solid ${(props: ColorProps) => props.color};
position: relative;
`;

const CheckStatusItem = styled.span`
display: block;
font-size: 12px;
line-height: 10px;
width: 30px;
height: 30px;
transform: scale(0.7);
color: ${(props: ColorProps) => props.color};
position: absolute;
top: 10px;
left: 10px;
`;

const colorArr: string[] = ['rgba(38, 160, 245, 1)', 'rgba(255, 63, 99, 1)', 'rgba(21, 192, 169, 1)'];

interface CheckStatusProps {
    type: number;
}

const CheckStatus = (props: CheckStatusProps) => {

    const color = colorArr[props.type];

    const text = (type: number) => {
        switch (type) {
            case 0: {
                return '等待审核';
            }
            case 1: {
                return '审核拒绝';
            }
            default: {
                return '审核通过';
            }
        }
    };

    return (
        <CheckStatusWrapper color={color}>
            <CheckStatusContent color={color}>
                <Icon type="star" style={{
                    left: '2px',
                    top: '15px',
                    fontSize: '12px',
                    transform: 'scale(0.7)',
                    color: color,
                    position: 'absolute'
                }} theme="filled"/>
                <Icon type="star" style={{
                    left: '5px',
                    top: '27px',
                    transform: 'scale(0.7)',
                    fontSize: '12px',
                    color: color,
                    position: 'absolute'
                }} theme="filled"/>
                <Icon type="star" style={{
                    left: '17px',
                    bottom: '3px',
                    transform: 'scale(0.7)',
                    fontSize: '12px',
                    color: color,
                    position: 'absolute'
                }} theme="filled"/>
                <Icon type="star" style={{
                    right: '5px',
                    top: '27px',
                    transform: 'scale(0.7)',
                    fontSize: '12px',
                    color: color,
                    position: 'absolute'
                }} theme="filled"/>
                <Icon type="star" style={{
                    right: '2px',
                    top: '15px',
                    transform: 'scale(0.7)',
                    fontSize: '12px',
                    color: color,
                    position: 'absolute'
                }} theme="filled"/>
                <CheckStatusItem color={color}>{text(props.type)}</CheckStatusItem>
            </CheckStatusContent>
        </CheckStatusWrapper>
    );
};

export {
    CheckStatus
};
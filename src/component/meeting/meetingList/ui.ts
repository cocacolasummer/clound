import styled, {css} from "styled-components";
import {SlideShow} from "@/baseUI/Animate";

interface StatusProps {
    type: string;
}

const Status = styled.span`
font-size:14px;
font-weight:400;
  small {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
${
    (props: StatusProps): any => {
        return css`
            color: ${props.type};
            small {
              background-color: ${props.type};
            }
        `;
    }
}
`;

const ContentWrapper = styled.div`
${SlideShow}
`;

const CardList = styled.ul`
list-style: none;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
padding: 15px 15px 0;
margin-bottom: 0;
`;

const CardListItem = styled.li`
position: relative;
width: calc(100% * (1/2) - 10px);
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
margin-bottom: 20px;
padding: 10px;
overflow: hidden;
transition: .2s linear;
&:hover {
    cursor: pointer;
    box-shadow: 0 0 5px #08baff;
}
&:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #08baff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
&:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
&:nth-child(odd) {
    margin-right: 20px;
}
`;

const CardTitle = styled.h4`
font-size: 18px;
font-weight:400;
color:rgba(45,47,48,1);
line-height: 30px;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
height: 30px;
`;

const CardIconLine = styled.div`
height: 30px;
line-height: 30px;
font-size: 14px;
color: rgba(154,163,167,1);
span {
    margin-left: 5px;
    font-size: 14px;
    color: rgba(154,163,167,1);
    font-weight: 400;
}
`;

const CardCreator = styled.div`
font-size: 16px;
height: 30px;
line-height: 30px;
font-weight: 500;
color:rgba(35,146,255,1);
`;

const CardAttender = styled.div`
height: 40px;
  strong {
    display: inline-block;
    line-height: 40px;
    margin-right: 10px;
  }
`;

const CardAvatar = styled.span`
box-shadow: 0 0 5px #fff;
border: 1px solid #fff;
display: inline-block;
&:not(:first-child) {
    margin-left: -10px;
}
`;

const CardOperate = styled.strong`
position: absolute;
right: 10px;
top: 10px;
`;

const CardCheck = styled.img`
position: absolute;
right: 10px;
top: 60px;
`;

const CardSeact = styled.img`
position: absolute;
right: 10px;
bottom: 10px;
`;

export {
    Status,
    ContentWrapper,
    CardList,
    CardListItem,
    CardTitle,
    CardIconLine,
    CardCreator,
    CardAttender,
    CardAvatar,
    CardOperate,
    CardCheck,
    CardSeact
};
import styled from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

const MessageStatisticWrap = styled.div`
${SlideShow};
`;

const ItemCountWrap = styled.ul`
margin: 0 0 15px 0;
padding: 0;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
`;

const ItemCountItem = styled.li`
padding: 30px 20px;
width: calc(100% * (1/3) - 10px);
margin-right: 15px;
border-radius: 5px;
color: white;
position: relative;
&:nth-child(1) {
background: linear-gradient(to right, RGBA(93, 191, 255, 1), RGBA(41, 150, 255, 1));
}
&:nth-child(2) {
background: linear-gradient(to right, RGBA(255, 157, 44, 1), RGBA(255, 124, 18, 1));
}
&:nth-child(3) {
margin-right: 0;
background: linear-gradient(to right, RGBA(93, 202, 228, 1), RGBA(24, 192, 171, 1));
}
`;

const ItemCountText = styled.h5`
margin: 0;
color: inherit;
font-size: 30px;
line-height: 40px;
font-weight: 500;
`;

const ItemTitleText = styled.h4`
margin: 0;
font-size: 16px;
line-height: 40px;
color: inherit;
font-weight: normal;
`;

const ItemIcon = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
position: absolute;
right: 20px;
top: 50%;
max-height: 80px;
transform: translateY(-50%);
`;

const ItemChartWrap = styled.div`
background: white;
width: 100%;
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
`;

const ItemChartHeader = styled.div`
height: 48px;
line-height: 48px;
position: relative;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const ItemChartHeaderOp = styled.span`
position: absolute;
right: 20px;
line-height: 48px;
top: 0;
`;

const ItemChartContent = styled.div`
height: 400px;
`;

const ItemChartTitle = styled.h2`
margin: 0;
padding-left: 20px;
font-size: 14px;
font-weight: 400;
`;

export {
    MessageStatisticWrap,
    ItemCountWrap,
    ItemCountItem,
    ItemCountText,
    ItemTitleText,
    ItemIcon,
    ItemChartWrap,
    ItemChartHeader,
    ItemChartHeaderOp,
    ItemChartTitle,
    ItemChartContent
};
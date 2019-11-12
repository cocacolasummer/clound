import styled from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

const VoucherCenterWrap = styled.div`
${SlideShow};
background-color: white;
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
`;

const VoucherCenterHeader = styled.div`
height: 50px;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const VoucherCenterTitle = styled.h1`
line-height: 50px;
padding-left: 20px;
font-size: 18px;
font-weight: 400;
margin: 0;
`;

const VoucherCenterContent = styled.div`
padding: 30px 40px;
`;

const VoucherCenterContentTitle = styled.h5`
line-height: 40px;
font-size: 14px;
font-weight: normal;
color: rgba(54, 56, 63, 1);
border-left: 5px solid rgba(35, 146, 255, 1);
background-color: rgba(96,217,255,0.05);
padding-left: 5px;
margin-bottom: 10px;
`;

const VoucherCenterVoucherType = styled.ul`
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
margin-bottom: 10px;
`;

interface VocherTypeProps {
    active?: boolean;
}

const VoucherCenterVoucherTypeItem = styled.li`
cursor: pointer;
width: calc(100% * (1/4) - 15px);
color: ${(props: VocherTypeProps) => props.active ? `rgba(255, 123, 17, 1)` : `rgba(35, 146, 255, 1)`};
border: 2px solid ${(props: VocherTypeProps) => props.active ? `rgba(255, 123, 17, 1)` : `rgba(35, 146, 255, 1)`};
border-radius: 5px;
height: 300px;
position: relative;
overflow: hidden;
margin-right: 20px;
margin-bottom: 20px;
transition: box-shadow 300ms linear, border-color 300ms linear;
&:hover {
box-shadow: inset 0 0 5px rgba(0,0,0);
&:after {
box-shadow: 0 0 5px rgba(0,0,0);
}
}
&:nth-child(4n) {
margin-right: 0;
}
&:after {
content: "";
position: absolute;
width: 500px;
height: 500px;
border-radius: 50%;
bottom: -380px;
left: -50%;
z-index: 1;
transition: box-shadow 300ms linear;
background: linear-gradient(to right, ${(props: VocherTypeProps) => props.active ? `rgba(255, 159, 45, 1)` : `rgba(96, 193, 255, 1)`}, 
    ${(props: VocherTypeProps) => props.active ? `rgba(255, 123, 17, 1)` : `rgba(35, 146, 255, 1)`});
}
`;

const VoucherTypeTitle = styled.h4`
margin: 0;
font-size: 30px;
line-height: 180px;
text-align: center;
color: inherit;
transition: color 400ms linear;
`;

const VoucherTypeContent = styled.h5`
margin: 0;
font-size: 24px;
color: white;
text-align: center;
line-height: 120px;
position: relative;
z-index: 2;
`;

const VoucherTypeCheck = styled.span`
display: inline-block;
width: 40px;
height: 40px;
position: absolute;
border-top-right-radius: 5px;
right: -1px;
top: 0;
padding-right: 5px;
text-align: right;
line-height: 25px;
font-size: 18px;
clip-path: polygon(0 0, 100% 0, 100% 100%);
background-color: rgba(255, 123, 17, 1);
color: white;
`;

const VoucherPayContent = styled.ul`
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
margin-bottom: 10px;
`;

const VoucherPayItem = styled.li`
position: relative;
width: calc(100% * (1/6) - 10px);
margin-right: 10px;
border: 2px solid ${(props: VocherTypeProps) => props.active ? `rgba(255, 123, 17, 1)` : `rgba(218, 225, 228, 1)`};
border-radius: 5px;
height: 50px;
cursor: pointer;
overflow: hidden;
transition: border-color 300ms linear;
&:hover {
border-color: rgba(35, 146, 255, 1); 
}
img {
display: block;
width: 100%;
height: 100%;
}
`;

const VoucherPayCheck = styled.span`
display: inline-block;
width: 25px;
height: 25px;
position: absolute;
padding-right: 3px;
border-top-right-radius: 5px;
right: -1px;
top: 0;
text-align: right;
line-height: 14px;
font-size: 12px;
clip-path: polygon(0 0, 100% 0, 100% 100%);
background-color: rgba(255, 123, 17, 1);
color: white;
`;

const VoucherFormWrap = styled.div`
margin-bottom: 10px;
`;

const VoucherFooter = styled.div`
border-top: 1px solid rgba(218, 225, 228, 1);
line-height: 60px;
height: 100px;
padding: 20px 40px;
position: relative;
`;

const VoucherFooterTitle = styled.span`
font-size: 16px;
margin-right: 15px;
`;

const VoucherFooterMoney = styled.strong`
font-size: 30px;
color: rgba(255, 123, 17, 1);
margin-right: 5px; 
`;

const VoucherFooterUnit = styled.small`
font-size: 24px;
color: rgba(255, 123, 17, 1);
`;

export {
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
};
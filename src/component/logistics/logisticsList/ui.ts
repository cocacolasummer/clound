import styled from "styled-components";

const LogisticsListWrapperUI = styled.ul`
list-style: none;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
padding: 15px 15px 0;
margin-bottom: 0;
`;

const LogisticsListItemUI = styled.li`
position: relative;
width: calc(100% * (1/2) - 10px);
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
margin-bottom: 20px;
overflow: hidden;
transition: .2s linear;
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 5px #08baff;
    }
    &:nth-child(odd) {
      margin-right: 20px;
    }
`;

const LogisticsListItemImg = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
width: 160px;
height: 160px;
position: absolute;
left: 20px;
top: 20px;
`;

const LogisticsListItemInfo = styled.div`
padding: 20px 20px 20px 200px;
height: 200px;
`;

const LogisticsListCreator = styled.h4`
font-size: 16px;
line-height: 25px;
`;

const LogisticsListTime = styled.time`
display: block;
font-size: 14px;
line-height: 25px;
img {
height: 16px;
width: 16px;
margin-right: 10px;
}
`;

const LogisticsListAddress = styled.div`
font-size: 14px;
height: 30px;
width: 100%;
overflow: hidden;
white-space: nowrap;
line-height: 30px;
text-overflow: ellipsis;
img {
height: 16px;
width: 16px;
margin-right: 10px;
}
`;

const LogisticsListContentWrap = styled.div`
display: flex;
flex-direction: row;
height: 50px;
`;

const LogisticsListContentLabel = styled.div`
width: 80px;
font-size: 14px;
line-height: 25px;
text-align: left;
flex: 0 0 80px;
`;

const LogisticsListContent = styled.p`
line-height: 25px;
height: 100%;
flex: auto;
display: -webkit-box;
box-orient: vertical;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
line-clamp: 2;
overflow: hidden;
`;

const LogisticsListAttendant = styled.div`
font-size: 12px;
line-height: 30px;
color: #2392FF;
`;

const LogisticsListFooter = styled.div`
height: 50px;
border-top: 1px solid #dae1e4;
position: relative;
`;

const LogisticsListFooterTime = styled.time`
color: #6F6F6F;
font-size: 14px;
margin-left: 10px;
line-height: 50px;
`;

const LogisticsListFooterOp = styled.div`
position: absolute;
top: 0;
right: 10px;
height: 50px;
line-height: 50px;
`;

export {
    LogisticsListWrapperUI,
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
};
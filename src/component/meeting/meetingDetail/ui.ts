import styled, {css} from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

const DetailTabs = styled.ul`
padding: 0;
margin: 0;
list-style: none;
display: flex;
height: 100px;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const DetailContent = styled.div`
height: calc(100% - 100px);
`;

interface DetailTabsItemProps {
    type: string;
}

const DetailTabsItem = styled.li`
text-align: center;
width: 33%;
color: rgba(54, 56, 63, 1);
&:hover {
  color: rgba(35, 146, 255, 1);
  cursor: pointer;
  transition: .2s linear;
}
${
    (props: DetailTabsItemProps) => {
        if (props.type === 'active') {
            return css`
              color: rgba(35, 146, 255, 1);
              cursor: pointer;
              transition: .2s linear;
          `;
        }
        return null;
    }
}
`;

const DetailTabsImgWrap = styled.div`
display: block;
height: 70px;
line-height: 70px;
`;

const DetailBaseWrapper = styled.section`
${SlideShow};
position: relative;
`;

const DetailBaseContent = styled.ul`
padding: 10px 30px;
margin: 0;
list-style: none;
`;

const DetailBaseItem = styled.li`
min-height: 30px;
display: flex;
list-style: none;
margin: 0;
`;

const DetailBaseLabel = styled.div`
width: 25%;
line-height: 40px;
img {
  width: 20px;
  max-height: 25px;
  margin-right: 5px;
}
strong {
  font-weight: bold;
  font-size: 14px;
  line-height: 40px;
}
`;

const DetailBaseItemContent = styled.div`
width: 75%;
line-height: 40px;
font-size: 14px;
color: rgba(54, 56, 63, 1);
`;

const DetailBaseSubject = styled.div`
font-size: 18px;
`;

const DetailBaseOuterWrapper = styled.div`
font-size: 14px;
line-height: 30px;
span {
  font-size: 12px;
  margin-right: 10px;
}
small {
font-size: 14px;
margin-right: 10px;
line-height: 30px;
}
strong {
font-size: 14px;
font-weight: normal;
line-height: 30px;
}
i {
font-style: normal;
}
`;

const DetailBaseTimeSmall = styled.div`
display: block;
line-height: 12px;
font-size: 12px;
color: rgba(125, 125, 125, 1);
`;

const DetailBaseUser = styled.div`
strong {
line-height: 40px;
display: inline-block;
width: calc(100% * (1/3));
    small {
      margin-left: 5px;
      font-weight: normal;
      font-size: 14px;
    }
}
`;

const DetailBaseFile = styled.div`
img {
  width: 20px;
  margin-right: 10px;
}
a {
  font-size: 16px;
}
`;

const DetailBaseDes = styled.p`
line-height: 40px;
`;

const DetailBaseAgenda = styled.p`
display: block;
line-height: 40px;
font-size: 14px;
small {
margin-right: 10px;
}
time {
display: inline-block;
height: 30px;
border: 1px solid rgb(217, 217, 217);
border-radius: 20px;
padding: 5px 5px;
font-weight: normal;
float: right;
line-height: 20px;
color: rgba(125,125,125,1);
margin-top: 5px;
}
&:after {
content: '';
clear: both;
}
`;

const DetailBaseSeat = styled.a`
margin-top: 5px;
overflow: hidden;
position: relative;
display: inline-block;
font-weight: 400;
white-space: nowrap;
text-align: center;
background-image: none;
box-shadow: rgba(0, 0, 0, 0.016) 0px 2px 0px;
cursor: pointer;
user-select: none;
touch-action: manipulation;
height: 32px;
font-size: 14px;
color: rgba(0, 0, 0, 0.65);
background-color: rgb(255, 255, 255);
border-width: 1px;
border-style: solid;
border-image: initial;
transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
padding: 0px 15px;
border-radius: 4px;
border-color: rgb(217, 217, 217);
line-height: 30px;
&:hover {
  transition: .3s ease-in;
  border: 1px solid rgb(24, 144, 255);
  color: rgb(24, 144, 255);
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
`;

const DetailAgendaTime = styled.time`
border: 1px solid rgb(217, 217, 217);
border-radius: 20px;
padding: 5px 10px;
font-weight: normal;
`;

const DetailRemarkQR = styled.div`
text-align: center;
padding: 40px;
img {
  width: 300px;
  height: 300px;
  display: inline-block !important;
}
time {
display: block;
color:rgba(35,146,255,1);
line-height:36px;
font-size: 20px;
}
span {
  display: block;
  font-size: 14px;
  color: #848687;
}
`;

const DetailRemarkUserList = styled.div`
padding: 30px 20px;
width: 100%;
border-top: 1px solid rgba(218, 225, 228, 1);
`;

const DetailRemarkUserTitle = styled.div`
line-height: 40px;
strong {
  font-size: 18px;
}
span {
    margin-left: 10px;
    font-size: 18px;
}
`;

const DetailRemarkUser = styled.div`
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
width: 100%;
line-height: 40px;
  strong {
    display: block;
    width: calc(100% * (1/4));
    small {
      margin-left: 5px;
      font-size: 14px;
      font-weight: normal;
    }
  }
`;

const DetailSummaryList = styled.ul`
padding: 20px 20px;
list-style: none;
`;

const DetailSummaryListItem = styled.li`
border: 1px solid rgba(218, 225, 228, 1);
padding: 10px;
border-radius: 5px;
`;

const DetailSummaryListHeader = styled.div`
line-height: 40px;
position: relative;
strong {
  font-size: 14px;
  small {
    margin-left: 5px;
    font-size: 14px;
    font-weight: normal;
  }
}
`;

const DetailSummaryListOperate = styled.span`
position: absolute;
right: 0;
top: 5px;
button {
  margin-left: 5px;
}
`;

const DetailSummaryListSubject = styled.div`
font-size: 16px;
line-height: 40px;
font-weight: 400;
`;

const DetailSummaryListContent = styled.pre`
font-size: 14px;
line-height: 20px;
`;

const DetailSummaryListTime = styled.div`
color: rgba(170, 176, 180, 1);
text-align: right;
line-height: 40px;
`;

const DetailVoteTitle = styled.h5`
height: 40px;
font-size: 16px;
background-color: rgba(245, 247, 248, 1);
line-height: 40px;
padding-left: 20px;
font-weight: 400;
`;

const DetailVoteCard = styled.div`
padding: 10px 20px;
display: flex;
`;

const DetailVoteLabel = styled.div`
width: 20%;
text-align: right;
padding-right: 15px;
line-height: 30px;
`;

const DetailVoteContent = styled.div`
width: 80%;
line-height: 30px;
`;

const DetailVoteUserName = styled.div`
line-height: 25px;
span {
    display: inline-block;
    margin-right: 10px;
    padding: 3px 10px;
    border: 1px solid #b4b9ba;
    border-radius: 15px;
    line-height: 12px;
    font-size: 12px;
    color: #b4b9ba;
}
`;

const VoteFormLabel = styled.strong`
display: block;
font-size: 14px;
font-weight: 400;
line-height: 30px;
`;

const VideoMeetingWrapper = styled.ul`
padding: 20px;
list-style: none;
display: flex;
margin: 0;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
`;

const VideoMeetingItem = styled.li`
width: calc(50% - 10px);
border: 1px solid rgba(218,225,228,1);
border-radius: 5px;
margin-top: 20px;
padding: 10px;
position: relative;
&:nth-of-type(even) {
margin-left: 20px;
}
`;

const VideoMeetingItemTitle = styled.div`
line-height: 30px;
font-size: 14px;
`;

const VideoMeetingItemKey = styled.div`
line-height: 30px;
font-size: 14px;
span {
margin-right: 10px;
}
`;

interface VideoMeetingItemStatusProps {
    type: string;
}

const VideoMeetingItemStatus = styled.span`
position: absolute;
right: 10px;
top: 10px;
line-height: 30px;
font-size: 14px;
${
    (props: VideoMeetingItemStatusProps) => {
        if (props.type === 'online') {
            return css`
              color: rgba(22, 208, 127, 1);
            `;
        }
        return css`
          color: rgba(255, 63, 99, 1);
        `;
    }
};
span {
display: inline-block;
width: 10px;
height: 10px;
border-radius: 50%;
margin-right: 5px;
${
    (props: VideoMeetingItemStatusProps) => {
        if (props.type === 'online') {
            return css`
              background-color: rgba(22, 208, 127, 1);
            `;
        }
        return css`
          background-color: rgba(255, 63, 99, 1);
        `;
    }
}
}
`;

export {
    DetailTabs,
    DetailContent,
    DetailTabsItem,
    DetailTabsImgWrap,
    DetailBaseWrapper,
    DetailBaseContent,
    DetailBaseItem,
    DetailBaseLabel,
    DetailBaseItemContent,
    DetailBaseSubject,
    DetailBaseTimeSmall,
    DetailBaseUser,
    DetailBaseFile,
    DetailBaseSeat,
    DetailBaseDes,
    DetailAgendaTime,
    DetailRemarkQR,
    DetailRemarkUserList,
    DetailRemarkUserTitle,
    DetailRemarkUser,
    DetailSummaryList,
    DetailSummaryListItem,
    DetailSummaryListHeader,
    DetailSummaryListOperate,
    DetailSummaryListSubject,
    DetailSummaryListContent,
    DetailSummaryListTime,
    DetailVoteTitle,
    DetailVoteCard,
    DetailVoteLabel,
    DetailVoteContent,
    DetailVoteUserName,
    VoteFormLabel,
    DetailBaseOuterWrapper,
    DetailBaseAgenda,
    VideoMeetingWrapper,
    VideoMeetingItem,
    VideoMeetingItemTitle,
    VideoMeetingItemKey,
    VideoMeetingItemStatus
};
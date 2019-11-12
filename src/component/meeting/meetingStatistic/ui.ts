import styled, {css} from "styled-components";
import {SlideShow} from '@/baseUI/Animate';
import {UIGrid, UICol} from '@/baseUI/Grid';

import {
    CountImgBg,
    RemarkImgBg,
    TimeImgBg,
    RemarkPerImgBg
} from '@/assert/img/meeting/template';

const StatisticWrap = styled.section`
${SlideShow}
`;

const StatisticHeader = styled.header`
background-color: #fff;
height: 48px;
border: 1px solid rgba(218, 225, 228, 1);
border-radius: 5px;
margin-bottom: 15px;
position: relative;
`;

const StatisticTitle = styled.h2`
line-height: 48px;
padding-left: 20px;
font-size: 18px;
color: #2d2f30;
`;

const StatisticOperate = styled.strong`
position: absolute;
right: 20px;
top: 8px;
`;

interface UserCountItemProps {
    type?: string;
}

const UserCountWrapper = styled.section`
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
margin-bottom: 15px;
`;

const UserCountItem = styled.div`
border-radius: 5px;
height: 100px;
width: calc(100% * (1/4) - 45px * (1/4));
margin-right: 15px;
box-shadow: 0 0 3px rgba(255, 242, 239, 0.25);
display: flex;
flex-direction: row;
background-size: 100% 100%;
background-repeat: no-repeat;
&:last-child {
  margin-right: 0;
}
${
    (props: UserCountItemProps) => {
        let style;
        switch (props.type) {
            case 'count': {
                style = css`
                 background-image: url(${CountImgBg});
                `;
                break;
            }
            case 'remark': {
                style = css`
                 background-image: url(${RemarkImgBg});
                `;
                break;
            }
            case 'remarkPer': {
                style = css`
                 background-image: url(${RemarkPerImgBg});
                `;
                break;
            }
            default: {
                style = css`
                 background-image: url(${TimeImgBg});
                `;
            }
        }
        return style;
    }
}
`;

const UserCountIcon = styled.div`
text-align: center;
line-height: 100px;
width: 30%;
img {
  width: 40px;  
}
`;
const UserCountContent = styled.div`
flex: auto;
`;
const UserCountTitle = styled.h4`
color: #fff;
font-size:12px;
font-weight:400;
line-height: 30px;
margin-bottom: 0;
margin-top: 20px;
`;
const UserCountTotal = styled.h5`
color: #fff;
font-size:24px;
font-weight:400;
line-height: 30px;
margin-bottom: 0;
`;

const RoomTotalWrapper = styled.section`
background-color: #fff;
text-align: center;
height: 400px;
border: 1px solid rgba(218, 225, 228, 1);
border-radius: 5px;
margin-left: 15px;
`;

const CardHeader = styled.header`
position: relative;
height: 49px;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const CardHeaderTitle = styled.h3`
margin-bottom: 0;
text-align: left;
line-height: 50px;
font-size: 14px;
font-weight: 400;
padding-left: 10px;
`;

const AttendTotalWrapper = styled.section`
background-color: #fff;
height: 600px;
border-radius: 5px;
margin-top: 15px;
border: 1px solid rgba(218, 225, 228, 1);
text-align: center;
`;

const ComTotalWrapper = styled.section`
margin-top: 15px;
  display: flex;
  height: 180px;
  justify-content: flex-start;
  flex-direction: row;
  flex-flow:row wrap;
  flex-wrap: wrap;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(218, 225, 228, 1);
`;

const ComTotalItem = styled.div`
width: calc(100% * (1/4) - 2px);
padding-left: 10px;
display: flex;
`;

const ComTotalIcon = styled.div`
width: calc(100% * (1/3));
text-align: center;
line-height: 138px;
img {
  width: 60px;
}
`;

const ComTotalContent = styled.div`
width: calc(100% * (2/3));
`;

interface ColorText {
    type?: string;
}

const ComTotalTitle = styled.h4`
margin-top: 20px;
font-size:16px;
font-weight:400;
line-height: 38px;
${
    (props: ColorText) => {
        let colorText;
        switch (props.type) {
            case '1': {
                colorText = css`
                    background: linear-gradient(to bottom, rgba(245, 73, 93, 1), rgba(248, 123, 63, 1));
                    -webkit-background-clip: text;
                    color: rgba(245, 73, 93, 1);
                `;
                break;
            }
            case '2': {
                colorText = css`
                    background: linear-gradient(to bottom, rgba(82, 56, 246, 1), rgba(141, 90, 254, 1));
                    -webkit-background-clip: text;
                    color: transparent;
                `;
                break;
            }
            case '3': {
                colorText = css`
                    background: linear-gradient(to bottom, rgba(255, 156, 4, 1), rgba(255, 202, 36, 1));
                    -webkit-background-clip: text;
                    color: transparent;
                `;
                break;
            }
            default: {
                colorText = css`
                    background: linear-gradient(to bottom, rgba(51, 190, 209, 1), rgba(158, 225, 121, 1));
                    -webkit-background-clip: text;
                    color: transparent;
                `;
            }
        }
        return colorText;
    }
}
`;

const ComTotalCount = styled.h5`
font-size: 30px;
font-weight:bold;
line-height: 34px;
${
    (props: ColorText) => {
        let colorText;
        switch (props.type) {
            case '1': {
                colorText = css`
                    color: rgba(245, 73, 93, 1);
                `;
                break;
            }
            case '2': {
                colorText = css`
                    color: rgba(82, 56, 246, 1);
                `;
                break;
            }
            case '3': {
                colorText = css`
                    color: rgba(255, 156, 4, 1);
                `;
                break;
            }
            default: {
                colorText = css`
                    color: rgba(51, 190, 209, 1);
                `;
            }
        }
        return colorText;
    }
}
`;

const ComRankWrapper = styled.section`
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
background-color: #fff;
height: 400px;
`;

const ComRankContent = styled.div`
padding: 20px;
height: 300px;
`;

const ComRankListTH = styled(UIGrid)`
font-size: 14px;
color:rgba(45,47,48,1);
line-height: 30px;
`;

const ComRankListItem = styled(UIGrid)`
height: 40px;
`;

const ComRankListRank = styled(UICol)`
line-height: 40px;
font-size: 14px;
img {
  height: 36px;
}
span {
  font-size: 14px;
  display: inline-block;
  width: 28px;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  color: rgba(145, 152, 157, 1);
}
`;

const ComRankListName = styled(UICol)`
line-height: 40px;
font-size: 14px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const ComRankListCount = styled(UICol)`
line-height: 40px;
small {
  font-size: 12px;
  margin-left: 15px;
  span {
    margin-left: 5px;
  }
}
`;

const FooterPagination = styled.div`
height: 49px;
line-height: 50px;
text-align: center;
border-top: 1px solid rgba(218, 225, 228, 1);
`;

export {
    StatisticWrap,
    StatisticHeader,
    StatisticTitle,
    StatisticOperate,
    UserCountWrapper,
    UserCountItem,
    UserCountIcon,
    UserCountContent,
    UserCountTitle,
    UserCountTotal,
    RoomTotalWrapper,
    CardHeader,
    CardHeaderTitle,
    AttendTotalWrapper,
    ComTotalWrapper,
    ComTotalItem,
    ComTotalIcon,
    ComTotalTitle,
    ComTotalCount,
    ComTotalContent,
    ComRankWrapper,
    ComRankContent,
    ComRankListTH,
    ComRankListItem,
    ComRankListRank,
    ComRankListName,
    ComRankListCount,
    FooterPagination
};
import styled, {css} from "styled-components";

const SeatPickerWrapper = styled.div`
width: 100%;
height: 100%;
background-color: #fff;
`;

const SeatPickerContent = styled.div`
height: calc(100% - 100px);
display: flex;
flex-direction: row;
`;

const SeatPickerEditor = styled.div`
flex: auto;
height: 100%;
`;

const SeatPickerOperate = styled.div`
width: 300px;
border-left: 1px solid #dae1e4;
`;

const SeatPickerOpHeader = styled.h4`
height: 40px;
line-height: 40px;
padding-left: 20px;
font-size: 16px;
font-weight: 400;
margin: 0;
background-color: rgba(239,243,245,1);
`;

const SortByContent = styled.div`
padding: 15px 20px;
text-align: center;
height: 60px;
`;

const SearchUserWrapper = styled.div`
height: 50px;
padding: 5px 20px;
border-bottom: 1px solid #dae1e4;
`;

const SeatUserListWrapper = styled.div`
position: relative;
height: calc(100% - 140px);
`;

const SeatUserTabs = styled.ul`
list-style: none;
height: 50px;
display: flex;
flex-direction: row;
position: relative;
margin: 0;
border-bottom: 1px solid #dae1e4;
`;

interface SeatUserTabsItemProps {
    type?: string;
}

const SeatUserTabsItem = styled.li`
height: 50px;
width: calc(50%);
text-align: center;
line-height: 50px;
transition: color 0.3s ease-in;
&:hover {
color: #1890ff;
cursor: pointer;
}
${
    (props: SeatUserTabsItemProps) => {
        if (props.type === 'active') {
            return css`
              color: #1890ff;
            `;
        }
        return '';
    }
}
`;

interface UserTabsItemLineProps {
    index: number;
}

const UserTabsItemLine = styled.span`
display: inline-block;
width: 50%;
height: 2px;
background-color: #1890ff;
position: absolute;
bottom: 0;
left: 0;
transition: left 0.3s ease-in;
${
    (props: UserTabsItemLineProps) => {
        return css`left: calc(${props.index} * 50%)`;
    }
}
`;

const SeatUserList = styled.ul`
list-style: none;
height: calc(100% - 150px);
margin: 0;
`;

const SeatUserListItem = styled.li`
height: 50px;
padding: 5px 20px;
position: relative;
transition: background-color .3s ease-in;
&:nth-of-type(odd) {
background-color: rgba(239, 243, 245, 0.51);
}
&:hover {
background-color: rgba(239, 243, 245, 1);
cursor: pointer;
}
`;

const SeatUserListName = styled.strong`
font-size: 14px;
font-weight: 300;
margin-left: 10px;
line-height: 40px;
`;

const SeatUserInfo = styled.span`
position: absolute;
right: 10px;
height: 40px;
display: inline-block;
top: 5px;
line-height: 40px;
margin-right: 10px;
img {
height: 20px;
}
`;

const SeatUserInfoNum = styled.small`
font-size: 14px;
font-weight: 400;
color: rgba(35, 146, 255, 1);
margin-right: 20px;
`;

const SeatUserListRandom = styled.div`
height: 50px;
text-align: center;
line-height: 50px;
border-top: 1px solid #dae1e4;
padding: 0 20px;
`;

export {
    SeatPickerWrapper,
    SeatPickerContent,
    SeatPickerEditor,
    SeatPickerOperate,
    SeatPickerOpHeader,
    SortByContent,
    SeatUserListWrapper,
    SearchUserWrapper,
    SeatUserTabs,
    SeatUserTabsItem,
    UserTabsItemLine,
    SeatUserList,
    SeatUserListItem,
    SeatUserListName,
    SeatUserInfo,
    SeatUserInfoNum,
    SeatUserListRandom
};
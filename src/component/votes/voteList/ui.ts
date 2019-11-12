import styled from "styled-components";

const VoteListContent = styled.ul`
list-style: none;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
padding: 15px 15px 0;
margin-bottom: 0;
`;

const VoteListItemWrapper = styled.li`
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

const VoteListItemHeader = styled.div`
height: 50px;
line-height: 50px;
padding: 0 10px;
border-bottom: 1px solid #dae1e4;
position: relative;
`;

const VoteListItemTitle = styled.h3`
margin: 0;
font-size: 14px;
font-weight: 400;
`;

const VoteListItemUser = styled.strong`
display: inline-block;
height: 50px;
line-height: 50px;
right: 10px;
top: 0;
position: absolute;
font-size: 14px;
font-weight: 400;
color: rgba(35, 146, 255, 1);
`;

const VoteListItemContent = styled.div`
list-style: none;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
padding: 15px;
margin-bottom: 0;
height: 300px;
`;

const VoteListItemContentCol = styled.div`
width: calc(100% * (1/2));
`;

const VoteListItemFooter = styled.div`
height: 50px;
line-height: 50px;
padding: 0 10px;
border-top: 1px solid #dae1e4;
position: relative;
`;

const VoteListItemInfo = styled.p`
font-weight:400;
color: rgb(87,87,87);
line-height: 50px;
`;

const VoteListItemOperate = styled.div`
display: inline-block;
height: 50px;
position: absolute;
right: 0;
top: 0;
text-align: right;
`;

export {
    VoteListContent,
    VoteListItemWrapper,
    VoteListItemHeader,
    VoteListItemFooter,
    VoteListItemTitle,
    VoteListItemUser,
    VoteListItemInfo,
    VoteListItemOperate,
    VoteListItemContent,
    VoteListItemContentCol
};

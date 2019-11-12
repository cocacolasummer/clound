import styled from "styled-components";

const ListWrapper = styled.div`
padding: 20px 0;
width: 1360px;
margin-left: calc(50% - 680px);
`;

const ListOperate = styled.div`
position: absolute;
right: 0;
top: 0;
line-height: 50px;
`;

const SeatListWrapper = styled.ul`
padding: 20px;
list-style: none;
display: flex;
margin: 0;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
`;

const SeatListItem = styled.li`
position: relative;
width: calc(25% - 15px);
border: 1px solid rgba(218,225,228,1);
border-radius: 5px;
margin-top: 20px;
margin-left: 20px;
&:nth-of-type(4n + 1) {
margin-left: 0;
}
`;

const SeatListItemImgWrap = styled.div`
width: 100%;
height: 250px;
padding: 10px;
overflow: hidden;
img {
max-width: 100%;
}
`;
const ShowListItemTitle = styled.h3`
font-weight: normal;
font-size: 16px;
line-height: 40px;
border-top: 1px solid rgba(218,225,228,1);
margin: 0;
text-align: center;
`;

const ShowListItemOperate = styled.span`
position: absolute;
right: 10px;
top: 10px;
cursor: pointer;
&:hover {
  opacity: .7;
  transition: opacity .2s ease-in;
}
`;

export {
    ListWrapper,
    ListOperate,
    SeatListWrapper,
    SeatListItem,
    SeatListItemImgWrap,
    ShowListItemTitle,
    ShowListItemOperate
};

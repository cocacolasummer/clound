import styled from "styled-components";

const AddressWrapper = styled.div`
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const AddressHeader = styled.h3`
margin: 0;
padding-left: 20px;
font-size: 16px;
font-weight: 400;
line-height: 40px;
background-color: #f3f3f3;
`;

const CharListWrapper = styled.ul`
list-style: none;
padding: 20px 20px 0;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
margin: 0;
`;

const CharListItem = styled.li`
width: calc(100% * (1/2) - 10px);
border: 1px solid #dae1e4;
border-radius: 5px;
margin-bottom: 20px;
position: relative;
list-style: none;
transition: box-shadow,border .2s ease-in;
  &:hover {
    cursor: pointer; 
    box-shadow: 0 0 5px #08baff;
  }  
  &:nth-child(odd) {
    margin-right: 20px;
  }
`;

const CharListItemHeader = styled.h4`
padding-left: 20px;
margin: 0;
height: 40px;
line-height: 40px;
font-size: 14px;
font-weight: 400;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const CharListItemFooter = styled.div`
text-align: center;
height: 40px;
border-top: 1px solid rgba(218, 225, 228, 1);
position: absolute;
bottom: 0;
left: 0;
width: 100%;
line-height: 40px;
`;

export {
    AddressWrapper,
    AddressHeader,
    CharListWrapper,
    CharListItem,
    CharListItemHeader,
    CharListItemFooter
};
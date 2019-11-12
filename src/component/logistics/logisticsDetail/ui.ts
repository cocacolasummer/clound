import styled from "styled-components";

const GoodsListWrapper = styled.ul`
margin-top: 20px;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
`;

const GoodsListItem = styled.li`
position: relative;
width: calc(100% * (1/2) - 10px);
border-radius: 5px;
border: 1px solid rgba(218, 225, 228, 1);
margin-bottom: 20px;
padding: 10px;
overflow: hidden;
transition: .2s linear;

&:nth-child(odd) {
    margin-right: 20px;
}
`;

const GoodsListItemImg = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
width: 60px;
height: 60px;
position: absolute;
left: 10px;
top: 10px;
`;

const GoodsListItemInfo = styled.div`
padding: 0 0 0 60px;
height: 60px;
`;

const GoodsListItemName = styled.h5`
font-size: 12px;
line-height: 20px;
font-weight: 400;
text-align: right;
margin: 0;
`;

const GoodsListItemPrice = styled.p`
font-size: 12px;
line-height: 20px;
font-weight: 400;
text-align: right;
color: #FF7B11;
margin: 0;
`;
const GoodsListItemCount = styled.p`
font-size: 12px;
line-height: 20px;
font-weight: 400;
text-align: right;
margin: 0;
`;

const GoodsDetailTotal = styled.p`
font-size: 16px;
line-height: 50px;
text-align: center;
`;

const GoodsDetailCount = styled.strong`
color: #FF7B11;
font-size: 18px;
line-height: 50px;
`;

export {
    GoodsListWrapper,
    GoodsListItem,
    GoodsListItemImg,
    GoodsListItemInfo,
    GoodsListItemName,
    GoodsListItemCount,
    GoodsListItemPrice,
    GoodsDetailTotal,
    GoodsDetailCount
};

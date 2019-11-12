import styled, {css} from "styled-components";

const GroupCardWrapper = styled.ul`
list-style: none;
padding: 20px 20px 0;
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-flow:row wrap;
flex-wrap: wrap;
margin: 0;
`;

interface GroupCardItemProps {
    type: number;
}

const GroupCardItem = styled.li`
width: calc(100% * (1/2) - 10px);
border: 1px solid #dae1e4;
border-radius: 5px;
margin-bottom: 20px;
padding: 20px;
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
  
  ${
    (props: GroupCardItemProps) => {
        if (props.type) {
            return css`
            border: 1px solid #2392FF;
            `;
        }
        return null;
    }
}
`;

const GroupCardItemImg = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
position: absolute;
left: 20px;
top: 20px;
width: 100px;
height: 100px;
`;

const GroupCardItemInfo = styled.div`
height: 100px;
padding-left: 120px;
`;

const GroupCardItemTitle = styled.h4`
font-size: 16px;
font-weight: 400;
line-height: 20px;
`;

const GroupCardItemDesc = styled.p`
line-height: 20px;
font-size: 12px;
height: 40px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`;

const GroupCardItemTime = styled.time`
font-size: 12px;
line-height: 30px;
`;

const GroupCardItemOperate = styled.span`
position: absolute;
right: 20px;
bottom: 20px;
`;

export {
    GroupCardWrapper,
    GroupCardItem,
    GroupCardItemImg,
    GroupCardItemInfo,
    GroupCardItemTitle,
    GroupCardItemDesc,
    GroupCardItemTime,
    GroupCardItemOperate
};
import styled, {css} from "styled-components";

const FormTabs = styled.ul`
list-style: none;
height: 50px;
display: flex;
flex-direction: row;
position: relative;
margin: 0;
border-bottom: 1px solid #dae1e4;
`;

interface FormTabsItemProps {
    type?: string;
}

const FormTabsItem = styled.li`
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
    (props: FormTabsItemProps) => {
        if (props.type === 'active') {
            return css`
              color: #1890ff;
            `;
        }
        return '';
    }
}
`;

interface FormTabsItemLineProps {
    index: number;
}

const FormTabsItemLine = styled.span`
display: inline-block;
width: 50%;
height: 2px;
background-color: #1890ff;
position: absolute;
bottom: 0;
left: 0;
transition: transform 0.3s ease-in;
${
    (props: FormTabsItemLineProps) => {
        return css`transform: translateX(calc(${props.index} * 100%))`;
    }
}
`;

const FormTabContent = styled.div`
width: 200%;
height: calc(100% - 50px);
display: flex;
flex-direction: row;
transition: transform 0.3s ease-in;
${
    (props: FormTabsItemLineProps) => {
        return css`transform: translateX(calc(${-props.index} * 50%))`;
    }
}
`;

const BaseFormWrapper = styled.div`
flex: 1;
width: 50%;
height: 100%;
display: flex;
flex-direction: row;
`;

const BaseGoodsListLeft = styled.ul`
background-color: #f3f3f3;
width: 150px;
flex: 0 0 150px;
margin: 0;
`;

const BaseGoodsListLeftItem = styled.li`
width: 100%;
font-size: 14px;
padding: 5px 10px;
text-align: center;
cursor: pointer;
line-height: 30px;
position: relative;
word-wrap: break-word;
transition: color, background-color .3s ease-in;
&:after {
  content: '';
  width: 2px;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #1890ff;
  transition: height 0.3s ease-in;
}
${
    (props: { type: boolean }) => {

        return props.type ? css`
        background-color: #fff;
        color: #1890ff;
        &:after {
          height: 100%;
        }
        ` : null;
    }
};
&:hover {
color: #1890ff;
background-color: #fff;
}
`;

const BaseGoodsListRight = styled.ul`
background-color: #fff;
flex: auto;
margin: 0;
`;

const BaseGoodsListRightItem = styled.li`
margin: 10px 10px 0;
padding: 10px;
border: 1px solid #dae1e4;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: row;
`;
const BaseGoodsListRightItemImg = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt
}))`
flex: 0 0 80px;
height: 80px;
width: 80px;
`;

const BaseGoodsListRightItemContent = styled.div`
flex: auto;
padding-left: 10px;
`;

const BaseGoodsListRightTitle = styled.h4`
margin: 0;
line-height: 20px;
font-size: 14px;
font-weight: normal;
`;
const BaseGoodsListRightPrice = styled.h5`
margin: 0;
font-size: 16px;
line-height: 30px;
color: #FF7B11;
`;

const BaseGoodsListGoodsOp = styled.div`
position: absolute;
right: 10px;
bottom: 10px;
`;

const BaseGoodsListGoodsAdd = styled.span`
line-height: 30px;
display: inline-block;
`;

const BaseGoodsListGoodsMinus = styled.span`
line-height: 30px;
display: inline-block;
`;

const BaseGoodsListGoodsCount = styled.span`
line-height: 30px;
display: inline-block;
width: 60px;
text-align: center;
font-size: 14px;
color: #36383F;
`;

const CartWrapper = styled.div`
text-align: left;
padding: 0 20px;
width: 100%;
height: 100%;
position: relative;
`;

const CartCount = styled.span`
margin-left: 10px;
font-size: 14px;
line-height: 50px;
color: #2D2F30;
`;

const CartPrice = styled.span`
font-size: 16px;
line-height: 50px;
color: #FF7B11;
margin-left: 10px;
`;

const CartOp = styled.div`
position: absolute;
right: 20px;
height: 50px;
top: 0;
`;

export {
    FormTabs,
    FormTabsItem,
    FormTabsItemLine,
    BaseFormWrapper,
    FormTabContent,
    BaseGoodsListLeft,
    BaseGoodsListRight,
    BaseGoodsListLeftItem,
    BaseGoodsListRightItem,
    BaseGoodsListRightItemImg,
    BaseGoodsListRightItemContent,
    BaseGoodsListRightTitle,
    BaseGoodsListRightPrice,
    BaseGoodsListGoodsAdd,
    BaseGoodsListGoodsOp,
    BaseGoodsListGoodsCount,
    BaseGoodsListGoodsMinus,
    CartWrapper,
    CartCount,
    CartPrice,
    CartOp
};
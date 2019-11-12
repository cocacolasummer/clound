import styled, {css} from "styled-components";
import {SlideShow} from '@/baseUI/Animate';

const FormWrapper = styled.div`
width: 100%;
background-color: #fff;
overflow: hidden;
`;

const FormItemHeader = styled.div`
height: 40px;
background-color: rgba(245,247,248,1);
position: relative;
`;

const FormItemTitle = styled.h4`
font-weight: 400;
font-size: 14px;
line-height: 40px;
padding-left: 20px;
`;

interface FormContentProps {
    isShow?: boolean;
}

const FormContent = styled.div`
padding: 20px;
overflow: hidden;
${
    (props: FormContentProps) => {
        if (!props.isShow) {
            return css`
              padding: 0px;
              height: 0px;
            `;
        }
        return null;
    }
}
`;

const ExteriorWrapper = styled.div`
${SlideShow};
position: relative;
border: 1px dashed rgba(218, 225, 228, 1);
padding: 20px 5px 5px;
border-radius: 5px;
width: 380px;
margin: 0 0 20px 50px;
background: linear-gradient(to bottom, rgba(245,247,248,1), rgba(245,247,248,0.51));
`;

const ExteriorClose = styled.span`
position: absolute;
right: -15px;
top: -15px;
`;

export {
    FormWrapper,
    FormItemHeader,
    FormItemTitle,
    FormContent,
    ExteriorWrapper,
    ExteriorClose
};
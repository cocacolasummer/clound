import styled from "styled-components";
import {UICol} from '@/baseUI/Grid';

const UIColLabel = styled(UICol)`
line-height: 40px;
font-size: 16px;
font-weight: 400;
text-align: right;
`;
const UIColContent = styled(UICol)`
line-height: 40px;
font-size: 14px;
`;

export {
    UIColLabel,
    UIColContent
};
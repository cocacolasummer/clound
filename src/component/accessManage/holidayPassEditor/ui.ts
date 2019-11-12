import styled from "styled-components";
import {SlideShow} from "@/baseUI/Animate";

const TimeWrapper = styled.div`
${SlideShow};
position: relative;
border: 1px dashed rgba(218, 225, 228, 1);
padding: 20px 5px 5px;
border-radius: 5px;
width: 80%;
margin: 0 0 20px 50px;
background: linear-gradient(to bottom, rgba(245,247,248,1), rgba(245,247,248,0.51));
`;

const TimeClose = styled.span`
position: absolute;
right: -15px;
top: -15px;
`;

export {
    TimeClose,
    TimeWrapper
};
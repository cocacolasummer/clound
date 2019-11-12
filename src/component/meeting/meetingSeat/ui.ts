import styled from "styled-components";

const SeatImgItem = styled.img.attrs(props => ({
    src: props.src,
    alt: props.alt
}))`
max-width: 100%;
cursor: pointer;
`;

export {
    SeatImgItem
};
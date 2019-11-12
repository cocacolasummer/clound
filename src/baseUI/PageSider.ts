import styled from "styled-components";

const PageSider = styled.aside`
    width: 200px;
    flex: 0 0 200px;
    margin-right: 15px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(218, 225, 228, 1);
    transition: .5s;
`;

const PageSiderMenuWrapper = styled.div`
width: 100%;
`;

const PageSiderMenuHeader = styled.div`
height: 49px;
border-bottom: 1px solid rgba(218, 225, 228, 1);
`;

const PageSiderMenuTitle = styled.h1`
line-height:50px;
margin: 0;
font-size: 18px;
padding-left: 20px;
font-weight: normal;
`;

export {
    PageSider,
    PageSiderMenuHeader,
    PageSiderMenuWrapper,
    PageSiderMenuTitle
};
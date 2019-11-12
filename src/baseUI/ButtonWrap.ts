import styled from "styled-components";

const ThemeOrange = styled.span`
button {
    margin-right: 15px;
    background-color: rgba(255, 123, 17, 1);
    border: 1px solid rgba(255, 123, 17, 1);
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: rgba(255, 123, 17, 1);
      border: 1px solid rgba(255, 123, 17, 1);
    }
}
`;

const ThemeGreen = styled.span`
button {
    margin-right: 15px;
    background-color: #15c0a9;
    border: 1px solid #15c0a9;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #15c0a9;
      border: 1px solid #15c0a9;
    }
}
`;

const ThemeYellow = styled.span`
button {
    margin-right: 15px;
    background-color: #FFc000;
    border: 1px solid #FFc000;
    color: #fff;
    &:hover, &:active, &:focus {
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.2s ease-in;
      background-color: #FFc000;
      border: 1px solid #FFc000;
    }
}
`;
export {
    ThemeOrange,
    ThemeGreen,
    ThemeYellow
};
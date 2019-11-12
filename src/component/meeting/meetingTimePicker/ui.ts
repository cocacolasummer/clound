import styled from "styled-components";

const SectionTimeWrapper = styled.section`
background-color: #fff;
border: 1px solid rgba(218, 225, 228, 1);
border-radius: 5px;
`;

const WrapperTimePick = styled.div`
`;

const WrapperTimeSet = styled.div`
margin-bottom: 5px;
white-space:nowrap;
height: 25px;
`;

const TimeScale = styled.span`
border-left: 1px solid #f3f3f3;
display: inline-block;
width: 100px;
height: 40px;
padding-bottom: 15px;
`;

const WrapperTimeScale = styled.div`
white-space: nowrap;
`;

interface WrapperSpanProps {
    type?: string;
}

const TimeSelectSpan = styled.span`
display: inline-block;
margin-right: 5px;
width: 20px;
height: 25px;
cursor: ${(props: WrapperSpanProps): string => {
    let cursor = '';
    if (props.type === 'disabled') {
        cursor = 'not-allowed';
    } else {
        cursor = 'pointer';
    }
    return cursor;
}};

background-color: ${
    (props: WrapperSpanProps): string => {
        let color = '';
        switch (props.type) {
            case 'disabled':
                color = 'rgba(220, 220, 220, 1)';

                break;
            case 'enabled':
                color = 'rgba(0, 170, 255, 1)';
                break;
            case 'selected':
                color = 'rgb(255, 116, 127)';
                break;
            case 'used':
                color = 'rgba(255, 192, 0, 1)';
                break;
        }
        return color;
    }};
`;

const TimeOPListWrapper = styled.div`
white-space: nowrap;
padding: 40px 10px 20px;
overflow-y: auto;
`;

const TimeOPWrapper = styled.div`
height: 25px;
margin-bottom: 5px;
button {
display: inline-block;
border: none;
padding: 0;
width: 30px;
height: 20px;
margin-right: 5px;
    img {
        width: 30px;
        height: 20px;
    }
}
`;

const RoomAddressWrapper = styled.div`
  margin-left: 20px;
  line-height: 49px;
    label {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    &:before {
      display: none;
      width: 0px !important;
      background-color: #fff;
    }
    &.ant-radio-button-wrapper-checked:before {
      display: none;
      width: 0px !important;
      background-color: #fff;
    
    }
}
`;

const TimeHeaderOPRight = styled.span`
position: absolute;
right: 20px;
top: 8px;
`;

const TimeColorShow = styled.div`
height: 50px;
text-align: right;
padding-right: 20px;
line-height: 50px;
`;

const ColorShowLabel = styled.strong`
font-size: 12px;
color: rgba(45, 47, 48, 1);
line-height: 50px;
vertical-align: top;
margin-left: 15px;
font-weight: 400;
`;

interface ColorShowProps {
    type?: string;
}

const ColorShow = styled.span`
display: inline-block;
width: 20px;
height: 20px;
margin-top: 15px;
margin-right: 10px;
background-color: ${
    (props: ColorShowProps): string => {
        let color = '';
        switch (props.type) {
            case 'disabled':
                color = 'rgba(220, 220, 220, 1)';
                break;
            case 'enabled':
                color = 'rgba(0, 170, 255, 1)';
                break;
            case 'used':
                color = 'rgba(255, 192, 0, 1)';
                break;
        }
        return color;
    }};
`;

const RoomNameWrapper = styled.div`
padding: 40px 20px 20px;
`;

const RoomName = styled.div`
text-align: right;
height: 25px;
line-height: 25px;
font-size:14px;
margin-bottom: 5px;
`;

const MoreWrapper = styled.div`
width: 100%;
height: 50px;
border-top: 1px solid rgba(218, 225, 228, 1);
line-height: 50px;
text-align: center;
`;

export {
    SectionTimeWrapper,
    WrapperTimePick,
    WrapperTimeSet,
    WrapperTimeScale,
    TimeScale,
    TimeSelectSpan,
    TimeOPWrapper,
    TimeOPListWrapper,
    RoomAddressWrapper,
    TimeHeaderOPRight,
    TimeColorShow,
    ColorShowLabel,
    ColorShow,
    RoomNameWrapper,
    RoomName,
    MoreWrapper
};

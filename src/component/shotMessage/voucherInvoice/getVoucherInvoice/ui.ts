import styled from "styled-components";

const GetInvoiceFooter = styled.div`
height: 60px;
position: relative;
`;

const FooterInvoiceLeft = styled.div`
line-height: 60px;
padding-left: 20px;
strong {
font-size: 14px;
color: rgba(35, 146, 255, 1);
margin-left: 5px;
}
`;

const FooterInvoiceRight = styled.div`
line-height: 60px;
position: absolute;
text-align: right;
right: 20px;
top: 0;
strong {
font-size: 16px;
color: rgba(255, 123, 17, 1);
margin-left: 5px;
margin-right: 15px;
}
`;

const StepContent = styled.div`
height: calc(100% - 45px);
`;

const StepSuccessIconWrap = styled.div`
padding: 100px 0 20px;
`;

const StepSuccessText = styled.p`
line-height: 40px;
font-size: 16px;
text-align: center;
`;

const StepInvoicePrice = styled.p`
position: absolute;
left: 20px;
top: 0;
line-height: 50px;
strong {
font-size: 18px;
color: rgba(255, 123, 17, 1);
}
`;

export {
    GetInvoiceFooter,
    FooterInvoiceLeft,
    FooterInvoiceRight,
    StepContent,
    StepSuccessIconWrap,
    StepSuccessText,
    StepInvoicePrice
};
import {message, Modal} from 'antd';

const warning = (msg: string): void => {
    message.warning(msg);
};

const success = (msg: string): void => {
    message.success(msg);
};

const error = (msg: string): void => {
    message.error(msg);
};

const successModal = (title: string, message: string, onOk?: () => void): void => {
    Modal.success({
        title: title,
        okText: '确定',
        content: message,
        onOk: onOk
    });
};

const infoModal = (title: string, message: string, okText?: string, onOk?: () => void): void => {
    Modal.info({
        title: title,
        okText: okText || '确定',
        content: message,
        onOk: onOk
    });
};

const warningModal = (title: string, message: string, onOk?: () => void): void => {
    Modal.warning({
        title: title,
        okText: '确定',
        content: message,
        onOk: onOk
    });
};

const waringConfirm = (title: string, message: string, onOk?: () => void): void => {
    Modal.confirm({
        title: title,
        content: message,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: onOk
    });
};

const waringConfirmCustom = (title: string, content: any, onOk?: () => void): void => {
    Modal.confirm({
        title: title,
        content: content,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: onOk
    });
};

export {
    warning,
    success,
    error,
    infoModal,
    successModal,
    warningModal,
    waringConfirm,
    waringConfirmCustom
};
import React from 'react';
import {Empty} from "antd";

const CustomEmpty = () => {
    return (
        <div style={{width: '100%', textAlign: 'center', padding: 32}}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>
    );
};

export {
    CustomEmpty
};
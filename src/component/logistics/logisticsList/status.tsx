import React from 'react';
import {Status, StatusSetting} from '@/store/logistics/logisticsList';

interface LogisticsStatusProps {
    type: Status;
}

const LogisticsStatus: React.ComponentType<LogisticsStatusProps> = (props: LogisticsStatusProps) => {
    return (
        <strong style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            lineHeight: '30px',
            fontSize: '12px',
            fontWeight: 'normal',
            color: StatusSetting[props.type].color
        }}>
            <span style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                verticalAlign: 'middle',
                marginRight: '5px',
                borderRadius: '50%',
                backgroundColor: StatusSetting[props.type].color
            }}/>
            {StatusSetting[props.type].name}
        </strong>
    );
};

export {
    LogisticsStatus
};
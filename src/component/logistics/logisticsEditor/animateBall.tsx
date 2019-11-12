import React, {useEffect, useRef, useState} from "react";

const AnimateBall = (props: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    index: number;
    onComplete: (index: number) => void;
}) => {
    const timer: any = useRef(null);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const parabola = (x1: number, y1: number, x2: number, y2: number, a: number, x: number): number => {
        const diffx = x2 - x1;
        const diffy = y2 - y1;
        const xN = x - x1;
        const b = (diffy - a * diffx * diffx) / diffx;

        const refPointY = y1 - top - 10;

        return refPointY + a * xN * xN + b * xN;
    };
    useEffect(() => {
        console.log('mount', props.index);
        return () => {
            console.log('unmount', props.index);
        };
    }, [props.index]);
    useEffect(() => {

        setLeft(props.startX - 10);
        setTop(props.startY - 10);
    }, [props.startX, props.startY]);
    useEffect(() => {
        const step = (props.startX - props.endY) / 200;
        let i = 0;
        timer.current = setInterval(() => {
            setLeft(props.startX - step * i);
            setTop(parabola(props.startX, props.startY, props.endX, props.endY, 0.005, props.startX - step * i));
            i++;
            if (props.startX - step * i < props.endX) {
                clearInterval(timer.current);
                setOpacity(0);
                setTimeout(() => {
                    props.onComplete(props.index);
                }, 100);
            }
        }, 5);
    }, [parabola, props, props.endX, props.endY]);

    return (
        <span style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            position: 'absolute',
            left: left,
            top: top,
            opacity: opacity,
            transition: 'opacity 100ms ease-in',
            backgroundColor: '#1890ff',
            borderRadius: '50%',
            zIndex: 3000
        }}>

        </span>
    );
};

export {
    AnimateBall
};
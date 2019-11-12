import React, {useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {SpringSystem, MathUtil, Spring} from 'rebound';

let CustomScrollBar: React.ComponentType<any> = (props: any, ref) => {

    const scroll: any = useRef();
    const springSystem: any = useRef();
    const spring: any = useRef();
    const handleSpringUpdate = (spring: Spring): void => {
        const val = spring.getCurrentValue();
        scroll.current.scrollLeft(val);
    };
    useEffect(() => {
        springSystem.current = new SpringSystem();
        spring.current = springSystem.current.createSpring();
        spring.current.addListener({onSpringUpdate: handleSpringUpdate});
        return (): void => {
            springSystem.current.deregisterSpring(spring.current);
            springSystem.current.removeAllListeners();
            springSystem.current = undefined;
            spring.current.destroy();
            spring.current = undefined;
        };
    }, []);
    const getScrollLeft = (): number => {
        return scroll.current.getScrollLeft();
    };

    const getScrollWidth = (): number => {
        return scroll.current.getScrollWidth();
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const scrollLeft = (left: number): void => {
        const scrollLeft = getScrollLeft();
        const scrollWidth = getScrollWidth();
        const val = MathUtil.mapValueInRange(left, 0, scrollWidth, 0, scrollWidth);

        spring.current.setCurrentValue(scrollLeft).setAtRest();
        spring.current.setEndValue(val);
    };

    useImperativeHandle(ref, () => ({
        scrollLeft: (left: number): void => {
            scrollLeft(left);
        }
    }));

    return (
        <Scrollbars
            {...props}
            ref={scroll}/>
    );
};

CustomScrollBar = forwardRef(CustomScrollBar);
export {
    CustomScrollBar
};
import React, {useEffect, useRef} from 'react';
import {Button} from 'antd';
import {Scrollbars} from "react-custom-scrollbars";
import {CanvasEditor} from '@/component/seat/seatEditor/canvas';

import {MODEL_ONE} from '@/component/seat/adminSeat/example/model-one-json';

import {
    SeatPickerWrapper,
    SeatPickerContent,
    SeatPickerEditor,
} from '@/component/seat/adminSeat/ui';

import {
    ShowListTitle,
    ShowListHeader,
    ShowListFooter
} from '@/baseUI/BaseShowList';
import {
    ShowListItemOperate
} from "@/component/seat/seatList/ui";

import {
    ThemeOrange
} from '@/baseUI/ButtonWrap';
import {SeatCanvasEditor} from "@/component/seat/seatEditor/ui";

const UserSeat: React.ComponentType = () => {
    const canvas: any = useRef();

    useEffect(() => {
        canvas.current = new CanvasEditor('seatEditor', {
            selection: false
        });
        canvas.current.loadUserJSON(MODEL_ONE.content, () => {
            canvas.current.setObjSelectFalse();
            canvas.current.seatHovering(() => {
                return {
                    name: '测试',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                };
            });
            canvas.current.seatUserClick(1, (seatId: any) => {

            });
        });

    }, []);

    return (
        <SeatPickerWrapper>
            <ShowListHeader>
                <ShowListTitle>坐席管理</ShowListTitle>
                <ShowListItemOperate>
                    <Button type={'primary'} onClick={() => window.history.back()}><a>返回</a></Button>
                </ShowListItemOperate>
            </ShowListHeader>
            <SeatPickerContent>
                <SeatPickerEditor>
                    <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                        <SeatCanvasEditor id="seatEditor" width="1920" height="1080">请使用支持HTML5的浏览器</SeatCanvasEditor>
                    </Scrollbars>
                </SeatPickerEditor>
            </SeatPickerContent>
            <ShowListFooter>
                <ThemeOrange><Button onClick={() => window.location.reload()}>重置</Button></ThemeOrange>
                <Button type={"primary"}>保存</Button>
            </ShowListFooter>
        </SeatPickerWrapper>
    );
};

export {
    UserSeat
};
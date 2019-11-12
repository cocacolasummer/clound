import React, {useRef, useEffect, useState} from 'react';
import TimePickUtil from '@/util/timePickUtil';

const _timePickUitl = new TimePickUtil();
import {useDispatch, useMappedState} from "redux-react-hook";
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        startIndex: state.MeetingTimePicker.startIndex,
        endIndex: state.MeetingTimePicker.endIndex,
        selectRoom: state.MeetingTimePicker.selectRoom,
        date: state.MeetingTimePicker.date,
        isEdit: state.MeetingEditor.isEdit,
        data: state.MeetingEditor.data,
        userList: state.MeetingEditor.userList,
        roomList: state.MeetingEditor.roomList,
    };
};

import {
    Form,
    Input,
    DatePicker,
    Select,
    TreeSelect, Button
} from 'antd';
import moment from "moment";

import {
    FormWrapper,
    FormItemHeader,
    FormItemTitle,
    FormContent
} from './ui';
import {CrowClose} from "@/baseUI/Crow";
import {FormComponentProps} from "antd/lib/form";
import TimeRanger from "@/component/timeRange";

const {Option} = Select;

interface BaseMeetingResFormProps extends FormComponentProps {
    propsSetBaseForm: any;
}

const BaseMeetingResForm: React.ComponentType<BaseMeetingResFormProps> = (props: BaseMeetingResFormProps) => {
    const dispatch = useDispatch();
    const baseWrapper: any = useRef(null);
    const [showContent, setShowContent] = useState<boolean>(true);
    const {
        date, startIndex,
        selectRoom,
        endIndex,
        isEdit,
        data,
        userList,
        roomList,
    } = useMappedState(mapState);

    const tProps = {
        treeData: userList,
        treeCheckable: true,
        searchPlaceholder: '请选择人员'
    };
    let startDate: any;
    let endDate: any;
    let addressId: any;
    let defaultDate: any;
    let time: any;
    if (isEdit === 'edit' || isEdit === 'recreate') {
        if (data.start_time && data.end_time) {
            defaultDate = moment(data.start_time.split(' ')[0], 'YYYY-MM-DD');
            startDate = moment(data.start_time.split(' ')[1], 'hh:mm:ss');
            endDate = moment(data.end_time.split(' ')[1], 'hh:mm');
            time = [startDate, endDate];
        }
    } else {
        if (endIndex < startIndex) {
            startDate = moment(_timePickUitl.indexToTimeString(endIndex, true), 'hh:mm');
            endDate = moment(_timePickUitl.indexToTimeString(startIndex, false), 'hh:mm');
        } else {
            startDate = moment(_timePickUitl.indexToTimeString(startIndex, true), 'hh:mm');
            endDate = moment(_timePickUitl.indexToTimeString(endIndex, false), 'hh:mm');
        }
        time = [startDate, endDate];
        addressId = selectRoom;
    }
    useEffect(() => {
        if(startDate && endDate) {
            dispatch({
                type: 'change meetingeditor timeRange',
                timeRange: [startDate.format('HH:mm:ss'), endDate.format('HH:mm:ss')]
            });
        }
    }, [startDate, endDate]);

    useEffect(() => {
        props.propsSetBaseForm(props.form);
    });
    const {getFieldDecorator} = props.form;

    const formItemLayout: object = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 4},
            sm: {span: 16, offset: 6},
        },
    };

    return (
        <FormWrapper ref={baseWrapper}>
            <FormItemHeader>
                <FormItemTitle>会议基础内容</FormItemTitle>
                <CrowClose>
                    <Button size={"small"} onClick={(e) => setShowContent(!showContent)}
                            shape="circle"
                            icon={showContent ? "up" : "down"}/>
                </CrowClose>
            </FormItemHeader>
            <FormContent isShow={showContent}>
                <Form {...formItemLayout}>
                    <Form.Item label="会议主题">
                        {getFieldDecorator('subject', {
                            initialValue: data && data.subject || '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入会议主题',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="会议时间">
                        {getFieldDecorator('meeting_date', {
                            initialValue: defaultDate || moment(date),
                            rules: [{required: true, message: '请选择会议日期'}],
                        })(
                            <DatePicker style={{width: '100%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        {getFieldDecorator('meeting_time', {
                            initialValue: {
                                start: time && time[0],
                                end: time && time[1]
                            },
                            rules: [{type: 'object', required: true, message: '请选择会议时间'}],
                        })(
                            <TimeRanger onChange={(time): void => {
                                dispatch({
                                    type: 'change meetingeditor timeRange',
                                    timeRange: [time.start.format('HH:mm:ss'), time.end.format('HH:mm:ss')]
                                });
                            }} format={"HH:mm"}/>
                        )}
                    </Form.Item>

                    <Form.Item label="会议地点">
                        {getFieldDecorator('address', {
                            initialValue: (data && data.detail && data.detail.room.id) || (addressId && addressId.toString()),
                            rules: [{required: true, message: '请选择会议地点'}],
                        })(
                            <Select
                                placeholder="请选择会议地点"
                            >
                                {
                                    roomList.map((item, index) => {
                                        return (
                                            <Option value={item.id} key={index}>{item.name}</Option>
                                        );
                                    })
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="主持人">
                        {getFieldDecorator('chairperson', {
                            initialValue: data && data.detail && data.detail.leader.map((item: any) => `${item.user_id}:salt`)
                        })(
                            <TreeSelect {...tProps}/>
                        )}
                    </Form.Item>
                    {
                        data && data.detail && data.detail.auditor[0] ? <Form.Item label="审核人">
                            <Input disabled value={data.detail.auditor[0].displayname}/>
                        </Form.Item> : null
                    }
                    {/*<Form.Item label="周期会议">*/}
                    {/*    {getFieldDecorator('cycle_day', {*/}
                    {/*    })(*/}
                    {/*        <Checkbox.Group style={{width: '100%'}}>*/}
                    {/*            <Row>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="1">周一</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="2">周二</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="3">周三</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="4">周四</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="5">周五</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="6">周六</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*                <Col span={8}>*/}
                    {/*                    <Checkbox value="7">周日</Checkbox>*/}
                    {/*                </Col>*/}
                    {/*            </Row>*/}
                    {/*        </Checkbox.Group>,*/}
                    {/*    )}*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item label="周期会议日期">*/}
                    {/*    {getFieldDecorator('cycle_time', {*/}
                    {/*    })(*/}
                    {/*        <RangePicker format="YYYY-MM-DD" style={{width: '100%'}}/>,*/}
                    {/*    )}*/}
                    {/*</Form.Item>*/}
                </Form>
            </FormContent>
        </FormWrapper>
    );
};

const WrappedBaseMeetingForm = Form.create<BaseMeetingResFormProps>()(BaseMeetingResForm);

export {
    WrappedBaseMeetingForm
};

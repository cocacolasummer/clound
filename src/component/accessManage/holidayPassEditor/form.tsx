import React, {Fragment, useEffect, useState} from 'react';
import {
    Button,
    Form, Icon,
    Input, Popconfirm, Radio,
    Select,
    DatePicker
} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import TimePickerRange from '@/component/timeRange';
import moment from "moment";
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CSSTransition} from "react-transition-group";

import {
    TimeClose,
    TimeWrapper
} from './ui';

interface HolidayPassEditorFormProps extends FormComponentProps {
    data?: any;
    setPropsForm: (form: WrappedFormUtils) => void;
}

const {RangePicker} = DatePicker;
const {Option} = Select;
const HolidayPassEditorForm: React.ComponentType<HolidayPassEditorFormProps> = (props: HolidayPassEditorFormProps) => {
    const [timeList, setTimeList] = useState<any[]>([{}]);
    const {getFieldDecorator} = props.form;
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
        style: {
            paddingTop: '20px'
        }
    };
    useEffect(() => {
        props.setPropsForm(props.form);
    }, [props]);

    const removeTime = (index: number): void => {
        const newExterior = timeList.slice();
        newExterior.splice(index, 1);
        setTimeList(newExterior);
    };

    const addTime = (): void => {
        const newExterior = timeList.slice();
        newExterior.push({});
        setTimeList(newExterior);
    };

    const TimeListItems = timeList.map((item, index) => {
        return (
            <Fragment key={index}>
                <CSSTransition
                    in={true}
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                >
                    <TimeWrapper>
                        {timeList.length > 1 ? <TimeClose>
                            <Popconfirm title={`确定删除吗？`} onConfirm={() => removeTime(index)}>
                                <Button icon={'delete'} shape={'circle'}/>
                            </Popconfirm>
                        </TimeClose> : null}
                        <Form.Item label="通行日期">
                            {getFieldDecorator(`date${index}`, {
                                rules: [{required: true, message: '请选择通行日期'}],
                            })(
                                <RangePicker format="YYYY-MM-DD" style={{width: '100%'}}/>,
                            )}
                        </Form.Item>
                        <Form.Item label={"通行时间"}>
                            {getFieldDecorator(`time${index}`, {
                                rules: [{required: true, message: '请选择通行时间'}],
                                initialValue: {
                                    start: moment('02:00:00', 'HH:mm:ss'),
                                    end: moment('23:00:00', 'HH:mm:ss')
                                }
                            })(
                                <TimePickerRange/>
                            )}
                        </Form.Item>
                    </TimeWrapper>
                </CSSTransition>
            </Fragment>
        );
    });
    return (
        <Form {...formItemLayout}>
            <Form.Item label={"假期名称"}>
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入假期名称'}],
                })(
                    <Input
                        placeholder="请输入假期名称"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"设备组"}>
                {getFieldDecorator('group', {
                    rules: [{required: true, message: '请选择是否抓拍'}],
                    initialValue: "lucy"
                })(
                    <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={"是否抓拍"}>
                {getFieldDecorator('isSnapshot', {
                    rules: [{required: true, message: '请选择是否抓拍'}],
                    initialValue: "0"
                })(
                    <Radio.Group>
                        <Radio value={"1"}>是</Radio>
                        <Radio value={"0"}>否</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label={"通行类型"}>
                {getFieldDecorator('passType', {
                    rules: [{required: true, message: '请选择通行类型'}],
                    initialValue: ["lucy"]
                })(
                    <Select mode="multiple">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                )}
            </Form.Item>
            {TimeListItems}
            <Button type="dashed"
                    onClick={(): void => addTime()}
                    style={{width: '80%', marginLeft: '50px', marginBottom: '20px'}}>
                <Icon type="plus"/>添加自定义时段
            </Button>
        </Form>
    );
};

const WrappedAccessHolidayPassForm = Form.create<HolidayPassEditorFormProps>()(HolidayPassEditorForm);

export {
    WrappedAccessHolidayPassForm
};

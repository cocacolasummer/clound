import * as React from 'react';
import {useEffect} from 'react';
import TimePickUtil from '@/util/timePickUtil';
import TimeRanger from '@/component/timeRange';

const _timePickUitl = new TimePickUtil();
import {useMappedState} from "redux-react-hook";
import {IState} from "@/store";
import UploadFileServices from '@/services/uploadFileServices';

const _uploadFileServices = new UploadFileServices();

const mapState = (state: IState) => {
    return {
        startIndex: state.MeetingTimePicker.startIndex,
        endIndex: state.MeetingTimePicker.endIndex,
        selectRoom: state.MeetingTimePicker.selectRoom,
        date: state.MeetingTimePicker.date
    };
};

const mapEditorState = (state: IState) => {
    return {
        isEdit: state.MeetingEditor.isEdit,
        id: state.MeetingEditor.id,
        userList: state.MeetingEditor.userList,
        roomList: state.MeetingEditor.roomList
    };
};

import {
    Form,
    Input,
    Icon,
    DatePicker,
    Radio,
    Upload,
    Select,
    Row,
    Col,
    Checkbox,
    Button
} from 'antd';
import moment from "moment";

const {Option} = Select;
const {TextArea} = Input;
const {RangePicker} = DatePicker;

interface BaseMeetingResFormProps {
    form: any;
    propsSetBaseForm: any;
}

function BaseMeetingResForm(props: BaseMeetingResFormProps) {
    const {
        date, startIndex,
        selectRoom,
        endIndex
    } = useMappedState(mapState);

    const {
        roomList,
        isEdit
    } = useMappedState(mapEditorState);

    let startDate: any;
    let endDate: any;
    let addressId: any;
    let time: any;
    if (isEdit) {
        time = null;
    } else {
        if (endIndex < startIndex) {
            startDate = moment(_timePickUitl.indexToTimeString(endIndex, true), 'hh:mm:ss');
            endDate = moment(date + ' ' + _timePickUitl.indexToTimeString(startIndex, false), 'hh:mm:ss');
        } else {
            startDate = moment(_timePickUitl.indexToTimeString(startIndex, true), 'hh:mm:ss');
            endDate = moment(_timePickUitl.indexToTimeString(endIndex, false), 'hh:mm:ss');
        }

        time = [startDate, endDate];
        addressId = selectRoom;
    }
    useEffect(() => {
        props.propsSetBaseForm(props.form);
    });
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

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
        <Form {...formItemLayout}>
            <Form.Item label="会议主题">
                {getFieldDecorator('subject', {
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
                    initialValue: moment(date),
                    rules: [{required: true, message: '请选择会议日期'}],
                })(
                    <DatePicker style={{width: '100%'}}/>
                )}
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
                {getFieldDecorator('meeting_time', {
                    initialValue: {
                        start: time[0],
                        end: time[1]
                    },
                    rules: [{type: 'object', required: true, message: '请选择会议时间'}]
                })(
                    <TimeRanger format={"HH:mm"}/>
                )}

            </Form.Item>
            <Form.Item label="会议地点">
                {getFieldDecorator('address', {
                    initialValue: addressId.toString(),
                    rules: [{required: true, message: '请选择会议地点'}],
                })(
                    <Select
                        placeholder="请选择会议地点"
                    >
                        {
                            roomList.map((item, index) => {
                                console.log(item.id);
                                return (
                                    <Option value={item.id} key={index}>{item.name}</Option>
                                );
                            })
                        }
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="审核人">
                <Input disabled/>
            </Form.Item>
            <Form.Item label="周期会议">
                {getFieldDecorator('cycle_day', {})(
                    <Checkbox.Group style={{width: '100%'}}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="1">周一</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="2">周二</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="3">周三</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="4">周四</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="5">周五</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="6">周六</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="7">周日</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>,
                )}
            </Form.Item>
            <Form.Item label="周期会议日期">
                {getFieldDecorator('cycle_time', {})(
                    <RangePicker format="YYYY-MM-DD" style={{width: '100%'}}/>,
                )}
            </Form.Item>
            <Form.Item label="会议签到">
                {getFieldDecorator('meeting_signin', {})(
                    <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="0">否</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label="结束提醒">
                {getFieldDecorator('end_remind', {})(
                    <Radio.Group>
                        <Radio value="10">10分钟</Radio>
                        <Radio value="15">15分钟</Radio>
                        <Radio value="20">20分钟</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label="签到时间">
                {getFieldDecorator('signin_time', {})(
                    <Radio.Group>
                        <Radio value="10">10分钟</Radio>
                        <Radio value="15">15分钟</Radio>
                        <Radio value="20">20分钟</Radio>
                        <Radio value="30">30分钟</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label="会议附件" extra="支持扩展名：.rar .zip .excel.docx .ppt.pdf .jpg...">
                {getFieldDecorator('file', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                })(
                    <Upload name="image" customRequest={(e: any) => {
                        _uploadFileServices.uploadFile({
                            fileName: e.file.name,
                            type: e.file.type,
                            data: e.file
                        }, (res: any) => {
                            e.onSuccess(res);
                        }, (err: any) => {
                            e.onError(err);
                        }, e.onProgress);
                    }} listType="picture">
                        <Button>
                            <Icon type="upload"/> 上传文件
                        </Button>
                    </Upload>
                )}
            </Form.Item>
            <Form.Item label="会议详情">
                {getFieldDecorator('description', {})(
                    <TextArea rows={4}/>
                )}
            </Form.Item>
        </Form>
    );
}

const WrappedBaseMeetingResForm = Form.create<BaseMeetingResFormProps>()(BaseMeetingResForm);

export {
    WrappedBaseMeetingResForm
};
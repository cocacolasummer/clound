import React, {Fragment, useRef, useState} from 'react';
import {useEffect} from 'react';
import {useMappedState} from "redux-react-hook";
import UploadFileServices from '@/services/uploadFileServices';

const _uploadFileServices = new UploadFileServices();
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        data: state.MeetingEditor.data,
        timeRange: state.MeetingEditor.timeRange
    };
};

import {
    Form,
    Input,
    Icon,
    Radio,
    Upload,
    Button, Popconfirm, TimePicker, Checkbox
} from 'antd';

const {TextArea} = Input;
import {
    FormWrapper,
    FormItemHeader,
    FormItemTitle, FormContent, ExteriorWrapper, ExteriorClose
} from './ui';
import {CrowClose} from "@/baseUI/Crow";
import {funTransitionHeight} from "@/util/animateUtil";
import {CSSTransition} from "react-transition-group";
import moment from "moment";
import {FormComponentProps} from "antd/lib/form";

interface SettingsMeetingFormProps extends FormComponentProps {
    propsSettingsForm: any;
}

const SettingsMeetingForm: React.ComponentType<SettingsMeetingFormProps> = (props: SettingsMeetingFormProps) => {
    const settingWrapper: any = useRef(null);
    const [agendaList, setAgendaList] = useState<any[]>([]);
    const [showContent, setShowContent] = useState<boolean>(true);
    const [fileListState, setFileListState] = useState<any[]>([]);
    const {
        data,
        timeRange
    } = useMappedState(mapState);

    useEffect(() => {
        setAgendaList(data && data.agenda);
    }, [data]);

    useEffect(() => {
        funTransitionHeight(settingWrapper.current, 0.8);
    }, [showContent, agendaList]);
    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(settingWrapper.current, 0.8);
        }, 1500);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            funTransitionHeight(settingWrapper.current, 0.8);
        }, 150);
    }, [fileListState]);

    useEffect(() => {
        props.propsSettingsForm(props.form);
    });
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        setFileListState(e.fileList);
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

    const removeAgenda = (index: number): void => {
        const newAgenda = agendaList.slice();
        newAgenda.splice(index, 1);
        setAgendaList(newAgenda);
    };

    const disableHours = (): Array<number> => {
        const Hours = Array.from(Array(24), (v, k) => k);
        let hoursArr: Array<number> = [];
        if (timeRange[0]) {
            const h = moment(timeRange[0], 'HH:mm:ss').hour();
            hoursArr = Hours.slice(0, h);
        }
        if(timeRange[1]) {
            const h = moment(timeRange[1], 'HH:mm:ss').hour();
            hoursArr = hoursArr.concat(Hours.slice(h + 1, Hours.length));
        }
        return hoursArr;
    };

    const disableMinutes = (h: number): Array<number> => {
        const Minutes = Array.from(Array(60), (v, k) => k);
        let minArr: Array<number> = Minutes;
        if(h > moment(timeRange[0], 'HH:mm:ss').hour() && h < moment(timeRange[1], 'HH:mm:ss').hour()) {
            minArr = [];
        }else if (h === moment(timeRange[0], 'HH:mm:ss').hour()) {
            minArr = Minutes.slice(0, moment(timeRange[0], 'HH:mm:ss').minute());
        }else if (h === moment(timeRange[1], 'HH:mm:ss').hour()) {
            minArr = Minutes.slice(moment(timeRange[1], 'HH:mm:ss').minute() + 1, Minutes.length - 1);
        }
        return minArr;
    };

    const addAgenda = () => {
        const newAgenda = agendaList ? agendaList.slice() : [];
        newAgenda.push({});
        setAgendaList(newAgenda);
    };
    
    const fil = data && data.files && data.files.map((item: any, index: number) => {
        return {
            'uid': index,
            'name': item.replace(/^\/.+\//, ''),
            'url': `/meetingcloud/remote.php/webdav/${item}`,
            'item': item,
            'status': 'done'
        };
    });
    const AgendaListItems = agendaList && agendaList.map((item, index) => {
        return (
            <Fragment key={index}>
                <CSSTransition
                    in={true}
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                >
                    <ExteriorWrapper>
                        <ExteriorClose>
                            <Popconfirm title={`确定删除吗？`} onConfirm={() => removeAgenda(index)}>
                                <Button icon={'delete'} shape={'circle'}/>
                            </Popconfirm>
                        </ExteriorClose>
                        <Form.Item label="议程时间" key={4}>
                            {getFieldDecorator(`agenda[${index}.time]`, {
                                initialValue: item && item.time ? moment(item.time, "HH:mm") : null
                            })(
                                <TimePicker
                                    disabledHours={disableHours}
                                    disabledMinutes={disableMinutes}
                                    style={{width: '100%'}} format={"HH:mm"}/>,
                            )}
                        </Form.Item>
                        <Form.Item label="议程内容" key={5}>
                            {getFieldDecorator(`agenda[${index}.name]`, {
                                initialValue: item && item.name ? item.name : null
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                    </ExteriorWrapper>
                </CSSTransition>
            </Fragment>
        );
    });

    return (
        <FormWrapper ref={settingWrapper}>
            <FormItemHeader>
                <FormItemTitle>会议设置及详情</FormItemTitle>
                <CrowClose>
                    <Button size={"small"} onClick={(e) => setShowContent(!showContent)}
                            shape="circle"
                            icon={showContent ? "up" : "down"}/>
                </CrowClose>
            </FormItemHeader>
            <FormContent isShow={showContent}>
                <Form {...formItemLayout}>
                    <Form.Item label="提醒方式">
                        {getFieldDecorator('smsType', {
                            initialValue: (data && data.sms_type && data.sms_type.split(',')) || ['2']
                        })(
                            <Checkbox.Group>
                                <Checkbox value="1">短信提醒</Checkbox>
                                <Checkbox value="2">应用提醒</Checkbox>
                                <Checkbox value="3">邮箱提醒</Checkbox>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="会前提醒">
                        {getFieldDecorator('begin_remind', {
                            initialValue: (data && data.sms_time && data.sms_time.split(',')) || ['10']
                        })(
                            <Checkbox.Group>
                                <Checkbox value="10">10分钟</Checkbox>
                                <Checkbox value="15">15分钟</Checkbox>
                                <Checkbox value="20">20分钟</Checkbox>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="结束提醒">
                        {getFieldDecorator('end_remind', {
                            initialValue: (data && data.end_sms_time && data.end_sms_time.split(',')) || ['10']
                        })(
                            <Checkbox.Group>
                                <Checkbox value="10">10分钟</Checkbox>
                                <Checkbox value="15">15分钟</Checkbox>
                                <Checkbox value="20">20分钟</Checkbox>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="会议签到">
                        {getFieldDecorator('meeting_signin', {
                            initialValue: data && data.checkin || '0'
                        })(
                            <Radio.Group>
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="提前签到">
                        {getFieldDecorator('signin_time', {
                            initialValue: (data && data.checkin_ahead_minute && data.checkin_ahead_minute.toString()) || '10'
                        })(
                            <Radio.Group>
                                <Radio value="10">10分钟</Radio>
                                <Radio value="15">15分钟</Radio>
                                <Radio value="20">20分钟</Radio>
                                <Radio value="30">30分钟</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="结束签到">
                        {getFieldDecorator('end_sign_time', {
                            initialValue: (data && data.start_time && data.checkin_stop_minute && moment(data.checkin_stop_minute, 'HH:mm') || null)
                        })(
                            <TimePicker
                                disabledHours={disableHours}
                                disabledMinutes={disableMinutes}
                                format={"HH:mm"}/>
                        )}
                    </Form.Item>
                    <Form.Item label="会议附件" extra="支持扩展名：.rar .zip .excel.docx .ppt.pdf .jpg...">
                        {getFieldDecorator('file', {
                            initialValue: fil,
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        })(
                            <Upload name="logo" customRequest={(e: any) => {
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
                        {getFieldDecorator('description', {
                            initialValue: data && data.summary
                        })(
                            <TextArea rows={4}/>
                        )}
                    </Form.Item>
                    {AgendaListItems}
                    <Button type="dashed"
                            onClick={() => addAgenda()}
                            style={{width: '380px', marginLeft: '50px', marginBottom: '20px'}}>
                        <Icon type="plus"/>添加会议议程
                    </Button>
                </Form>
            </FormContent>
        </FormWrapper>
    );
};

const WrappedSettingsForm = Form.create<SettingsMeetingFormProps>({name: 'base_meeting_res_form'})(SettingsMeetingForm);

export {
    WrappedSettingsForm
};

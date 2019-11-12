import * as React from 'react';
import {useEffect, useState} from 'react';
import moment from "moment";
import QueueAnim from 'rc-queue-anim';

import {useMappedState} from "redux-react-hook";
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        userList: state.MeetingEditor.userList
    };
};

import {
    Form,
    TimePicker,
    Input,
    Button,
    Icon,
    Popconfirm, TreeSelect
} from 'antd';
import {
    CrowChildHeader,
    CrowChildTitle,
    CrowChildOperate
} from '@/baseUI/Crow';

import {
    FormAgenda
} from './ui';
import {FormComponentProps} from "antd/lib/form";

const {TextArea} = Input;

interface BaseAgendaFormProps extends FormComponentProps {
    propsSetAgendaForm: any;
    index: number;
    deleteAction: any;
    data: any;
    hasDelete: boolean;
}

function BaseAgendaForm(props: BaseAgendaFormProps) {
    const [attender, setAttender] = useState<string[]>([]);
    const [chairPerson, setChairPerson] = useState<string>();
    const {getFieldDecorator, setFieldsValue} = props.form;
    const {
        userList
    } = useMappedState(mapState);
    const tProps = {
        treeData: userList,
        treeCheckable: true,
        treeDefaultExpandAll: true,
        searchPlaceholder: '请选择人员'
    };
    const singleTProps = {
        treeData: userList,
        treeDefaultExpandAll: true,
        searchPlaceholder: '请选择人员'
    };
    useEffect(() => {
        setFieldsValue({
            attend: attender
        });
    }, [attender, setFieldsValue]);

    useEffect(() => {
        setFieldsValue({
            chairperson: chairPerson
        });
    }, [chairPerson, setFieldsValue]);

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
    useEffect(() => {
        props.propsSetAgendaForm(props.form, props.index - 1);
    });
    return (
        <section>
            <QueueAnim delay={200}>
                <CrowChildHeader key={1}>
                    <CrowChildTitle>第{props.index}议程</CrowChildTitle>
                    {
                        props.hasDelete ? <CrowChildOperate>
                            <Popconfirm title={`确定删除第${props.index}议程吗？`} onConfirm={props.deleteAction}>
                                <Button><Icon type="delete"/></Button>
                            </Popconfirm>
                        </CrowChildOperate> : null
                    }
                </CrowChildHeader>
                <FormAgenda>
                    <Form {...formItemLayout}>
                        <Form.Item label="主持人" key={2}>
                            {getFieldDecorator('chairperson', {
                                initialValue: props.data.chairperson || '',
                                rules: [{required: true, message: '请选择主持人'}],
                            })(
                                <TreeSelect onChange={(value: any): void => {
                                    if (value.indexOf(':d') === -1) {
                                        setChairPerson(value);
                                    } else {
                                        setChairPerson('');
                                    }
                                }} {...singleTProps}/>
                            )}
                        </Form.Item>
                        <Form.Item label="参会人员" key={3}>
                            {getFieldDecorator('attend', {
                                initialValue: props.data.attender || [],
                                rules: [{required: true, message: '请选择参会人员'}],
                            })(
                                <TreeSelect onChange={(value: any, label: any, extra: any): void => {
                                    const newData = value.filter((item: string) => {
                                        return item.indexOf(':d') === -1;
                                    });
                                    setAttender(newData);
                                }} {...tProps}/>
                            )}
                        </Form.Item>
                        <Form.Item label="议程时间" key={4}>
                            {getFieldDecorator('agenda_time', {
                                initialValue: props.data.time ? moment(props.data.time, "HH:mm") : null
                            })(
                                <TimePicker format={"HH:mm"} style={{width: '100%'}}/>,
                            )}
                        </Form.Item>
                        <Form.Item label="议程内容" key={5}>
                            {getFieldDecorator('description', {
                                initialValue: props.data.content || ''
                            })(
                                <TextArea rows={4}/>
                            )}
                        </Form.Item>
                    </Form>
                </FormAgenda>
            </QueueAnim>
        </section>
    );
}

const WrappedBaseAgendaForm = Form.create<BaseAgendaFormProps>({name: 'base_agenda_form'})(BaseAgendaForm);

export {
    WrappedBaseAgendaForm
};
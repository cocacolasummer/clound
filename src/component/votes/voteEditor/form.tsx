import React, {useState} from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Icon,
    Radio, TreeSelect
} from 'antd';
const {Option} = Select;
const {RangePicker} = DatePicker;
import {IState} from "@/store";

const mapState = (state: IState) => {
    return {
        userList: state.VoteEditor.userList
    };
};

import {
    ImgColumnar,
    ImgColumnarActive,
    ImgRadar,
    ImgRadarActive,
    ImgRing,
    ImgRingActive,
    ImgRows,
    ImgRowsActive
} from '@/assert/img/vote';
import {FormComponentProps} from "antd/lib/form";
import {useMappedState} from "redux-react-hook";

const VoteForm = (props: FormComponentProps) => {
    const {userList} = useMappedState(mapState);
    const {getFieldDecorator} = props.form;
    const [optionsKey, setOptionsKey] = useState<any[]>(['']);
    const [selectChartType, setSelectChartType] = useState(0);
    const formItemLayout: any = {
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
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 4},
            sm: {span: 16, offset: 6},
        },
    };

    const addOption = () => {
        const oldOptions = optionsKey.slice();
        oldOptions.push('');
        setOptionsKey(oldOptions);
    };

    const removeOption = (index: number) => {
        const oldOptions = optionsKey.slice();
        oldOptions.splice(index, 1);
        setOptionsKey(oldOptions);
    };

    const tProps = {
        treeData: userList,
        treeCheckable: true,
        searchPlaceholder: '请选择人员'
    };
    
    function disabledDate(current: any){
        const curDate = new Date();
        return current && current < new Date(curDate.getTime() - 24 * 60 * 6 * 1000).getTime();
    }
    const optionItems = optionsKey.map((item, index) => {
        return (
            <Form.Item label={index === 0 ? "投票选项" : ""}
                       wrapperCol={index !== 0 ? formItemLayoutWithOutLabel.wrapperCol : formItemLayout.wrapperCol}
                       key={index}>
                {getFieldDecorator(`options[${index}]`, {
                    rules: [{required: true, message: '请输入选项名称'}],
                })(
                    <Input
                        style={optionsKey.length > 1 ? {
                            width: 'calc(100% - 40px)'
                        } : undefined}
                        placeholder={"情输入选项名称"}/>
                )}
                {optionsKey.length > 1 ? (
                    <Button onClick={() => removeOption(index)}
                            style={{
                                marginLeft: '4px'
                            }}
                            icon={"delete"} shape="circle"/>
                ) : null}
            </Form.Item>
        );
    });

    return (
        <Form {...formItemLayout}>
            <Form.Item label={"投票主题"}>
                {getFieldDecorator('subject', {
                    rules: [{required: true, message: '请输入投票主题'}],
                })(
                    <Input
                        placeholder="请输入投票主题"
                    />,
                )}
            </Form.Item>
            <Form.Item label={"关联会议"}>
                {getFieldDecorator('meeting', {
                    initialValue: ""
                })(
                    <Select>
                        <Option value="">不关联会议</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="参与人员">
                {getFieldDecorator('attenders', {
                    rules: [{required: true, message: '请选择参与人员'}],
                })(
                    <TreeSelect {...tProps}/>
                )}
            </Form.Item>
            <Form.Item label="起止时间">
                {getFieldDecorator('startEndTime', {
                    rules: [{type: 'array', required: true, message: '请选择起止时间'}],
                })(
                    <RangePicker
                    disabledDate={disabledDate}
                    showTime={
                        {
                            minuteStep: 15,
                            secondStep: 10
                        }
                    }
                                 format="YYYY-MM-DD HH:mm"
                                 style={{width: '100%'}}/>,
                )}
            </Form.Item>
            {optionItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" style={{width: '100%'}}
                        onClick={() => addOption()}
                >
                    <Icon type="plus"/>添加投票选项
                </Button>
            </Form.Item>
            <Form.Item label="选项数">
                {getFieldDecorator('selectCount', {
                    initialValue: 1,
                    rules: [{required: true, message: '请选择选项数'}],
                })(
                    <Select>
                        {
                            optionsKey.map((item, index) => {
                                return (
                                    <Option value={index + 1} key={index}>{index + 1}项</Option>
                                );
                            })
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="选项数">
                {getFieldDecorator('anonymous', {
                    initialValue: 1
                })(
                    <Radio.Group>
                        <Radio value={0}>不匿名</Radio>
                        <Radio value={1}>匿名</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label="统计图表类型">
                {getFieldDecorator('statisticalGraph', {
                    initialValue: 1,
                    rules: [{required: true, message: '请选择图表'}],
                })(
                    <Radio.Group onChange={(e) => setSelectChartType(parseInt(e.target.value))}>
                        <Radio value={1}>环形图<img src={selectChartType == 1 ? ImgRingActive : ImgRing} style={{
                            display: 'block',
                            marginLeft: 'calc(50% - 20px)',
                            width: '40px',
                            height: '40px'
                        }} alt={'环图'}/></Radio>
                        <Radio value={2}>柱形图<img src={selectChartType == 2 ? ImgColumnarActive : ImgColumnar} style={{
                            display: 'block',
                            marginLeft: 'calc(50% - 20px)',
                            width: '40px',
                            height: '40px'
                        }} alt={'柱图'}/></Radio>
                        <Radio value={3}>条形图<img src={selectChartType == 3 ? ImgRowsActive : ImgRows} style={{
                            display: 'block',
                            marginLeft: 'calc(50% - 20px)',
                            width: '40px',
                            height: '40px'
                        }} alt={'条图'}/></Radio>
                        <Radio value={4}>雷达图<img src={selectChartType == 4 ? ImgRadarActive : ImgRadar} style={{
                            display: 'block',
                            marginLeft: 'calc(50% - 20px)',
                            width: '40px',
                            height: '40px'
                        }} alt={'雷达图'}/></Radio>
                    </Radio.Group>
                )}
            </Form.Item>
        </Form>
    );
};

const WrappedVoteForm = Form.create<FormComponentProps>()(VoteForm);

export {
    WrappedVoteForm
};

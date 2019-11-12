import React, {useEffect, useState} from 'react';
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface ClassifyFormProps extends FormComponentProps {
    setForm: (form: WrappedFormUtils) => void;
}

const ClassifyForm: React.ComponentType<ClassifyFormProps> = (props: ClassifyFormProps) => {
    const {getFieldDecorator} = props.form;
    const [typeKey, setTypeKey] = useState<any[]>(['']);
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
        props.setForm(props.form);
    }, [props]);
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 4},
            sm: {span: 16, offset: 6},
        },
    };

    const addClassify = (): void => {
        const oldtypes = typeKey.slice();
        oldtypes.push('');
        setTypeKey(oldtypes);
    };

    const removeClassify = (index: number): void => {
        const oldtypes = typeKey.slice();
        oldtypes.splice(index, 1);
        setTypeKey(oldtypes);
    };

    const optionItems = typeKey.map((item, index) => {
        return (
            <Form.Item label={"分类名称"}
                       wrapperCol={formItemLayout.wrapperCol}
                       key={index}>
                {getFieldDecorator(`options[${index}]`, {
                    rules: [{required: true, message: '请输入分类名称'}],
                })(
                    <Input
                        style={typeKey.length > 1 ? {
                            width: 'calc(100% - 40px)'
                        } : undefined}
                        placeholder={"请输入分类名称"}/>
                )}
                {typeKey.length > 1 ? (
                    <Button onClick={() => removeClassify(index)}
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
            {optionItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" style={{width: '100%'}}
                        onClick={(): void => addClassify()}
                >
                    <Icon type="plus"/>添加投票选项
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedClassifyForm = Form.create<ClassifyFormProps>()(ClassifyForm);

export {
    WrappedClassifyForm
};

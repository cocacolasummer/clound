import React, {Fragment, useRef, useState, useEffect} from 'react';
import {CSSTransition} from "react-transition-group";
import {useDispatch, useMappedState} from "redux-react-hook";

import {
    CrowWrapper,
    RightCrow,
    CrowHeader,
    CrowTitle,
    CrowClose,
    CrowFooter,
    CrowContent
} from '@/baseUI/Crow';
import {Button, Spin} from "antd";

import {WrappedAccessGroupForm} from './form';
import AccessServices from '@/services/accessServices';
import {error, success} from "@/util/golbalModalMessage";
import {SavingWrapper} from "@/baseUI/SavingWrapper";
import { IState } from '@/store';
import { ListObjects } from '@/store/access/groupList';
const _accessService = new AccessServices();

interface AccessGroupEditorProps {
    show: boolean;
    close: () => void;
    unmount: () => void;
}

const mapState = (state: IState): {
    list: ListObjects[] | undefined;
    listLimit: number;
    selectRows: string[];
    listtotal: number;
    listSearch: any;
    editorType: string;
    groupId: any;
} => {
    return {
        list: state.AccessGroup.list,
        listLimit: state.AccessGroup.limit,
        selectRows: state.AccessGroup.selectRows,
        listtotal: state.AccessGroup.total,
        listSearch: state.AccessGroup.search,
        editorType: state.AccessGroupEditor.editorType,
        groupId: state.AccessGroupEditor.groupId
    };
};
const AccessGroupEditor: React.ComponentType<AccessGroupEditorProps> = (props: AccessGroupEditorProps) => {
    const formRef: any = useRef();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        listSearch,
        listLimit,
        editorType,
        groupId
    } = useMappedState(mapState);

    useEffect(() => {
        if (editorType === 'edit') {
            _accessService.deviceGroupDetail({id: groupId}, (res: any) => {
                console.log(res);
                dispatch({
                    type: 'change accessGroupEditor defaultvalues',
                    data: res.data
                });
               
            }, () => {
               
            });
        }else{
            dispatch({
                type: 'change accessGroupEditor defaultvalues',
                data: '',
            });
        }
    }, [dispatch, groupId, editorType]);

    const saveGroup = () => {
        const form = formRef.current.getForm();
        form.validateFields((errs: any, values: any) => {
            if(!errs) {
                console.log('Received values of form: ', values);
                _accessService.AdddeviceGroup({
                    id: groupId,
                    name: values.name,
                    snap: values.isSnapshot,
                    coverPath: values.coverimage ? `/meetingcloud/remote.php/webdav/${values.coverimage[0].response}` : '',
                    logoPath: values.logoimage ? `/meetingcloud/remote.php/webdav/${values.logoimage[0].response}` : '',
                    description: values.description,
                }, (res: any) => {
                    success(editorType === 'edit' ? `修改设备组成功` : `添加设备组成功`);
                    setLoading(false);
                    props.close();
                    const _accessService1 = new AccessServices();
                    _accessService1.deviceGroupList({
                        page: 1,
                        pagesize: listLimit,
                        name: listSearch
                    }, (data: any) => {
                        dispatch({
                            type: 'change accessGroup list',
                            list: data.data.list,
                            page: 1,
                            total: data.data.count,
                            limit: listLimit
                        });
                    }, (err: any) => {
                        console.log(err);
                    });
                }, (err: any) => {
                    setLoading(false);
                    error(err && err.message ? err.message : err.toString());
                });
            }
        });
    };

    return (
        <Fragment>
            <CSSTransition
                in={props.show}
                timeout={1000}
                unmountOnExit
                appear={true}
                onExited={(): void => props.unmount()}
            >
                <CrowWrapper>
                {
                        loading ? <SavingWrapper>
                            <Spin tip={"正在执行数据同步...."} spinning={loading}/>
                        </SavingWrapper> : null
                    }
                    <Fragment>
                        <CSSTransition
                            in={props.show}
                            timeout={1000}
                            unmountOnExit
                            appear={true}
                        >
                            <RightCrow>
                                <CrowHeader>
                                    <CrowTitle>{editorType === 'edit' ? `修改设备组` : `添加设备组`}</CrowTitle>
                                    <CrowClose>
                                        <Button shape={"circle"} onClick={(): void => props.close()} icon={"close"}/>
                                    </CrowClose>
                                </CrowHeader>
                                <CrowContent>
                                    <WrappedAccessGroupForm ref={formRef}/>
                                </CrowContent>
                                <CrowFooter>
                                    <Button type={"primary"} onClick={() => {
                                        saveGroup();
                                    }}>{editorType === 'edit' ? `修改保存` : `添加保存`}</Button>
                                </CrowFooter>
                            </RightCrow>
                        </CSSTransition>
                    </Fragment>
                </CrowWrapper>
            </CSSTransition>
        </Fragment>
    );
};

export {
    AccessGroupEditor
};
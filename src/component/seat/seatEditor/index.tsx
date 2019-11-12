import React, {useEffect, useState, useRef} from 'react';
import {CanvasEditor} from './canvas';
import {Link, withRouter} from 'react-router-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import {Form, Input, Spin, Select, Radio, Switch, Button} from 'antd';
import QueueAnim from 'rc-queue-anim';

const {Option} = Select;
import SeatServices from '@/services/seatServices';

const _seatServices = new SeatServices();
import {getUrlParam} from '@/util/pathUtil';
import Viewer from 'viewerjs';

import {successModal, warningModal} from '@/util/golbalModalMessage';
import {
    ModelOne,
    ModelTwo,
    ModelThree,
    ModelFour,
    ModelFive,
    ChairSvg,
    DeskSvg,
    DeskRadiusSvg,
    DeskFillRadiusSvg,
    DeskCircleSvg,
    DeskCircleStrokeSvg
} from '@/assert/img/seat';

import {MODEL_ONE} from './example/model-one-json';
import {MODEL_TWO} from './example/model-two-json';
import {MODEL_THREE} from './example/model-three-json';
import {MODEL_FOUR} from './example/model-four-json';
import {MODEL_FIVE} from './example/model-five-json';

const ExampleImg: string[] = [ModelOne, ModelTwo, ModelThree, ModelFour, ModelFive];
const ExampleData = [MODEL_ONE, MODEL_TWO, MODEL_THREE, MODEL_FOUR, MODEL_FIVE];
const MaterialsSvg = [
    {
        title: '座位',
        url: ChairSvg,
        type: 'seat'
    },
    {
        title: '长桌',
        url: DeskSvg,
        type: 'desk'
    },
    {
        title: '长桌2',
        url: DeskRadiusSvg,
        type: 'desk'
    },
    {
        title: '长圆角桌',
        url: DeskFillRadiusSvg,
        type: 'desk'
    },
    {
        title: '圆桌',
        url: DeskCircleSvg,
        type: 'desk'
    },
    {
        title: '环形桌',
        url: DeskCircleStrokeSvg,
        type: 'desk'
    }
];

import 'viewerjs/dist/viewer.css';

import Base64ImgUtil from '@/util/base64ImgUtil';

const _base64ImgUtil = new Base64ImgUtil();

import UploadFileServices from '@/services/uploadFileServices';

const _uploadFileServices = new UploadFileServices();

import {
    UICol
} from '@/baseUI/Grid';

import {
    ThemeOrange,
    ThemeGreen
} from '@/baseUI/ButtonWrap';

import {
    ShowListTitle,
    ShowListHeader
} from '@/baseUI/BaseShowList';

import {
    ShowListItemOperate
} from '@/component/seat/seatList/ui';

import {
    SeatEditorWrapper,
    CanvasWrapper,
    SeatCanvasEditor,
    SeatEditorBg,
    SeatEditorContent,
    EditorToolBar,
    LeftItemContent,
    EditorOperate,
    LeftTabs,
    LeftTabsItem,
    LeftTabsItemPops,
    TabContent,
    ExampleModel,
    ExampleModelItem,
    ItemImage,
    ExampleModelItemTitle,
    ItemToolBar,
    LoadingWrapper
} from './ui';

const SeatEditorNotRouer = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [selectId, setSelectId] = useState();
    const [selectedTabs, setSelectedTabs] = useState(1);
    const [itemDisabled, setItemDisabled] = useState(true);
    const [measurement, setMeasurement] = useState('1920x1080');
    const [sortType, setSortType] = useState('normal');
    const [showName, setShowName] = useState(false);
    const [seatName, setSeatName] = useState('默认模板');
    const [itemName, setItemName] = useState();
    const [itemX, setItemX] = useState();
    const [itemY, setItemY] = useState();
    const [itemWidth, setItemWidth] = useState();
    const [itemHeight, setItemHeight] = useState();
    const [itemAngle, setItemAngle] = useState();
    const canvas: any = useRef();
    let viewer: Viewer | undefined;

    const getSortTypeInt = (sort: string) => {
        switch (sort) {
            case 'normal':
                return 0;
            case 'number':
                return 1;
            case 'char':
                return 2;
            default:
                return 0;
        }
    };

    const getSortTypeString = (num: string) => {
        switch (num) {
            case '0':
                return 'normal';
            case '1':
                return 'number';
            case '2':
                return 'char';
            default:
                return 'normal';
        }
    };

    const setItemProps = (target: any) => {
        if (target && (target.type === 'group')) {
            setItemDisabled(false);
            setItemName(target.getObjects('i-text')[0].text);
            setItemX(target.left);
            setItemY(target.top);
            setItemWidth(Math.round(target.width * target.scaleX));
            setItemHeight(Math.round(target.height * target.scaleY));
            setItemAngle(target.angle);
        } else {
            setItemDisabled(true);
        }
    };

    const itemPropsChange = (e: any, type: string) => {
        const value = !e.target.value ? 0 : e.target.value;
        const stringValue = !e.target.value ? ' ' : e.target.value;
        switch (type) {
            case 'name': {
                setItemName(stringValue);
                canvas.current.setItemProps({
                    name: stringValue
                });
                break;
            }
            case 'x': {
                setItemX(parseInt(value));
                canvas.current.setItemProps({
                    left: parseInt(value)
                });
                break;
            }
            case 'y': {
                setItemY(parseInt(value));
                canvas.current.setItemProps({
                    top: parseInt(value)
                });
                break;
            }
            case 'width': {
                setItemWidth(parseInt(value));
                canvas.current.setItemProps({
                    width: parseInt(value)
                });
                break;
            }
            case 'height': {
                setItemHeight(parseInt(value));
                canvas.current.setItemProps({
                    height: parseInt(value)
                });
                break;
            }
            case 'angle': {
                setItemAngle(parseInt(value));
                canvas.current.setItemProps({
                    angle: parseInt(value)
                });
                break;
            }
        }
    };

    const measurementChange = (e: any) => {
        const measurement = e.split('x');
        setMeasurement(e);
        canvas.current.setMeasurement(parseInt(measurement[0]), parseInt(measurement[1]));
    };

    const sortTypeChange = (e: any) => {
        setSortType(e.target.value);
        canvas.current.setSeatSortType(e.target.value);
    };

    const showNameChange = (e: any) => {
        setShowName(e);
        canvas.current.setSeatNameState(e);
    };

    const seatNameChange = (e: any) => {
        setSeatName(e.target.value);
    };

    const keyBoardEvent = (e: any) => {
        if (e.target.nodeName !== 'INPUT') {
            if (e.ctrlKey && e.keyCode === 67) {
                canvas.current.copySelection();
            }

            if (e.ctrlKey && e.keyCode === 86) {
                canvas.current.pasteSelection();
            }

            if (e.keyCode === 8) {
                canvas.current.deleteSelection();
                setItemDisabled(true);
            }
        }
    };

    useEffect(() => {
        canvas.current = new CanvasEditor('seatEditor');
        canvas.current.drawGrid('seatEditorBg', 'rgba(99, 99, 99, 0.1)', 20, 20);
        canvas.current.getItemProps(setItemProps);
        canvas.current.itemMoving(setItemProps);
        canvas.current.setItemDrop();
        document.addEventListener('keydown', keyBoardEvent);
        const id = getUrlParam(props.location.search, 'id');
        if (id) {
            setLoading(true);
            setSelectId(id);
            _seatServices.getSeat({
                id: id
            }, (res: any) => {
                console.log(res.data);
                setSeatName(res.data.seat_name);
                setMeasurement(res.data.seat_size);
                setShowName(Boolean(parseInt(res.data.show_number)));
                setSortType(getSortTypeString(res.data.order_type));
                canvas.current.loadJSON(res.data.content);
                setLoading(false);
            }, (err: any) => {
                console.log(err);
                setLoading(false);
            });
        }
        return () => {
            document.removeEventListener('keydown', keyBoardEvent);
        };
    }, [props.location.search]);

    const editorPreview = () => {
        const img = document.createElement('img');
        img.src = canvas.current.toData();
        img.alt = '预览模板';
        viewer && viewer.destroy();
        viewer = new Viewer(img);
        viewer.view();
    };

    const editorExport = () => {
        const a = document.createElement('a');
        const blob = _base64ImgUtil.getBlob(canvas.current.toData());
        a.href = URL.createObjectURL(blob);
        a.download = "seat.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const changeTabs = (index: number) => {
        setSelectedTabs(index);
    };

    const editorSave = () => {
        if (canvas.current.toLessJSON().objects.length < 1) {
            warningModal('警告', '请不要提交无内容的模板数据');
            return;
        }
        const imageData = new FormData();
        imageData.set('key', 'seat' + new Date().getTime());
        imageData.set('image', _base64ImgUtil.getBlob(canvas.current.toData()));
        setLoading(true);
        _uploadFileServices.uploadImage({
            data: imageData
        }, (res: any) => {
            if (selectId) {
                _seatServices.updateSeat({
                    id: selectId,
                    seatSize: measurement,
                    seatName: seatName,
                    isShow: showName,
                    orderType: getSortTypeInt(sortType),
                    content: JSON.stringify(canvas.current.toLessJSON()),
                    seatPic: res.data.url
                }, (res: any) => {
                    setLoading(false);
                    successModal('保存成功', '点击确定将回到列表页', () => {
                        props.history.push('/seat/');
                    });
                }, (err: any) => {
                    console.log(err);
                });
            } else {
                _seatServices.addSeat({
                    seatSize: measurement,
                    seatName: seatName,
                    isShow: showName,
                    orderType: getSortTypeInt(sortType),
                    content: JSON.stringify(canvas.current.toLessJSON()),
                    seatPic: res.data.url
                }, (res: any) => {
                    setLoading(false);
                    successModal('保存成功', '点击确定将回到列表页', () => {
                        props.history.push('/seat/');
                    });
                }, (err: any) => {
                    console.log(err);
                });
            }
        }, (err: any) => {
            console.log(err);
            setLoading(false);
        });
    };

    const tabsExample = (
        <ExampleModel>
            <QueueAnim delay={200}>
                {
                    ExampleImg.map((item, index) => {
                        return (
                            <ExampleModelItem key={index}
                                              onClick={() => {
                                                  canvas.current.loadJSON(ExampleData[index].content);
                                                  setShowName(ExampleData[index].isShow);
                                                  setSortType(ExampleData[index].sortType);
                                                  setMeasurement(ExampleData[index].seatSize);
                                                  const measurement = ExampleData[index].seatSize.split('x');
                                                  canvas.current.setMeasurement(parseInt(measurement[0]), parseInt(measurement[1]));
                                                  canvas.current.setSeatSortType(ExampleData[index].sortType);
                                                  canvas.current.setSeatNameState(ExampleData[index].isShow);
                                              }}
                            >
                                <ItemImage src={item}/>
                                <ExampleModelItemTitle>默认模板{index + 1}</ExampleModelItemTitle>
                            </ExampleModelItem>
                        );
                    })
                }
            </QueueAnim>
        </ExampleModel>
    );

    const tabsMaterials = (
        <ExampleModel>
            <QueueAnim delay={200}>
                {
                    MaterialsSvg.map((item, index) => {
                        return (
                            <ExampleModelItem key={index}
                                              onDragStart={(e) => {
                                                  e.dataTransfer.setData("img", item.url);
                                                  e.dataTransfer.setData("name", item.title);
                                                  e.dataTransfer.setData("type", item.type);
                                              }}
                                              onClick={(e) => {
                                                  canvas.current.drawSVGTextGroup(item.url, item.title, item.type);
                                              }}
                            >
                                <ItemImage src={item.url} draggable={true}/>
                                <ExampleModelItemTitle>{item.title}</ExampleModelItemTitle>
                            </ExampleModelItem>
                        );
                    })
                }
            </QueueAnim>
        </ExampleModel>
    );

    return (
        <SeatEditorWrapper>
            {
                loading ? <LoadingWrapper>
                    <Spin tip={"正在执行数据同步...."} spinning={loading}/>
                </LoadingWrapper> : null
            }
            <ShowListHeader>
                <ShowListTitle>{selectId ? '编辑坐席模板' : '新增坐席模板'}</ShowListTitle>
                <ShowListItemOperate>
                    <Button type={'primary'}><Link to={'/seat/'}>返回</Link></Button>
                </ShowListItemOperate>
            </ShowListHeader>
            <SeatEditorContent>
                <UICol span={4}>
                    <LeftItemContent>
                        <LeftTabs>
                            <LeftTabsItem type={selectedTabs === 1 ? 'active' : ''} onClick={() => changeTabs(1)}>
                                模 板
                            </LeftTabsItem>
                            <LeftTabsItem type={selectedTabs === 2 ? 'active' : ''} onClick={() => changeTabs(2)}>
                                素 材
                            </LeftTabsItem>
                            <LeftTabsItemPops index={selectedTabs}/>
                        </LeftTabs>
                        <TabContent>
                            <Scrollbars>
                                {
                                    selectedTabs === 1 ? tabsExample : tabsMaterials
                                }
                            </Scrollbars>
                        </TabContent>
                    </LeftItemContent>
                </UICol>
                <UICol span={20}>
                    <EditorToolBar>
                        <Form layout="inline">
                            <Form.Item label={"模板名称"}>
                                <Input
                                    placeholder="请输入模板名称"
                                    value={seatName}
                                    onInput={(e: any) => seatNameChange(e)}
                                />
                            </Form.Item>
                            <Form.Item label={"模板大小"}>
                                <Select defaultValue="1920x1080"
                                        value={measurement}
                                        onChange={(e: any) => measurementChange(e)}
                                        style={{width: 150}}>
                                    <Option value="1920x1080">1920x1080</Option>
                                    <Option value="1366x768">1366x768</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label={"名称显示"}>
                                <Switch checkedChildren="开"
                                        checked={showName}
                                        onChange={(e) => showNameChange(e)}
                                        unCheckedChildren="关"/>
                            </Form.Item>
                            <Form.Item label={"排序方式"}>
                                <Radio.Group defaultValue="normal"
                                             value={sortType}
                                             onChange={(e) => sortTypeChange(e)}
                                             buttonStyle="solid" size={"small"}>
                                    <Radio.Button value="normal">无</Radio.Button>
                                    <Radio.Button value="number">数字</Radio.Button>
                                    <Radio.Button value="char">字母</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </EditorToolBar>
                    <ItemToolBar>
                        <Form layout="inline">
                            <Form.Item label={"名称/编号"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemName}
                                    placeholder="请输入名称/编号"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'name')}
                                />
                            </Form.Item>
                            <Form.Item label={"X坐标"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemX}
                                    placeholder="请输入X坐标"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'x')}
                                />
                            </Form.Item>
                            <Form.Item label={"Y坐标"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemY}
                                    placeholder="请输入Y坐标"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'y')}
                                />
                            </Form.Item>
                            <Form.Item label={"高度"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemHeight}
                                    placeholder="请输入高度"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'height')}
                                />
                            </Form.Item>
                            <Form.Item label={"宽度"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemWidth}
                                    placeholder="请输入宽度"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'width')}
                                />
                            </Form.Item>
                            <Form.Item label={"旋转角度"}>
                                <Input
                                    style={{width: 150}}
                                    value={itemAngle}
                                    placeholder="请输入旋转角度"
                                    disabled={itemDisabled}
                                    onChange={(e) => itemPropsChange(e, 'angle')}
                                />
                            </Form.Item>
                        </Form>
                    </ItemToolBar>
                    <CanvasWrapper>
                        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                            <SeatEditorBg id="seatEditorBg" width="1920" height="1080">请使用支持HTML5的浏览器</SeatEditorBg>
                            <SeatCanvasEditor id="seatEditor" width="1920"
                                              height="1080">请使用支持HTML5的浏览器</SeatCanvasEditor>
                        </Scrollbars>
                    </CanvasWrapper>
                    <EditorOperate>
                        <ThemeOrange>
                            <Button onClick={() => editorExport()}>导出</Button>
                        </ThemeOrange>
                        <ThemeGreen>
                            <Button onClick={() => editorPreview()}>预览</Button>
                        </ThemeGreen>
                        <Button type="primary" onClick={() => editorSave()}>保存</Button>
                    </EditorOperate>
                </UICol>
            </SeatEditorContent>
        </SeatEditorWrapper>
    );
};

const SeatEditor = withRouter(SeatEditorNotRouer);
export {
    SeatEditor
};
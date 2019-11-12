import {fabric} from 'fabric';

interface ObjectProps {
    left?: number | undefined;
    top?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    angle?: number | undefined;
    name?: string | undefined;
}

class CanvasEditor {

    defaultProps: string[];
    canvas: fabric.Canvas;
    backgroundCanvas: fabric.StaticCanvas | undefined;
    seatNameShow: boolean;
    sortType: string;
    sortNumber: number;
    sortChar: string;
    randomSeatArr: fabric.Object[];
    width: number;
    height: number;
    private _showUserInfo: fabric.Object | undefined;
    private _backgroundRect: fabric.Rect | undefined;
    private _clipboard: fabric.Object | undefined;
    private _focusTarget: fabric.Object | undefined;
    private _userSelectSeat: fabric.Object | undefined;

    constructor(canvasElement: string | HTMLCanvasElement, canvasOpt?: fabric.ICanvasOptions, backgroundElement?: string | HTMLCanvasElement) {
        const canvasOptions: fabric.ICanvasOptions = canvasOpt || {};
        this.defaultProps = ['renderType', 'userId', 'id'];
        this.canvas = new fabric.Canvas(canvasElement, canvasOptions);
        this.seatNameShow = true;
        this.sortType = 'normal';
        this.sortNumber = 1;
        this.sortChar = 'A';
        this.randomSeatArr = [];
        this.width = 1920;
        this.height = 1080;
    }

    empty(v: any) {
        switch (typeof v) {
            case 'undefined' :
                return true;
            case 'string' :
                if (v.trim().length == 0) return true;
                break;
            case 'boolean' :
                if (!v) return true;
                break;
            case 'number' :
                if (0 === v) return false;
                break;
        }
        return false;
    }

    drawRect(x: number | undefined, y: number | undefined, width: number | undefined, height: number | undefined, angle: number | undefined, fillColor: string | fabric.Pattern | undefined) {
        const rect = new fabric.Rect({
            width: width, height: height, left: x, top: y, angle: angle,
            fill: fillColor
        });
        this.canvas.add(rect);
    }

    drawGrid(backGroundElement: string | HTMLCanvasElement, color: string | undefined, stepX: number, stepY: number) {
        this.backgroundCanvas = new fabric.StaticCanvas(backGroundElement);
        const [width, height] = [this.canvas.getWidth(), this.canvas.getHeight()];

        for (let i = 0; i <= width; i += stepX) {
            const lineX = new fabric.Line([i, 0, i, height], {
                fill: i % (stepX * 5) === 0 ? 'rgba(99, 99, 99, 0.5)' : color,
                stroke: i % (stepX * 5) === 0 ? 'rgba(99, 99, 99, 0.5)' : color,
                strokeWidth: 1
            });
            this.backgroundCanvas.add(lineX);
        }
        for (let j = 0; j <= height; j += stepY) {
            const lineY = new fabric.Line([0, j, width, j], {
                fill: j % (stepY * 5) === 0 ? 'rgba(0, 0, 0, 0.5)' : color,
                stroke: j % (stepY * 5) === 0 ? 'rgba(0, 0, 0, 0.5)' : color,
                strokeWidth: 1
            });
            this.backgroundCanvas.add(lineY);
        }
    }

    drawImg(imgUrl: string) {
        fabric.Image.fromURL(imgUrl, (img) => {
            const oImg = img.set({left: 0, top: 0});
            this.canvas.add(oImg);
        });
    }

    drawImgTextGroup(imgUrl: string, text: string) {
        fabric.Image.fromURL(imgUrl, (img) => {
            img.setCrossOrigin('anonymous');
            const oImg = img.set({left: 0, top: 0, fill: 'black'});
            const iText = new fabric.IText(text, {
                fill: '#D81B60',
                fontSize: 15
            });
            if (oImg && iText) {
                const [imgWidth, imgHeight] = [oImg.width, oImg.height];
                const [textWidth, textHeight] = [iText.width, iText.height];
                if (textWidth && imgWidth) {
                    iText.left = imgWidth / 2 - textWidth && textWidth / 2;
                }
                if (imgHeight && textHeight) {
                    iText.top = imgHeight / 2 - textHeight / 2;
                }
            }
            const group = new fabric.Group([oImg, iText], {
                left: 50,
                top: 50
            });
            this.canvas.add(group);
        });
    }

    drawSVGTextGroup(svgUrl: string, text: string, renderType: string, x?: number, y?: number) {
        fabric.loadSVGFromURL(svgUrl, (objects, options) => {
            const svg = fabric.util.groupSVGElements(objects, options);
            const {width, strokeWidth, height} = svg;
            const iText = new fabric.IText(text, {
                fill: '#000',
                fontSize: 15
            });
            const [textWidth, textHeight] = [iText.width, iText.height];
            if (renderType === 'seat') {
                switch (this.sortType) {
                    case "number":
                        iText.set('text', this.sortNumber + '');
                        this.sortNumber++;
                        break;
                    case "char":
                        iText.set('text', this.sortChar + this.sortNumber);
                        this.sortNumber++;
                        break;
                    default:
                        iText.set('text', ' ');
                }
            }

            if (renderType === 'seat' && this.seatNameShow) {
                iText.set('opacity', 1);
            } else if (renderType === 'seat' && !this.seatNameShow) {
                iText.set('opacity', 0);
            }
            if (width && (strokeWidth === 0 || strokeWidth) && height && textWidth && textHeight) {
                iText.left = (width + strokeWidth) / 2 - textWidth / 2;
                iText.top = (height + strokeWidth) / 2 - textHeight / 2;
            }
            const group = new fabric.Group([svg, iText]);
            const [groupWidth, groupHeight] = [group.width, group.height];
            if (x && y && groupWidth && groupHeight) {
                group.set({
                    left: x - groupWidth / 2 || 50,
                    top: y - groupHeight / 2 || 50
                });
            }
            const shadow: fabric.Shadow = new fabric.Shadow({
                offsetX: 3,
                offsetY: 3,
                blur: 2,
                color: 'rgba(0,0,0,0.4)'
            });
            group.setShadow(shadow);

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            group.set('renderType', renderType);
            this.canvas.add(group);
        });
    }

    toData() {
        const [width, height] = [this.canvas.getWidth(), this.canvas.getHeight()];
        const rect = new fabric.Rect({
            width: width, height: height, left: 0, top: 0, angle: 0,
            fill: '#fff'
        });
        this.canvas.add(rect);
        this._backgroundRect = rect;
        this.canvas.moveTo(rect, -2000);
        const dataURL = this.canvas.toDataURL({
            format: 'png',
        });
        this.canvas.remove(this._backgroundRect);
        return dataURL;
    }

    toSVG() {
        return this.canvas.toSVG();
    }

    toJSON() {
        return this.canvas.toDatalessJSON(this.defaultProps);
    }

    toLessJSON() {
        const objs: any = this.canvas.getObjects();
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].renderType === 'seat') {
                objs[i].set('id', i);
            }
        }
        this.canvas.renderAll();
        console.log(objs);
        return this.canvas.toDatalessJSON(this.defaultProps);
    }

    loadJSON(json: any, callback?: Function) {
        if (callback) {
            this.canvas.loadFromJSON(json, callback);
        } else {
            this.canvas.loadFromJSON(json, () => {
            });
        }
    }

    loadUserJSON(json: any, callback?: Function) {
        if (callback) {
            this.canvas.loadFromJSON(json, callback);
        } else {
            this.canvas.loadFromJSON(json, () => {
            });
        }
        const objs = this.canvas.getObjects();
        for (let i = 0; i < objs.length; i++) {
            const _obj: any = objs[i];
            if (_obj.userId) {
                const seatBg = _obj.getObjects('group')[0];
                const iText = _obj.getObjects('i-text')[0];
                iText.set({fill: '#fff'});
                seatBg.forEachObject((obj: fabric.Object) => {
                    obj.set({stroke: 'rgba(232, 120, 0, 1)'});

                    obj.setGradient('fill', {

                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        x1: 0,
                        y1: 0,
                        x2: obj.width,
                        y2: obj.height,
                        colorStops: {
                            0: 'rgba(255, 186, 0, 1)',
                            1: 'rgba(255, 123, 17, 1)'
                        }
                    });
                });
            }
        }
    }

    copySelection() {
        if (this.canvas.getActiveObject()) {
            this.canvas.getActiveObject().clone((cloned: fabric.Object) => {
                this._clipboard = cloned;
            }, this.defaultProps);
        }
    }

    pasteSelection() {
        if (!this._clipboard) {
            return;
        }
        this._clipboard.clone((clonedObj: any) => {
            this.canvas.discardActiveObject();
            const {left, top} = clonedObj;
            if (left && top) {
                clonedObj.set({
                    left: left + 10,
                    top: top + 10,
                    evented: true,
                });
            }
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = this.canvas;
                clonedObj.forEachObject((obj: any) => {
                    if (obj.renderType === 'seat') {
                        const textNode = obj.getObjects('i-text')[0];
                        const textWidth = textNode.width;
                        const textLeft = textNode.left;
                        if (this.sortType === 'char') {
                            textNode.set({'text': this.sortChar + this.sortNumber}).setCoords();
                        } else if (this.sortType === 'number') {
                            textNode.set({'text': '' + this.sortNumber}).setCoords();
                        } else {
                            textNode.set({'text': ' '}).setCoords();
                        }
                        textNode.set('left', textLeft + (textWidth - textNode.width) / 2).setCoords();
                        this.sortNumber++;
                    }
                    this.canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                if (clonedObj.renderType === 'seat') {
                    const textNode = clonedObj.getObjects('i-text')[0];
                    const textWidth = textNode.width;
                    const textLeft = textNode.left;
                    if (this.sortType === 'char') {
                        textNode.set({'text': this.sortChar + this.sortNumber}).setCoords();
                    } else if (this.sortType === 'number') {
                        textNode.set({'text': '' + this.sortNumber}).setCoords();
                    } else {
                        textNode.set({'text': ' '}).setCoords();
                    }

                    textNode.set('left', textLeft + (textWidth - textNode.width) / 2).setCoords();
                    this.sortNumber++;
                }
                this.canvas.add(clonedObj);
            }
            if (this._clipboard && this._clipboard.top && this._clipboard.left) {
                this._clipboard.top += 10;
                this._clipboard.left += 10;
            }
            this.canvas.setActiveObject(clonedObj);
            this.canvas.requestRenderAll();
        }, this.defaultProps);
    }

    deleteSelection() {
        const selection: any = this.canvas.getActiveObject();
        if (selection) {
            if (selection.type === 'activeSelection') {
                selection.forEachObject((obj: fabric.Object) => {
                    this.canvas.remove(obj);
                });
            } else {
                this.canvas.remove(selection);
            }
            this.sortNumber = 1;
            const objs = this.canvas.getObjects();
            if (this.sortType === 'number') {
                for (let i = 0; i < objs.length; i++) {
                    const _obj: any = objs[i];
                    if (_obj.renderType === 'seat') {
                        _obj.getObjects('i-text')[0].set('text', this.sortNumber + '').setCoords();
                        this.sortNumber++;
                    }
                }
            } else if (this.sortType === 'char') {
                for (let i = 0; i < objs.length; i++) {
                    const _obj: any = objs[i];
                    if (_obj.renderType === 'seat') {
                        _obj.getObjects('i-text')[0].set('text', this.sortChar + this.sortNumber).setCoords();
                        this.sortNumber++;
                    }
                }
            }
            this.canvas.discardActiveObject();
        }
    }

    getItemProps(callback: Function) {
        this.canvas.on('mouse:down', (e) => {
            this._focusTarget = e.target;
            callback(e.target);
        });
    }

    setItemProps(props: ObjectProps) {
        const _foucus: any = this._focusTarget;
        if (_foucus) {
            const textNode = _foucus.getObjects('i-text')[0];
            const textWidth = textNode.width;
            const textLeft = textNode.left;

            _foucus.animate('left', !this.empty(props.left) ? props.left : _foucus.left, {
                duration: 1,
                onChange: this.canvas.renderAll.bind(this.canvas),
                easing: fabric.util.ease['easeInOutSine']
            });
            _foucus.animate('top', !this.empty(props.top) ? props.top : _foucus.top, {
                duration: 1,
                onChange: this.canvas.renderAll.bind(this.canvas),
                easing: fabric.util.ease['easeInOutSine']
            });
            _foucus.animate('angle', !this.empty(props.angle) ? props.angle : _foucus.angle, {
                duration: 1,
                onChange: this.canvas.renderAll.bind(this.canvas),
                easing: fabric.util.ease['easeInOutSine']
            });
            _foucus.animate('scaleX', props.width && !this.empty(props.width) ? (props.width / _foucus.width) : _foucus.scaleX, {
                duration: 1,
                onChange: this.canvas.renderAll.bind(this.canvas),
                easing: fabric.util.ease['easeInOutSine']
            });
            _foucus.animate('scaleY', (props.height && !this.empty(props.height)) ? (props.height / _foucus.height) : _foucus.scaleY, {
                duration: 1,
                onChange: this.canvas.renderAll.bind(this.canvas),
                easing: fabric.util.ease['easeInOutSine']
            });
            textNode.set({'text': props.name ? props.name : textNode.text}).setCoords();
            textNode.set('left', textLeft - ((textNode.width - textWidth) / 2)).setCoords();
            this.canvas.requestRenderAll();
        }
    }

    setObjSelectFalse() {
        const objs = this.canvas.getObjects();
        for (let i = 0; i < objs.length; i++) {
            objs[i].set('selectable', false);
            this.canvas.requestRenderAll();
        }
    }

    seatHovering(getUserInfo: Function) {
        this.canvas.on('mouse:over', (e) => {
            const target: any = e.target;
            if (target && target.renderType === 'seat') {
                target.set({opacity: 0.8});
                this.canvas.hoverCursor = 'pointer';
                this.canvas.renderAll();

                if (target.userId) {
                    const info = getUserInfo(target.userId);
                    this.showSeatUserInfo(target, {
                        name: info.name,
                        avator: info.avator
                    });
                }
            }
        });
        this.canvas.on('mouse:move', (e) => {
            const target: any = e.target;
            if ((!target || target.renderType !== 'seat') && this._showUserInfo) {
                this.canvas.remove(this._showUserInfo);
            }
        });
        this.canvas.on('mouse:out', (e) => {
            const target: any = e.target;
            target && target.set({opacity: 1});
            this.canvas.renderAll();
            if (this._showUserInfo) {
                this.canvas.remove(this._showUserInfo);
            }
        });
    }

    showSeatUserInfo(target: fabric.Object, userInfo: { name: any; avator: any }) {
        const _userInfoObj: any = this._showUserInfo;
        if (_userInfoObj) {
            _userInfoObj.getObjects('image')[0].setSrc(userInfo.avator, (img: fabric.Image) => {
                this.canvas.add(_userInfoObj);
                img.scaleToWidth(40);
                img.scaleToHeight(40);
                img.set({
                    clipTo: (ctx: CanvasRenderingContext2D) => {
                        if (img.width) {
                            ctx.arc(0, 0, img.width / 2, 0, Math.PI * 2, true);
                        }
                    }
                });
                const text = _userInfoObj.getObjects('i-text')[0];
                const rect = _userInfoObj.getObjects('rect')[0];
                text.set({
                    text: userInfo.name
                });
                rect.set({
                    width: 40 + text.width + 30
                });
                if (this._showUserInfo && target && target.left && target.width &&
                    target.height && target.top) {
                    this._showUserInfo.set({
                        left: target.left - (rect.width - target.width) / 2,
                        top: target.top - target.height - 20,
                    });
                }

                this.canvas.requestRenderAll();
            });
        } else {
            fabric.Image.fromURL(userInfo.avator, (img) => {
                img.scaleToWidth(40);
                img.scaleToHeight(40);
                img.set({
                    left: 10,
                    top: 5,
                    clipTo: (ctx: CanvasRenderingContext2D) => {
                        if (img.width) {
                            ctx.arc(0, 0, img.width / 2, 0, Math.PI * 2, true);
                        }
                    }
                });
                const iText = new fabric.IText(userInfo.name, {
                    fill: '#868686',
                    fontSize: 15
                });
                if (iText.height && iText.width) {
                    iText.set({
                        left: 55,
                        top: (50 - iText.height) / 2
                    });
                    const rect = new fabric.Rect({
                        width: 40 + iText.width + 30,
                        height: 50,
                        left: 0,
                        top: 0,
                        angle: 0,
                        fill: '#fff'
                    });
                    const triangle = new fabric.Triangle({
                        top: 60,
                        left: rect.width && (rect.width / 2 + 5),
                        width: 10,
                        height: 10,
                        fill: '#fff',
                        angle: 180
                    });
                    if (target.left && rect.width && target.width && target.top && target.height) {
                        const group = new fabric.Group([rect, triangle, img, iText], {
                            left: target.left - (rect.width - target.width) / 2,
                            top: target.top - target.height - 20,
                            selectable: false
                        });
                        const shadow = new fabric.Shadow({
                            offsetX: 0,
                            offsetY: 0,
                            blur: 8,
                            color: 'rgba(0,0,0,0.4)'
                        });
                        group.setShadow(shadow);
                        this.canvas.add(group);
                        this._showUserInfo = group;
                    }
                }
            });
        }
    }

    itemMoving(callback: Function) {
        this.canvas.on('object:modified', (e: fabric.IEvent) => {
            const target: any = e.target;
            if (target) {
                const {angle} = target;
                let {left, top} = target;
                (left < 0) && (left = 0);
                (top < 0) && (top = 0);
                ((left + target.width) > this.width) && (left = (this.width - target.width));
                ((top + target.height) > this.height) && (top = (this.height - target.height));
                target.animate('left', Math.round(left / 20) * 20, {
                    duration: 1,
                    onChange: this.canvas.renderAll.bind(this.canvas),
                    onComplete: () => {
                        this._focusTarget && callback(this._focusTarget);
                    },
                    easing: fabric.util.ease['easeInOutSine']
                });
                target.animate('top', Math.round(top / 20) * 20, {
                    duration: 1,
                    onChange: this.canvas.renderAll.bind(this.canvas),
                    onComplete: () => {
                        this._focusTarget && callback(this._focusTarget);
                    },
                    easing: fabric.util.ease['easeInOutSine']
                });
                target.animate('angle', Math.round(angle), {
                    duration: 1,
                    onChange: this.canvas.renderAll.bind(this.canvas),
                    onComplete: () => {
                        this._focusTarget && callback(this._focusTarget);
                    },
                    easing: fabric.util.ease['easeInOutSine']
                });
                this._focusTarget && callback(this._focusTarget);
            }
        });
    }

    seatUserClick(id: any, callback: Function) {
        this.canvas.on('mouse:down', (e) => {
            const target: any = e.target;
            if (target && target.renderType === 'seat' && !target.userId) {
                if (this._userSelectSeat) {
                    const _selectSeat: any = this._userSelectSeat;
                    const seatBgOld = _selectSeat.getObjects('group')[0];
                    const itextOld = _selectSeat.getObjects('i-text')[0];
                    itextOld.set({fill: '#000'});
                    seatBgOld.forEachObject((obj: fabric.Object) => {
                        obj.set({stroke: 'rgba(147, 147, 147, 1)', fill: "#fff"});
                    });
                    _selectSeat.set({
                        'userSelect': false,
                        'userId': null,
                    });
                    this._userSelectSeat = undefined;
                    this.canvas.renderAll();
                }
                const seatBg = target.getObjects('group')[0];
                const itext = target.getObjects('i-text')[0];
                itext.set({fill: '#fff'});
                seatBg.forEachObject((obj: fabric.Object) => {
                    obj.set({stroke: 'rgba(20, 128, 233, 1)'});
                    obj.setGradient('fill', {

                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        //@ts-ignore
                        x1: 0,
                        y1: 0,
                        x2: obj.width,
                        y2: obj.height,
                        colorStops: {
                            0: 'rgba(143, 209, 255, 1)',
                            1: 'rgba(7, 153, 255, 1)'
                        }
                    });
                });
                target.set({
                    'userSelect': true,
                    'userId': id
                });
                callback(target.id);
                this._userSelectSeat = e.target;
                this.canvas.renderAll();
            }
        });
    }

    setMeasurement(width: number, height: number) {
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.width = width;
        this.height = height;
        this.canvas.renderAll();
        this.canvas.calcOffset();
        if (this.backgroundCanvas) {
            this.backgroundCanvas.setWidth(width + 1);
            this.backgroundCanvas.setHeight(height + 1);
            this.backgroundCanvas.renderAll();
            this.backgroundCanvas.calcOffset();
        }
        const items = this.canvas.getObjects();
        for (let i = 0; i < items.length; i++) {
            const _obj: fabric.Object = items[i];
            if (_obj && _obj.left && _obj.top && _obj.width && _obj.height) {
                if (_obj.left + _obj.width > width || _obj.top + _obj.height > height) {
                    this.canvas.remove(items[i]);
                }
            }
        }
        this.backgroundCanvas && this.backgroundCanvas.renderAll();
    }

    setSeatNameState(show: boolean) {
        this.seatNameShow = show;
        if (show) {
            const objs = this.canvas.getObjects();
            for (let i = 0; i < objs.length; i++) {
                const _obj: any = objs[i];
                if (_obj.renderType === 'seat') {
                    _obj.getObjects('i-text')[0].set('opacity', 1).setCoords();
                }
            }
        } else {
            const objs = this.canvas.getObjects();
            for (let i = 0; i < objs.length; i++) {
                const _obj: any = objs[i];
                if (_obj.renderType === 'seat') {
                    _obj.getObjects('i-text')[0].set('opacity', 0).setCoords();
                }
            }
        }
        this.canvas.requestRenderAll();
    }

    setSeatSortType(type: string) {
        this.sortType = type;
        this.sortNumber = 1;
        const objs = this.canvas.getObjects();
        if (this.sortType === 'number') {
            for (let i = 0; i < objs.length; i++) {
                const _obj: any = objs[i];
                if (_obj.renderType === 'seat') {
                    const left = _obj.getObjects('i-text')[0].left;
                    const width = _obj.getObjects('i-text')[0].width;
                    _obj.getObjects('i-text')[0].set('text', this.sortNumber + '').setCoords();
                    _obj.getObjects('i-text')[0].set('left', left - (width - _obj.getObjects('i-text')[0].width) / 2).setCoords();
                    this.sortNumber++;
                }
            }
        } else if (this.sortType === 'char') {
            for (let i = 0; i < objs.length; i++) {
                const _obj: any = objs[i];
                if (_obj.renderType === 'seat') {
                    const left = _obj.getObjects('i-text')[0].left;
                    const width = _obj.getObjects('i-text')[0].width;
                    _obj.getObjects('i-text')[0].set('text', this.sortChar + this.sortNumber);
                    _obj.getObjects('i-text')[0].set('left', left - (width - _obj.getObjects('i-text')[0].width) / 2).setCoords();
                    this.sortNumber++;
                }
            }
        } else {
            for (let i = 0; i < objs.length; i++) {
                const _obj: any = objs[i];
                if (_obj.renderType === 'seat') {
                    const left = _obj.getObjects('i-text')[0].left;
                    const width = _obj.getObjects('i-text')[0].width;
                    _obj.getObjects('i-text')[0].set('text', ' ').setCoords();
                    _obj.getObjects('i-text')[0].set('left', left - (width - _obj.getObjects('i-text')[0].width) / 2).setCoords();
                    this.sortNumber++;
                }
            }
        }
        this.canvas.requestRenderAll();
    }

    getSeatData() {
        const json = JSON.parse(this.toLessJSON());
        const seatArr = [];
        for (let i = 0; i < json.objects.length; i++) {
            if (json.objects[i].renderType === 'seat') {
                seatArr.push(json.objects[i]);
            }
        }
        return seatArr;
    }

    clearRandomSeat() {
        for (let i = 0; i < this.randomSeatArr.length; i++) {
            const _randomSeat: any = this.randomSeatArr[i];
            const seatBg = _randomSeat.getObjects('group')[0];
            const itext = _randomSeat.getObjects('i-text')[0];
            _randomSeat.set({
                'userSelected': false,
                'userId': null
            });
            itext.set({fill: '#000'});
            seatBg.forEachObject((obj: fabric.Object) => {
                obj.set({stroke: 'rgba(147, 147, 147, 1)', fill: "#fff"});
            });
        }
        this.randomSeatArr = [];
    }

    setRandomSeat(userList: {
        id: string;
        seatName: string;
    }[]) {
        this.clearRandomSeat();

        function range(min: number, max: number) {
            return function(n: number) {
                let i, value;
                const arr = [];
                for (i = 0; i < n; i++) {
                    value = Math.floor(Math.random() * (max - min + 1) + min);
                    if (arr.indexOf(value) < 0) {
                        arr.push(value);
                    } else {
                        i--;
                    }
                }
                return arr;
            };
        }

        const objs = this.canvas.getObjects();
        const noSelectedObjs = [];
        for (let i = 0; i < objs.length; i++) {
            const _obj: any = objs[i];
            if ((_obj.renderType === 'seat') && (!_obj.userSelected) && (!_obj.userId)) {
                noSelectedObjs.push(objs[i]);
            }
        }
        const rangRandom = range(0, noSelectedObjs.length - 1);
        const rangArr = rangRandom(userList.length);
        for (let i = 0; i < rangArr.length; i++) {
            this.randomSeatArr.push(noSelectedObjs[rangArr[i]]);
            const _selectObj: any = noSelectedObjs[rangArr[i]];
            const seatBg = _selectObj.getObjects('group')[0];
            const itext = _selectObj.getObjects('i-text')[0];
            _selectObj.set({
                'userSelected': true,
                'userId': userList[i].id
            });
            userList[i].seatName = itext.text;
            itext.set({fill: '#fff'});
            seatBg.forEachObject((obj: fabric.Object) => {
                obj.set({stroke: 'rgba(20, 128, 233, 1)'});
                obj.setGradient('fill', {

                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    //@ts-ignore
                    x1: 0,
                    y1: 0,
                    x2: obj.width,
                    y2: obj.height,
                    colorStops: {
                        0: 'rgba(143, 209, 255, 1)',
                        1: 'rgba(7, 153, 255, 1)'
                    }
                });
            });

        }
        this.canvas.requestRenderAll();
        return userList;
    }

    findSeatByUserId(id: string) {
        const objs = this.canvas.getObjects();
        for (let i = 0; i < objs.length; i++) {
            const _obj: any = objs[i];
            if (_obj.userId && _obj.userId == id) {
                return objs[i];
            }
        }
        return null;
    }

    setUserDrop(modifyUserList: (arg0: any, arg1: any) => void) {
        this.canvas.on('drop', (e: any) => {
            if (e.target && e.e.dataTransfer.getData('id')) {
                const history: any = this.findSeatByUserId(e.e.dataTransfer.getData('id'));
                if (history) {
                    const seatBg = history.getObjects('group')[0];
                    const itext = history.getObjects('i-text')[0];
                    history.set({
                        'userSelected': false,
                        'userId': null
                    });
                    itext.set({fill: '#000'});
                    seatBg.forEachObject((obj: fabric.Object) => {
                        obj.set({stroke: 'rgba(147, 147, 147, 1)', fill: "#fff"});
                    });
                }
                const seatBg = e.target.getObjects('group')[0];
                const itext = e.target.getObjects('i-text')[0];
                e.target.set({
                    'userSelected': true,
                    'userId': e.e.dataTransfer.getData('id')
                });
                itext.set({fill: '#fff'});
                seatBg.forEachObject((obj: fabric.Object) => {
                    obj.set({stroke: 'rgba(20, 128, 233, 1)'});
                    obj.setGradient('fill', {

                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        x1: 0,
                        y1: 0,
                        x2: obj.width,
                        y2: obj.height,
                        colorStops: {
                            0: 'rgba(143, 209, 255, 1)',
                            1: 'rgba(7, 153, 255, 1)'
                        }
                    });
                });
                modifyUserList(e.e.dataTransfer.getData('id'), itext.text);
            }
        });
    }

    setItemDrop() {
        this.canvas.on('drop', (e: any) => {
            this.drawSVGTextGroup(e.e.dataTransfer.getData('img'),
                e.e.dataTransfer.getData('name'),
                e.e.dataTransfer.getData('type'), e.e.layerX, e.e.layerY);
        });
    }

    reDraw() {
        this.canvas.requestRenderAll();
    }

}

export {
    CanvasEditor
};

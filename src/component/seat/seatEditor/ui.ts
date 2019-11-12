import styled, {css} from "styled-components";
import {UIGrid} from '@/baseUI/Grid';

const SeatEditorWrapper = styled.div`
width: 100%;
height: 100%;
`;

const CanvasWrapper = styled.div`
width: 100%;
height: calc(100% - 150px);
position: relative;
`;

interface CanvasProps {
    id: string;
    width: string;
    height: string;
}

const SeatEditorBg = styled.canvas.attrs((props: CanvasProps) => ({
    id: props.id,
    width: props.width,
    height: props.height
}))`
position: absolute;
left: 0;
top: 0;
`;

const SeatCanvasEditor = styled.canvas.attrs((props: CanvasProps) => ({
    id: props.id,
    width: props.width,
    height: props.height
}))`
position: absolute;
left: 0;
top: 0;
`;

const SeatEditorContent = styled(UIGrid)`
width: 100%;
height: calc(100% - 50px);
background-color: #fff;
`;

const EditorToolBar = styled.section`
width: 100%;
height: 50px;
padding: 5px 20px 0;
border-bottom: 1px solid #dae1e4;
`;

const LeftItemContent = styled.aside`
border-right: 1px solid #dae1e4;
height: 100%;
width: 100%;
`;

const EditorOperate = styled.section`
height: 50px;
width: 100%;
border-top: 1px solid #dae1e4;
line-height: 50px;
text-align: center;
`;

const LeftTabs = styled.ul`
display: flex;
list-style: none;
height: 50px;
border-bottom: 1px solid #dae1e4;
position: relative;
padding: 0;
margin: 0;
`;

interface LeftTabsItemProps {
    type?: string;
}

const LeftTabsItem = styled.li`
width: 50%;
position: relative;
text-align: center;
line-height: 50px;
font-size: 14px;
cursor: pointer;
transition: color 0.3s ease-in;
&:hover {
  color: #1890ff;
  cursor: pointer;
}
${
    (props: LeftTabsItemProps) => {
        if (props.type === 'active') {
            return css`
              color: #1890ff;
            `;
        }
        return '';
    }
}
`;

interface LeftTabsItemPopsProps {
    index: number;
}

const LeftTabsItemPops = styled.span`
display: inline-block;
width: 50%;
height: 2px;
background-color: #1890ff;
position: absolute;
bottom: 0;
left: 0;
transition: left 0.3s ease-in;
${
    (props: LeftTabsItemPopsProps) => {
        return css`left: calc(${props.index - 1} * 50%)`;
    }
}
`;

const ItemToolBar = styled.div`
height: 50px;
width: 100%;
border-bottom: 1px solid #dae1e4;
padding: 5px 20px 0;
`;

const TabContent = styled.div`
height: calc(100% - 50px);
`;

const ExampleModel = styled.ul`
list-style: none;
padding: 20px;
margin: 0;
`;

const ExampleModelItem = styled.li`
border: 1px solid #dae1e4;
border-radius: 5px;
overflow: hidden;
margin-bottom: 20px;
cursor: pointer;
transition: box-shadow .4s ease-in;
&:hover {
  box-shadow: 0 0 4px 1px #333;
}
`;

const ItemImage = styled.img.attrs((props) => ({
    src: props.src
}))`
display: block;
width: 100%;
`;

const ExampleModelItemTitle = styled.h5`
height: 30px;
line-height: 30px;
border-top: 1px solid #dae1e4;
font-size: 14px;
text-align: center;
font-weight: normal;
`;

const LoadingWrapper = styled.aside`
position: absolute;
left: 0;
top: 0;
text-align: center;
padding-top: 200px;
width: 100%;
height: 100%;
z-index: 1000;
background-color: rgba(255, 255, 255, 0.6);
`;

export {
    SeatEditorWrapper,
    CanvasWrapper,
    SeatEditorBg,
    SeatCanvasEditor,
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
};
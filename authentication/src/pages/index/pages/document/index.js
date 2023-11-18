import './index.css';

import { ReactComponent as AlignLeft } from '../../../../svgs/align_left.svg';
import { ReactComponent as AlignCenter } from '../../../../svgs/align_center.svg';
import { ReactComponent as AlignRight } from '../../../../svgs/align_right.svg';
import { ReactComponent as AlignJustify } from '../../../../svgs/align_justify.svg';

import { ReactComponent as SuperScript } from '../../../../svgs/superscript.svg';
import { ReactComponent as SubScript } from '../../../../svgs/subscript.svg';

import { ReactComponent as Highlight } from '../../../../svgs/highlight.svg';

import { ReactComponent as ClearStyle } from '../../../../svgs/clear_text_style.svg';

import { ReactComponent as UnorderedList } from '../../../../svgs/unordered_list.svg';
import { ReactComponent as OrderedList } from '../../../../svgs/ordered_list.svg';

import { LoadingContainer, LoadingFailedContainer } from '../../../../components/loading';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { TextInput } from '../../../../components/input';

import { useNavigate, useParams } from 'react-router-dom';

const globalFonts = [
    'Arial',
    'Arial Black',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Impact',
    'Gill Sans',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Palatino',
    'Baskerville',
    'Courier',
    'Comic Sans MS',
];

const defaultTextStyle = {
    color: '#ffffff',
    fontSize: 16,
};


const DocumentSelectionContext = createContext();
const StyleSelectionContext = createContext();
const DocumentContext = createContext();


const sectionsContent = [
    {
        name: 'File',
        Content: () => {
            const [documentName, setDocumentName] = useContext(DocumentContext);
            return (
                <>
                    <TextInput type='text' value={documentName} onChange={(e) => {
                        setDocumentName(e.target.value);
                    }} />
                </>
            );
        },
    },
    {
        name: 'Home',
        Content: () => {
            const styleSelection = useContext(StyleSelectionContext);
            const [documentSelection, setDocumentSelection] = useContext(DocumentSelectionContext);
            const [colorInput, setColorInput] = useState('#ffffff');
            const [fontSizeInput, setFontSizeInput] = useState(16);
            return (
                <>
                    <PanelSearchDropdown id='font_family_input' options={globalFonts.map((font, i) => {
                        return (
                            <option key={i} value={font} style={{ fontFamily: font }} className='select_option'>
                                {font}
                            </option>
                        );
                    })} onInput={(e) => {
                        const font = e.target.value;
                        e.target.style.fontFamily = font;
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.fontFamily = font;
                        });
                    }} />
                    <input type='number' id='font_size_input' className='text_input' value={fontSizeInput} onInput={(e) => {
                        const fontSize = Number(e.target.value);
                        setFontSizeInput(fontSize);
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.fontSize = fontSize;
                        });
                    }} />
                    <PanelButton onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.fontSize = (segment.textStyle.fontSize || 0) + 1;
                        });
                    }}>
                        A
                    </PanelButton>
                    <PanelButton onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.fontSize = Math.max((segment.textStyle.fontSize || 0) - 1, 1);
                        });
                    }}>
                        a
                    </PanelButton>
                    <PanelButton style={{ fontWeight: 800 }} onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            if (segment.textStyle.fontWeight) {
                                delete segment.textStyle.fontWeight;
                            } else {
                                segment.textStyle.fontWeight = 800;
                            }
                        });
                    }}>
                        B
                    </PanelButton>
                    <PanelButton style={{ fontStyle: 'italic' }} onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            if (segment.textStyle.fontStyle) {
                                delete segment.textStyle.fontStyle;
                            } else {
                                segment.textStyle.fontStyle = 'italic';
                            }
                        });
                    }}>
                        I
                    </PanelButton>
                    <PanelButton style={{ textDecoration: '1px underline' }} onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            if (segment.textStyle.textDecoration) {
                                delete segment.textStyle.textDecoration;
                            } else {
                                segment.textStyle.textDecoration = '1px underline';
                            }
                        });
                    }}>
                        U
                    </PanelButton>
                    <div className='panel_button' style={{ position: 'relative' }}>
                        <input style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0' }} type='color' onChange={(e) => {
                            setColorInput(e.target.value);
                            styleSelection(documentSelection, (segment) => {
                                segment.textStyle.color = e.target.value;
                            });
                        }} />
                        <div style={{ textDecoration: `2px ${colorInput} underline` }}>
                            A
                        </div>
                    </div>
                    <PanelButton className='highlight_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.backgroundColor = e.target.value;
                        });
                    }}>
                        <Highlight />
                    </PanelButton>
                    <PanelButton className='clear_style_button' onClick={(e) => {
                        //superscript
                    }}>
                        <SuperScript />
                    </PanelButton>
                    <PanelButton className='clear_style_button' onClick={(e) => {
                        //subscript
                    }}>
                        <SubScript />
                    </PanelButton>
                    <PanelButton className='clear_style_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle = copyObject(defaultTextStyle);
                        });
                    }}>
                        <ClearStyle />
                    </PanelButton>
                    <PanelButton className='align_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.textAlign = 'left';
                        });
                    }}>
                        <AlignLeft />
                    </PanelButton>
                    <PanelButton className='align_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.textAlign = 'center';
                        });
                    }}>
                        <AlignCenter />
                    </PanelButton>
                    <PanelButton className='align_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.textAlign = 'right';
                        });
                    }}>
                        <AlignRight />
                    </PanelButton>
                    <PanelButton className='align_button' onClick={(e) => {
                        styleSelection(documentSelection, (segment) => {
                            segment.textStyle.textAlign = 'justify';
                        });
                    }}>
                        <AlignJustify />
                    </PanelButton>
                    <PanelButton className='list_button' onClick={(e) => {
                        //create unordered list (bullet points)
                    }}>
                        <UnorderedList />
                    </PanelButton>
                    <PanelButton className='list_button' onClick={(e) => {
                        //create ordered list (1, 2, 3, etc.)
                    }}>
                        <OrderedList />
                    </PanelButton>
                </>
            );
        },
    },
    {
        name: 'Text',
        Content: () => {
            return (
                <>

                </>
            );
        },
    },
    {
        name: 'Insert',
        Content: () => {
            return (
                <>

                </>
            );
        },
    },
    {
        name: 'Setup',
        Content: () => {
            return (
                <>

                </>
            );
        },
    },
];




/*
these functions below create ✨RICH TEXT✨
style text HOWEVER you want with css
EFFORTLESSLY
ELEGANTLY
MAJESTICALLY
*/
function createRichText(segments, selection, selectStartRef, selectEndRef) {
    const res = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        let ref;
        if (selection.type === 'Caret') {
            if (i === selection.startIndex) {
                ref = selectStartRef;
            }
        } else if (selection.type === 'Range') {
            if (i === selection.startIndex) {
                ref = selectStartRef;
            } else if (i === selection.endIndex) {
                ref = selectEndRef;
            }
        }
        res.push((
            <span key={i} data-text-id={i} style={Object.assign({}, { ...segment.textStyle, ...segment.editStyle })} ref={ref}>
                {segment.text}
            </span>
        ));
    }
    return res;
}

function getSegmentAtIndex(segments, index) {
    let total = 0;
    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const newTotal = total + seg.text.length;
        if (newTotal > index) {
            return [seg, total];
        }
        total = newTotal;
    }
}

function clearEmptySegments(segments) {
    if (segments.length > 1) {
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            if (seg.text === '') {
                segments.splice(i, 1);
                i -= 1;
            }
        }
    }
}

function styleMatches(styleA, styleB) {
    if (Object.keys(styleA).length !== Object.keys(styleB).length) {
        return false;
    }
    for (const [i, v] of Object.entries(styleA)) {
        if ((i in styleB) === false) {
            return false;
        }
        if (v !== styleB[i]) {
            return false;
        }
    }
    return true;
}

function mergeIdenticalSegments(segments) {
    if (segments.length > 1) {
        let lastSeg = segments[0];
        for (let i = 1; i < segments.length; i++) {
            const seg = segments[i];
            if (styleMatches(lastSeg.textStyle, seg.textStyle)) {
                lastSeg.text += seg.text;
                segments.splice(i, 1);
                i -= 1;
            }
            lastSeg = seg;
        }
    }
}

function getAffectedSegments(segments, offset, length) {
    const affectedSegments = [];
    let total = 0;
    let startInd;
    let endInd;
    for (let i = 0; i < segments.length; i++) {
        const curSegment = segments[i];
        const newTotal = total + curSegment.text.length;
        if (total < offset + length && newTotal > offset) {
            affectedSegments.push(curSegment);
            if (startInd === undefined) {
                startInd = i;
            }
            endInd = i;
        }
        total = newTotal;
    }
    return [affectedSegments, startInd, endInd];
}

function separateRichTextSegments(segments, offset, length, pushNew) {
    const newSegments = [];
    const affectedSegments = [];
    let total = 0;
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const segText = segment.text;
        const newTotal = total + segText.length;
        let newTexts = [];
        const notFirst = i > 0;
        const notLast = i < segments.length - 1;
        const pushText = (textData) => {
            if (textData.isNew === false || pushNew) {
                newTexts.push(textData);
            }
        }
        if (notFirst) {
            if (notLast) {
                //middle segments
                pushText({
                    isNew: true,
                    text: segText,
                });
            } else {
                //last segment
                pushText({
                    isNew: true,
                    text: segText.substring(0, (offset + length) - total),
                });
                pushText({
                    isNew: false,
                    text: segText.substring((offset + length) - total, segText.length),
                });
            }
        } else {
            if (notLast) {
                //first segment
                pushText({
                    isNew: false,
                    text: segText.substring(0, offset),
                });
                pushText({
                    isNew: true,
                    text: segText.substring(offset, segText.length),
                });
            } else {
                //inside (only 1 element)
                pushText({
                    isNew: false,
                    text: segText.substring(0, offset),
                });
                pushText({
                    isNew: true,
                    text: segText.substring(offset, offset + length),
                });
                pushText({
                    isNew: false,
                    text: segText.substring(offset + length, segText.length),
                });
            }
        }
        const replaceTexts = [];
        for (let j = 0; j < newTexts.length; j++) {
            const newText = newTexts[j];
            const newSeg = {
                textStyle: Object.assign({}, segment.textStyle),
                editStyle: Object.assign({}, segment.editStyle),
                text: newText.text,
            };
            if (newText.isNew) {
                affectedSegments.push(newSeg);
            }
            replaceTexts.push(newSeg);
        }
        newSegments.push(replaceTexts);
        total = newTotal;
    }
    return [newSegments, affectedSegments];
}

function getOffsetFromStart(segments, endInd) {
    let total = 0;
    for (let i = 0; i < endInd; i++) {
        total += segments[i].text.length;
    }
    return total;
}

const getTextId = (node) => {
    let par;
    if (node.nodeName === '#text') {
        par = node.parentElement;
    } else {
        par = node;
    }
    return Number(par.dataset.textId);
}

//"backward" selections break the algorithms so make it absolute (pain)
function getAbsoluteSelection(segments, selection) {
    let startOffset;
    let endOffset;
    //yk selection index is from the element that was selected not all of the spans so we need to get the total
    if (selection.startIndex === selection.endIndex) {
        //same text node
        const isForward = selection.startOffset < selection.endOffset;
        startOffset = Math.min(selection.startOffset, selection.endOffset);
        startOffset += getOffsetFromStart(segments, isForward ? selection.endIndex : selection.startIndex);
        endOffset = Math.max(selection.startOffset, selection.endOffset);
        endOffset += getOffsetFromStart(segments, isForward ? selection.startIndex : selection.endIndex);
    } else {
        //NOT same text node
        if (selection.startIndex < selection.endIndex) {
            //normal, non-psychopathic sane selection
            startOffset = selection.startOffset;
            startOffset += getOffsetFromStart(segments, selection.startIndex);
            endOffset = selection.endOffset;
            endOffset += getOffsetFromStart(segments, selection.endIndex);
        } else {
            //backwards psychopathic insane selection
            startOffset = selection.endOffset;
            startOffset += getOffsetFromStart(segments, selection.endIndex);
            endOffset = selection.startOffset;
            endOffset += getOffsetFromStart(segments, selection.startIndex);
        }
    }

    return [startOffset, endOffset];
}

function separateRichText(segments, selection, pushNew) {
    const [absStart, absEnd] = getAbsoluteSelection(segments, selection);
    const length = absEnd - absStart;
    const [affectedSegments, startInd, endInd] = getAffectedSegments(segments, absStart, length);
    const [newSegments, newAffectedSegments] = separateRichTextSegments(affectedSegments, absStart - getOffsetFromStart(segments, startInd), length, pushNew);
    const itAmount = endInd - startInd;
    let curInd = 0;
    for (let segInd = 0; segInd <= itAmount; segInd++) {
        segments.splice(startInd + curInd, 1, ...newSegments[segInd]);
        curInd += newSegments[segInd].length;
    }
    clearEmptySegments(segments);
    return [absStart, newAffectedSegments];
}

/*
end of ✨RICH TEXT✨
*/



//silly react prevents me from modifying react objects now i gotta copy da whole thing
function copyObject(obj, deep) {
    let res;
    if (Array.isArray(obj)) {
        if (deep) {
            res = [];
            for (let i = 0; i < obj.length; i++) {
                const val = obj[i];
                if (typeof (val) === 'object') {
                    res.push(copyObject(val, deep));
                } else {
                    res.push(val);
                }
            }
        } else {
            res = [...obj];
        }
    } else {
        if (deep) {
            res = {};
            for (const [i, val] of Object.entries(obj)) {
                if (typeof (val) === 'object') {
                    res[i] = copyObject(val, deep);
                } else {
                    res[i] = val;
                }
            }
        } else {
            res = Object.assign({}, obj);
        }
    }
    return res;
}



function editContentToSendContent(content) {
    const sendContent = [];
    for (let i = 0; i < content.length; i++) {
        const origSeg = content[i];
        const seg = copyObject(origSeg, true);
        delete seg.editStyle;
        sendContent.push(seg);
    }
    return sendContent;
}





function PanelSearchDropdown({ id, options, onInput, ...props }) {
    return (
        <select id={id} className='panel_search_dropdown text_input' onChange={onInput}>
            {options}
        </select>
    );
}

function PanelButton({ style, className, onClick, children, ...props }) {
    return (
        <button className={(className ? className + ' ' : '') + 'panel_button button'} style={style} onClick={onClick}>
            {children}
        </button>
    );
}

function Panel({ selectedSectionName, setSelectedName, ...props }) {
    let selectedSection;
    let selectedSectionInd;
    for (let i = 0; i < sectionsContent.length; i++) {
        const section = sectionsContent[i];
        if (section.name === selectedSectionName) {
            selectedSection = section;
            selectedSectionInd = i;
            break;
        }
    }
    const Content = selectedSection.Content;
    return (
        <div id='panel'>
            <div id='panel_section_buttons'>
                <div id='panel_section_highlight' style={{ '--button-index': selectedSectionInd }}></div>
                {sectionsContent.map((section) => {
                    return (
                        <button key={section.name} className='panel_section_button button' onClick={(e) => {
                            setSelectedName(section.name);
                        }}>
                            {section.name}
                        </button>
                    );
                })}
            </div>
            <div id='panel_content'>
                <Content />
            </div>
        </div>
    );
}

function parseSavedContent(content) {
    const newContent = [];
    for (let i = 0; i < content.length; i++) {
        const origSeg = content[i];
        const newSeg = Object.assign({}, origSeg);
        newSeg.editStyle = {};
        newContent.push(newSeg);
    }
    return newContent;
}

export function DocumentEditor({ isNew, initDocument, ...props }) {
    const navigate = useNavigate();

    const [isDocumentCreated, setIsDocumentCreated] = useState(isNew === false);

    const [docId, setDocId] = useState(isNew ? undefined : props.docId);

    const pageRef = useRef();

    const [documentSelection, setDocumentSelection] = useState({
        type: 'Caret',
        startIndex: 0,
        startOffset: 0,
        endIndex: 0,
        endOffset: 0,
    });

    const documentSelectStartRef = useRef();
    const documentSelectEndRef = useRef();

    //const [lastSelectedSegments, setLastSelectedSegments] = useState([]);

    const [isSelecting, setIsSelecting] = useState(false);

    const [selectedSection, setSelectedSection] = useState('Home');

    const { 0: documentData } = useState(isNew ? {} : initDocument);

    const [documentName, setDocumentName] = useState(isNew ? 'Untitled' : initDocument.name);
    const [documentContent, setDocumentContent] = useState(isNew ? [
        {
            textStyle: copyObject(defaultTextStyle),
            editStyle: {},
            text: '',
        },
    ] : parseSavedContent(initDocument.content));

    const autoSetCaretSelection = () => {
        const selection = document.getSelection();
        setDocumentSelection({
            type: getTextId(selection.anchorNode) === getTextId(selection.focusNode) ? 'Caret' : 'Range',
            startIndex: getTextId(selection.anchorNode),
            startOffset: selection.anchorOffset,
            endIndex: getTextId(selection.focusNode),
            endOffset: selection.focusOffset,
        });
    }

    const styleSelection = (selection, func) => {
        if (selection.type === 'Range') {
            const newContent = copyObject(documentContent, true);
            const { 1: affectedSegments } = separateRichText(newContent, selection, true);
            for (let i = 0; i < affectedSegments.length; i++) {
                const segment = affectedSegments[i];
                func(segment);
            }
            mergeIdenticalSegments(newContent);
            setDocumentContent(newContent);

            const startIndex = newContent.indexOf(affectedSegments[0]);
            const startOffset = 0;

            let type;
            let endIndex;
            let endOffset;
            if (affectedSegments.length > 0) {
                type = 'Range';
                endIndex = newContent.indexOf(affectedSegments[affectedSegments.length - 1]);
                endOffset = affectedSegments[affectedSegments.length - 1].text.length;
            } else {
                type = 'Caret';
                endIndex = startIndex;
                endOffset = startOffset;
            }

            setDocumentSelection({
                type: type,
                startIndex: startIndex,
                startOffset: startOffset,
                endIndex: endIndex,
                endOffset: endOffset,
            });
        }
    }

    const styleDocumentSelection = (selection) => {
        styleSelection(selection, (seg) => {
            seg.editStyle.backgroundColor = 'rgb(0, 100, 255)';
        });
    }

    useEffect(() => {
        const selection = document.getSelection();
        if (pageRef.current.contains(selection.anchorNode)) {
            if (documentSelection.type === 'Caret') {
                selection.setPosition(documentSelectStartRef.current.childNodes[0], documentSelection.startOffset);
            } else if (documentSelection.type === 'Range') {
                selection.setBaseAndExtent(documentSelectStartRef.current.childNodes[0], documentSelection.startOffset, documentSelectEndRef.current.childNodes[0], documentSelection.endOffset);
            }
        }
        //styleDocumentSelection(documentSelection);
    }, [documentSelection]);

    useEffect(() => {
        const warnLeaveListener = (e) => {
            /*
            e.preventDefault();
            e.returnValue = '';//idk why but i "should" have this
            */
        }
        window.addEventListener('beforeunload', warnLeaveListener);
        return () => {
            window.removeEventListener('beforeunload', warnLeaveListener);
        }
    }, [documentContent]);

    useEffect(() => {
        const keyDownListener = (e) => {
            //const selection = documentSelection;
            if (e.ctrlKey) {
                if (e.code === 'KeyS') {
                    e.preventDefault();
                    if (isDocumentCreated) {
                        const sendContent = editContentToSendContent(documentContent);
                        fetch('/api/savedocument', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: docId,
                                name: documentName,
                                content: sendContent,
                            }),
                        }).then((res) => {
                            if (res.status === 200) {

                            } else {
                                console.error(`Couldn't save document`, res);
                            }
                        });
                    } else {
                        const sendContent = editContentToSendContent(documentContent);
                        fetch('/api/createdocument', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: documentName,
                                content: sendContent,
                            }),
                        }).then((res) => {
                            if (res.status === 200) {
                                res.json().then((data) => {
                                    setIsDocumentCreated(true);
                                    setDocId(data.id);
                                    navigate(`/document/${data.id}`);
                                });
                            }
                        });
                    }
                }
            }
        }

        //using timeout to let other event handlers finish (selection calculation)
        const mouseDownListener = (e) => {
            setIsSelecting(true);
            setTimeout(() => {
                autoSetCaretSelection();
            }, 0);
        }

        const mouseUpListener = (e) => {
            setIsSelecting(false);
            setTimeout(() => {
                autoSetCaretSelection();
            }, 0);
        }

        const mouseMoveListener = (e) => {
            setTimeout(() => {
                const selection = document.getSelection();
                setDocumentSelection({
                    type: documentSelection.startIndex === getTextId(selection.focusNode) ? 'Caret' : 'Range',
                    startIndex: documentSelection.startIndex,
                    startOffset: documentSelection.startOffset,
                    endIndex: getTextId(selection.focusNode),
                    endOffset: selection.focusOffset,
                });
            }, 0);
        }

        document.addEventListener('keydown', keyDownListener);
        document.addEventListener('mousedown', mouseDownListener, false);
        document.addEventListener('mouseup', mouseUpListener, false);
        if (isSelecting) {
            document.addEventListener('mousemove', mouseMoveListener);
        }
        return () => {
            document.removeEventListener('keydown', keyDownListener);
            document.removeEventListener('mousedown', mouseDownListener);
            document.removeEventListener('mouseup', mouseUpListener);
            if (isSelecting) {
                document.removeEventListener('mousemove', mouseMoveListener);
            }
        }
    });

    const pageInput = (e, addText) => {
        e.preventDefault();
        const newContent = copyObject(documentContent, true);
        const { 0: absStart } = separateRichText(newContent, documentSelection, false);
        const { 0: insertSeg } = getSegmentAtIndex(newContent, absStart - 1);

        insertSeg.text += addText;//insertSeg.text = addText + insertSeg.text;//if inserting backwards

        setDocumentSelection({
            type: 'Caret',
            startIndex: newContent.indexOf(insertSeg),
            startOffset: insertSeg.text.length,
            endIndex: newContent.indexOf(insertSeg),
            endOffset: insertSeg.text.length,
        });

        setDocumentContent(newContent);
    }

    const pageDelete = (e) => {
        e.preventDefault();
        const selection = documentSelection;
        const newContent = copyObject(documentContent, true);
        if (selection.type === 'Caret') {
            const absStart = getAbsoluteSelection(newContent, selection);
            const [insertSeg, segStart] = getSegmentAtIndex(newContent, absStart - 1);

            const deleteStartInd = absStart - segStart - 1;
            if (deleteStartInd === -1) {
                return;
            }
            insertSeg.text = insertSeg.text.substring(0, deleteStartInd) + insertSeg.text.substring(absStart - segStart, insertSeg.text.length);

            let selectStartInd = newContent.indexOf(insertSeg);

            let startInd;
            if (insertSeg.text.length === 0) {
                if (selectStartInd > 0) {
                    selectStartInd -= 1;
                    startInd = newContent[selectStartInd].text.length;
                } else {
                    startInd = 0;
                }
            } else {
                startInd = deleteStartInd;
            }

            setDocumentSelection({
                type: 'Caret',
                startIndex: selectStartInd,
                startOffset: startInd,
                endIndex: selectStartInd,
                endOffset: startInd,
            });

            clearEmptySegments(newContent);
        } else if (selection.type === 'Range') {
            const startSeg = newContent[0];
            const { 0: absStart } = separateRichText(newContent, selection, false);

            if (newContent.length === 0) {
                newContent[0] = {
                    text: '',
                    textStyle: startSeg.textStyle,
                };
            }
            const [insertSeg, segStart] = getSegmentAtIndex(newContent, absStart - 1);

            const startInd = absStart - segStart;

            setDocumentSelection({
                type: 'Caret',
                startIndex: newContent.indexOf(insertSeg),
                startOffset: startInd,
                endIndex: newContent.indexOf(insertSeg),
                endOffset: startInd,
            });

            clearEmptySegments(newContent);
        }
        setDocumentContent(newContent);
    }

    //unused function but removes react warning so its not unused
    const downloadEntireDocument = () => {
        return documentData;
    }
    downloadEntireDocument();

    return (
        <DocumentSelectionContext.Provider value={[documentSelection, setDocumentSelection]}>
            <StyleSelectionContext.Provider value={styleSelection}>
                <DocumentContext.Provider value={[documentName, setDocumentName]}>
                    <Panel id='text_panel' selectedSectionName={selectedSection} setSelectedName={setSelectedSection} styleSelection={styleSelection} />
                    <section id='document'>
                        <div className='page' ref={pageRef} contentEditable='true' suppressContentEditableWarning='true' onDragOver={(e) => {
                            e.preventDefault();
                            console.log('drag droppy', e)
                        }} onBeforeInput={(e) => {
                            pageInput(e, e.data);
                        }} onPaste={(e) => {
                            pageInput(e, e.clipboardData.getData('Text'));
                        }} onKeyDown={(e) => {
                            if (e.code === 'Backspace' || e.code === 'Delete') {
                                pageDelete(e);
                            }
                        }}>
                            {createRichText(documentContent, documentSelection, documentSelectStartRef, documentSelectEndRef)}
                        </div>
                    </section>
                </DocumentContext.Provider>
            </StyleSelectionContext.Provider>
        </DocumentSelectionContext.Provider>
    );
}

function LoadingDocument({ status }) {
    let statusText;
    if (status === 'authorizing') {
        statusText = 'Authorizing...';
    } else if (status === 'downloading') {
        statusText = 'Downloading document...';
    }
    return (
        <LoadingContainer>
            <p>
                {statusText}
            </p>
        </LoadingContainer>
    );
}

function DocumentFailed({ knownReason, ...props }) {
    let content;
    if (knownReason) {
        const reason = props.reason;
        let reasonNameText;
        let reasonDescText;
        if (reason === 'unauthorized') {
            reasonNameText = `You are unauthorized`;
            reasonDescText = `This error occurs because you are not logged in. Log in and try again.`;
        } else if (reason === 'forbidden') {
            reasonNameText = `You are not authorized to view this document`;
            reasonDescText = `You lack permission to view this document. If this is a shared document, you should ask the owner of the document to grant your account access to this document.`;
        } else if (reason === 'notfound') {
            reasonNameText = `Not Found`;
            reasonDescText = `We couldn't find the requested document.`;
        }
        content = (
            <>
                <h1 className='fancy_header'>
                    {reasonNameText}
                </h1>
                <p>
                    {reasonDescText}
                </p>
            </>
        );
    } else {
        const status = props.status;
        content = (
            <>
                <h1 className='fancy_header'>Failed to load document</h1>
                <p>Looks like we encountered an unexpected error while loading this document.</p>
                <p>Status code: {status}</p>
            </>
        );
    }
    return (
        <LoadingFailedContainer>
            {content}
        </LoadingFailedContainer>
    );
}

const knowErrors = [
    'unauthorized',
    'forbidden',
    'notfound',
];

export function Document({ ...props }) {
    const { docId } = useParams();

    const [loadingPhase, setLoadingPhase] = useState('standby');
    const [accessStatus, setAccessStatus] = useState();
    const [documentData, setDocumentData] = useState();

    useEffect(() => {
        setLoadingPhase('authorizing');
        const url = new URL('/api/authorizedfordocument', window.location.origin);
        const searchParams = new URLSearchParams();
        searchParams.append('id', docId);
        url.search = searchParams;
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setAccessStatus(res.status);
            if (res.status === 200) {
                setLoadingPhase('authorized');
            } else if (res.status === 401) {
                setLoadingPhase('unauthorized');
            } else if (res.status === 403) {
                setLoadingPhase('forbidden');
            } else if (res.status === 404) {
                setLoadingPhase('notfound');
            } else {
                console.error(`Couldn't fetch documents`, res);
                setLoadingPhase('failed');
            }
        });
    }, [docId]);

    useEffect(() => {
        if (loadingPhase === 'authorized') {
            const url = new URL('/api/document', window.location.origin);
            const searchParams = new URLSearchParams();
            searchParams.append('id', docId);
            url.search = searchParams;
            setLoadingPhase('downloading');
            fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                setAccessStatus(res.status);
                if (res.status === 200) {
                    res.json().then((data) => {
                        setLoadingPhase('downloaded');
                        setDocumentData(data);
                    });
                } else {
                    setLoadingPhase('failed');
                    console.error(`Couldn't fetch documents`, res);
                }
            });
        }
    }, [docId, loadingPhase]);

    let content;
    if (loadingPhase === 'authorizing') {
        content = (
            <LoadingDocument status={loadingPhase} />
        );
    } else if (loadingPhase === 'downloading') {
        content = (
            <LoadingDocument status={loadingPhase} />
        );
    } else if (loadingPhase === 'downloaded') {
        content = (
            <DocumentEditor docId={docId} initDocument={documentData} {...props} />
        );
    } else if (knowErrors.indexOf(loadingPhase) !== -1) {
        content = (
            <DocumentFailed knownReason={true} reason={loadingPhase} />
        );
    } else if (loadingPhase === 'failed') {
        content = (
            <DocumentFailed knownReason={false} status={accessStatus} />
        );
    }

    return (
        <>
            {content}
        </>
    );
}
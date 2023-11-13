import './document.css';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { DocumentsContext } from '../../../context';

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


const StyleSelectionContext = createContext();


const SectionsContent = [
    {
        name: 'File',
        Content: () => {
            return (
                <>

                </>
            );
        },
    },
    {
        name: 'Home',
        Content: () => {
            const [colorInput, setColorInput] = useState();
            const styleSelection = useContext(StyleSelectionContext);
            return (
                <>
                    <PanelSearchDropdown key={0} options={globalFonts.map((font, i) => {
                        return (
                            <option key={i} value={font} style={{ fontFamily: font }}>
                                {font}
                            </option>
                        );
                    })} onInput={(e) => {
                        const font = e.target.value;
                        e.target.style.fontFamily = font;
                        styleSelection(document.getSelection(), (segment) => {
                            segment.style.fontFamily = font;
                        });
                    }} />
                    <PanelButton key={1} onClick={(e) => {
                        styleSelection(document.getSelection(), (segment) => {
                            segment.style.fontSize = (segment.style.fontSize || 0) + 1;
                        });
                    }}>
                        A
                    </PanelButton>
                    <PanelButton key={2} onClick={(e) => {
                        styleSelection(document.getSelection(), (segment) => {
                            segment.style.fontSize = Math.max((segment.style.fontSize || 0) - 1, 1);
                        });
                    }}>
                        a
                    </PanelButton>
                    <div key={3} className='panel_button' style={{ position: 'relative' }}>
                        <input style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0' }} type='color' onChange={(e) => {
                            setColorInput(e.target.value);
                            styleSelection(document.getSelection(), (segment) => {
                                segment.style.color = e.target.value;
                            });
                        }} />
                        <div style={{ textDecoration: `2px ${colorInput} underline` }}>
                            A
                        </div>
                    </div>
                    <PanelButton key={4} onClick={(e) => {
                        styleSelection(document.getSelection(), (segment) => {
                            segment.style.fontSize = Math.max((segment.style.fontSize || 0) - 1, 1);
                        });
                    }}>
                        a
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
function createRichText(segments, selectStart, selectEnd, selectStartRef, selectEndRef) {
    const res = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        res.push((
            <span key={i} data-text-id={i} style={segment.style} ref={selectStart === i ? selectStartRef : selectEnd === i ? selectEndRef : undefined}>
                {segment.text}
            </span>
        ));
    }
    return res;
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

function separateRichTextSegments(segments, offset, length) {
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
        if (notFirst) {
            if (notLast) {
                //middle segments
                newTexts.push({
                    isNew: true,
                    text: segText,
                });
            } else {
                //last segment
                newTexts.push({
                    isNew: true,
                    text: segText.substring(0, (offset + length) - total),
                });
                newTexts.push({
                    isNew: false,
                    text: segText.substring((offset + length) - total, segText.length),
                });
            }
        } else {
            if (notLast) {
                //first segment
                newTexts.push({
                    isNew: false,
                    text: segText.substring(0, offset),
                });
                newTexts.push({
                    isNew: true,
                    text: segText.substring(offset, segText.length),
                });
            } else {
                //inside (only 1 element)
                newTexts.push({
                    isNew: false,
                    text: segText.substring(0, offset),
                });
                newTexts.push({
                    isNew: true,
                    text: segText.substring(offset, offset + length),
                });
                newTexts.push({
                    isNew: false,
                    text: segText.substring(offset + length, segText.length),
                });
            }
        }
        const replaceTexts = [];
        for (let j = 0; j < newTexts.length; j++) {
            const newText = newTexts[j];
            if (newText.text === '') {
                continue;
            }
            const newSeg = {
                style: Object.assign({}, segment.style),
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

//"backward" selections break the algorithms so make it absolute (pain)
function getAbsoluteSelection(segments, baseStart, baseEnd, selection) {
    let offset;
    //yk selection index is from the element that was selected not all of the spans so we need to get the total
    const getParentTextId = (node) => {
        return Number(node.parentElement.dataset.textId);
    }
    if (selection.baseNode === selection.focusNode) {
        //same text node
        const isForward = baseStart < baseEnd;
        offset = Math.min(baseStart, baseEnd);
        offset += getOffsetFromStart(segments, getParentTextId(isForward ? selection.focusNode : selection.baseNode));
    } else {
        //NOT same text node
        if (selection.baseNode.compareDocumentPosition(selection.focusNode) & Node.DOCUMENT_POSITION_FOLLOWING) {
            //normal, non-psychopathic sane selection
            offset = baseStart;
            offset += getOffsetFromStart(segments, getParentTextId(selection.baseNode));
        } else {
            //backwards psychopathic insane selection
            offset = baseEnd;
            offset += getOffsetFromStart(segments, getParentTextId(selection.focusNode));
        }
    }

    return offset;
}

function seperateRichText(segments, selection) {
    const absStart = getAbsoluteSelection(segments, selection.baseOffset, selection.focusOffset, selection);
    const length = selection.toString().length;
    const [affectedSegments, startInd, endInd] = getAffectedSegments(segments, absStart, length);
    const [newSegments, newAffectedSegments] = separateRichTextSegments(affectedSegments, absStart - getOffsetFromStart(segments, startInd), length);
    const itAmount = endInd - startInd;
    let curInd = 0;
    for (let segInd = 0; segInd <= itAmount; segInd++) {
        segments.splice(startInd + curInd, 1, ...newSegments[segInd]);
        curInd += newSegments[segInd].length;
    }
    return newAffectedSegments;
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






function PanelSearchDropdown({ options, onInput, ...props }) {
    return (
        <select className='panel_search_dropdown' onChange={onInput}>
            {options}
        </select>
    );
    /*
    return (
        <div className='panel_search_dropdown'>
            {children}
        </div>
    );
    */
}

function PanelButton({ onClick, children, ...props }) {
    return (
        <button className='panel_button button' onClick={onClick}>
            {children}
        </button>
    );
}

function Panel({ selectedSectionName, setSelectedName, ...props }) {
    let selectedSection;
    let selectedSectionInd;
    for (let i = 0; i < SectionsContent.length; i++) {
        const section = SectionsContent[i];
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
                {SectionsContent.map((section, i) => {
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

function Document({ data, ...props }) {
    const { document: docId } = useParams();

    const [documentData, setDocumentData] = useState({});

    const [selectStart, setSelectStart] = useState();
    const [selectEnd, setSelectEnd] = useState();

    const selectionStartRef = useRef();
    const selectionEndRef = useRef();

    const [selectedSection, setSelectedSection] = useState('Home');

    const [documentContent, setDocumentContent] = useState([
        {
            style: {
                color: 'red',
                fontSize: 16,
            },
            text: 'i am red',
        },
        {
            style: {
                color: 'rgb(0, 255, 0)',
                fontSize: 16,
            },
            text: 'i am green',
        },
        {
            style: {
                color: 'rebeccapurple',
                fontSize: 16,
            },
            text: 'i am REBECCAPURPLE',
        },
    ]);

    const styleSelection = (selection, func) => {
        if (selection.type === 'Range') {
            const newContent = copyObject(documentContent, true);
            const affectedSegments = seperateRichText(newContent, selection);
            for (let i = 0; i < affectedSegments.length; i++) {
                const segment = affectedSegments[i];
                func(segment);
            }
            setDocumentContent(newContent);
            setSelectStart(newContent.indexOf(affectedSegments[0]));
            setSelectEnd(newContent.indexOf(affectedSegments[affectedSegments.length - 1]));
        }
    }

    useEffect(() => {
        if (selectionStartRef.current) {
            let endRef;
            if (selectStart === selectEnd) {
                endRef = selectionStartRef;
            } else {
                endRef = selectionEndRef;
            }
            const selection = document.getSelection();
            selection.setBaseAndExtent(selectionStartRef.current.childNodes[0], 0, endRef.current.childNodes[0], endRef.current.childNodes[0].length);
            selectionStartRef.current = undefined;
            selectionEndRef.current = undefined;
        }
        const keyDownListener = (e) => {
            const selection = document.getSelection();
            if (e.ctrlKey) {
                if (e.code === 'KeyS') {
                    e.preventDefault();
                    fetch('/api/savedocument', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: docId,
                            content: documentContent,
                        }),
                    }).then((res) => {
                        if (res.status === 200) {

                        } else {
                            console.error(`Couldn't save document`, res);
                        }
                    });
                }
            }
        };
        const warnLeaveListener = (e) => {
            /*
            e.preventDefault();
            e.returnValue = '';//idk why but i "should" have this
            */
        }
        window.addEventListener('beforeunload', warnLeaveListener);
        document.addEventListener('keydown', keyDownListener);
        return () => {
            window.removeEventListener('beforeunload', warnLeaveListener);
            document.removeEventListener('keydown', keyDownListener);
        }
    }, [documentContent]);

    useEffect(() => {
        const url = new URL('/api/document', window.location.origin);
        const searchParams = new URLSearchParams();
        searchParams.append('id', docId);
        url.search = searchParams;
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setDocumentData(data);
                });
            } else {
                console.error(`Couldn't fetch documents`, res);
            }
        });
    }, []);

    const pageInput = (e) => {
        const selection = document.getSelection();
        //console.log(selection.anchorOffset, selection.focusOffset);
        const newContent = copyObject(documentContent, true);

        //newContent[documentContent.indexOf(segment)].text = e.target.innerText;
        setDocumentContent(newContent);
    }

    return (
        <StyleSelectionContext.Provider value={styleSelection}>
            <Panel id='text_panel' selectedSectionName={selectedSection} setSelectedName={setSelectedSection} styleSelection={styleSelection} />
            <section id='document'>
                <div className='page' contentEditable='true' onDragOver={(e) => {
                    console.log('drag droppy', e)
                }} onInput={pageInput}>
                    {createRichText(documentContent, selectStart, selectEnd, selectionStartRef, selectionEndRef)}
                </div>
            </section>
        </StyleSelectionContext.Provider>
    );
}

export default Document;
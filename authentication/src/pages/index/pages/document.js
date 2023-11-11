import './document.css';

import { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { DocumentsContext } from '../../../context';

function createRichText(segments) {
    const res = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        res.push((
            <span key={i} style={segment.style}>
                {segment.text}
            </span>
        ));
    }
    return res;
}

function separateRichText(offset, length) {
    for (let i = 0; i < length; i++) {
        const textInd = offset + i;
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        e.preventDefault();
    }
})

function Document({ data, ...props }) {
    const { document: docId } = useParams();

    const [documentData, setDocumentData] = useState({});

    const [documentContent, setDocumentContent] = useState([]);

    useEffect(() => {
        const listener = (e) => {
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
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        }
    }, []);

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

    return (
        <section id='document'>
            <div className='page' contentEditable={true}>
                {createRichText([
                    {
                        style: {
                            color: 'red',
                        },
                        text: 'i am red',
                    },
                    {
                        style: {
                            color: 'rgb(0, 255, 0)',
                        },
                        text: 'i am green',
                    },
                    {
                        style: {
                            color: 'rebeccapurple',
                        },
                        text: 'i am REBECCAPURPLE',
                    },
                ])}
            </div>
        </section>
    );
}

export default Document;
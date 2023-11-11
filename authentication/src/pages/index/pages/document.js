import './document.css';

import { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { DocumentsContext } from '../../../context';

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
            <textarea className='page'>
                {documentContent}
            </textarea>
        </section>
    );
}

export default Document;
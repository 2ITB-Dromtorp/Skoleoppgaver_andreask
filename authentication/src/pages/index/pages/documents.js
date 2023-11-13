import './documents.css';

import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { DocumentsContext } from '../../../context';

function DocumentLink(data) {
    return (
        <Link to={`/document/${data.id}`}>
            <div className='document_link_name'>
                {data.name}
            </div>
            <div className='document_link_last_edited'>
                {new Date().toString()}
            </div>
        </Link>
    );
}

function Documents() {
    const [documents, setDocuments] = useContext(DocumentsContext);
    const navigate = useNavigate();
    useEffect(() => {
        const url = new URL('/api/documents', window.location.origin);
        const searchParams = new URLSearchParams();
        url.search = searchParams;
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setDocuments(data);
                });
            } else {
                console.log("fail")
            }
        });
    }, []);
    return (
        <section id='documents_section' className='main_content'>
            <div id='documents_container'>
                <button className='button fancy_button primary' onClick={(e) => {
                    fetch('/api/createdocument', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: 'zaza',
                        }),
                    }).then((res) => {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                navigate(`/document/${data.id}`);
                            });
                        }
                    });
                }}>
                    Create Document
                </button>
                <div id='documents'>
                    {documents.map((data) => {
                        return <DocumentLink data={data} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default Documents;
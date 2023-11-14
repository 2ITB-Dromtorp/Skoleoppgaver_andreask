import './documents.css';

import { useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { DocumentsContext } from '../../../context';

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getDayFromIndex(i) {
    return dayNames[i];
}

function capitalizeFirstCharacter(str) {
    return str[0].toUpperCase() + str.substring(1, str.length);
}

function stringifyDate(date) {
    return `${capitalizeFirstCharacter(getDayFromIndex(date.getDay()))} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function DocumentLink({ data }) {
    const date = new Date();
    return (
        <Link className='document_link button_link' to={`/document/${data.id}`}>
            <div className='document_link_name'>
                {data.name}
            </div>
            <div className='document_link_details'>
                <div className='document_link_detail'>
                    Edited: {stringifyDate(date)}
                </div>
                &nbsp;
                <div className='document_link_detail'>
                    Created: {stringifyDate(date)}
                </div>
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
    }, [setDocuments]);
    return (
        <section id='documents_section' className='main_content'>
            <h1 className='fancy_header'>Documents</h1>
            <button id='create_document_button' className='button fancy_button primary' onClick={(e) => {
                navigate('/newdocument');
            }}>
                Create Document
            </button>
            <div id='document_links'>
                {documents.map((data, i) => {
                    return <DocumentLink key={i} data={data} />
                })}
            </div>
        </section>
    )
}

export default Documents;
import { useState } from 'react';
import './documents.css';

function Documents() {
    const [documents, setDocuments] = useState([]);
    return (
        <div id='documents'>
            <button className='button fancy_button primary'>Create Document</button>
            <div id='sussybaka'>
                {documents.map((document) => {
                    return (
                        <div className='document'>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Documents;
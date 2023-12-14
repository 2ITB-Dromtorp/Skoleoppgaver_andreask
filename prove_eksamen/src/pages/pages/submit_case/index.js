import './index.css';

import { useContext, useState } from 'react';
import { CasesContext } from '../../../context';

export default function SubmitCase() {
    const { 1: setCases } = useContext(CasesContext);

    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState(0);
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');

    return (
        <>
            <h1>
                VTH - Vi Trenger Hjelp
            </h1>
            <section id='form_section'>
                <form id='form' onSubmit={(e) => {
                    e.preventDefault();

                    setNameInput('');
                    setEmailInput('');
                    setPhoneNumberInput(0);
                    setTitleInput('');
                    setDescriptionInput('');

                    setCases(prev => {
                        const newCase = {
                            id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0,
                            name: nameInput,
                            email: emailInput,
                            phoneNumber: phoneNumberInput,
                            title: titleInput,
                            description: descriptionInput,
                            date: new Date(),
                            solveMessage: '',
                            solved: false,
                        };
                        return [...prev, newCase];
                    });
                }}>
                    <div className='form_section'>
                        <label htmlFor='name'>
                            Navn
                        </label>
                        <input type='text' name='name' required onChange={(e) => setNameInput(e.target.value)} value={nameInput} />
                    </div>
                    <div className='form_section'>
                        <label htmlFor='email'>
                            E-post
                        </label>
                        <input type='email' name='email' required onChange={(e) => setEmailInput(e.target.value)} value={emailInput} />
                    </div>
                    <div className='form_section'>
                        <label htmlFor='phone_number'>
                            Tlf
                        </label>
                        <input type='number' name='phone_number' required onChange={(e) => setPhoneNumberInput(e.target.value)} value={phoneNumberInput} />
                    </div>
                    <div className='form_section'>
                        <label htmlFor='title'>
                            Tittel
                        </label>
                        <input type='text' name='title' required onChange={(e) => setTitleInput(e.target.value)} value={titleInput} />
                    </div>
                    <div className='form_section'>
                        <label htmlFor='description'>
                            Beskrivelse
                        </label>
                        <textarea id='description_input' type='text' name='description' required onChange={(e) => setDescriptionInput(e.target.value)} value={descriptionInput}>

                        </textarea>
                    </div>
                    <button id='form_submit' type='submit'>
                        Send beskjed
                    </button>
                </form>
            </section>
        </>
    );
}
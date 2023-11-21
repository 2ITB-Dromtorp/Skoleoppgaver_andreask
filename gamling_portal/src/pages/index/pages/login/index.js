import './index.css';

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useRefreshUserData } from '../../../../custom_hooks';

import { FancyButton, TextInput } from '../../../../components/input';

function UserForm({ isLogin }) {
    const refreshUserData = useRefreshUserData();
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const loginFormSubmit = (e) => {
        e.preventDefault();
        const actualUsername = usernameInput.trim();
        if (actualUsername.length === 0) {
            return;
        }
        const actualPassword = passwordInput.trim();
        if (actualPassword.length === 0) {
            return;
        }
        fetch(`/api/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: actualUsername,
                password: actualPassword,
            }),
        }).then((res) => {
            if (res.status === 200) {
                refreshUserData();
                navigate('/');
            } else {
                console.error(res);
            }
        });
    }

    let typeText;
    let classType;
    let wrongPageText;
    let wrongPageLinkText;
    let wrongPagePath;
    if (isLogin) {
        typeText = 'Logg inn';
        classType = 'login';
        wrongPageText = `Har ikke en bruker?`;
        wrongPageLinkText = `Registrer deg`;
        wrongPagePath = 'signup';
    } else {
        typeText = 'Registrer deg';
        classType = 'signup';
        wrongPageText = `Har allerede en bruker?`;
        wrongPageLinkText = `Logg inn`;
        wrongPagePath = 'login';
    }

    return (
        <section id='user_section' className='main_content'>
            <section id='user_section' className={`floating_container ${classType}`}>
                <h2 id='user_form_header'>{typeText}</h2>
                <form id={classType + '_form'} className='user_form' onSubmit={loginFormSubmit}>
                    <div id='user_input_fields'>
                        <div className='user_input_field_container'>
                            <label className='standard_label' htmlFor={classType + '_username_input'}>Username</label>
                            <TextInput id={classType + '_username_input'} type='text' autofill='off' required value={usernameInput} onChange={(e) => {
                                setUsernameInput(e.target.value);
                            }} />
                        </div>
                        <div className='user_input_field_container'>
                            <label className='standard_label' htmlFor={classType + '_password_input'}>Password</label>
                            <TextInput id={classType + '_username_input'} type='password' autofill='off' required value={passwordInput} onChange={(e) => {
                                setPasswordInput(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div id='user_input_wrong_page'>
                        <div id='user_input_wrong_page_text'>
                            {wrongPageText}
                        </div>
                        &nbsp;
                        <Link to={`/${wrongPagePath}`}>
                            {wrongPageLinkText}
                        </Link>
                    </div>
                    <FancyButton primary={true} id='user_submit_button' type='submit'>
                        {typeText}
                    </FancyButton>
                </form>
            </section>
        </section>
    );
}

function Login({ isLogin, ...props }) {
    return (
        <>
            {isLogin && <UserForm isLogin={true} {...props} />}
            {!isLogin && <UserForm isLogin={false} {...props} />}
        </>
    );
}

export default Login;
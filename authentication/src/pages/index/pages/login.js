import { useState } from 'react';
import './login.css';

import { redirect } from 'react-router-dom';

function UserForm({ isLogin, ...props }) {
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
                redirect('/');
            } else {
                console.error(res);
            }
        });
    }

    const typeText = isLogin ? 'Log in' : 'Sign up';
    const classType = isLogin ? 'login' : 'signup';

    return (
        <section id='user_section' className='main_content'>
            <section id='user_section' className={'floating_container' + ' ' + classType}>
                <h2 id='user_form_header'>{typeText}</h2>
                <form id={classType + '_form'} className='user_form' onSubmit={loginFormSubmit}>
                    <div id='user_input_fields'>
                        <div className='user_input_field_container'>
                            <label className='standard_label' htmlFor={classType + '_username_input'}>Username</label>
                            <input id={classType + '_username_input'} className='text_input' type='text' autofill='off' required value={usernameInput} onChange={(e) => {
                                setUsernameInput(e.target.value);
                            }} />
                        </div>
                        <div className='user_input_field_container'>
                            <label className='standard_label' htmlFor={classType + '_password_input'}>Password</label>
                            <input id={classType + '_password_input'} className='text_input' type='password' autofill='off' required value={passwordInput} onChange={(e) => {
                                setPasswordInput(e.target.value);
                            }} />
                        </div>
                    </div>
                    <button id='user_submit_button' className='button fancy_button primary' type='submit'>{typeText}</button>
                </form>
            </section>
        </section>
    );
}

function Login({ isLogin, ...props }) {
    /*
    gotta do it like this cuz react thinks its the same component
    as you can see we either insert {logincomponent} and {nocomponent}
    or we insert {nocom} and {signupcomponent}
    now react sees that our component was replaced and loads a fresh one
    */
    return (
        <>
            {isLogin && <UserForm isLogin={true} {...props} />}
            {!isLogin && <UserForm isLogin={false} {...props} />}
        </>
    );
}

export default Login;
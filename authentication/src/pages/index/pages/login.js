import { useState } from 'react';
import './login.css';

import { redirect } from 'react-router-dom';

function Login({ isLogin, ...props }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginFormSubmit = (e) => {
        e.preventDefault();
        const actualUsername = username.trim();
        if (actualUsername.length === 0) {
            return;
        }
        const actualPassword = password.trim();
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

    return (
        <>
            <section id='login_section' className='floating_container'>
                <h2>{typeText}</h2>
                <form id='login_form' onSubmit={loginFormSubmit}>
                    <div className='login_input_field_container'>
                        <label className='standard_label' htmlFor='login_username_input'>Username</label>
                        <input id='login_username_input' className='text_input' type='text' required onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                    </div>
                    <div className='login_input_field_container'>
                        <label className='standard_label' htmlFor='login_password_input'>Password</label>
                        <input id='login_password_input' className='text_input' type='password' required onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <button id='login_submit_button' className='button fancy_button primary' type='submit'>{typeText}</button>
                </form>
            </section>
        </>
    );
}

export default Login;
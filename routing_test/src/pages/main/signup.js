import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doesUserExist, createUser, getUsers } from '../../users';

const SignUp = () => {
    const navigate = useNavigate();
    const [usernameClass, setUsernameClass] = useState();
    const [emailClass, setEmailClass] = useState();
    const [passwordClass, setPasswordClass] = useState();
    const [repeatPasswordClass, setRepeatPasswordClass] = useState();
    const [usernameMessage, setUsernameMessage] = useState();
    const [emailMessage, setEmailMessage] = useState();
    const [passwordMessage, setPasswordMessage] = useState();
    const [repeatPasswordMessage, setRepeatPasswordMessage] = useState();
    const submit = (e) => {
        e.preventDefault(); //bro rly thought he could refresh
        const usernameInputEl = document.getElementById('signup_username_input');
        const emailInputEl = document.getElementById('signup_email_input');
        const passwordInputEl = document.getElementById('signup_password_input');
        const repeatPasswordInputEl = document.getElementById('signup_repeat_password_input');
        const usernameInput = usernameInputEl.value;
        const emailInput = emailInputEl.value;
        const passwordInput = passwordInputEl.value;
        const repeatPasswordInput = repeatPasswordInputEl.value;
        let isUsernameValid = true;
        let isEmailValid = true;
        let isPasswordValid = true;
        let isRepeatPasswordValid = true;
        if (usernameInput === '') {
            isUsernameValid = false;
            setUsernameMessage('Skriv inn brukernavn');
        }
        if (emailInput === '') {
            isEmailValid = false;
            setEmailMessage('Skriv inn en epostadresse');
        }
        if (passwordInput === '') {
            isPasswordValid = false;
            setPasswordMessage('Skriv inn et passord');
        }
        if (isPasswordValid === true) {
            if (passwordInput !== repeatPasswordInput) {
                isRepeatPasswordValid = false;
                setRepeatPasswordMessage('Passord er ikke like');
            }
        }
        if (isUsernameValid === true) {
            const len = usernameInput.length
            if (len < 4 || len > 20) {
                isUsernameValid = false;
                setUsernameMessage('Brukernavn må være mellom 4 og 20 tegn langt');
            }
        }
        if (isUsernameValid === true) {
            const underscores = usernameInput.match()
        }
        if (isEmailValid === true) {
            const foundEmail = emailInput.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            if (foundEmail === null) {
                isEmailValid = false;
                setEmailMessage('Skriv inn en gyldig epostadresse');
            }
        }
        if (isUsernameValid === true && isEmailValid === true && isPasswordValid === true && isRepeatPasswordValid === true) {
            const foundAttemptUser = doesUserExist(usernameInput);
            if (foundAttemptUser === false) {
                createUser(usernameInput, emailInput, passwordInput);
                navigate('/');
            } else if (foundAttemptUser === true) {
                isUsernameValid = false;
                setUsernameMessage('Brukernavn er ikke tilgjengelig');
            }
        }
        if (isUsernameValid === true) {
            setUsernameClass();
            setUsernameMessage();
        } else if (isUsernameValid === false) {
            setUsernameClass('invalid');
        }
        if (isEmailValid === true) {
            setEmailClass();
            setEmailMessage();
        } else if (isEmailValid === false) {
            setEmailClass('invalid');
        }
        if (isPasswordValid === true) {
            setPasswordClass();
            setPasswordMessage();
        } else if (isPasswordValid === false) {
            setPasswordClass('invalid');
        }
        if (isRepeatPasswordValid === true) {
            setRepeatPasswordClass();
            setRepeatPasswordMessage();
        } else if (isRepeatPasswordValid === false) {
            setRepeatPasswordClass('invalid');
        }
    }

    let addUsernameClass;
    if (usernameClass !== undefined) {
        addUsernameClass = ' ' + usernameClass;
    } else {
        addUsernameClass = '';
    }

    let addEmailClass;
    if (emailClass !== undefined) {
        addEmailClass = ' ' + emailClass;
    } else {
        addEmailClass = '';
    }

    let addPasswordClass;
    if (passwordClass !== undefined) {
        addPasswordClass = ' ' + passwordClass;
    } else {
        addPasswordClass = '';
    }

    let addRepeatPasswordClass;
    if (repeatPasswordClass !== undefined) {
        addRepeatPasswordClass = ' ' + repeatPasswordClass;
    } else {
        addRepeatPasswordClass = '';
    }

    let addUsernameMessage;
    if (usernameMessage !== undefined) {
        addUsernameMessage = (
            <p className="form_message">
                {usernameMessage}
            </p>
        );
    }

    let addEmailMessage;
    if (emailMessage !== undefined) {
        addEmailMessage = (
            <p className="form_message">
                {emailMessage}
            </p>
        );
    }
    let addPasswordMessage;
    if (passwordMessage !== undefined) {
        addPasswordMessage = (
            <p className="form_message">
                {passwordMessage}
            </p>
        );
    }

    let addRepeatPasswordMessage;
    if (repeatPasswordMessage !== undefined) {
        addRepeatPasswordMessage = (
            <p className="form_message">
                {repeatPasswordMessage}
            </p>
        );
    }

    return (
        <>
            <div className="content_center">
                <div id="signup_container" className="front_account_management_container">
                    <h1 id="signup_header" className="front_account_management_header">Registrer deg</h1>
                    <form id="signup_form" className="front_account_management_form" onSubmit={submit}>

                        <label className="signup_label front_account_management_layer" for="signup_username_input">Brukernavn</label>
                        {addUsernameMessage}
                        <input id="signup_username_input" className={'front_account_management_username_input front_account_management_text_input' + addUsernameClass} name="username" type="text" />

                        <label className="signup_label front_account_management_layer" for="signup_email_input">Epost adresse</label>
                        {addEmailMessage}
                        <input id="signup_email_input" className={'front_account_management_email_input front_account_management_text_input' + addEmailClass} name="email" type="text" />

                        <label className="signup_label front_account_management_layer" for="signup_password_input">Passord</label>
                        {addPasswordMessage}
                        <input id="signup_password_input" className={'front_account_management_password_input front_account_management_text_input' + addPasswordClass} name="password" type="password" />
                        
                        <label className="signup_label front_account_management_layer" for="signup_repeat_password_input">Gjenta passord</label>
                        {addRepeatPasswordMessage}
                        <input id="signup_repeat_password_input" className={'front_account_management_password_input front_account_management_text_input' + addRepeatPasswordClass} name="repeat_password" type="password" />

                        <input id="signup_submit" className="front_account_management_submit" type="submit" value="Registrer deg" />
                        <div id="signup_login_section" className="front_account_management_change_section">
                            <p id="signup_login_text" className="front_account_management_change_text">Har allerede en bruker?&nbsp;</p>
                            <Link id="signup_login" to="/login">Logg inn</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
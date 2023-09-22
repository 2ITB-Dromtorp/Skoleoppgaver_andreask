import { useState } from 'react';
import { Link } from 'react-router-dom';

const USERS = [
    {
        id: 1,
        name: 'admin',
        password: 'passord',
    },
];

const getUserFromName = (name) => {
    let res;
    for (let i = 0; i < USERS.length; i++) {
        const curUser = USERS[i];
        if (curUser.name === name) {
            res = curUser;
            break;
        }
    }
    return res;
}

const doesUserExist = (name) => {
    return getUserFromName(name) !== undefined;
}

const checkUserPasswordCorrect = (name, password) => {
    return getUserFromName(name).password === password;
}

const Login = () => {
    const [usernameClass, setUsernameClass] = useState();
    const [passwordClass, setPasswordClass] = useState();
    const [usernameMessage, setUsernameMessage] = useState();
    const [passwordMessage, setPasswordMessage] = useState();
    const submit = (e) => {
        e.preventDefault(); //bro rly thought he could refresh
        const usernameInputEl = document.getElementById('login_username_input');
        const passwordInputEl = document.getElementById('login_password_input');
        const usernameInput = usernameInputEl.value;
        const passwordInput = passwordInputEl.value;
        let isUsernameValid = true;
        let isPasswordValid = true;
        if (usernameInput === '') {
            isUsernameValid = false;
            setUsernameMessage('Skriv inn email eller brukernavn');
        }
        if (passwordInput === '') {
            isPasswordValid = false;
            setPasswordMessage('Skriv inn passord');
        }
        if (isUsernameValid === true && isPasswordValid === true) {
            const foundAttemptUser = doesUserExist(usernameInput);
            if (foundAttemptUser === true) {
                const passwordCorrect = checkUserPasswordCorrect(usernameInput, passwordInput);
                if (passwordCorrect === true) {
                    console.log("login successful")
                } else {
                    isPasswordValid = false;
                    setPasswordMessage('Feil passord');
                }
            } else if (foundAttemptUser === false) {
                isUsernameValid = false;
                setUsernameMessage('Feil brukernavn');
            }
        }
        if (isUsernameValid === true) {
            setUsernameClass();
            setUsernameMessage();
        } else if (isUsernameValid === false) {
            setUsernameClass('invalid');
        }
        if (isPasswordValid === true) {
            setPasswordClass();
            setPasswordMessage();
        } else if (isPasswordValid === false) {
            setPasswordClass('invalid');
        }
    }

    let addUsernameClass;
    if (usernameClass !== undefined) {
        addUsernameClass = ' ' + usernameClass;
    } else {
        addUsernameClass = '';
    }

    let addPasswordClass;
    if (passwordClass !== undefined) {
        addPasswordClass = ' ' + passwordClass;
    } else {
        addPasswordClass = '';
    }

    let addUsernameMessage;
    if (usernameMessage !== undefined) {
        addUsernameMessage = (
            <p className="form_message">
                {usernameMessage}
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

    return (
        <>
            <div className="content_center">
                <div id="login_container" className="front_account_management_container">
                    <h1 id="login_header" className="front_account_management_header">Logg inn</h1>
                    <form id="login_form" className="front_account_management_form" onSubmit={submit}>
                        <label className="login_label front_account_management_layer" for="username">Brukernavn eller epost adresse</label>
                        {addUsernameMessage}
                        <input id="login_username_input" className={'front_account_management_username_input front_account_management_text_input' + addUsernameClass} name="username" type="text" />
                        <div id="login_bottom_section" className="front_account_management_bottom_section">
                            <label className="login_label front_account_management_layer" for="password">Passord</label>
                            {addPasswordMessage}
                            <input id="login_password_input" className={'front_account_management_password_input front_account_management_text_input' + addPasswordClass} name="password" type="password" />
                            <Link id="login_forgot_password" to="/reset_password">Glemt passord?</Link>
                            <input id="login_submit" className="front_account_management_submit" value="Logg inn" type="submit" />
                            <div id="login_register_section" className="front_account_management_change_section">
                                <p id="login_register_text">Har ikke en bruker?&nbsp;</p>
                                <Link id="login_register" to="/signup">Registrer deg</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
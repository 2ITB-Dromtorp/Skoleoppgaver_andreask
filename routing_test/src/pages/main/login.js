import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../button';

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
        let isUsernameValid;
        let isPasswordValid;
        if (usernameInput === '') {
            isUsernameValid = false;
        }
        if (passwordInput === '') {
            isPasswordValid = false;
        }
        if (isUsernameValid === false) {
            console.log("USER WRON")
            setUsernameClass('invalid');
            setUsernameMessage('Skriv inn email eller brukernavn');
        }
        if (isPasswordValid === false) {
            console.log("PASSOWRD WRON")
            setPasswordClass('invalid');
            setPasswordMessage('Skriv inn passord');
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
                <div id="login_container">
                    <h1 id="login_header">Logg inn</h1>
                    <form id="login_form" onSubmit={submit}>
                        <label className="login_label" for="username">Brukernavn eller epost adresse</label>
                        {addUsernameMessage}
                        <input id="login_username_input" className={'login_text_input' + addUsernameClass} name="username" type="text" />
                        <div id="login_bottom_section">
                            <label className="login_label" for="password">Passord</label>
                            {addPasswordMessage}
                            <input id="login_password_input" className={'login_text_input' + addPasswordClass} name="password" type="password" />
                            <Link id="login_forgot_password" to="/reset_password">Glemt passord?</Link>
                            <input type="submit" id="login_submit" value="Logg inn" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
    /*
    <Button id="login_submit" type="submit">Logg inn</Button>
    <input id="login_submit" type="submit"/>
    */
}

export default Login;
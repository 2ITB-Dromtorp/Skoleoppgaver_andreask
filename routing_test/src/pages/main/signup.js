import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doesUserExist, createUser, getUsers, getUserFromName } from '../../users';
import { getLogin, setLogin } from '../../server';

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
            setUsernameMessage('Username required');
        }
        if (emailInput === '') {
            isEmailValid = false;
            setEmailMessage('Email required');
        }
        if (passwordInput === '') {
            isPasswordValid = false;
            setPasswordMessage('Password required');
        }
        if (isPasswordValid === true) {
            if (passwordInput !== repeatPasswordInput) {
                isRepeatPasswordValid = false;
                setRepeatPasswordMessage('Passwords do not match');
            }
        }
        if (isUsernameValid === true) {
            const len = usernameInput.length
            if (len < 4 || len > 20) {
                isUsernameValid = false;
                setUsernameMessage('Username must be between 4 and 20 characters long');
            }
        }
        if (isUsernameValid === true) {
            const underscores = usernameInput.match()
        }
        if (isEmailValid === true) {
            const foundEmail = emailInput.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            if (foundEmail === null) {
                isEmailValid = false;
                setEmailMessage('Email address is invalid');
            }
        }
        if (isUsernameValid === true && isEmailValid === true && isPasswordValid === true && isRepeatPasswordValid === true) {
            const foundAttemptUserResponse = doesUserExist(usernameInput);
            if (foundAttemptUserResponse.success === true) {
                if (foundAttemptUserResponse.exists === false) {
                    const createResponse = createUser(usernameInput, emailInput, passwordInput);
                    if (createResponse.success === true) {
                        const userResponse = getUserFromName(usernameInput);
                        if (userResponse.success === true) {
                            setLogin(userResponse.user.userId);
                            navigate('/');
                        }
                    }
                } else {
                    isUsernameValid = false;
                    setUsernameMessage('Username not available');
                }
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
                    <h1 id="signup_header" className="front_account_management_header">Sign up</h1>
                    <form id="signup_form" className="front_account_management_form" onSubmit={submit}>

                        <label className="form_label signup_label front_account_management_label" for="signup_username_input">Username</label>
                        {addUsernameMessage}
                        <input id="signup_username_input" className={'front_account_management_username_input front_account_management_text_input' + addUsernameClass} name="username" type="text" />

                        <label className="form_label signup_label front_account_management_label" for="signup_email_input">Email address</label>
                        {addEmailMessage}
                        <input id="signup_email_input" className={'front_account_management_email_input front_account_management_text_input' + addEmailClass} name="email" type="text" />

                        <label className="form_label signup_label front_account_management_label" for="signup_password_input">Password</label>
                        {addPasswordMessage}
                        <input id="signup_password_input" className={'front_account_management_password_input front_account_management_text_input' + addPasswordClass} name="password" type="password" />

                        <label className="form_label signup_label front_account_management_label" for="signup_repeat_password_input">Repeat password</label>
                        {addRepeatPasswordMessage}
                        <input id="signup_repeat_password_input" className={'front_account_management_password_input front_account_management_text_input' + addRepeatPasswordClass} name="repeat_password" type="password" />

                        <input id="signup_submit" className="front_account_management_submit" type="submit" value="Sign up" />
                        <div id="signup_login_section" className="front_account_management_change_section">
                            <p id="signup_login_text" className="front_account_management_change_text">Already have a user?&nbsp;</p>
                            <Link id="signup_login" to="/login">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
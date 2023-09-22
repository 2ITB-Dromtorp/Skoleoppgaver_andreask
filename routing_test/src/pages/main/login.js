import Button from '../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <div id="login_container">
                    <h1 id="login_header">Logg inn</h1>
                    <form id="login_form">
                        <label className="login_label" for="username">Username or email address</label>
                        <input id="login_username_input" className="login_text_input" name="username" type="text"></input>
                        <label className="login_label" for="password">Passord</label>
                        <input id="login_password_input" className="login_text_input" name="password" type="password"></input>
                        <Link id="forgot_password" to="./forgot_password">Forgot password?</Link>
                        <button id="login_username_input" type="submit">Logg inn</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Introduction;
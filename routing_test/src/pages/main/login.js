import Button from '../../button';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <div className="content_center">
                <div id="login_container">
                    <h1 id="login_header">Logg inn</h1>
                    <form id="login_form">
                        <label className="login_label" for="username">Brukernavn eller epost adresse</label>
                        <input id="login_username_input" className="login_text_input" name="username" type="text"></input>
                        <div id="login_bottom_section">
                            <label className="login_label" for="password">Passord</label>
                            <input id="login_password_input" className="login_text_input" name="password" type="password"></input>
                            <Link id="login_forgot_password" to="/reset_password">Glemt passord?</Link>
                            <Button id="login_submit" type="submit">Logg inn</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
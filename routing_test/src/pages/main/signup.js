import { Link } from 'react-router-dom';

const SignUp = () => {

    return (
        <>
            <div className="content_center">
                <div id="signup_container" className="front_account_management_container">
                    <h1 id="signup_header" className="front_account_management_header">Logg inn</h1>
                    <form id="signup_form" className="front_account_management_form">
                        <label className="signup_label front_account_management_layer" for="username">Brukernavn eller epost adresse</label>
                        <input id="signup_username_input" className="front_account_management_username_input front_account_management_text_input" name="username" type="text" />
                        <div id="signup_bottom_section" className="front_account_management_bottom_section">
                            <label className="signup_label front_account_management_layer" for="password">Passord</label>
                            <input id="signup_password_input" className="front_account_management_password_input front_account_management_text_input" name="password" type="password" />
                            <Link id="signup_forgot_password" to="/reset_password">Glemt passord?</Link>
                            <input id="signup_submit" className="front_account_management_submit" type="submit" value="Logg inn" />
                            <div id="signup_register_section" className="front_account_management_change_section">
                                <p id="signup_register_text">Har ikke en bruker?&nbsp;</p>
                                <Link id="signup_register" to="/signup">Registrer deg</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
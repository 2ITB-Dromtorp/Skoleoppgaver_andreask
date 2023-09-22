import { Link } from 'react-router-dom';

const SignUp = () => {

    return (
        <>
            <div className="content_center">
                <div id="signup_container" className="front_account_management_container">
                    <h1 id="signup_header" className="front_account_management_header">Registrer deg</h1>
                    <form id="signup_form" className="front_account_management_form">

                        <label className="signup_label front_account_management_layer" for="signup_username_input">Brukernavn</label>
                        <input id="signup_username_input" className="front_account_management_username_input front_account_management_text_input" name="username" type="text" />

                        <label className="signup_label front_account_management_layer" for="signup_email_input">Epost adresse</label>
                        <input id="signup_email_input" className="front_account_management_email_input front_account_management_text_input" name="email" type="text" />

                        <label className="signup_label front_account_management_layer" for="signup_username_input">Passord</label>
                        <input id="signup_username_input" className="front_account_management_username_input front_account_management_text_input" name="password" type="password" />

                        <label className="signup_label front_account_management_layer" for="signup_repeat_password_input">Gjenta passord</label>
                        <input id="signup_repeat_password_input" className="front_account_management_password_input front_account_management_text_input" name="repeat_password" type="password" />

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
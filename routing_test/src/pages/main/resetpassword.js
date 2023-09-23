const ResetPassword = () => {
    return (
        <>
            <div className="content_center">
                <div id="reset_password_container" className="front_account_management_container">
                    <h1 id="reset_password_header" className="front_account_management_header">Logg inn</h1>
                    <form id="reset_password_form" className="front_account_management_form">
                        <label className="reset_password_label front_account_management_layer" for="reset_password_username_input">Brukernavn eller epost adresse</label>
                        <input id="reset_password_username_input" className="front_account_management_username_input front_account_management_text_input" name="username" type="text" />
                        <input id="reset_password_submit" className="front_account_management_submit" type="submit" value="Tilbakestill passord" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
import Button from '../../button';

const ResetPassword = () => {
    return (
        <>
            <div className="content_center">
                <div id="reset_password_container">
                    <h1 id="reset_password_header">Tilbakestill passord</h1>
                    <form id="reset_password_form">
                        <label className="reset_password_label" for="username">Brukernavn eller epost adresse</label>
                        <input id="reset_password_username_input" className="reset_password_text_input" name="username" type="text"></input>
                        <Button id="reset_password_submit" type="submit">Tilbakestill passord</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
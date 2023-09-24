import Button from '../../button';

const Contact = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Contact Us</h1>
                    <p>Have questions, suggestions, or just want to say hello? We'd love to hear from you! Feel free to get in touch with us using the contact form below or through our social media channels.</p>
                    <span className="section_space medium"></span>
                    <h2>Contact Form</h2>
                    <p>Please fill out the form below, and we'll get back to you as soon as possible</p>
                    <div id="contact_form_container" className="form_container">
                        <form id="contact_form">
                            <label className="form_label" for="contact_form_name">Name</label>
                            <input id="contact_form_name" type="text" name="name" />
                            <label className="form_label" for="contact_form_email">Email address</label>
                            <input id="contact_form_email" type="text" name="email" />
                            <label className="form_label" for="contact_form_subject">Subject</label>
                            <input id="contact_form_subject" type="text" name="subject" />
                            <label className="form_label" for="contact_form_message">Message</label>
                            <input id="contact_form_message" type="text" name="message" />
                            <label className="form_label form_file_label" for="contact_form_files"><Button>Attachments</Button></label>
                            <input id="contact_form_files" className="form_file_input" type="file" name="files" multiple />
                            <label className="form_label" >Captcha</label>
                            <div id="contact_form_captcha">
                                <label className="form_label">Are you human?</label>
                                <br/>
                                <input id="contact_form_captcha_checkbox" className="form_checkbox_input captcha_checkbox_input" type="checkbox" name="captcha" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
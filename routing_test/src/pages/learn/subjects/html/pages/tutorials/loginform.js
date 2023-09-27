import { Highlighter } from "../../../../../../syntaxhighlighter";

const LoginFormTutorial = () => {
    return (
        <>
            <h1>Tutorial: HTML Log In Page</h1>
            <p>Creating a simple HTML login form is a fundamental step in web development. In this beginner's tutorial, we will walk through the process of creating a basic login form using HTML. This form will include fields for a username and password, along with a "Submit" button.</p>
            <span className="section_space small"></span>
            <h2>Set Up Your HTML Document</h2>
            <p>Start by creating a new HTML file and opening it in a text editor or integrated development environment (IDE). You can name the file something like login.html. Here's the basic structure of an HTML document:</p>
            <Highlighter language="html">{`<!DOCTYPE html>
<html>
<head>
    <title>Login Form</title>
</head>
<body>

<!-- Your login form will go here -->

</body>
</html>`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Create the Login Form</h2>
            <p>Within the <code>{`<body>`}</code> tags of your HTML document, add the code for the login form. Use the <code>{`<form>`}</code> element to encapsulate the form fields, and include two <code>{`<input>`}</code> elements for the username and password. Also, add a <code>{`<button>`}</code> element to submit the form.</p>
            <Highlighter language="html">{`<form id="loginForm" action="process_login.php" method="POST">
    <h2>Login</h2>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Login</button>
</form>`}</Highlighter>
<p>In this code:</p>
<dl className="desc_list">
    <dt>action</dt>
    <dd>This attribute specifies where the form data will be sent when the user submits the form. In this example, it's set to process_login.php, but you can change it to the URL of your backend script or server endpoint.</dd>
    <dt>method</dt>
    <dd>This attribute specifies the HTTP method used to send the form data. Typically, you use POST for sensitive data like passwords.</dd>
    <dt>label</dt>
    <dd>Labels provide a text description for each input field, improving accessibility and user experience.</dd>
    <dt>required</dt>
    <dd>This attribute makes the fields mandatory, ensuring the user enters data before submitting the form.</dd>
</dl>
            <span className="section_space small"></span>
            <h2>Style Your Form</h2>
            <p>You can add CSS styles to make your form visually appealing. Here's a basic example:</p>
            <Highlighter language="html">{`<style>
    #loginForm {
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
    }

    h2 {
        text-align: center;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }
</style>`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Test Your Login Form</h2>
            <p>Open the HTML file in a web browser to see your login form in action. You can enter a username and password, and when you click the "Login" button, the form will submit the data to the URL specified in the action attribute.</p>
            <p>Remember that this is just the frontend part of a login form. To make it functional, you'll need a server-side script to handle the login logic and interact with a database if necessary. Security considerations, such as hashing passwords, should also be taken into account when building a real-world login system.</p>
        </>
    );
}

export default LoginFormTutorial;
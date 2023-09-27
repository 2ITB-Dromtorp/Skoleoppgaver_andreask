import { Highlighter } from "../../../../../syntaxhighlighter";

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Beginner's Tutorial for HTML Forms</h1>
            <p>HTML forms are essential elements for collecting user input on a webpage. Whether you want to gather user information, take survey responses, or create a login page, forms are your go-to tool. In this beginner's tutorial, we'll walk you through the basics of creating HTML forms step by step.</p>
            <span className="section_space small"></span>
            <h2>Introduction to HTML Forms</h2>
            <p>HTML forms allow users to enter data that can be sent to a server for processing or used on the webpage itself. They consist of various input elements like text inputs, radio buttons, checkboxes, and buttons, among others. In this tutorial, we'll focus on the fundamental elements to get you started.</p>
            <span className="section_space small"></span>
            <h2>Basic Form Structure</h2>
            <p>To create a basic HTML form, you need to use the <code>{`<form>`}</code> element. The <code>{`<form>`}</code> element contains all the form controls (input fields, buttons, etc.) and defines how the data is sent. Here's a simple example:</p>
            <Highlighter language="html">{`<!DOCTYPE html>
<html>
<head>
    <title>My First Form</title>
</head>
<body>
    <form>
        <!-- Form controls go here -->
    </form>
</body>
</html>`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Form Elements</h2>
            <p>Let's explore some common form elements:</p>
            <span className="section_space small"></span>
            <h3>Text Inputs</h3>
            <p>Text inputs are used for single-line text input. You can create them using the <code>{`<input>`}</code> element with the type="text" attribute:</p>
            <Highlighter language="html">{`<input type="text" id="username" name="username" placeholder="Enter your username">`}</Highlighter>
            <span className="section_space small"></span>
            <h3>Introduction to HTML Forms</h3>
            <p>Attributes</p>
            <dl className="desc_list">
                <dt>type="text"</dt>
                <dd>Specifies that it's a text input.</dd>
                <dt>id</dt>
                <dd>Is a unique identifier for the input element.</dd>
                <dt>name</dt>
                <dd>Is used to identify the input when the form is submitted.</dd>
                <dt>placeholder</dt>
                <dd>Provides a hint to the user about the expected input.</dd>
            </dl>
            <span className="section_space small"></span>
            <h3>Radio Buttons and Checkboxes</h3>
            <p>Radio buttons and checkboxes allow users to make choices. Radio buttons allow a single selection, while checkboxes permit multiple selections. Use the <code>{`<input>`}</code> element with type="radio" and type="checkbox":</p>
            <Highlighter language="javascript">{`<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>

<input type="checkbox" id="subscribe" name="subscribe" value="yes">
<label for="subscribe">Subscribe to our newsletter</label>`}</Highlighter>
            <p>Attributes</p>
            <dl className="desc_list">
                <dt>type="radio" and type="checkbox"</dt>
                <dd>Define the input type.</dd>
                <dt>name</dt>
                <dd>Groups radio buttons (only one can be selected) and checkboxes (multiple can be selected) together.</dd>
                <dt>value</dt>
                <dd>Specifies the value that will be sent to the server when the form is submitted.</dd>
                <dt>label</dt>
                <dd>Provides a clickable label associated with the input as well as letting screen readers connect them to their input fields.</dd>
            </dl>
            <span className="section_space small"></span>
            <h3>Dropdown Menus</h3>
            <p>Dropdown menus are created using the <code>{`<select>`}</code> element and contain a list of options defined by <code>{`<option>`}</code> elements:</p>
            <Highlighter language="html">{`<select id="country" name="country">
    <option value="usa">United States</option>
    <option value="canada">Canada</option>
    <option value="uk">United Kingdom</option>
</select>`}</Highlighter>
            <p>Attributes</p>
            <dl className="desc_list">
                <dt><code>{`<select>`}</code></dt>
                <dd>Creates the dropdown.</dd>
                <dt><code>{`<option>`}</code></dt>
                <dd>Specifies the individual options within the dropdown.</dd>
                <dt>value in <code>{`<option>`}</code></dt>
                <dd>Defines the value sent to the server when an option is selected.</dd>
            </dl>
            <span className="section_space small"></span>
            <h3>Buttons</h3>
            <p>Buttons are used to submit forms or trigger actions. You can create them with the <code>{`<button>`}</code> element:</p>
            <Highlighter language="html">{`<button type="submit">Submit</button>
<button type="reset">Reset</button>`}</Highlighter>
            <p>Attributes</p>
            <dl className="desc_list">
                <dt>type="submit"</dt>
                <dd>Triggers form submission.</dd>
                <dt>type="reset"</dt>
                <dd>Clears all form inputs.</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Form Attributes</h2>
            <p>The <code>{`<form>`}</code> element has important attributes:</p>
            <dl className="desc_list">
                <dt>action</dt>
                <dd>Specifies the URL where the form data will be sent.</dd>
                <dt>method</dt>
                <dd>Defines the HTTP method used for sending data, usually "GET" or "POST".</dd>
            </dl>
            <p>Example:</p>
            <Highlighter>{`<form action="process.php" method="post">
    <!-- Form controls go here -->
</form>`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Form Submission</h2>
            <p>When a user submits the form, the data is sent to the URL specified in the action attribute. You can use server-side languages like PHP, Python, or JavaScript to process the submitted data.</p>
            <span className="section_space small"></span>
            <h2>Conclusion</h2>
            <p>Congratulations! You've learned the basics of creating HTML forms. With these building blocks, you can start collecting user data and creating interactive web applications. As you progress, explore additional form elements and attributes to enhance your forms.</p>
        </>
    );
}

export default BeginnerTutorial;
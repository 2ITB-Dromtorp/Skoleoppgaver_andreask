import { Highlighter } from '../../../../../syntaxhighlighter';

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Getting Started with CSS: A Beginner's Tutorial</h1>
            <p>CSS (Cascading Style Sheets) is a fundamental technology for web development that allows you to control the design and layout of your web pages. Whether you're a beginner or have some coding experience, this tutorial will introduce you to the basics of CSS.</p>
            <span className="section_space medium"></span>
            <h2>What is CSS?</h2>
            <p>CSS stands for "Cascading Style Sheets." It's a stylesheet language that describes how HTML elements should be displayed on a web page. CSS separates the content of your webpage (HTML) from its presentation (CSS), making it easier to create visually appealing and responsive websites.</p>
            <span className="section_space medium"></span>
            <h2>Getting Started</h2>
            <dl className="desc_list">
                <dt>Create an HTML Document</dt>
                <dd>
                    <p>Before diving into CSS, you need an HTML document to apply styles to. Here's a simple HTML template to get you started:</p>
                    <Highlighter language="html">{`<!DOCTYPE html>
<html>
    <head>
        <title>My First CSS Page</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is my first web page with CSS.</p>
    </body>
</html>`}</Highlighter>
                    <p>Save this code in an HTML file (e.g., index.html) and open it in a web browser to see the basic structure.</p>
                </dd>
                <dt>Create a CSS File</dt>
                <dd>Next, create a separate CSS file to contain your styles. Create a new file and save it with a .css extension, such as styles.css. This is where you'll define your CSS rules.</dd>
                <dt>Link CSS to HTML</dt>
                <dd>
                    <p>To connect your CSS file to your HTML document, add the following line inside the {`<head>`} section of your HTML file:</p>
                    <Highlighter language="html">{`<link rel="stylesheet" type="text/css" href="styles.css">`}</Highlighter>
                    <p>Replace "styles.css" with the actual filename and path to your CSS file.</p>
                </dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Basic CSS Syntax</h2>
            <p>CSS rules consist of two main parts: a selector and a declaration block. Here's the basic structure:</p>
            <Highlighter language="css">{`selector {
    property: value;
    /* More properties and values */
}`}</Highlighter>
            <dl>
                <dt>Selector</dt>
                <dd>Specifies which HTML elements the style should apply to. For example, h1 selects all {`<h1>`} elements.</dd>
                <dt>Declaration Block</dt>
                <dd>Contains one or more property-value pairs enclosed in curly braces <code>{`{}`}</code>. Each property is followed by a colon <code>:</code> and a value, and each declaration ends with a semicolon <code>;</code>.</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Applying CSS Styles</h2>
            <p>Let's start by applying some basic styles to our HTML elements.</p>
            <h3>Styling Headings</h3>
            <p>In your CSS file (styles.css), add the following code to change the color and font of your heading:</p>
            <Highlighter language="css">{`h1 {
    color: blue;
    font-family: Arial, sans-serif;
}`}</Highlighter>
            <p>In this example, we selected all {`<h1>`} elements and changed their text color to blue and their font to Arial.</p>
            <span className="section_space small"></span>
            <h3>Styling Paragraphs</h3>
            <p>To style paragraphs, add this code to your CSS file:</p>
            <Highlighter language="css">{`p {
    color: #333;
    font-size: 16px;
}`}</Highlighter>
            <p>This will change the text color of all paragraphs to a dark gray and set their font size to 16 pixels.</p>
            <span className="section_space small"></span>
            <h3>Linking CSS to HTML</h3>
            <p>Refresh your HTML page in the browser, and you'll see the changes take effect. Your heading should now be blue, and the paragraphs will have a dark gray text color and a larger font size.</p>
            <span className="section_space medium"></span>
            <h2>Additional CSS Properties</h2>
            <dl className="desc_list">
                <dt>background-color</dt>
                <dd>Sets the background color of an element.</dd>
                <dt>margin</dt>
                <dd>Adds space between surrounding elements.</dd>
                <dt>padding</dt>
                <dd>Adds space around its elements.</dd>
                <dt>text-align</dt>
                <dd>Aligns text within an element (e.g., text-align: center;).</dd>
                <dt>border</dt>
                <dd>Adds borders around elements.</dd>
                <dt>width and height</dt>
                <dd>Define the dimensions of elements.</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Conclusion</h2>
            <p>Congratulations! You've taken your first steps into the world of CSS. This beginner's guide has introduced you to the basics of CSS syntax and applying styles to HTML elements. As you continue to explore and practice, you'll gain a deeper understanding of CSS and its capabilities, allowing you to create beautiful and responsive websites. Happy coding!</p>
        </>
    );
}

export default BeginnerTutorial;
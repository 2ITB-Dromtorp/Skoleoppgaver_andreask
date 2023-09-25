import { Highlighter } from "../../../../../syntaxhighlighter";

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Getting Started with HTML: A Beginner's Tutorial</h1>
            <p>Welcome to the world of web development! HTML (HyperText Markup Language) is the perfect place to start your journey into creating web pages. In this beginner's tutorial, we'll introduce you to the basics of HTML and guide you through creating your first webpage.</p>
            <span className="section_space small"></span>
            <h2>Setting Up Your Workspace</h2>
            <p>Before we dive into HTML, make sure you have a code editor installed on your computer. Some popular code editors include Visual Studio Code, Sublime Text, and Atom. Choose one that suits your preferences.</p>
            <span className="section_space small"></span>
            <h2>Creating Your First HTML Document</h2>
            <p>To create your first HTML document, follow these steps:</p>
            <dl className="desc_list">
                <dt>Create a New Folder</dt>
                <dd>Create a new folder on your computer. This will be the home for your HTML file and any other related files (like images or stylesheets) as you progress.</dd>
                <dt>Open Your Code Editor</dt>
                <dd>Open your code editor and navigate to the folder you created.</dd>
                <dt>Create a New HTML File</dt>
                <dd>Create a new file and save it with the ".html" extension. For example, you can name it "index.html."</dd>
                <dt>Start Writing HTML</dt>
                <dd>Open the HTML file in your code editor and let's start writing HTML!</dd>
            </dl>
            <span className="section_space small"></span>
            <h2>Basic Structure of an HTML Document</h2>
            <p>Every HTML document follows a basic structure:</p>
            <Highlighter language="html">{`<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Your Page Title</title>
    </head>
    <body>
        <!-- Your content goes here -->
    </body>
</html>`}</Highlighter>
            <dl className="desc_list">
                <dt>{`<!DOCTYPE html>`}</dt>
                <dd>Declares that this is an HTML5 document.</dd>
                <dt>{`<html>`}</dt>
                <dd>The root element that wraps the entire HTML content.</dd>
                <dt>{`<head>`}</dt>
                <dd>Contains meta-information about the document, such as the page title and character encoding.</dd>
                <dt>{`<meta charset="UTF-8">`}</dt>
                <dd>Specifies the character encoding for your document (UTF-8 is common and supports many languages).</dd>
                <dt>{`<title>`}</dt>
                <dd>Sets the title that appears in the browser tab.</dd>
                <dt>{`<body>`}</dt>
                <dd>Contains the visible content of your webpage.</dd>
            </dl>
            <span className="section_space small"></span>
            <h2>Adding Content</h2>
            <p>Now, let's add some content to your webpage. Here are some basic HTML elements you can use:</p>
            <dl className="desc_list">
                <dt>{`<h1>`} to {`<h1>`}</dt>
                <dd>Headings (largest to smallest).</dd>
                <dt>{`<p>`}</dt>
                <dd>Paragraphs.</dd>
                <dt>{`<a href="#">`}</dt>
                <dd>Links.</dd>
                <dt>{`<img src="image.jpg" alt="description">`}</dt>
                <dd>Images.</dd>
                <dt>{`<ul>`} and {`<ol>`}</dt>
                <dd>Unordered and ordered lists.</dd>
                <dt>{`<li>`}</dt>
                <dd>List items.</dd>
                <dt>{`<strong>`} and {`<em>`}</dt>
                <dd>Emphasis (bold and italic).</dd>
            </dl>
            <p>For example, to create a simple webpage with a heading and a paragraph:</p>
            <Highlighter language="html">{`<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>My First Webpage</title>
    </head>
    <body>
        <h1>Welcome to My Webpage</h1>
        <p>This is a simple webpage created with HTML.</p>
    </body>
</html>`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Viewing Your Webpage</h2>
            <p>To view your webpage, simply open your HTML file in a web browser (e.g., Chrome, Firefox, or Edge). You should see your content displayed as you've written it in your HTML file.</p>
            <p>Congratulations! You've just created your first HTML webpage. This is just the beginning of your journey into web development. As you progress, you'll learn more HTML tags, CSS for styling, and JavaScript for interactivity, allowing you to create dynamic and engaging websites. Happy coding!</p>
        </>
    );
}

export default BeginnerTutorial;
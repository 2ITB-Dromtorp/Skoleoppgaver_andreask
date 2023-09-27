import { Highlighter } from '../../../../../../syntaxhighlighter';

const pReference = () => {
    return (
        <>
            <h1>HTML {`<p>`} Element</h1>
            <h2>Introduction</h2>
            <p>The HTML <code>{`<p>`}</code> (paragraph) tag is a fundamental element used to define and structure text content within a web page. It is designed to create paragraphs of text, making it an essential building block for organizing and presenting textual information on websites.</p>
            <span className="section_space medium"></span>
            <h2>Syntax</h2>
            <p>The basic syntax for the <code>{`<p>`}</code> tag is as follows:</p>
            <Highlighter language="html">{`<p>Text content goes here.</p>`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Attributes</h2>
            <p>The <code>{`<p>`}</code> tag supports several attributes, although it is primarily used without any attributes. Common attributes include:</p>
            <ul>
                <li><code>{`class`}</code>: Specifies one or more class names for the element, which can be used to apply CSS styles or JavaScript functionality.</li>
                <li><code>{`id`}</code>: Provides a unique identifier for the element, making it accessible for styling or scripting.</li>
                <li><code>{`style`}</code>: Allows inline CSS styles to be applied directly to the paragraph.</li>
            </ul>
            <span className="section_space medium"></span>
            <h2>Usage</h2>
            <p>The <code>{`<p>`}</code> tag is used to enclose and define paragraphs of text. It is commonly used in the body of an HTML document to separate and structure textual content. Multiple <code>{`<p>`}</code> tags can be used to create multiple paragraphs.</p>
            <Highlighter language="html">{`<p>This is the first paragraph of text.</p>
<p>This is the second paragraph of text.</p>`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Browser Support</h2>
            <p>The <code>{`<p>`}</code> tag is supported by all major web browsers and is considered a standard HTML element.</p>
            <span className="section_space medium"></span>
            <h2>Related Elements</h2>
            <p>Elements related to the <code>{`<p>`}</code> tag.</p>
            <ul>
                <li><code>{`<h1>`}</code> - <code>{`<h6>`}</code>: Headings for section titles.</li>
                <li><code>{`<h1>`}</code> and <code>{`<h6>`}</code>: Used for emphasizing and highlighting text within paragraphs.</li>
                <li><code>{`<a>`}</code>: Hyperlinks for linking to other web pages or resources.</li>
                <li><code>{`<blockquote>`}</code>: Used for long quotations.</li>
            </ul>
        </>
    );
}

export default pReference;
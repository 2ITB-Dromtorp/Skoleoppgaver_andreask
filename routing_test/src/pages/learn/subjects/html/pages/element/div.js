import { Highlighter } from '../../../../../../syntaxhighlighter';

const divReference = () => {
    return (
        <>
            <h1>HTML {`<div>`} Element</h1>
            <h2>Introduction</h2>
            <p>The HTML <code>{`<div>`}</code> (paragraph) tag, short for "division," is a versatile and fundamental element used to create container blocks within a web page's structure. It is a block-level element that does not carry any inherent semantic meaning but serves as a building block for organizing and styling content.</p>
            <span className="section_space medium"></span>
            <h2>Syntax</h2>
            <p>The basic syntax for the <code>{`<div>`}</code> tag is as follows:</p>
            <Highlighter language="html">{`<div>Content goes here.</div>`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Attributes</h2>
            <p>The <code>{`<div>`}</code> tag supports several attributes. Common attributes include:</p>
            <ul>
                <li><code>{`class`}</code>: Specifies one or more class names for the element, enabling the application of CSS styles or JavaScript functionality.</li>
                <li><code>{`id`}</code>: Provides a unique identifier for the element, making it accessible for styling or scripting.</li>
                <li><code>{`style`}</code>: Allows inline CSS styles to be applied directly to the division.</li>
            </ul>
            <span className="section_space medium"></span>
            <h2>Usage</h2>
            <p>The <code>{`<div>`}</code> tag is employed to create block-level containers within an HTML document. These containers are often used to group and structure content, making it easier to apply styles, layout designs, or JavaScript functionality.</p>
            <Highlighter language="html">{`<div>
    <h1>Heading</h1>
    <p>This is a paragraph of text.</p>
</div>`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Browser Support</h2>
            <p>The <code>{`<div>`}</code> tag is supported by all major web browsers and is considered a standard HTML element. It has been part of the HTML specification for many years, making it a reliable choice for web development.</p>
            <span className="section_space medium"></span>
            <h2>Related Elements</h2>
            <p>The <code>{`<div>`}</code> tag is often used in conjunction with other HTML elements to create structured and styled web pages. Related tags include:</p>
            <ul>
                <li><code>{`<span>`}</code>: Similar to the <code>{`<div>`}</code> tag, but used for inline content instead of block-level content.</li>
                <li><code>{`<section>`}</code>, <code>{`<article>`}</code>, <code>{`<header>`}</code>, <code>{`<footer>`}</code>, <code>{`<nav>`}</code> and <code>{`<aside>`}</code>: Semantic HTML5 elements used for structuring content within a page, providing meaning to different sections.</li>
            </ul>
        </>
    );
}

export default divReference;
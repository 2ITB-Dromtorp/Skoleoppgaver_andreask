const Introduction = () => {
    return (
        <>
            <h1>HTML</h1>
            <p><b>HTML</b>, or HyperText Markup Language, is the backbone of the web, serving as the essential language for structuring and presenting content on websites. To work effectively with HTML, it's crucial to grasp its technical properties, which include:</p>
            <dl className="desc_list">
                <dt>Syntax and Structure</dt>
                <dd>
                    <ul>
                        <li>HTML documents are text files typically saved with the ".html" file extension.</li>
                        <li>An HTML document consists of a series of elements enclosed in opening and closing tags. Tags are often written in angle brackets, like <code>{`<tagname>`}</code> and <code>{`</tagname>`}</code>.</li>
                        <li>Elements are organized into a hierarchical structure known as the Document Object Model (DOM). The DOM tree represents the relationship between elements on a webpage.</li>
                    </ul>
                </dd>
                <dt>Tags</dt>
                <dd>
                    <ul>
                        <li>HTML tags are used to define different elements within a document.</li>
                        <li>Tags are often paired, consisting of an opening tag <code>{`<tagname>`}</code> and a closing tag <code>{`</tagname>`}</code>. The content to be affected is placed between these tags.</li>
                        <li>Some tags are self-closing, meaning they don't require a closing tag. For example, the line break tag: <code>{`<br>`}</code>.</li>
                        <li>Common tags include <code>{`<html>`}</code>, <code>{`<head>`}</code>, <code>{`<title>`}</code>, <code>{`<body>`}</code>, <code>{`<p>`}</code>, <code>{`<h1>`}</code>, <code>{`<a>`}</code>, <code>{`<img>`}</code>, and many more.</li>
                    </ul>
                </dd>
                <dt>Attributes</dt>
                <dd>
                    <ul>
                        <li>HTML elements can have attributes that provide additional information about the element.</li>
                        <li>Attributes are specified within the opening tag and consist of a name and a value, separated by an equals sign. For example: <code>{`<img src="image.jpg" alt="Description">`}</code>.</li>
                        <li>Attributes serve various purposes, such as specifying the source of an image, setting the link destination for an anchor (<code>{`<a>`}</code>) element, or defining the dimensions of an element.</li>
                    </ul>
                </dd>
                <dt>Document Structure</dt>
                <dd>
                    <ul>
                        <li>An HTML document typically starts with a <code>{`<!DOCTYPE>`}</code> declaration, followed by an <code>{`<html>`}</code> element that contains two main sections: <code>{`<head>`}</code> and <code>{`<body>`}</code>.</li>
                        <li>The <code>{`<head>`}</code> section contains metadata about the document, such as the document title, character encoding, and links to external resources (e.g., CSS and JavaScript files).</li>
                        <li>The <code>{`<body>`}</code> section contains the visible content of the webpage, including text, images, links, and other elements.</li>
                    </ul>
                </dd>
                <dt>Text Content</dt>
                <dd>
                    <ul>
                        <li>HTML is used to structure and format text content, allowing you to create headings (<code>{`<h1>`}</code>, <code>{`<h2>`}</code>, ...), paragraphs (<code>{`<p>`}</code>), lists (<code>{`<ul>`}</code>, <code>{`<ol>`}</code>, <code>{`<li>`}</code>), and more.</li>
                        <li>Text can be styled using CSS for fonts, colors, alignment, and other visual properties.</li>
                    </ul>
                </dd>
                <dt>Links and Navigation</dt>
                <dd>
                    <ul>
                        <li>HTML provides the <code>{`<a>`}</code> (anchor) element for creating hyperlinks. These links can point to other web pages, resources, or locations within the same page.</li>
                        <li>Navigation menus and site structures are often created using a combination of HTML and CSS.</li>
                    </ul>
                </dd>
                <dt>Images and Multimedia</dt>
                <dd>
                    <ul>
                        <li>Images and multimedia content are embedded using elements like <code>{`<img>`}</code> (for images) and <code>{`<video>`}</code> or <code>{`<audio>`}</code> for multimedia files.</li>
                        <li>Alternative text (alt attribute) is used for images to provide descriptions for accessibility and in case the image fails to load.</li>
                    </ul>
                </dd>
                <dt>Forms and User Input</dt>
                <dd>
                    <ul>
                        <li>HTML includes form elements (<code>{`<form>`}</code>, <code>{`<input>`}</code>, <code>{`<textarea>`}</code>, <code>{`<select>`}</code>) for collecting user input. Forms are crucial for various web applications, including user registration, search, and more.</li>
                    </ul>
                </dd>
                <dt>Semantic HTML</dt>
                <dd>
                    <ul>
                        <li>Semantic HTML elements like <code>{`<header>`}</code>, <code>{`<nav>`}</code>, <code>{`<article>`}</code>, <code>{`<section>`}</code>, and <code>{`<footer>`}</code> provide a way to structure content meaningfully, making it easier for search engines and assistive technologies to understand and interpret web pages.</li>
                    </ul>
                </dd>
            </dl>
        </>
    );
}

export default Introduction;
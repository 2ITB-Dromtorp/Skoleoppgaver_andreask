import Button from '../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <h1>HTML</h1>
            <p><b>HTML</b> (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (<Link to="../css">CSS</Link>) or functionality/behavior (<Link to="../javascript">JavaScript</Link>).</p>
            <p>"Hypertext" refers to links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web.</p>
            <p>HTML uses "markup" to annotate text, images, and other content for display in a Web browser. HTML markup includes special "elements" such as <code>{`<head>`}</code>, <code>{`<title>`}</code>, <code>{`<body>`}</code>, <code>{`<header>`}</code>, <code>{`<footer>`}</code>, <code>{`<article>`}</code>, <code>{`<section>`}</code>, <code>{`<p>`}</code>, <code>{`<div>`}</code>, <code>{`<span>`}</code>, <code>{`<img>`}</code>, <code>{`<aside>`}</code>, <code>{`<audio>`}</code>, <code>{`<canvas>`}</code>, <code>{`<datalist>`}</code>, <code>{`<details>`}</code>, <code>{`<embed>`}</code>, <code>{`<nav>`}</code>, <code>{`<search>`}</code>, <code>{`<output>`}</code>, <code>{`<progress>`}</code>, <code>{`<video>`}</code>, <code>{`<ul>`}</code>, <code>{`<ol>`}</code>, <code>{`<li>`}</code> and many others.</p>
            <p>An HTML element is set off from other text in a document by "tags", which consist of the element name surrounded by {`"<"`} and {`">"`}. The name of an element inside a tag is case-insensitive. That is, it can be written in uppercase, lowercase, or a mixture. For example, the <code>{`<title>`}</code> tag can be written as <code>{`<Title>`}</code>, <code>{`<TITLE>`}</code>, or in any other way. However, the convention and recommended practice is to write tags in lowercase.</p>
            <p>The articles below can help you learn more about HTML.</p>
            <h2>Key resources</h2>
            <dl className="desc_list">
                <dt>Introduction</dt>
                <dd>If you're new to web development, be sure to read our <Link to="./introduction">HTML Basics</Link> article to learn what HTML is and how to use it.</dd>
                <dt>Tutorials</dt>
                <dd>For articles about how to use HTML, as well as tutorials and complete examples, check out our <Link to="./learn">HTML Learning</Link> Area.</dd>
                <dt>Reference</dt>
                <dd>In our extensive <Link to="./introduction">HTML Reference</Link> section, you'll find the details about every element and attribute in HTML.</dd>
            </dl>
            <Link className="button_link" to="/signup"><Button>Sign up to track progress</Button></Link>
        </>
    );
}

export default Introduction;
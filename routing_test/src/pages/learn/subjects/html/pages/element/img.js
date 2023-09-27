import { Highlighter } from '../../../../../../syntaxhighlighter';

const imgReference = () => {
    return (
        <>
            <h1>HTML {`<img>`} Element</h1>
            <h2>Introduction</h2>
            <p>The HTML <code>{`<img>`}</code> (image) tag is used to embed images into web pages. Images are a crucial component of web content, and the <code>{`<img>`}</code> tag allows web developers to display graphics, photographs, icons, and other visual elements within their HTML documents.</p>
            <span className="section_space medium"></span>
            <h2>Syntax</h2>
            <p>The basic syntax for the <code>{`<img>`}</code> tag is as follows:</p>
            <Highlighter language="html">{`<img src="image.jpg" alt="Image Description">`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Attributes</h2>
            <p>The <code>{`<img>`}</code> tag supports several attributes, with src and alt being the most essential:</p>
            <ul>
                <li><code>{`src`}</code>: Specifies the source URL of the image. It can be a relative or absolute URL.</li>
                <li><code>{`alt`}</code>: Provides alternative text for the image, which is displayed if the image cannot be loaded or for accessibility purposes.</li>
                <li><code>{`title`}</code>: Adds a tooltip that appears when the user hovers over the image.</li>
            </ul>
            <span className="section_space medium"></span>
            <h2>Usage</h2>
            <p>The <code>{`<img>`}</code> tag is used to insert images into an HTML document. It is a self-closing tag, meaning it doesn't have a closing <code>{`</img>`}</code> tag. Here's a basic example:</p>
            <Highlighter language="html">{`<img src="example.jpg" alt="An example image">`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Browser Support</h2>
            <p>The <code>{`<img>`}</code> tag is universally supported by all web browsers and is a standard HTML element. However, it's important to use it correctly to ensure compatibility and accessibility.</p>
            <span className="section_space medium"></span>
            <h2>Related Elements</h2>
            <p>Images often appear within other HTML elements and are combined with various tags for different purposes. Some related tags include:</p>
            <ul>
                <li><code>{`<a>`}</code>: Used to turn an image into a clickable link by wrapping the <code>{`<img>`}</code> tag within an anchor tag.</li>
                <li><code>{`<figure>`}</code> and <code>{`<figcaption>`}</code>: Used for embedding images with captions, providing semantic meaning to the image and its description.</li>
                <li><code>{`<map>`}</code> and <code>{`<area>`}</code>: Used for creating image maps, allowing different regions of an image to link to different URLs or trigger actions.</li>
            </ul>
        </>
    );
}

export default imgReference;
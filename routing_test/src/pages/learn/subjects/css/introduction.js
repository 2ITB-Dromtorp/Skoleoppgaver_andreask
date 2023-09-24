const Introduction = () => {
    return (
        <>
            <h1>CSS</h1>
            <h2>Selectors</h2>
            <p>Selectors are the building blocks of CSS rules. They determine which HTML elements the CSS rules should be applied to. There are various types of selectors, including:</p>
            <dl className="desc_list">
                <dt>Element Selector</dt>
                <dd>Selects HTML elements based on their tag name. For example, <code>p</code> selects all paragraphs on a page.</dd>
                <dt>Class Selector</dt>
                <dd>Selects elements with a specific class attribute. For example, <code>.highlight</code> selects all elements with the class <code>highlight</code>.</dd>
                <dt>ID Selector</dt>
                <dd>Selects a single element with a specific ID attribute. For example, #header selects the element with the ID <code>header</code>.</dd>
                <dt>Universal Selector</dt>
                <dd>Selects all elements on a page. For example, <code>*</code> applies styles to all elements.</dd>
                <dt>Attribute Selector</dt>
                <dd>Selects elements with a specific attribute value. For example, <code>[type="text"]</code> selects input elements with the attribute <code>type</code> set to <code>text</code>.</dd>
                <dt>Pseudo-class Selector</dt>
                <dd>Selects elements based on their state or position, such as <code>:hover</code> (when the mouse is over an element) or <code>:nth-child(n)</code> (selects the nth child element).</dd>
            </dl>
            <h2>Properties</h2>
            <p>CSS properties are used to define how selected elements should be styled. Some common CSS properties include:</p>
            <dl className="desc_list">
                <dt>Color Properties</dt>
                <dd>
                    <ul>
                        <p><code>color</code>: Sets the text color.</p>
                        <p><code>background-color</code>: Sets the background color.</p>
                    </ul>
                </dd>
                <dt>Typography Properties</dt>
                <dd>
                    <ul>
                        <p><code>font-family</code>: Specifies the font used for text.</p>
                        <p><code>font-size</code>: Sets the size of the font.</p>
                        <p><code>font-weight</code>: Defines the thickness of the font.</p>
                        <p><code>line-height</code>: Adjusts the spacing between lines of text.</p>
                    </ul>
                </dd>
                <dt>Layout Properties</dt>
                <dd>
                    <ul>
                        <p><code>display</code>: Defines general behaviour and appearance of elements.</p>
                        <p><code>width</code> and <code>height</code>: Sets the dimensions of elements.</p>
                        <p><code>margin</code>: Adds space between surrounding elements.</p>
                        <p><code>padding</code>: Adds space around its elements.</p>
                    </ul>
                </dd>
                <dt>Border and Box Properties</dt>
                <dd>
                    <ul>
                        <p><code>border</code>: Sets the border properties (width, style, color).</p>
                        <p><code>border-radius</code>: Creates rounded corners.</p>
                        <p><code>box-shadow</code>: Adds shadows to elements.</p>
                    </ul>
                </dd>
                <dt>Flexbox and Grid Properties</dt>
                <dd>
                    <ul>
                        <p><code>display: flex</code> and <code>display: grid</code>: Enable flexible layouts.</p>
                        <p><code>flex-direction</code>, <code>align-items</code> and <code>justify-content</code> control flexible layout behavior.</p>
                    </ul>
                </dd>
                <dt>Animation and Transition Properties</dt>
                <dd>
                    <ul>
                        <p><code>animation</code>: Defines animations.</p>
                        <p><code>transition</code>: Specifies transitions for property changes.</p>
                    </ul>
                </dd>
                <dt>Transform Properties</dt>
                <dd>
                    <ul>
                        <p><code>transform</code>: Allows 2D and 3D transformations (e.g., rotation, scaling).</p>
                    </ul>
                </dd>
                <dt>Media Queries Properties</dt>
                <dd>
                    <ul>
                        <p><code>@media</code>: Allows for responsive design by applying styles based on the screen size or device characteristics.</p>
                    </ul>
                </dd>
            </dl>
        </>
    );
}

export default Introduction;
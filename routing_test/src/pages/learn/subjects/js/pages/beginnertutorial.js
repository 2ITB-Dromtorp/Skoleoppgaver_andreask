import { Highlighter } from '../../../../../syntaxhighlighter';

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Getting Started with JavaScript: A Beginner's Tutorial</h1>
            <p>Welcome to the world of JavaScript! JavaScript is a versatile and essential programming language for web development. In this beginner's tutorial, we'll introduce you to the basics of JavaScript, including its syntax, data types, and common programming concepts. By the end of this tutorial, you'll have a solid foundation to start writing your own JavaScript code.</p>
            <span className="section_space medium"></span>
            <h2>What is JavaScript?</h2>
            <p>JavaScript is a versatile programming language used for making web pages interactive and dynamic. It runs directly in web browsers, allowing you to manipulate web page content, respond to user actions, and communicate with web servers. JavaScript is an essential part of modern web development.</p>
            <span className="section_space medium"></span>
            <h2>Setting Up Your Environment</h2>
            <p>To get started with JavaScript, all you need is a web browser and a text editor. You can write JavaScript code directly in your browser's developer console or create separate .js files to include in your HTML documents. For more advanced development, you can also use integrated development environments (IDEs) like Visual Studio Code.</p>
            <span className="section_space medium"></span>
            <h2>Hello, World!</h2>
            <p>Let's begin with a simple "Hello, World!" example:</p>
            <Highlighter language='javascript'>{`console.log("Hello, World!");`}</Highlighter>
            <p>This code uses the console.log() function to display "Hello, World!" in the browser's console. You can open the console in most browsers by pressing F12 or Ctrl + Shift + I (Windows/Linux) or Cmd + Option + I (Mac).</p>
            <span className="section_space medium"></span>
            <h2>Variables and Data Types</h2>
            <p>JavaScript uses variables to store data. Variables can hold various data types, including:</p>
            <dl className="desc_list">
                <dt>Numbers</dt>
                <dd>{`let num = 42;`}</dd>
                <dt>Strings</dt>
                <dd>{`let greeting = "Hello, JavaScript!";`}</dd>
                <dt>Booleans</dt>
                <dd>{`let isTrue = true;`}</dd>
                <dt>Arrays</dt>
                <dd>{`let colors = ["red", "green", "blue"];`}</dd>
                <dt>Objects</dt>
                <dd>{`let person = { name: "John", age: 30 };`}</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Operators</h2>
            <p>JavaScript supports various operators for performing operations on variables:</p>
            <dl className="desc_list">
                <dt>Arithmetic Operators</dt>
                <dd>{`+, -, *, /, %`}</dd>
                <dt>Comparison Operators</dt>
                <dd>{`==, !=, ===, !==, <, >, <=, >=`}</dd>
                <dt>Logical Operators</dt>
                <dd>{`&&, ||, !`}</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Control Structures</h2>
            <p>Control structures like if statements and loops (for, while) allow you to control the flow of your program based on conditions.</p>
            <p>Example if statement:</p>
            <Highlighter language='javascript'>{`let age = 18;
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Functions</h2>
            <p>Functions in JavaScript allow you to encapsulate reusable code blocks. Here's a simple function:</p>
            <Highlighter language='javascript'>{`function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Alice");`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Control Structures</h2>
            <p>JavaScript can manipulate the Document Object Model (DOM) to interact with web page elements. You can access and modify HTML elements using JavaScript. Here's a simple example:</p>
            <Highlighter language='javascript'>{`// HTML: <p id="demo">Hello, World!</p>
let element = document.getElementById("demo");
element.innerHTML = "Hello, JavaScript!";`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Events</h2>
            <p>JavaScript can respond to user actions by handling events. You can attach event listeners to HTML elements to execute code when events occur, such as clicking a button or submitting a form.</p>
            <p>Example:</p>
            <Highlighter language='javascript'>{`let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    alert("Button clicked!");
});`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Conclusion and Next Steps</h2>
            <p>This beginner's tutorial provides you with a basic understanding of JavaScript. To continue your journey, explore more advanced topics like object-oriented programming, asynchronous programming, and working with external APIs. JavaScript is a powerful language, and there are countless resources available online to help you learn and grow as a developer. Happy coding!</p>
        </>
    );
}

export default BeginnerTutorial;
import { Highlighter } from '../../../../../../syntaxhighlighter';

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Getting Started with React: A Beginner's Tutorial</h1>
            <p>React Router is an essential library for handling routing in your React applications. It allows you to create dynamic, single-page applications (SPAs) with multiple views or pages without the need for full-page refreshes. In this beginner's tutorial, we'll walk through the basics of setting up and using React Router in your project.</p>
            <span className="section_space medium"></span>
            <h2>Prerequisites</h2>
            <p>Before you get started, make sure you have the following prerequisites in place:</p>
            <ol>
                <li>
                    Basic knowledge of React.
                </li>
                <li>
                    Node.js and npm (Node Package Manager) installed on your computer.
                </li>
            </ol>
            <span className="section_space medium"></span>
            <h2>Installation</h2>
            <p>To begin using React Router, you'll need to install it in your React project. You can do this by running the following command in your project directory:</p>
            <Highlighter>{`npm install react-router-dom`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Setting Up Routes</h2>
            <dl className="desc_list">
                <dt>Import Required Components</dt>
                <dd>
                    <p>In your main application file (usually App.js), import the necessary components from React Router.</p>
                    <Highlighter language="javascript">{`import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';`}</Highlighter>
                </dd>
                <dt>Wrap Your App with Router</dt>
                <dd>
                    <p>Wrap your entire application with the Router component to enable routing throughout your app.</p>
                    <Highlighter language="javascript">{`function App() {
    return (
        <Router>
        {/* Your application content */}
        </Router>
    );
}`}</Highlighter>
                </dd>
                <dt>Define Routes</dt>
                <dd>
                    <p>Inside the Router, define your routes using the Route component. Each Route should specify a path and the component to render when that path is matched.</p>
                    <Highlighter language="javascript">{`function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </Router>
    );
}`}</Highlighter>
                </dd>
                <dt>Switch Component</dt>
                <dd>Wrap your Route components with a Switch component. The Switch will ensure that only the first matching route is rendered, preventing multiple components from rendering simultaneously.</dd>
                <dt>Link Component</dt>
                <dd>
                    <p>To navigate between routes, use the Link component. It creates anchor tags that allow users to click and navigate to different routes.</p>
                    <Highlighter>{`import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}`}</Highlighter>
                </dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Creating Route Components</h2>
            <p>Now, let's create the components for the routes you defined earlier (Home, About, and Contact).</p>
            <Highlighter>{`// Home.js
import React from 'react';

function Home() {
    return <div>Welcome to the Home Page!</div>;
}

export default Home;`}</Highlighter>
            <Highlighter>{`// About.js
import React from 'react';

function About() {
  return <div>About Us</div>;
}

export default About;`}</Highlighter>
            <Highlighter>{`// Contact.js
import React from 'react';

function Contact() {
  return <div>Contact Us</div>;
}

export default Contact;`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Running Your App</h2>
            <p>To see your React Router in action, start your development server:</p>
            <Highlighter>{`npm start`}</Highlighter>
            <p>Open your web browser and visit <b>http://localhost:3000</b>. You should be able to navigate between the Home, About, and Contact pages using the links you created.</p>
            <span className="section_space medium"></span>
            <h2>Additional Features</h2>
            <p>React Router offers many more features, including nested routes, route parameters, route guards, and route redirection. As you become more comfortable with the basics, consider exploring these advanced concepts to build more complex and interactive applications.</p>
            <p>Congratulations! You've successfully set up and used React Router in your React project. With this foundation, you can create dynamic, multi-page applications with seamless navigation. Keep exploring and building to unlock the full potential of routing in your React applications.</p>
        </>
    );
}

export default BeginnerTutorial;
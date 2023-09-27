import { Highlighter } from '../../../../../../../syntaxhighlighter';

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
            <Highlighter>{`npm install react-router-dom@latest`}</Highlighter>
            <p>Your app folder should look like this</p>
            <Highlighter>{`my-react-app/
  ├── src/
  │     ├── App.js
  │     ├── App.css
  │     ├── index.js
  │     ├── ...
  ├── public/
  │     ├── ...
  ├── package.json
  ├── ...`}</Highlighter>
            <span className="section_space medium"></span>
            <h2>Creating Files</h2>
            <p>Create a new folder in src/ and name it "pages".</p>
            <p>Add 4 files into your pages folder:</p>
            <ol>
                <li>layout.js</li>
                <li>home.js</li>
                <li>about.js</li>
                <li>contact.js</li>
            </ol>
            <p>Leave these files empty for now.</p>
            <span className="section_space medium"></span>
            <h2>Setting Up Routes</h2>
            <dl className="desc_list">
                <dt>Import Required Components</dt>
                <dd>
                    <p>In your main application file (App.js), import the necessary components from React Router.</p>
                    <Highlighter language="jsx">{`import { BrowserRouter, Routes, Route } from 'react-router-dom';`}</Highlighter>
                </dd>
                <dt>Wrap Your App with Router</dt>
                <dd>
                    <p>Wrap your entire application with the Router component to enable routing throughout your app.</p>
                    <Highlighter language="jsx">{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                /* Your application content */
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
                </dd>
                <dt>Importing Pages</dt>
                <dd>
                    <p>Now you need to import your pages <b>before</b> declaring your app function:</p>
                    <Highlighter language="jsx">{`import Layout from 'pages/layout';
import Home from 'pages/home';
import About from 'pages/about';
import Contact from 'pages/contact';`}</Highlighter>
                </dd>
                <dt>Define Routes</dt>
                <dd>
                    <p>Inside the Router, define your routes using the Route component. Each Route should specify a path and the component to render when that path is matched.</p>
                    <Highlighter language="jsx">{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index component={<Home />} />
                    <Route path="/about" component={<About />} />
                    <Route path="/contact" component={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
                </dd>
                <dt>App.js</dt>
                <dd>
                    <p>After following the instructions, this is what your App.js file should look like:</p>
                    <Highlighter language="jsx">{`import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from 'pages/layout';
import Home from 'pages/home';
import About from 'pages/about';
import Contact from 'pages/contact';
                    
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index component={<Home />} />
                    <Route path="/about" component={<About />} />
                    <Route path="/contact" component={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;`}</Highlighter>
                </dd>
                <dt>Link Component</dt>
                <dd>
                    <p>To navigate between routes, use the Link component. It creates anchor tags that allow users to click and navigate to different routes. The <code>{`<Outlet>`}</code> component is the current page the browser is displaying (home, about or contact). The nav tag is the nav bar which will stay on the page no matter which page you're on.</p>
                    <Highlighter language="jsx">{`import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default Layout;`}</Highlighter>
                </dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Creating Route Components</h2>
            <p>Now, let's create the components for the routes you defined earlier (layout, home, about, and contact).</p>
            <p>layout.js</p>
            <Highlighter language="jsx">{`import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default Layout;`}</Highlighter>
            <p>home.js</p>
            <Highlighter language="jsx">{`function Home() {
    return (
        <div>
            Welcome to the Home Page!
        </div>
    );
}

export default Home;`}</Highlighter>
            <p>about.js</p>
            <Highlighter language="jsx">{`function About() {
    return (
        <div>
            About us
        </div>
    );
}

export default About;`}</Highlighter>
            <p>contact.js</p>
            <Highlighter language="jsx">{`function Contact() {
    return (
        <div>
            Contact us
        </div>
    );
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
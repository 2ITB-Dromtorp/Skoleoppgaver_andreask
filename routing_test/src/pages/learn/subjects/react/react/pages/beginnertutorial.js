import { Highlighter } from '../../../../../../syntaxhighlighter';

const BeginnerTutorial = () => {
    return (
        <>
            <h1>Getting Started with React: A Beginner's Tutorial</h1>
            <p>React is a powerful JavaScript library for building user interfaces. Whether you're new to web development or just starting with React, this beginner's tutorial will guide you through the basics and help you build your first React application.</p>
            <span className="section_space medium"></span>
            <h2>Prerequisites</h2>
            <p>Before we begin, make sure you have the following prerequisites installed on your system:</p>
            <dl className="desc_list">
                <dt>Node.js and npm</dt>
                <dd>React applications are typically created and managed using npm, the Node.js package manager. You can download Node.js from <a href="nodejs.org." target="_new">nodejs.org.</a></dd>
                <dt>A Code Editor</dt>
                <dd>Choose a code editor you're comfortable with. Popular choices include Visual Studio Code, Sublime Text, or Atom.</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Setting Up a React Application</h2>
            <p>Let's start by creating a new React application using the official tool called Create React App. Open your terminal and run the following command:</p>
            <Highlighter>{`npx create-react-app "my-react-app"`}</Highlighter>
            <p>Replace <code>my-react-app</code> with your preferred project name. This command will create a new directory with the necessary files and dependencies for your React app.</p>
            <p>Once the installation is complete, navigate to your project folder:</p>
            <Highlighter>cd "my-react-app"</Highlighter>
            <span className="section_space medium"></span>
            <h2>Exploring the Project Structure</h2>
            <p>Inside your React project folder, you'll find a structure like this:</p>
            <Highlighter>{`my-react-app/
  ├── src/
  │     ├── App.js
  │     ├── index.js
  │     ├── ...
  ├── public/
  │     ├── index.html
  │     ├── ...
  ├── package.json
  ├── ...`}</Highlighter>
            <dl className="desc_list">
                <dt>src/</dt>
                <dd>
                    <p>directory: This is where your application's source code resides.</p>
                    <dl className="desc_list">
                        <dt>App.js</dt>
                        <dd>The main component of your app. This is where you'll build your UI.</dd>
                        <dt>index.js</dt>
                        <dd>The entry point of your app, responsible for rendering your app into the DOM.</dd>
                    </dl>
                </dd>
                <dt>public/</dt>
                <dd>directory: Contains static assets and the index.html file where your app gets injected.</dd>
            </dl>
            <span className="section_space medium"></span>
            <h2>Building Your First Component</h2>
            <p>Let's create your first React component. Open src/App.js in your code editor and replace its contents with the following:</p>
            <Highlighter>{`import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello, React!</h1>
    </div>
  );
}

export default App;`}</Highlighter>
            <p>In this code:</p>
            <ul>
                <li>
                    We import the React library.
                </li>
                <li>
                    We define a functional component called App that returns JSX (JavaScript XML) representing our UI.
                </li>
                <li>
                    JSX allows us to write HTML-like code within JavaScript.
                </li>
            </ul>
            <span className="section_space medium"></span>
            <h2>Running Your React App</h2>
            <p>Now, let's see your app in action. In your terminal, make sure you're still in the project folder (my-react-app), and run:</p>
            <Highlighter>npm start</Highlighter>
            <p>This command starts your development server and opens your React app in a web browser. You should see the "Hello, React!" message displayed.</p>
            <span className="section_space medium"></span>
            <h2>Understanding React Components</h2>
            <p>In React, everything is a component. You've already created a simple one called App. Components are the building blocks of your application, and they can be reused and composed to create complex user interfaces.</p>
            <p>To use a component, you can simply import it into another component or file. For example, you can import and use your App component in other parts of your application.</p>
            <span className="section_space medium"></span>
            <h2>Conclusion</h2>
            <p>Congratulations! You've taken your first steps in React development. In this tutorial, you learned how to set up a React application, create a basic component, and run your app. React's component-based architecture will be your foundation as you dive deeper into building dynamic and interactive web applications. Keep exploring React's documentation and experimenting with your app to gain a deeper understanding of its capabilities. Happy coding!</p>
        </>
    );
}

export default BeginnerTutorial;
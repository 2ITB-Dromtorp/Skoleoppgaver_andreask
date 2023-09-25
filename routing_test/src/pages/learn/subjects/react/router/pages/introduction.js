import { Highlighter } from "../../../../../../syntaxhighlighter";

const Introduction = () => {
    return (
        <>
            <h1>React Router</h1>
            <p><b>React Router</b> offers several key technical properties and concepts that make it an indispensable tool for managing routing in your React applications:</p>
            <dl className="desc_list">
                <dt>Declarative Routing</dt>
                <dd>React Router promotes a declarative approach to routing. You define your application's routes in a clear and intuitive manner using React components. This makes it easy to understand and maintain the application's routing logic.</dd>
                <dt>BrowserRouter and HashRouter</dt>
                <dd>React Router provides two main types of routers, BrowserRouter and HashRouter. BrowserRouter uses the HTML5 History API for routing, creating cleaner URLs (e.g., /products) without the hash symbol (#). On the other hand, HashRouter uses the URL hash (e.g., #/products) and is well-suited for applications without server-side configuration.</dd>
                <dt>Route Component</dt>
                <dd>
                    <p>The Route component is at the heart of React Router. It allows you to specify which component should render when a particular route matches the current URL. You can also pass route parameters to components, making it easy to access dynamic segments of the URL.</p>
                    <Highlighter>{`<Route path="products/:id" component={<ProductDetail/>} />`}</Highlighter>
                </dd>
                <dt>Link Component</dt>
                <dd>
                    <p>The Link component is used for creating navigation links within your application. It ensures that the application's state is preserved during navigation, providing a seamless user experience.</p>
                    <Highlighter>{`<Link to="products">Products</Link>`}</Highlighter>
                </dd>
                <dt>Switch Component</dt>
                <dd>
                    <p>The Switch component renders only the first Route or Redirect that matches the current URL. This is useful for ensuring that only one route is matched at a time, preventing multiple components from rendering simultaneously.</p>
                    <Highlighter>{`<Switch>
    <Route path="home" component={<Home/>} />
    <Route path="about" component={<About/>} />
    <Route path="contact" component={<Contact/>} />
    <Redirect from="/" to="/home" />
</Switch>`}</Highlighter>
                </dd>
                <dt>Redirect Component</dt>
                <dd>
                    <p>The Redirect component allows you to programmatically redirect users to another route. This is handy for scenarios like authentication checks or route aliases.</p>
                    <Highlighter>{`<Redirect from="/old-route" to="/new-route" />`}</Highlighter>
                </dd>
                <dt>Nested Routes</dt>
                <dd>React Router supports nested routes, enabling you to build complex page layouts with multiple levels of routing. This is particularly useful for applications with nested UI structures.</dd>
                <dt>Route Guards</dt>
                <dd>You can implement route guards or middleware-like functionality using higher-order components (HOCs) to protect routes based on user authentication or other conditions.</dd>
                <dt>History Object</dt>
                <dd>
                    <p>React Router provides access to the history object, which allows you to programmatically navigate, go back, or perform other actions related to the browsing history.</p>
                    <Highlighter>{`import { useHistory } from 'react-router-dom';

function MyComponent() {
    const history = useHistory();

    function navigateToAbout() {
        history.push('/about');
    }

    return (
        <button onClick={navigateToAbout}>Go to About</button>
    );
}`}</Highlighter>
                </dd>
                <dt>Route Matching</dt>
                <dd>React Router uses a flexible and customizable approach to matching routes. You can use exact matching, partial matching, and even custom matching logic to control how routes are matched and rendered.</dd>
            </dl>
            <p>These technical properties and concepts form the foundation of React Router, empowering you to create dynamic and interactive web applications with smooth client-side navigation. Whether you're building a small personal website or a large-scale web application, React Router simplifies the process of managing routes and ensures a superior user experience.</p>
        </>
    );
}

export default Introduction;
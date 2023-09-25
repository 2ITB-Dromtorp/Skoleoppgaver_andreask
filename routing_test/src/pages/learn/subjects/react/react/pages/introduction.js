const Introduction = () => {
    return (
        <>
            <h2>React</h2>
            <p>React's technical properties play a crucial role in making it a popular choice among developers for building dynamic user interfaces. Here are some key technical properties and features of React:</p>
            <dl className="desc_list">
                <dt>Declarative Syntax</dt>
                <dd>React uses a declarative syntax, which means you describe what you want the user interface to look like, and React takes care of updating the actual DOM to match your description. This simplifies the code and makes it more predictable.</dd>
                <dt>Component-Based</dt>
                <dd>React encourages the development of UIs as a composition of reusable components. Each component encapsulates its own logic and rendering, making it easier to manage and scale applications. Components can be nested inside other components to create complex UI hierarchies.</dd>
                <dt>Virtual DOM</dt>
                <dd>React maintains a virtual representation of the actual DOM in memory, known as the Virtual DOM. When data changes, React first updates the Virtual DOM and then efficiently calculates the difference (diffing) between the Virtual DOM and the real DOM. This minimizes DOM manipulations and improves performance.</dd>
                <dt>Unidirectional Data Flow</dt>
                <dd>React enforces a one-way data flow, meaning data flows downward from parent components to child components. This ensures that changes in one part of the application do not unexpectedly affect other parts, making the application more predictable and easier to debug.</dd>
                <dt>JSX (JavaScript XML)</dt>
                <dd>React uses JSX, an extension of JavaScript, to define the structure of UI components. JSX allows developers to write HTML-like code within JavaScript, making it easier to create and visualize the UI structure.</dd>
                <dt>State Management</dt>
                <dd>React allows components to manage their internal state. State represents data that can change over time and is crucial for building dynamic and interactive user interfaces. You can use the useState hook (in functional components) or this.state (in class components) to manage state.</dd>
                <dt>Lifecycle Methods (Class Components)</dt>
                <dd>In class components, React provides a set of lifecycle methods that allow you to hook into various stages of a component's life, such as mounting, updating, and unmounting. These methods</dd>
            </dl>
        </>
    );
}

export default Introduction;
/*
import { Highlighter } from '../../../../../syntaxhighlighter';

const Introduction = () => {
    return (
        <>
            <h1>Introduksjon</h1>
            <p>Start med å installere <code>react router dom</code></p>
            <Highlighter language='nodeRepl'>
                {`npm i -D react-router-dom@latest`}
            </Highlighter>
            <span className="section_space small"></span>
            <p><code>App.js</code> ser ikke ut som en nettside lenger, den ser mer som et system med sider</p>
            <p>Her er en <code>App.js</code> funksjon som passer en nettside som denne.</p>
            <Highlighter>{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<BrowserRouter>`}</h2>
            <p><code>{`<BrowserRouter>`}</code> inneholder informasjon og funksjoner som f.eks. historikk og innlastingsfunksjonen. Den er ikke så komplisert i React Routing.</p>
            <Highlighter linesToHighlight={[3, 16]}>{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<Routes>`}</h2>
            <p><code>{`<Routes>`}</code> inneholder alle sidene React prosjektet har. Den er heller ikke så komplisert i React Routing.</p>
            <Highlighter linesToHighlight={[4, 15]}>{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<Route>`}</h2>
            <p>En <code>{`<Route>`}</code> er en side på nettsiden din f.eks. hjemmeside, kontakt, om, produkter. Det er mange egenskaper en <code>{`<Route>`}</code> tag kan ha.</p>
            <p>Når en <code>{`<Route>`}</code> er skrevet som dette: <code>{`<Route/>`}</code> (fremhevet i bildet nedenfor), lager den en ny side. f.eks. <code>nettside.com/nyside</code></p>
            <Highlighter linesToHighlight={[6, 8, 9, 11, 12, 13]}>{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
            <span className="section_space small"></span>
            <p>Når en <code>{`<Route>`}</code> er skrevet som dette: <code>{`<Route></Route>`}</code> fungerer den akkurat som en <code>{`<Route/>`}</code> den eneste forskjellen er at du kan legge til flere sider inne i den siden, så den oppfører seg mer som et lag med sider. f.eks. <code>nettside.com/<span className="code_highlight strong">produkter</span>/banan</code>, <code>nettside.com/<span className="code_highlight strong">produkter</span>/eple</code>, <code>nettside.com/<span className="code_highlight strong">produkter</span>/appelsin</code>. En <code>{`<Route></Route>`}</code> blir ofte kalt "layout route".</p>
            <Highlighter linesToHighlight={[5, 7, 10, 14]}>{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
               </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</Highlighter>
            <span className="section_space small"></span>
            <h2>Egenskaper</h2>
            <ul>
                <li>
                    <p><code>index</code> er "forsiden". Når du går på nettsiden din f.eks. nettside.com/ vises <code>{`<Route>`}</code> taggen med <code>index</code>. en <code>{`<Route>`}</code> med <code>index</code> attributten skal ikke ha en <code>path</code> attributt.</p>
                </li>
                <li>
                    <p><code>path</code> forteller hva som skal legges til URlen når du er på denne siden f.eks. hvis du går til en side med <code>path</code> satt til side_eksempel blir URLen <code>nettside.com/side_eksempel</code>. Når <code>path</code> er "*" blir denne siden brukt når du prøver å gå til en side som ikke finnes f.eks. <code>nettside.com/sidesomikkefinnes</code>.</p>
                </li>
                <li>
                    <p><code>element</code> er selve siden, React koden til nettsiden.</p>
                </li>
            </ul>
            <span className="section_space small"></span>
            <p>Her er et eksempel på koden til en vanlig React side {`(`}<code>{`<Route/>`}</code>{`)`}.</p>
            <Highlighter>{`const Home = () => {
    return (
        <>
            <h1>Hjemmeside</h1>
            <p>Dette er en test nettside</p>
        </>
    );
}

export default Home;`}</Highlighter>
            <span className="section_space small"></span>
            <p>Og her er koden til en "layout route" side {`(`}<code>{`<Route></Route>`}</code>{`)`}.</p>
            <Highlighter>{`import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="./contact">Kontakt</Link>
                    </li>
                    <li>
                        <Link to="./about">Om</Link>
                    </li>
                    <li>
                        <Link to="./products">Produkter</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;`}</Highlighter>
            <span className="section_space small"></span>
            <p><code>{`<Outlet/>`}</code> taggen er innholdet på en spesifik side f.eks. hjemmesiden. Alt annet enn <code>{`<Outlet/>`}</code> taggen er felles for alle sider f.eks. en navbar eller en footer.</p>
            <Highlighter linesToHighlight={[19]}>{`import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="./contact">Kontakt</Link>
                    </li>
                    <li>
                        <Link to="./about">Om</Link>
                    </li>
                    <li>
                        <Link to="./products">Produkter</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;`}</Highlighter>
        </>
    );
}

export default Introduction;
*/
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SYNTAX_HIGHLIGHTING_STYLE = atomOneDark;

const highlightLines = (lines) => {
    return (n) => {
        const props = {
            class: 'code_line',
        };
        if (lines !== undefined) {
            if (lines.indexOf(n) !== -1) {
                props.class += ' code_highlight';
            }
        }
        return props;
    };
}

const PresetHighlight = (props) => {
    return (
        <SyntaxHighlighter language={props.language || 'javascript'} customStyle={{ padding: '' }} lineNumberStyle={{'min-width': '1.25em'}} className={props.className || 'big_code'} codeTagProps={{ className: props.codeTagClassName || 'big_code_wrapper' }} style={SYNTAX_HIGHLIGHTING_STYLE} wrapLines={true} PreTag={'code'} CodeTag={'div'} useInlineStyles={true} showLineNumbers={true} showInlineLineNumbers={true} lineProps={highlightLines(props.linesToHighlight)}>
            {props.children}
        </SyntaxHighlighter>
    );
}

const Introduction = () => {
    return (
        <>
            <h1>Introduksjon</h1>
            <p>Start med å installere <code>react router dom</code></p>
            <PresetHighlight language='nodeRepl'>
                {`npm i -D react-router-dom@latest`}
            </PresetHighlight>
            <span className="section_space small"></span>
            <p><code>App.js</code> ser ikke ut som en nettside lenger, den ser mer som et system med sider</p>
            <p>Her er en <code>App.js</code> funksjon som passer en nettside som denne.</p>
            <PresetHighlight>{`function App() {
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
}`}</PresetHighlight>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<BrowserRouter>`}</h2>
            <p><code>{`<BrowserRouter>`}</code> inneholder informasjon og funksjoner som f.eks. historikk og innlastingsfunksjonen. Den er ikke så komplisert i React Routing.</p>
            <PresetHighlight linesToHighlight={[3, 16]}>{`function App() {
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
}`}</PresetHighlight>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<Routes>`}</h2>
            <p><code>{`<Routes>`}</code> inneholder alle sidene React prosjektet har. Den er heller ikke så komplisert i React Routing.</p>
            <PresetHighlight linesToHighlight={[4, 15]}>{`function App() {
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
}`}</PresetHighlight>
            <span className="section_space medium"></span>
            <h2 className="code_text">{`<Route>`}</h2>
            <p>En <code>{`<Route>`}</code> er en side på nettsiden din f.eks. hjemmeside, kontakt, om, produkter. Det er mange egenskaper en <code>{`<Route>`}</code> tag kan ha.</p>
            <p>Når en <code>{`<Route>`}</code> er skrevet som dette: <code>{`<Route/>`}</code> (fremhevet i bildet nedenfor), lager den en ny side. f.eks. <code>nettside.com/nyside</code></p>
            <PresetHighlight linesToHighlight={[6, 8, 9, 11, 12, 13]}>{`function App() {
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
}`}</PresetHighlight>
            <span className="section_space small"></span>
            <p>Når en <code>{`<Route>`}</code> er skrevet som dette: <code>{`<Route></Route>`}</code> fungerer den akkurat som en <code>{`<Route/>`}</code> den eneste forskjellen er at du kan legge til flere sider inne i den siden, så den oppfører seg mer som et lag med sider. f.eks. <code>nettside.com/<span className="code_highlight strong">produkter</span>/banan</code>, <code>nettside.com/<span className="code_highlight strong">produkter</span>/eple</code>, <code>nettside.com/<span className="code_highlight strong">produkter</span>/appelsin</code>. En <code>{`<Route></Route>`}</code> blir ofte kalt "layout route".</p>
            <PresetHighlight linesToHighlight={[5, 7, 10, 14]}>{`function App() {
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
}`}</PresetHighlight>
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
            <PresetHighlight>{`const Home = () => {
    return (
        <>
            <h1>Hjemmeside</h1>
            <p>Dette er en test nettside</p>
        </>
    );
}

export default Home;`}</PresetHighlight>
            <span className="section_space small"></span>
            <p>Og her er koden til en "layout route" side {`(`}<code>{`<Route></Route>`}</code>{`)`}.</p>
            <PresetHighlight>{`import { Outlet, Link } from 'react-router-dom';

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

export default Layout;`}</PresetHighlight>
            <span className="section_space small"></span>
            <p><code>{`<Outlet/>`}</code> taggen er innholdet på en spesifik side f.eks. hjemmesiden. Alt annet enn <code>{`<Outlet/>`}</code> taggen er felles for alle sider f.eks. en navbar eller en footer.</p>
            <PresetHighlight linesToHighlight={[19]}>{`import { Outlet, Link } from 'react-router-dom';

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

export default Layout;`}</PresetHighlight>
        </>
    );
}

export default Introduction;
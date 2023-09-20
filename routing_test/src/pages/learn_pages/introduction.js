const Introduction = () => {
    return (
        <>
            <h1>Introduksjon</h1>
            <p>Start med å installere <code>react router dom</code></p>
            <code className="big_code">npm i -D react-router-dom@latest</code>
            <p><code>App.js</code> filen brukes ikke til å vise siden lenger, den er mer som et system med sider</p>
            <p>Her er <code>App.js</code> filen som denne nettsiden bruker.</p>
            <code className="big_code">{`function App() {
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
}`}</code>
            <p>Ved første blikk virker alt rotete og gir ikke mening. Les videre for forklaring.</p>
            <p>En <code>{`<Route/>`}</code> som er fremhevet i bildet nedenfor, lager en ny side. f.eks. <code>nettside.com/nyside</code></p>
            <code className="big_code"><div className="big_code_wrapper">{`function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
`}<span className="code_highlight">{`                    <Route index element={<Home />} />`}</span>{`
                    <Route path="learn" element={<LearnLayout />}>
`}<span className="code_highlight">{`                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />`}</span>{`
                    </Route>
`}<span className="code_highlight">{`                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />`}</span>{`
                </Route>
            </Routes>
        </BrowserRouter>
    );
}`}</div></code>
            <p>En <code>{`<Route></Route>`}</code> fungerer akkurat som en <code>{`<Route/>`}</code> den eneste forskjellen er at du kan legge til flere sider inne i den siden, så den oppfører seg mer som et lag med sider. f.eks. <code>nettside.com/nyttlag/side1</code>, <code>nettside.com/nyttlag/side2</code>, <code>nettside.com/nyttlag/side3</code></p>
            <code className="big_code"><div className="big_code_wrapper">{`function App() {
    return (
        <BrowserRouter>
            <Routes>
`}<span className="code_highlight">{`                <Route path="/" element={<Layout />}>`}</span>{`
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="introduction" element={<LearnIntroduction />} />
                    </Route>
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
`}<span className="code_highlight">{`               </Route>`}</span>{`
            </Routes>
        </BrowserRouter>
    );
}`}</div></code>
        </>
    );
}

export default Introduction;
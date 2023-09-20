const Introduction = () => {
    return (
        <>
            <h1>Introduksjon</h1>
            <p>Start med å installere <code>react router dom</code></p>
            <code className="big_code">npm i -D react-router-dom@latest</code>
            <p><code>App.js</code> ser ikke ut som en nettside lenger, den ser mer som et system med sider</p>
            <p>Her er en <code>App.js</code> fil som passer en nettside som denne.</p>
            <code className="big_code"><div className="big_code_wrapper">{`function App() {
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
}`}</div></code>
            <p>Ved første blikk virker alt rotete og gir ikke mening.</p>
            <code className="big_code"><div className="big_code_wrapper">{`function App() {
    return (
`}<span className="code_highlight">{`        <BrowserRouter>`}</span>{`
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
`}<span className="code_highlight">{`        </BrowserRouter>`}</span>{`
    );
}`}</div></code>
            <p><code>{`<BrowserRouter>`}</code> inneholder informasjon og funksjoner som f.eks. historikk og innlastingsfunksjonen. Den er ikke så komplisert i React Routing.</p>
            <code className="big_code"><div className="big_code_wrapper">{`function App() {
    return (
        <BrowserRouter>
`}<span className="code_highlight">{`            <Routes>`}</span>{`
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
`}<span className="code_highlight">{`            </Routes>`}</span>{`
        </BrowserRouter>
    );
}`}</div></code>
            <p><code>{`<Routes>`}</code> inneholder alle sidene React prosjektet har. Den er heller ikke så komplisert i React Routing.</p>
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
            <h2 className="code_text">{`<Route>`}</h2>
            <p>En <code>{`<Route>`}</code> er en side på nettsiden din f.eks. hjemmeside, kontakt, om, produkter. Det er mange egenskaper en <code>{`<Route>`}</code> tag kan ha.</p>
            <ul>
                <li>
                    <p><code>index</code> er "forsiden". Når du går på nettsiden din f.eks. nettside.com/ vises <code>{`<Route>`}</code> taggen med <code>index</code></p>
                </li>
                <li>
                    <p><code>path</code> forteller hva som skal legges til URlen når du er på denne siden f.eks. hvis du går til en side med <code>path</code> satt til side_eksempel blir URLen "nettside.com/side_eksempel"</p>
                </li>
            </ul>
        </>
    );
}

export default Introduction;
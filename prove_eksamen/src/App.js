import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CasesContext } from './context';

import Layout from './pages/layout/index';
import SubmitCase from './pages/pages/submit_case/index';
import Cases from './pages/pages/cases/index';

function App() {
    const [cases, setCases] = useState([]);

    return (
        <CasesContext.Provider value={[cases, setCases]}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<SubmitCase />} />
                        <Route path='/cases' element={<Cases />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CasesContext.Provider>
    )
}

export default App;

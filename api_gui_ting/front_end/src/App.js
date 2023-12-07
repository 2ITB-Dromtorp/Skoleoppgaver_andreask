import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import IndexLayout from './pages/index/layout/index';

import Index from './pages/index/pages/index/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexLayout />}>
                    <Route index element={<Index />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
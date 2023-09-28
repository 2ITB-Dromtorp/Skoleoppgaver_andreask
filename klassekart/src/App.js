import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/layout';
import Home from './pages/home';
import Profile from './pages/profile';


import Elev from './elev.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

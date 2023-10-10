import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/layout';

import Home from './pages/home';
import Profile from './pages/profile';

import NoProfile from './pages/noprofile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile/:name" element={<Profile />} />
                    <Route path="/noprofile" element={<NoProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
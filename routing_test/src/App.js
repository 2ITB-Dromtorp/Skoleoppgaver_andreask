import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import Home from './pages/home';
import Contact from './pages/contact';
import About from './pages/about';
import LearnLayout from './pages/learn_pages/layout';
import LearnHome from './pages/learn_pages/home';
import LearnIntroduction from './pages/learn_pages/introduction';
import NoPage from './pages/nopage';

function App() {
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
}

export default App;
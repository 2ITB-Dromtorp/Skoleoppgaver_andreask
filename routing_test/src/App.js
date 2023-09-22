import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/main/layout';
import Home from './pages/main/home';
import Contact from './pages/main/contact';
import About from './pages/main/about';
import Login from './pages/main/login';
import SignUp from './pages/main/signup';
import ResetPassword from './pages/main/resetpassword';
import LearnLayout from './pages/learn/layout';
import LearnHome from './pages/learn/home';
import LearnIntroduction from './pages/learn/introduction';
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
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="reset_password" element={<ResetPassword />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
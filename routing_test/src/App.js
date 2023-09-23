import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//>/
import Layout from './pages/main/layout';

import Home from './pages/main/home';
import Contact from './pages/main/contact';
import About from './pages/main/about';
import Login from './pages/main/login';
import SignUp from './pages/main/signup';
import ResetPassword from './pages/main/resetpassword';

//>learn
import LearnLayout from './pages/learn/router/layout';

import LearnHome from './pages/learn/router/home';

const SUBJECTS_URL = './pages/learn/subjects/';

//>learn>html
import LearnHTMLLayout from SUBJECTS_URL + 'html/layout';

import LearnHTMLHome from SUBJECTS_URL + 'html/home';
import LearnHTMLIntroduction from SUBJECTS_URL + 'html/introduction';

//>learn>css
import LearnCSSLayout from SUBJECTS_URL + 'css/layout';

import LearnCSSHome from SUBJECTS_URL + 'css/home';
import LearnCSSIntroduction from SUBJECTS_URL + 'css/introduction';

//>learn>javascript
import LearnJavaScriptLayout from SUBJECTS_URL + 'js/layout';

import LearnJavaScriptHome from SUBJECTS_URL + 'js/home';
import LearnJavaScriptIntroduction from SUBJECTS_URL + 'js/introduction';

//>learn>react
import LearnReactReactLayout from SUBJECTS_URL + 'react/react/layout';

import LearnReactReactHome from SUBJECTS_URL + 'react/react/home';
import LearnReactReactIntroduction from SUBJECTS_URL + 'react/react/introduction';

//>learn>react>router
import LearnReactRouterLayout from SUBJECTS_URL + 'react/router/layout';

import LearnReactRouterHome from SUBJECTS_URL + 'react/router/home';
import LearnReactRouterIntroduction from SUBJECTS_URL + 'react/router/introduction';

//>nopage
import NoPage from './pages/nopage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="html" element={<LearnHTMLLayout />}>
                            <Route index element={<LearnHTMLHome />} />
                            <Route path="introduction" element={<LearnHTMLIntroduction />} />
                        </Route>
                        <Route path="css" element={<LearnCSSLayout />}>
                            <Route index element={<LearnCSSHome />} />
                            <Route path="introduction" element={<LearnCSSIntroduction />} />
                        </Route>
                        <Route path="javascript" element={<LearnJavaScriptLayout />}>
                            <Route index element={<LearnJavaScriptHome />} />
                            <Route path="introduction" element={<LearnJavaScriptIntroduction />} />
                        </Route>
                        <Route path="react" element={<div>react dwadwdw</div>}>
                            <Route index element={<div>you should not be here</div>} />
                            <Route path="react" element={<LearnReactReactLayout />}>
                                <Route index element={<LearnReactReactHome />} />
                                <Route path="introduction" element={<LearnReactReactIntroduction />} />
                            </Route>
                            <Route path="router" element={<LearnReactRouterLayout />}>
                                <Route index element={<LearnReactRouterHome />} />
                                <Route path="introduction" element={<LearnReactRouterIntroduction />} />
                            </Route>
                        </Route>
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
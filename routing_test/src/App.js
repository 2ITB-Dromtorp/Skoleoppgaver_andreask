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
import LearnLayout from './pages/learn/layout';

import LearnHome from './pages/learn/home';

//>learn>html
import LearnHTMLLayout from './pages/learn/subjects/html/layout';

import LearnHTMLHome from './pages/learn/subjects/html/home';
import LearnHTMLIntroduction from './pages/learn/subjects/html/introduction';

//>learn>css
import LearnCSSLayout from './pages/learn/subjects/css/layout';

import LearnCSSHome from './pages/learn/subjects/css/home';
import LearnCSSIntroduction from './pages/learn/subjects/css/introduction';

//>learn>javascript
import LearnJavaScriptLayout from './pages/learn/subjects/js/layout';

import LearnJavaScriptHome from './pages/learn/subjects/js/home';
import LearnJavaScriptIntroduction from './pages/learn/subjects/js/introduction';

//>learn>react
import LearnReactLayout from './pages/learn/subjects/react/layout';

import LearnReactHome from './pages/learn/subjects/react/home';

//>learn>react>react
import LearnReactReactLayout from './pages/learn/subjects/react/react/layout';

import LearnReactReactHome from './pages/learn/subjects/react/react/home';
import LearnReactReactIntroduction from './pages/learn/subjects/react/react/introduction';

//>learn>react>router
import LearnReactRouterLayout from './pages/learn/subjects/react/router/layout';

import LearnReactRouterHome from './pages/learn/subjects/react/router/home';
import LearnReactRouterIntroduction from './pages/learn/subjects/react/router/introduction';

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
                        <Route path="react" element={<LearnReactLayout />}>
                            <Route index element={<LearnReactHome />} />
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
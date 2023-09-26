import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import LearnSubjectLayout from './pages/learn/subjectlayout';
import LearnSubLayout from './pages/learn/sublayout';

import LearnHome from './pages/learn/home';

//>learn>html
import LearnHTMLHome from './pages/learn/subjects/html/home';
import LearnHTMLIntroduction from './pages/learn/subjects/html/pages/introduction';
import LearnHTMLTutorialBeginner from './pages/learn/subjects/html/pages/beginnertutorial';

//>learn>css
import LearnCSSHome from './pages/learn/subjects/css/home';
import LearnCSSIntroduction from './pages/learn/subjects/css/pages/introduction';
import LearnCSSTutorialBeginner from './pages/learn/subjects/css/pages/beginnertutorial';

//>learn>javascript
import LearnJavaScriptHome from './pages/learn/subjects/js/home';
import LearnJavaScriptIntroduction from './pages/learn/subjects/js/pages/introduction';
import LearnJavaScriptTutorialBeginner from './pages/learn/subjects/js/pages/beginnertutorial';

//>learn>react
import LearnReactHome from './pages/learn/subjects/react/home';

//>learn>react>react
import LearnReactReactHome from './pages/learn/subjects/react/react/home';
import LearnReactReactIntroduction from './pages/learn/subjects/react/react/pages/introduction';
import LearnReactReactTutorialBeginner from './pages/learn/subjects/react/react/pages/beginnertutorial';

//>learn>react>router
import LearnReactRouterHome from './pages/learn/subjects/react/router/home';
import LearnReactRouterIntroduction from './pages/learn/subjects/react/router/pages/introduction';
import LearnReactRouterTutorialBeginner from './pages/learn/subjects/react/router/pages/beginnertutorial';

//>nopage
import NoPage from './pages/nopage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="html" element={<LearnSubjectLayout />}>
                            <Route index element={<LearnHTMLHome />} />
                            <Route path="introduction" element={<LearnHTMLIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnHTMLTutorialBeginner />} />
                            </Route>
                        </Route>
                        <Route path="css" element={<LearnSubjectLayout />}>
                            <Route index element={<LearnCSSHome />} />
                            <Route path="introduction" element={<LearnCSSIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnCSSTutorialBeginner />} />
                            </Route>
                        </Route>
                        <Route path="javascript" element={<LearnSubjectLayout />}>
                            <Route index element={<LearnJavaScriptHome />} />
                            <Route path="introduction" element={<LearnJavaScriptIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnJavaScriptTutorialBeginner />} />
                            </Route>
                        </Route>
                        <Route path="react" element={<LearnSubLayout />}>
                            <Route index element={<LearnReactHome />} />
                            <Route path="react" element={<LearnSubjectLayout />}>
                                <Route index element={<LearnReactReactHome />} />
                                <Route path="introduction" element={<LearnReactReactIntroduction />} />
                                <Route path="tutorial">
                                    <Route index element={<Navigate to="beginner" />} />
                                    <Route path="beginner" element={<LearnReactReactTutorialBeginner />} />
                                </Route>
                            </Route>
                            <Route path="router" element={<LearnSubjectLayout />}>
                                <Route index element={<LearnReactRouterHome />} />
                                <Route path="introduction" element={<LearnReactRouterIntroduction />} />
                                <Route path="tutorial">
                                    <Route index element={<Navigate to="beginner" />} />
                                    <Route path="beginner" element={<LearnReactRouterTutorialBeginner />} />
                                </Route>
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
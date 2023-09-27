import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

import LearnHTMLTutorialBeginner from './pages/learn/subjects/html/pages/tutorial/beginner';
import LearnHTMLTutorialForms from './pages/learn/subjects/html/pages/tutorial/forms';
import LearnHTMLTutorialLoginForm from './pages/learn/subjects/html/pages/tutorial/loginform';

//
import LearnHTMLElementP from './pages/learn/subjects/html/pages/element/p';

//>learn>css
import LearnCSSHome from './pages/learn/subjects/css/home';

import LearnCSSIntroduction from './pages/learn/subjects/css/pages/introduction';

import LearnCSSTutorialBeginner from './pages/learn/subjects/css/pages/tutorial/beginnertutorial';

//
import LearnCSSPropertyColor from './pages/learn/subjects/css/pages/property/color';

//>learn>javascript
import LearnJavaScriptHome from './pages/learn/subjects/js/home';

import LearnJavaScriptIntroduction from './pages/learn/subjects/js/pages/introduction';

import LearnJavaScriptTutorialBeginner from './pages/learn/subjects/js/pages/tutorial/beginnertutorial';

//
import LearnJavaScriptDomDocument from './pages/learn/subjects/js/pages/dom/document';

//>learn>react
import LearnReactHome from './pages/learn/subjects/react/home';

//>learn>react>react
import LearnReactReactHome from './pages/learn/subjects/react/react/home';

import LearnReactReactIntroduction from './pages/learn/subjects/react/react/pages/introduction';

import LearnReactReactTutorialBeginner from './pages/learn/subjects/react/react/pages/tutorial/beginner';

//
import LearnReactReactHookUseState from './pages/learn/subjects/react/react/pages/hook/usestate';

//>learn>react>router
import LearnReactRouterHome from './pages/learn/subjects/react/router/home';

import LearnReactRouterIntroduction from './pages/learn/subjects/react/router/pages/introduction';

import LearnReactRouterTutorialBeginner from './pages/learn/subjects/react/router/pages/tutorial/beginner';

//
import LearnReactRouterComponentBrowserRouter from './pages/learn/subjects/react/router/pages/component/browserrouter';

//>nopage
import NoPage from './pages/nopage';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<LearnLayout />}>
                        <Route index element={<LearnHome />} />
                        <Route path="html" element={<LearnSubjectLayout subject="html" />}>
                            <Route index element={<LearnHTMLHome />} />
                            <Route path="introduction" element={<LearnHTMLIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnHTMLTutorialBeginner />} />
                                <Route path="forms" element={<LearnHTMLTutorialForms />} />
                                <Route path="loginform" element={<LearnHTMLTutorialLoginForm />} />
                            </Route>
                            <Route path="element">
                                <Route index element={<Navigate to="../" />} />
                                <Route path="p" element={<LearnHTMLElementP />} />
                            </Route>
                        </Route>
                        <Route path="css" element={<LearnSubjectLayout subject="css" />}>
                            <Route index element={<LearnCSSHome />} />
                            <Route path="introduction" element={<LearnCSSIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnCSSTutorialBeginner />} />
                            </Route>
                            <Route path="property">
                                <Route index element={<Navigate to="../" />} />
                                <Route path="color" element={<LearnCSSPropertyColor />} />
                            </Route>
                        </Route>
                        <Route path="javascript" element={<LearnSubjectLayout subject="js" />}>
                            <Route index element={<LearnJavaScriptHome />} />
                            <Route path="introduction" element={<LearnJavaScriptIntroduction />} />
                            <Route path="tutorial">
                                <Route index element={<Navigate to="beginner" />} />
                                <Route path="beginner" element={<LearnJavaScriptTutorialBeginner />} />
                            </Route>
                            <Route path="dom">
                                <Route index element={<Navigate to="../" />} />
                                <Route path="document" element={<LearnJavaScriptDomDocument />} />
                            </Route>
                        </Route>
                        <Route path="react" element={<LearnSubLayout subject="react" />}>
                            <Route index element={<LearnReactHome />} />
                            <Route path="react" element={<LearnSubjectLayout />}>
                                <Route index element={<LearnReactReactHome />} />
                                <Route path="introduction" element={<LearnReactReactIntroduction />} />
                                <Route path="tutorial">
                                    <Route index element={<Navigate to="beginner" />} />
                                    <Route path="beginner" element={<LearnReactReactTutorialBeginner />} />
                                </Route>
                                <Route path="hook">
                                    <Route index element={<Navigate to="../" />} />
                                    <Route path="usestate" element={<LearnReactReactHookUseState />} />
                                </Route>
                            </Route>
                            <Route path="router" element={<LearnSubjectLayout subject="react_router" />}>
                                <Route index element={<LearnReactRouterHome />} />
                                <Route path="introduction" element={<LearnReactRouterIntroduction />} />
                                <Route path="tutorial">
                                    <Route index element={<Navigate to="beginner" />} />
                                    <Route path="beginner" element={<LearnReactRouterTutorialBeginner />} />
                                </Route>
                                <Route path="component">
                                    <Route index element={<Navigate to="../" />} />
                                    <Route path="browserrouter" element={<LearnReactRouterComponentBrowserRouter />} />
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
import './css/global.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useContext, useState } from 'react';

import { UserDataContext } from './context';
import { useRefreshUserData } from './custom_hooks';

import { LoadingContainer } from './components/loading';

//no page
import NoPage from './pages/nopage';

//index
import Layout from './pages/index/layout';

import Index from './pages/index/pages/index/index';
import Login from './pages/index/pages/login/index';
import Account from './pages/index/pages/account/index';
import Course from './pages/index/pages/course/index';

function IsLoggedInRedirect({ needsLogin, element }) {
    const { 0: userData } = useContext(UserDataContext);
    let newElement;
    if ('logged_in' in userData === false) {
        newElement = (
            <LoadingContainer>
                <p>Authorizing...</p>
            </LoadingContainer>
        );
    } else if (userData.logged_in === needsLogin) {
        newElement = (
            <>
                {element}
            </>
        );
    } else {
        newElement = (
            <>
                <LoadingContainer>
                    <p>You are not logged in</p>
                    <p>Redirecting to home page...</p>
                </LoadingContainer>
                <Navigate to='/' />
            </>
        );
    }
    return newElement;
}

function App() {
    const { 0: userData } = useContext(UserDataContext);
    const refreshUserData = useRefreshUserData();
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            refreshUserData();
        }
    }, [refreshUserData]);

    const indexContent = userData.logged_in ? (
        <Index />
    ) : (
        <Index />
    );

    console.log("wandoiwanodwa", userData);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={indexContent} />
                    <Route path='course/:courseName' element={<Course />} />
                    <Route path='signup' element={<IsLoggedInRedirect needsLogin={false} element={<Login isLogin={false} />} />} />
                    <Route path='login' element={<IsLoggedInRedirect needsLogin={false} element={<Login isLogin={true} />} />} />
                    <Route path='account' element={<IsLoggedInRedirect needsLogin={true} element={<Account />} />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import './App.css';

import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';

import { useEffect, useContext, useState } from 'react';

import { UserDataContext } from './context';
import { useRefreshUserData } from './custom_hooks';

import { LoadingContainer } from './components/loading';

//stuff
import NoPage from './pages/nopage';

//index
import Layout from './pages/index/layout';

import UserIndex from './pages/index/pages/user_index/index';
import GuestIndex from './pages/index/pages/guest_index/index';
import Login from './pages/index/pages/login/index';
import Account from './pages/index/pages/account/index';
import Documents from './pages/index/pages/documents/index';
import { Document, DocumentEditor } from './pages/index/pages/document/index';

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
        <UserIndex />
    ) : (
        <GuestIndex />
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={indexContent} />
                    <Route path='documents' element={<IsLoggedInRedirect needsLogin={true} element={<Documents />} />} />
                    <Route path='newdocument' element={<DocumentEditor isNew={true} />} />
                    <Route path='document/:docId' element={<Document isNew={false} />} />
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

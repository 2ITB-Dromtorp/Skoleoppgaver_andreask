import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { useEffect, useContext } from 'react';

import { ContextProvider, UserContext } from './context';

//stuff
import NoPage from './pages/nopage';

//index
import Layout from './pages/index/layout';

import Index from './pages/index/pages/index';
import Login from './pages/index/pages/login';
import Account from './pages/index/pages/account';
import Documents from './pages/index/pages/documents';
import { Document, DocumentEditor } from './pages/index/pages/document';

function App() {
    const [userData, setUserData] = useContext(UserContext);
    //refreshing user data
    useEffect(() => {
        fetch('/api/getsession', {
            method: 'GET',
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setUserData(data);
                });
            } else {
                console.error(res);
            }
        });
    }, []);

    const indexContent = userData.logged_in ? (
        <>
            <Link to='/documents'>go to documents sir pls this site doesnt exist yet</Link>
        </>
    ) : (
        <Index />
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={indexContent} />
                    <Route path='documents' element={<Documents />} />
                    <Route path='newdocument' element={<DocumentEditor isNew={true} />} />
                    <Route path='document/:docId' element={<Document isNew={false} />} />
                    <Route path='signup' element={<Login isLogin={false} />} />
                    <Route path='login' element={<Login isLogin={true} />} />
                    <Route path='account' element={<Account />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

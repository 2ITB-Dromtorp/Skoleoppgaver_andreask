import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect, useContext } from 'react';

import { ContextProvider, UserContext } from './context';

//stuff
import NoPage from './pages/nopage';

//index
import Layout from './pages/index/layout';

import Index from './pages/index/pages/index';
import Documents from './pages/index/pages/documents';
import Login from './pages/index/pages/login';

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

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path='documents' element={<Documents />} />
                    <Route path='signup' element={<Login isLogin={false} />} />
                    <Route path='login' element={<Login isLogin={true} />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

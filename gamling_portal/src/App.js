import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//no page
import NoPage from './pages/nopage';

//index
import Layout from './pages/index/layout';

import Index from './pages/index/pages/index/index';
import Course from './pages/index/pages/course/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path='course/:courseId' element={<Course />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

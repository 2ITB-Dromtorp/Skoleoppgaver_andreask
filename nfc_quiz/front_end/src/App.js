import './css/global.css';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import MainWindow from './main_window/index';

import IndexLayout from './pages/index/layout/index'
import Index from './pages/index/pages/index'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainWindow />}>
                    <Route path='/' element={<IndexLayout />}>
                        <Route index element={<Index />} />
                        <Route path='*' element={<Index />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
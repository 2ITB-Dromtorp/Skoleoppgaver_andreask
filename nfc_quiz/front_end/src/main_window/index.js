import './index.css';

import { Outlet } from 'react-router-dom';

export default function MainWindow() {
    return (
        <main id='main'>
            <Outlet />
        </main>
    )
}
import '../../css/global.css';
import '../../css/fonts.css';

import { Outlet } from 'react-router-dom';

import TopNav from '../../components/top_nav.js';
import Popups from '../../components/popups.js';

function Layout({ ...props }) {
    return (
        <>
            <main id='main'>
                <TopNav />
                <Popups />
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
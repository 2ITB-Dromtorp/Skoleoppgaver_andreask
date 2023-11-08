import '../../css/global.css';
import '../../css/fonts.css';

import { Outlet } from 'react-router-dom';

import TopNav from '../../components/top_nav.js';
import Popups from '../../components/popups.js';

function Layout({ ...props }) {
    return (
        <>
            <div id='main'>
                <TopNav />
                <Popups />
                <main id='main_content'>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;
import './index.css';

import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div id='main'>
            <nav id='top_nav'>
                <Link className='top_nav_link' to='/'>
                    Send inn sak
                </Link>
                <Link className='top_nav_link' to='/cases'>
                    Se saker
                </Link>
            </nav>
            <main id='main_content'>
                <Outlet />
            </main>
        </div>
    );
}
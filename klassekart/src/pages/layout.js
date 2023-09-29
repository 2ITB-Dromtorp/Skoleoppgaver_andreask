import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div id="main">
                <nav id="top_nav">
                    <ul id="top_nav_list">
                        <li className="top_nav_li">
                            <Link className="top_nav_link button_link" to="/">Hjem</Link>
                        </li>
                    </ul>
                </nav>
                <div id="content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
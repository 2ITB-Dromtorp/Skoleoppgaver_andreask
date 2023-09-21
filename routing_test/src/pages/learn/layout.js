import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
    const loc = useLocation();
    const path = loc.pathname;
    let addContent;
    if (path === '/learn') {
        addContent = (
            <>
                <div className="standard_content_container">
                    <div className="standard_content">
                        <Outlet />
                    </div>
                </div>
            </>
        );
    } else {
        addContent = (
            <>
                <div className="standard_content_container">
                    <div className="standard_content">
                        <ul className="sub_nav_list">
                            <li className="sub_nav_li">
                                <Link className="button_link sub_nav_button" to="./introduction">Introduksjon</Link>
                            </li>
                        </ul>
                        <Outlet />
                    </div>
                </div>
            </>
        );
    }
    return addContent;
}

export default Layout;
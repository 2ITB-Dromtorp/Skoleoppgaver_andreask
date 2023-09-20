import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <ul className="sub_nav_list">
                        <li className="sub_nav_li">
                            <Link className="button_link sub_nav_button" to="./introduction">Introduction</Link>
                        </li>
                    </ul>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
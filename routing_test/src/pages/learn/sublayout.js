import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className="learn_content_container">
                <div className="learn_content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
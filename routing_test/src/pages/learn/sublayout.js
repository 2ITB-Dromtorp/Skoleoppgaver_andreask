import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const loc = useLocation();
    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;
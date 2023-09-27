import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const loc = useLocation();
    console.log(loc);
    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;
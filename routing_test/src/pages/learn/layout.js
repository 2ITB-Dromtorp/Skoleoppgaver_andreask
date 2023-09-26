import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
    const loc = useLocation();
    let addContent;
    if (loc.pathname === '/learn') {
        addContent = (
            <>
                <div className="learn_content_container">
                    <div className="learn_content">
                        <Outlet />
                    </div>
                </div>
            </>
        );
    } else {
        addContent = (
            <>
                <Outlet />
            </>
        );
    }
    return (
        <>
            {addContent}
        </>
    );
}

export default Layout;
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <main id="main_section">
            <div id="main_content">
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
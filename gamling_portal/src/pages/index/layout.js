import { Outlet } from "react-router-dom";

import TopNav from "../../components/top_nav";

function Layout() {
    return (
        <main id="main_section">
            <TopNav />
            <div id="main_content">
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
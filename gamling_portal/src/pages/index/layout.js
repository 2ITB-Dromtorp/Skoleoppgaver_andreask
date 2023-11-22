import { Outlet } from "react-router-dom";

import TopNav from "../../components/top_nav";

import { ToolTips } from '../../components/tool_tip';

function Layout() {
    return (
        <main id="main_section">
            <ToolTips />
            <TopNav />
            <div id="main_content">
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
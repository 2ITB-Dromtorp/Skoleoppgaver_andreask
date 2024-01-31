import { Outlet } from "react-router-dom";

function TopNav() {
    return (
        <nav className='top_nav'>
            
        </nav>
    );
}

export default function Index() {
    return (
        <>
            <TopNav />
            <Outlet />
        </>
    );
}
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div id='main'>
            <nav>
                <Link to='/'>
                    Send inn sak
                </Link>
                <Link to='/cases'>
                    Se saker
                </Link>
            </nav>
            <main id='main_content'>
                <Outlet />
            </main>
        </div>
    );
}
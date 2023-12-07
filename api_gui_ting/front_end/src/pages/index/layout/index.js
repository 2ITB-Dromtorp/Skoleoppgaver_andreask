import { Outlet } from 'react-router-dom';
import './index.css';

export default function Layout() {
    return (
        <>
            <nav id='top_nav'>
                <div>
                    lorem ipsum
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}
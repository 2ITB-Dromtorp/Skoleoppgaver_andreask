import { Outlet, Link } from 'react-router-dom';
import Button from '../../button';

const Layout = () => {
    return (
        <>
            <div id="main">
                <nav>
                    <div id="nav_icon" className="nav_button">🗿</div>
                    <ul className="nav_list">
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./">Hjem</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./learn">Lær</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./contact">Kontakt</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./about">Om</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./login">Logg inn</Link>
                        </li>
                    </ul>
                </nav>
                <div id="content">
                    <Outlet />
                </div>
                <div id="footer">
                    <ul id="footer_list">
                        <li>
                            <ul className="footer_sub_list_main_list">
                                <li><h2 className="footer_sub_list_title">Nettsiden</h2></li>
                                <li>
                                    <ul className="footer_sub_list">
                                        <li><Link className="button_link">Hjem</Link></li>
                                        <li><Link className="button_link">Lær</Link></li>
                                        <li><Link className="button_link">Kontakt</Link></li>
                                        <li><Link className="button_link">Om</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="footer_sub_list_main_list">
                                <li><h2 className="footer_sub_list_title">John Xina</h2></li>
                                <li>
                                    <ul className="footer_sub_list">
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="footer_sub_list_main_list">
                                <li><h2 className="footer_sub_list_title">John Xina</h2></li>
                                <li>
                                    <ul className="footer_sub_list">
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="footer_sub_list_main_list">
                                <li><h2 className="footer_sub_list_title">John Xina</h2></li>
                                <li>
                                    <ul className="footer_sub_list">
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                        <li><a className="button_link">Bing chilling</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Layout;
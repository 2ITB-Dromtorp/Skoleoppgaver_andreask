import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div id="main">
                <nav>
                    <div id="nav_icon">🗿</div>
                    <ul id="nav_list">
                        <li>
                            <Link className="button_link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="button_link" to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link className="button_link" to="/about">About</Link>
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
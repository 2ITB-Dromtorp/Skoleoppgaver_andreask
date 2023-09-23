import { Outlet, Link } from 'react-router-dom';
import Button from '../../button';

const Layout = () => {
    return (
        <>
            <div id="main">
                <nav>
                    <div id="nav_icon" className="nav_button">🗿</div>
                    <ul id="nav_list_left" className="nav_list">
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./">Home</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./learn">Learn</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./contact">Contact</Link>
                        </li>
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./about">About</Link>
                        </li>
                    </ul>
                    <ul id="nav_list_right"  className="nav_list">
                        <li className="nav_li">
                            <Link className="button_link nav_button" to="./login">Log in</Link>
                        </li>
                        <li className="nav_li">
                            <Link id="signup_button" className="button_link" to="./signup"><Button>Sign up</Button></Link>
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
                                <li><h2 className="footer_sub_list_title">Website</h2></li>
                                <li>
                                    <ul className="footer_sub_list">
                                        <li><Link className="button_link">Home</Link></li>
                                        <li><Link className="button_link">Learn</Link></li>
                                        <li><Link className="button_link">Contact</Link></li>
                                        <li><Link className="button_link">About</Link></li>
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
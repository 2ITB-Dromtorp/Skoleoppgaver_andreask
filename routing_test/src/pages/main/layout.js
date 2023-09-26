import { Outlet, Link } from 'react-router-dom';
import { getLogin } from '../../server';
import Button from '../../button';

const Layout = () => {
    const loginResponse = getLogin();
    let isLoggedIn
    if (loginResponse.success === true) {
        if (loginResponse.loggedIn === true) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
    } else {
        isLoggedIn = false;
    }
    let accountContent;
    if (isLoggedIn === true) {
        accountContent = (
            <>
                <li className="nav_li">
                    <Link id="nav_profile_button">
                        <svg className="profile_picture_svg" viewBox="0 0 338 338">
                            <path className="profile_picture_svg_path" d="m169,.5a169,169 0 1,0 2,0zm0,86a76,76 0 1 1-2,0zM57,287q27-35 67-35h92q40,0 67,35a164,164 0 0,1-226,0" />
                        </svg>
                    </Link>
                </li>
            </>
        );
    } else {
        accountContent = (
            <>
                <li className="nav_li">
                    <Link className="button_link nav_button" to="./login">Log in</Link>
                </li>
                <li className="nav_li">
                    <Link id="signup_button" className="button_link" to="./signup"><Button>Sign up</Button></Link>
                </li>
            </>
        );
    }

    return (
        <>
            <div id="main">
                <nav id="top_bar">
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
                    <ul id="nav_list_right" className="nav_list">
                        {accountContent}
                    </ul>
                </nav>
                <div id="content" className="content_container">
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
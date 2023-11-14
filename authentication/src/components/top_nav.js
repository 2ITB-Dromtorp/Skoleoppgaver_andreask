import '../css/top_nav.css';

import { ReactComponent as LogoSvg } from '../svgs/logo.svg';

import { useContext } from 'react';

import { UserContext } from '../context';

import { Link } from 'react-router-dom';

function TopNav() {
    //const [searchQuery, setSearchQuery] = useState('');
    const { 0: userData } = useContext(UserContext);

    let userContent;
    if (userData && userData.logged_in) {
        userContent = (
            <Link id='profile_button' className='button' to='/account'>
                <img id='profile_image' src='https://i.pinimg.com/originals/b3/19/3e/b3193e0e568e2553f94943471b7e3bc8.gif' alt='profile_picture' />
            </Link>
        );
    } else {
        userContent = (
            <>
                <Link id='login_button' className='button fancy_button secondary' to='/login'>
                    Log in
                </Link>
                <Link id='signup_button' className='button fancy_button primary' to='/signup'>
                    Sign up
                </Link>
            </>
        );
    }

    return (
        <nav id='top_nav'>
            <div id='top_nav_content'>
                <Link id='home_link' className='button' to='/'>
                    <LogoSvg id='home_link_icon' />
                    <LogoSvg id='home_link_icon_second' />
                </Link>
                {/*
                <form id='search_form' onSubmit={(e) => {
                    e.preventDefault();
                    const url = new URL('/search', window.location.origin);
                    const searchParams = new URLSearchParams();
                    const actualSearchQuery = searchQuery.trim();
                    if (actualSearchQuery.length > 0) {
                        searchParams.append('query', searchQuery.trim());
                    }
                    url.search = searchParams;
                    window.location.href = url.toString();
                }}>
                    <input id='search_text_input' className='text_input' type='text' placeholder='Search' onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }} />
                </form>
                */}
                {userContent}
            </div>
        </nav>
    );
}

export default TopNav;
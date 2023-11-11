import '../css/top_nav.css';

import { ReactComponent as LogoSvg } from '../svgs/logo.svg';

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context';

import { Link } from 'react-router-dom';

function TopNav() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useContext(UserContext);

    let userContent;
    if (userData && userData.logged_in) {
        userContent = (
            <Link className='button' to='/account'>
                🤡
            </Link>
        );
    } else {
        userContent = (
            <>
                <Link className='button fancy_button secondary' to='/login'>
                    Log in
                </Link>
                <Link className='button fancy_button primary' to='/signup'>
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
                {userContent}
            </div>
        </nav>
    );
}

export default TopNav;
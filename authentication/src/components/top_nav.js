import '../css/top_nav.css';

import { ReactComponent as LogoSvg } from '../svgs/logo.svg';

import { useContext } from 'react';

import { UserDataContext } from '../context';

import { Link } from 'react-router-dom';

import { CustomButton, CustomFancyButton } from './input';

function TopNav() {
    //const [searchQuery, setSearchQuery] = useState('');
    const { 0: userData } = useContext(UserDataContext);

    let userContent;
    if (userData && userData.logged_in) {
        userContent = (
            <CustomButton element={Link} id='profile_button' to='/account'>
                <img id='profile_image' src='https://i.pinimg.com/originals/b3/19/3e/b3193e0e568e2553f94943471b7e3bc8.gif' alt='profile_picture' />
            </CustomButton>
        );
    } else {
        userContent = (
            <>
                <CustomFancyButton primary={false} element={Link} id='login_button' to='/login'>
                    Log in
                </CustomFancyButton>
                <CustomFancyButton primary={true} element={Link} id='signup_button' to='/signup'>
                    Sign up
                </CustomFancyButton>
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
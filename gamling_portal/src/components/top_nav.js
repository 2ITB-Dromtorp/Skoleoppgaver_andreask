import '../css/top_nav.css';

import { ReactComponent as LogoSvg } from '../svgs/logo.svg';

import { useContext } from 'react';

import { SessionDataContext } from '../context';

import { Link } from 'react-router-dom';

import { CustomButton, CustomFancyButton } from './input';

function TopNav() {
    const { 0: sessionData } = useContext(SessionDataContext);

    let userContent;
    if (sessionData && sessionData.logged_in) {
        userContent = (
            <CustomButton element={Link} id='profile_button' to='/account'>
                <img id='profile_image' src='https://i.pinimg.com/originals/b3/19/3e/b3193e0e568e2553f94943471b7e3bc8.gif' alt='profile_picture' />
            </CustomButton>
        );
    } else {
        userContent = (
            <>
                <CustomFancyButton primary={false} element={Link} id='login_button' to='/login'>
                    Logg inn
                </CustomFancyButton>
                <CustomFancyButton primary={true} element={Link} id='signup_button' to='/signup'>
                    Registrer deg
                </CustomFancyButton>
            </>
        );
    }

    return (
        <nav id='top_nav'>
            <div id='top_nav_content'>
                <Link id='home_link' className='button' to='/'>
                    <LogoSvg id='home_link_icon' />
                </Link>
                {userContent}
            </div>
        </nav>
    );
}

export default TopNav;
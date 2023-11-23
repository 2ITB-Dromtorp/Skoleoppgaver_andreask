import '../css/top_nav.css';

import { ReactComponent as LogoSvg } from '../svgs/logo.svg';

import { UserIcon } from '../svg';

import { useContext } from 'react';

import { SessionDataContext, TutorialRefsContext } from '../context';

import { Link } from 'react-router-dom';

import { CustomButton, CustomFancyButton } from './input';

function TopNav() {
    const { 0: sessionData } = useContext(SessionDataContext);

    const {homeButtonRef, loginButtonRef, signupButtonRef, accountButtonRef} = useContext(TutorialRefsContext);

    let userContent;
    if (sessionData && sessionData.logged_in) {
        userContent = (
            <CustomButton ref={accountButtonRef} element={Link} id='profile_button' to='/account'>
                <UserIcon id="profile_icon"/>
            </CustomButton>
        );
    } else {
        userContent = (
            <>
                <CustomFancyButton ref={loginButtonRef} primary={false} element={Link} id='login_button' to='/login'>
                    Logg inn
                </CustomFancyButton>
                <CustomFancyButton ref={signupButtonRef} primary={true} element={Link} id='signup_button' to='/signup'>
                    Registrer deg
                </CustomFancyButton>
            </>
        );
    }

    return (
        <nav id='top_nav'>
            <div id='top_nav_content'>
                <Link ref={homeButtonRef} id='home_link' className='button' to='/'>
                    <LogoSvg id='home_link_icon' />
                </Link>
                {userContent}
            </div>
        </nav>
    );
}

export default TopNav;
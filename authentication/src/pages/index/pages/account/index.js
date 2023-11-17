import './index.css';

import { useNavigate } from 'react-router-dom';

import { useResetUserData } from '../../../../custom_hooks';

import { FancyButton } from '../../../../components/input';

function Account() {
    const navigate = useNavigate();
    const resetUserData = useResetUserData();
    return (
        <section id='account_section' className='main_content'>
            <FancyButton primary={true} onClick={(e) => {
                fetch('/api/logout', {
                    method: 'POST',
                }).then((res) => {
                    if (res.status === 200) {
                        resetUserData();
                        navigate('/');
                    }
                });
            }}>
                Log out
            </FancyButton>
        </section>
    );
}

export default Account;
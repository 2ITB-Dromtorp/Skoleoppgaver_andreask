import './index.css';

import { useNavigate } from 'react-router-dom';

import { useResetSessionData } from '../../../../custom_hooks';

import { FancyButton } from '../../../../components/input';

function Account() {
    const navigate = useNavigate();
    const resetSessionData = useResetSessionData();
    return (
        <section id='account_section' className='main_content'>
            <FancyButton primary={true} onClick={(e) => {
                fetch('/api/logout', {
                    method: 'POST',
                }).then((res) => {
                    if (res.status === 200) {
                        resetSessionData();
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
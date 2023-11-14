import './account.css';

import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate = useNavigate();
    return (
        <section id='account_section' className='main_content'>
            <button className='button fancy_button primary' onClick={(e) => {
                fetch('/api/logout', {
                    method: 'POST',
                }).then((res) => {
                    if (res.status === 200) {
                        navigate('/');
                    }
                });
            }}>
                Log out
            </button>
        </section>
    );
}

export default Account;
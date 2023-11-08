import './index.css';

import { Link } from 'react-router-dom';

const Index = ({ ...props }) => {
    return (
        <>
            <section id='top_section'>
                <h1 className='welcome_header'>The Best Document Editor made with React</h1>
                <Link className='button fancy_button secondary' to='/login'>Login</Link>
                <Link className='button fancy_button primary' to='/documents'>Documents</Link>
            </section>
        </>
    );
}

export default Index;
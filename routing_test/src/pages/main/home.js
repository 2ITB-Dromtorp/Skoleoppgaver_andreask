import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Hjemmeside</h1>
                    <p>Dette er en nettside om <code>React Router</code></p>
                    <Link className="button_link" to="./learn"><Button>Lær React Router</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Home;
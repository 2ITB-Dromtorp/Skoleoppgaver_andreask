import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Lær</h1>
                    <p>Her kan du velgde hva du vil lære om.</p>
                    <Link className="button_link" to="./react"><Button>Lær React</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Home;
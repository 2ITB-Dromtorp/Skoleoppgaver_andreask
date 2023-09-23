import { Link } from 'react-router-dom';
import Button from '../../../../button';

const Home = () => {
    return (
        <>
            <h2>React</h2>
            <p>Her er en god del dokumentasjon om <b>React</b></p>
            <p>Velg hva du vil fordype deg i</p>
            <div className="learn_subjects_container">
                <Link className="button_link" to="./react"><Button>React</Button></Link>
                <Link className="button_link" to="./router"><Button>Router</Button></Link>
            </div>
        </>
    );
}

export default Home;
import { Link } from 'react-router-dom';
import Button from '../../../../button';

const Home = () => {
    return (
        <>
            <h1>React</h1>
            <p>Some documentation relating <b>React</b></p>
            <p>Choose which course to take</p>
            <div className="learn_subjects_container">
                <Link className="button_link" to="./react"><Button>React</Button></Link>
                <Link className="button_link" to="./router"><Button>Router</Button></Link>
            </div>
        </>
    );
}

export default Home;
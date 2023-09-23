import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1>Courses</h1>
            <p>Pick between various courses.</p>
            <div className="learn_subjects_container">
                <Link className="button_link" to="./html"><Button>HTML</Button></Link>
                <Link className="button_link" to="./css"><Button>CSS</Button></Link>
                <Link className="button_link" to="./javascript"><Button>JavaScript</Button></Link>
                <Link className="button_link" to="./react"><Button>React</Button></Link>
            </div>
        </>
    );
}

export default Home;
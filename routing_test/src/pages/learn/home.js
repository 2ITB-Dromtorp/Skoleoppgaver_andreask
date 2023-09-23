import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Kurs</h1>
                    <p>Her kan du velge mellom forskjellige kurs.</p>
                    <div className="learn_subjects_container">
                        <Link className="button_link" to="./html"><Button>HTML</Button></Link>
                        <Link className="button_link" to="./css"><Button>CSS</Button></Link>
                        <Link className="button_link" to="./javascript"><Button>JavaScript</Button></Link>
                        <Link className="button_link" to="./react"><Button>React</Button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
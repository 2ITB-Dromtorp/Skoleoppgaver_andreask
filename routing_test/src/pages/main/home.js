import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Home</h1>
                    <p>This website provides useful courses for web and app developers.</p>
                    <ul>
                        <li>
                            <p>HTML</p>
                        </li>
                        <li>
                            <p>CSS</p>
                        </li>
                        <li>
                            <p>JavaScript</p>
                        </li>
                        <li>
                            <p>React</p>
                        </li>
                        <li>
                            <p>React Router</p>
                        </li>
                    </ul>
                    <Link className="button_link" to="./learn"><Button>View courses</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Home;
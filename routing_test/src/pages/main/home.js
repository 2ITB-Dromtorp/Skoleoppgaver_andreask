import Button from '../../button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="standard_content_container">
                <div className="standard_content">
                    <h1>Hjemmeside</h1>
                    <p>Dette er en nettside som gir nyttig informasjon og kurs om</p>
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
                    <Link className="button_link" to="./learn"><Button>Se kurs</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Home;
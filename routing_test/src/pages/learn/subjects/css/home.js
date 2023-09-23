import Button from '../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <h1>Lær React</h1>
                <p>Her er all informasjonen du trenger for å lage din første nettside med <b>React</b></p>
                <Link className="button_link" to="./introduction"><Button>Start</Button></Link>
            </div>
        </>
    );
}

export default Introduction;
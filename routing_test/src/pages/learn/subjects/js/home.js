import Button from '../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <h1>JavaScript</h1>
                <p>Her er en god del dokumentasjon om <b>JavaScript</b></p>
                <Link className="button_link" to="./introduction"><Button>Start</Button></Link>
            </div>
        </>
    );
}

export default Introduction;
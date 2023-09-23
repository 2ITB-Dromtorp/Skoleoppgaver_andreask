import Button from '../../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <h1>React Router</h1>
                <p>Some documentation relating <b>React Router</b></p>
                <Link className="button_link" to="./introduction"><Button>Start</Button></Link>
            </div>
        </>
    );
}

export default Introduction;
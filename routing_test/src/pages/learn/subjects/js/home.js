import Button from '../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <h1>JavaScript</h1>
            <p>Some documentation relating <b>JavaScript</b></p>
            <Link className="button_link" to="./introduction"><Button>Start</Button></Link>
        </>
    );
}

export default Introduction;
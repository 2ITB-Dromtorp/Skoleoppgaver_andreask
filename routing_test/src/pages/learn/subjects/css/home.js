import Button from '../../../../button';
import { Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <h1>CSS</h1>
                <p>Some documentation relating <b>CSS</b></p>
                <Link className="button_link" to="./introduction"><Button>Start</Button></Link>
            </div>
        </>
    );
}

export default Introduction;
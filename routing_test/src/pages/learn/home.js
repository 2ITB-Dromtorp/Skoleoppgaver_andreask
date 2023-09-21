import Button from '../../button';
import { Outlet, Link } from 'react-router-dom';

const Introduction = () => {
    return (
        <>
            <div className="content_center">
                <h1>Lær React Router</h1>
                <p>Her er all informasjonen du trenger for å lage din første nettside med <code>React Router</code></p>
                <Button><Link to="./introduction">Start</Link></Button>
            </div>
        </>
    );
}

//<Button>Start</Button>

export default Introduction;
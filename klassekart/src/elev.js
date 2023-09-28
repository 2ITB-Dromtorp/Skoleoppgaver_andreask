import { Link } from 'react-router-dom';

const Elev = ({ name, ...props }) => {
    return (
        <>
            <div className="elev">
                <Link to={'/profile?name=' + name}>{name}</Link>
            </div>
        </>
    );
}

export default Elev;
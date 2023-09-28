import { Link } from 'react-router-dom';

const Profile = () => {
    const search = new URLSearchParams(window.location.search);
    const name = search.get('name');
    return (
        <>
            <h1>{name}</h1>
            <p>Dette er profile til {name}</p>
        </>
    )
}

export default Profile;
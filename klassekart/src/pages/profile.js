import { Link, Navigate, useParams } from 'react-router-dom';
import { AllStudents, getStudentFromName } from '../students';

const Profile = () => {
    const { name } = useParams();
    const student = getStudentFromName(name);
    let content;
    if (student !== undefined) {
        content = (
            <>
                <h1>{name}</h1>
                <p>Dette er profilen til {name}</p>
            </>
        );
    } else {
        content = (
            <Navigate to="/noprofile"/>
        );
    }
    return content;
}

export default Profile;
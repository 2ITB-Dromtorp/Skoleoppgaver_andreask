import { Link } from 'react-router-dom';

const Student = ({ nostudent, name, ...props }) => {
    let content;
    if (nostudent === true) {
        content = (
            <>
                <div className="student student_placeholder">

                </div>
            </>
        );
    } else {
        content = (
            <>
                <div className="student">
                    <Link className="student_link button_link" to={'/profile/' + name}>{name}</Link>
                </div>
            </>
        );
    }
    return content;
}

export default Student;
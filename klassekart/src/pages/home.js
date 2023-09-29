import Table from '../table';
import Student from '../student';

import { Students } from '../students';

const Home = () => {
    const classRows = [];
    for (let ai = 0; ai < Students.length; ai++) {
        const curRow = Students[ai];
        const tables = [];
        for (let bI = 0; bI < curRow.length; bI++) {
            const curTable = curRow[bI];
            const students = [];
            for (let cI = 0; cI < curTable.length; cI++) {
                const curStudent = curTable[cI];
                let resStudent;
                if (curStudent.noStudent === true) {
                    resStudent = (
                        <Student nostudent></Student>
                    );
                } else {
                    resStudent = (
                        <Student name={curStudent.name}></Student>
                    );
                }
                students.push(resStudent);
            }
            tables.push((
                <Table>
                    {students}
                </Table>
            ));
        }
        classRows.push((
            <div className="class_row" data-rows="2">
                {tables}
            </div>
        ));
    }
    return (
        <>
            <h1 className="text_center">Klassekart</h1>
            <div id="class_map">
                {classRows}
            </div>
        </>
    );

    /*
    <div id="class_map">
        <div className="class_row" data-rows="2">
            <Table>
                <Student name="Andreas"></Student>
                <Student name="Ahmad"></Student>
            </Table>
            <Table>
                <Student name="Philip"></Student>
                <Student nostudent></Student>
            </Table>
            <Table>
                <Student name="Gabriel"></Student>
                <Student name="Theodor"></Student>
            </Table>
        </div>
        <div className="class_row" data-rows="3">
            <Table>
                <Student name="Mattis"></Student>
                <Student name="Alva"></Student>
                <Student name="Silas"></Student>
            </Table>
            <Table>
                <Student name="Axel"></Student>
                <Student name="Vetle"></Student>
                <Student name="Kristoffer"></Student>
            </Table>
            <Table>
                <Student name="Johannes"></Student>
                <Student name="Elias"></Student>
                <Student name="Matheo"></Student>
            </Table>
        </div>
    </div>
    */
}

export default Home;
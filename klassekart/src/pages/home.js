import Table from '../table';
import Student from '../student';

import { Students } from '../students';

const Home = () => {
    const classRows = [];
    for (let columnIndex = 0; columnIndex < Students.length; columnIndex++) {
        const curColumn = Students[columnIndex];
        const tables = [];
        for (let tableIndex = 0; tableIndex < curColumn.length; tableIndex++) {
            const curTable = curColumn[tableIndex];
            const students = [];
            for (let studentIndex = 0; studentIndex < curTable.length; studentIndex++) {
                const curStudent = curTable[studentIndex];
                let resStudent;
                if (curStudent.noStudent === true) {
                    resStudent = (
                        <Student key={studentIndex.toString()} nostudent></Student>
                    );
                } else {
                    resStudent = (
                        <Student key={studentIndex.toString()} name={curStudent.name}></Student>
                    );
                }
                students.push(resStudent);
            }
            tables.push((
                <Table key={tableIndex.toString()}>
                    {students}
                </Table>
            ));
        }
        classRows.push((
            <div key={columnIndex.toString()} className="class_row" data-rows="2">
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
}

export default Home;
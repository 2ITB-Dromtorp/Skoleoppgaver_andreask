import Table from '../table';
import Student from '../student';

import { Students } from '../students';
import { useState } from 'react';



const Home = () => {
    const [students, setStudents] = useState(Students);

    function shuffle() {
        const newStudents = [...students];
        for (let i = students.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            const newN = newStudents[i];
            const oldN = newStudents[j];
            newStudents[i] = oldN;
            newStudents[j] = newN;
        }
        setStudents(newStudents);
    }








    return (
        <>
            <h1 className="text_center">Klassekart</h1>
            <div id="class_map">
                <div key="0" className="class_row" data-rows="2">
                    <Table key="0">
                        <Student key="0" name={students[0].name}></Student>
                        <Student key="1" name={students[1].name}></Student>
                    </Table>
                    <Table key="0">
                        <Student key="0" name={students[5].name}></Student>
                        <Student key="1" name={students[6].name}></Student>
                    </Table>
                    <Table key="0">
                        <Student key="0" name={students[10].name}></Student>
                        <Student key="1" name={students[11].name}></Student>
                    </Table>
                </div>
                <div key="1" className="class_row" data-rows="2">
                    <Table key="0">
                        <Student key="2" name={students[2].name}></Student>
                        <Student key="3" name={students[3].name}></Student>
                        <Student key="4" name={students[4].name}></Student>
                    </Table>
                    <Table key="0">
                        <Student key="2" name={students[7].name}></Student>
                        <Student key="3" name={students[8].name}></Student>
                        <Student key="4" name={students[9].name}></Student>
                    </Table>
                    <Table key="0">
                        <Student key="2" name={students[12].name}></Student>
                        <Student key="3" name={students[13].name}></Student>
                        <Student key="4" name={students[14].name}></Student>
                    </Table>
                </div>
            </div>
            <button id="randomize_button" className="button" onClick={shuffle}>Randomize</button>
        </>
    );
}

export default Home;
import oStudents from "./resources/students.json";

export const Students = oStudents;

export const AllStudents = [];

for (let columnIndex = 0; columnIndex < Students.length; columnIndex++) {
    const column = Students[columnIndex];
    for (let tableIndex = 0; tableIndex < column.length; tableIndex++) {
        const table = column[tableIndex];
        for (let studentIndex = 0; studentIndex < table.length; studentIndex++) {
            const student = table[studentIndex];
            AllStudents.push(student);
        }
    }
}

export const getStudentFromName = (name) => {
    let res;
    for (let i = 0; i < AllStudents.length; i++) {
        const curStudent = AllStudents[i];
        if (curStudent.name === name) {
            res = curStudent;
            break;
        }
    }
    return res;
}
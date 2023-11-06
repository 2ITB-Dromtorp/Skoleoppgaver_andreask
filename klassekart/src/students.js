import oStudents from "./resources/students.json";

export const Students = oStudents;

export const getStudentFromName = (name) => {
    let res;
    for (let i = 0; i < Students.length; i++) {
        const curStudent = Students[i];
        if (curStudent.name === name) {
            res = curStudent;
            break;
        }
    }
    return res;
}
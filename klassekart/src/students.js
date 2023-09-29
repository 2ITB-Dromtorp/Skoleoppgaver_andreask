export const Students = [
    [
        [
            {
                name: 'Andreas',
            },
            {
                name: 'Ahmad',
            },
        ],
        [
            {
                name: 'Philip',
            },
            {
                noStudent: true,
            },
        ],
        [
            {
                name: 'Gabriel',
            },
            {
                name: 'Theodor',
            },
        ],
    ],
    [
        [
            {
                name: 'Mattis',
            },
            {
                name: 'Alva',
            },
            {
                name: 'Silas',
            },
        ],
        [
            {
                name: 'Axel',
            },
            {
                name: 'Vetle',
            },
            {
                name: 'Kristoffer',
            },
        ],
        [
            {
                name: 'Johannes',
            },
            {
                name: 'Elias',
            },
            {
                name: 'Matheo',
            },
        ],
    ],
];

export const AllStudents = [];

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
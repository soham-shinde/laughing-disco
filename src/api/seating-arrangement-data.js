const seatingArrangementDataTable = [
    {
        sno : 1,
        title :'Unit Test',
        academicYear :'2023-2024',
        department:'Information Technology',
       
    },

    {
        sno : 2,
        title :'Unit Test',
        academicYear :'2024-2025',
        department:'Information Technology',
    
    }
]

const divisionsData = {
    FE: [
        { name: "FE1", startRollNo: 10101, endRollNo: 10175, total: 75, department: "FE" },
        { name: "FE2", startRollNo: 10201, endRollNo: 10275, total: 75, department: "FE" },
        { name: "FE3", startRollNo: 10301, endRollNo: 10375, total: 75, department: "FE" }
    ],
    SE: [
        { name: "SE1", startRollNo: 21101, endRollNo: 21189, total: 89, department: "CE" },
        { name: "SE2", startRollNo: 21201, endRollNo: 21288, total: 88, department: "CE" },
        { name: "SE3", startRollNo: 21301, endRollNo: 21386, total: 86, department: "CE" },
        { name: "SE5", startRollNo: 22101, endRollNo: 22178, total: 78, department: "ENTC" },
        { name: "SE6", startRollNo: 22201, endRollNo: 22279, total: 79, department: "ENTC" },
        { name: "SE9", startRollNo: 23101, endRollNo: 23183, total: 83, department: "IT" },
        { name: "SE10", startRollNo: 23201, endRollNo: 23286, total: 86, department: "IT" }
    ],
    TE: [
        { name: "TE1", startRollNo: 31101, endRollNo: 31186, total: 86, department: "CE" },
        { name: "TE2", startRollNo: 31201, endRollNo: 31284, total: 84, department: "CE" },
        { name: "TE3", startRollNo: 31301, endRollNo: 31389, total: 89, department: "CE" },
        { name: "TE5", startRollNo: 32101, endRollNo: 32175, total: 75, department: "ENTC" },
        { name: "TE6", startRollNo: 32201, endRollNo: 32273, total: 73, department: "ENTC" },
        { name: "TE9", startRollNo: 33101, endRollNo: 33181, total: 81, department: "IT" },
        { name: "TE10", startRollNo: 33201, endRollNo: 33280, total: 80, department: "IT" }
    ],
    BE: [
        { name: "BE1", startRollNo: 41101, endRollNo: 41177, total: 77, department: "CE" },
        { name: "BE2", startRollNo: 41201, endRollNo: 41278, total: 78, department: "CE" },
        { name: "BE3", startRollNo: 41301, endRollNo: 41388, total: 88, department: "CE" },
        { name: "BE5", startRollNo: 42101, endRollNo: 42178, total: 78, department: "ENTC" },
        { name: "BE6", startRollNo: 42201, endRollNo: 42279, total: 79, department: "ENTC" },
        { name: "BE9", startRollNo: 43101, endRollNo: 43164, total: 64, department: "IT" },
        { name: "BE10", startRollNo: 43201, endRollNo: 43263, total: 63, department: "IT" }
    ]
};

const classroomData = {
    "A1-109": 50,
    "A1-110": 49,
    "A3-307": 59,
    "A3-308": 50,
    "A3-405": 47,
    "A3-406": 48,
    "A3-407": 54,
    "IT Seminar Hall": 70   
};

export function getSeatingArrangementList(){
    return seatingArrangementDataTable;
}

export function getClassRoomData(){
    return classroomData;
}

export function getDivisionsData(){
    return divisionsData;
}
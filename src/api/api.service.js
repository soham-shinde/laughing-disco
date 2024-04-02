const { idID } = require("@mui/material/locale");
const axios = require("axios");

const url = 'http://localhost:8080';

async function getAllTeachers() {
    try {
      const response = await axios.get(`${url}/teachers/`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
async function getTeachersById(id) {
    try {
      const response = await axios.get(`${url}/teachers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
async function createNewTeacher(data) {
    try {
      const response = await axios.post(`${url}/teachers/new`,data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
async function updateTeacher(data) {
    try {
      const response = await axios.put(`${url}/teachers/edit/${data._id}`,data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

async function deleteTeacher(id) {
    try {
      const response = await axios.delete(`${url}/teachers/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }


// Schedule
// "{
//     "title": "a",
//     "selectedYears": [
//         "FE",
//         "SE"
//     ],
//     "subjectsPerYear": {
//         "FE": "2",
//         "SE": "3"
//     },
//     "paperSlotsPerDay": "1",
//     "paperTimeSlots": [
//         {
//             "startTime": "03:08",
//             "endTime": "04:08"
//         }
//     ],
//     "noOfBlocks": "4",
//     "teacherList" :[];
// }"

async function sendBasicInfo(data) {
    try {
      const response = await axios.post(`${url}/supervision/new`,data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }




//   getTeachersById("65e7160e05467e6823046207").then(function(teachers) {
//     console.log(teachers);
// })

//   createNewTeacher({
//     teacherId: 43,
//     name: 'AMRUTA ABHINANDAN PATIL',
//     designation: 'ASSIT.PROFESSOR',
//     teachTo: [ 'BE' ],
//     joiningData:"22-12-2024"
//   }).then(function(teachers) {
//     console.log(teachers);
// })
//   createNewTeacher({
//     teacherId: 43,
//     name: 'JAshutosh Patil',
//     designation: 'ASSIT.PROFESSOR',
//     teachTo: [ 'BE' ],
//     joiningData:"22-12-2024"
//   }).then(function(teachers) {
//     console.log(teachers);
// })
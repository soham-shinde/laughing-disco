import React ,{useState} from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell,TextField } from '@mui/material';

export default function SeatingArrangementTable({ formData ,readOnly}) {


    const [classroomData, setClassroomData] = useState(formData.classroomData);

     // Handle classroom number change
     const handleClassroomEdit = (classroomIndex, newValue) => {
      const updatedClassroomData = [...classroomData];
      updatedClassroomData[classroomIndex].name = newValue;
      setClassroomData(updatedClassroomData);
  };

    // Generating the table header for exam slots
    const examSlotHeaders = [];
    for (let i = 0; i < parseInt(formData.examdays); i++) {
        // Calculate the next date based on the current index
        const nextDate = new Date(formData.examStartDate);
        nextDate.setDate(nextDate.getDate() + i);

        // Format the next date as "dd/mm/yyyy"
        const formattedNextDate = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getFullYear()}`;

        // Add the exam date, time slots, and classroom no for the current exam day
        const examDayHeader = (
            <TableCell key={i} >
                <div>{formattedNextDate}</div>
                {formData.examTimeSlots.map((slot, index) => (
                    <div key={index}>{`${slot.startTime} TO ${slot.endTime}`}</div>
                ))}
                <div>Classroom No</div>
            </TableCell>
        );

        examSlotHeaders.push(examDayHeader);
    }

    // Generating the table body rows
    const tableRows = formData.divisionsPerYear[formData.selectedYears[0]].map((division, index) => {
        // Calculate total students in the class
        let totalStudents = parseInt(division.endRollNo) - parseInt(division.startRollNo) + 1;

        // Calculate the number of students per classroom
        const studentsPerClassroom = formData.classroomData.map(classroom => parseInt(classroom.capacity));
        
        // Split total students into classrooms based on capacity
        const rollNos = [];
        let startRollNo = parseInt(division.startRollNo);
        for (let i = 0; i < studentsPerClassroom.length; i++) {
            const currentCapacity = Math.min(studentsPerClassroom[i], totalStudents);
            rollNos.push(`${startRollNo}-${startRollNo + currentCapacity - 1}`);
            startRollNo += currentCapacity;
            totalStudents -= currentCapacity;
            if (totalStudents <= 0) break;
        }

        // Generate table rows for each classroom
        const rows = rollNos.map((rollNo, i) => (
            <TableRow key={`${division.className}_${i}`}>
                <TableCell>{division.className}</TableCell>
                <TableCell>{rollNo}</TableCell>
                <TableCell>{rollNo.split('-')[1] - rollNo.split('-')[0] + 1}</TableCell>
                {examSlotHeaders.map((_, index) => (
                    <TableCell key={`${division.className}_${i}_${index}`}>
                      <TextField
                    id={`classroom${i}_${index}`}
                    
                    defaultValue={formData.classroomData[i].name}
                    onChange={(e) => handleClassroomEdit(i, e.target.value)}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                /></TableCell>
                ))}
            </TableRow>
        ));

        return rows;
    }).flat(); // Added .flat() to flatten the array

    return ( 
        <div>
            <Typography variant="h5" align="center" gutterBottom>
            PUNE INSTITUTE OF COMPUTER TECHNOLOGY
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Department of {formData.selectedDepartment}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            {formData.title}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            {formData.selectedAcademicYear}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            SEATING ARRANGEMENT
          </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell>Student Roll No</TableCell>
                        <TableCell>Total</TableCell>
                        {examSlotHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </div>
    );

}

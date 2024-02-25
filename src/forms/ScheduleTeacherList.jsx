import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

import { getTeacherList } from '../api/data-service';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = getTeacherList();
    const teachersWithSelection = data.map((teacher) => ({
      ...teacher,
      selected: false,
    }));
    setTeachers(teachersWithSelection);
  }, []);

  const handleToggle = (sno) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.sno === sno ? { ...teacher, selected: !teacher.selected } : teacher
      )
    );
  };

  const handleSelectAll = () => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => ({ ...teacher, selected: true }))
    );
  };

  const handleUnselectAll = () => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => ({ ...teacher, selected: false }))
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} spacing={1}>


        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div style={{ display: "flex" }}>
          <Button variant="outlined" size="small" sx={{ m: 1 }} onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="outlined" size="small" sx={{ m: 1 }} onClick={handleUnselectAll}>
            Unselect All
          </Button>
        </div>

      </Stack>
      <div style={{ height: "300px", overflowY: "scroll" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teacher Name</TableCell>
                <TableCell>Selected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.sno}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>
                    <Switch
                      onChange={() => handleToggle(teacher.sno)}
                      checked={teacher.selected}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TeacherList;

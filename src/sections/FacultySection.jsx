import * as React from 'react';
import { useState } from 'react';
import StickyHeadTable from "../components/TableComponent.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2';
import { Autocomplete, Box, TextField, Button, Stack } from '@mui/material';
import Typography from "@mui/material/Typography";
import teachers from './FacultyData/facultydata.js';
import Modal from '@mui/material/Modal';
import AddFacultyForm from '../forms/AddFacultyForm.jsx';
import EditFacultyForm from '../forms/EditFacultyForm.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const columns = [
  { id: 'sno', label: 'Sr. No.', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'designation',
    label: 'Designation',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'joinDate',
    label: 'Joining Date',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'teachTo',
    label: 'Teach To',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value, row, onDeleteClick, onEditClick) => (
      <div>
        <IconButton onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(row)
        }} title="Delete">
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton onClick={(e) => {
          e.stopPropagation(); onEditClick(row)
        }} title="Edit">
          <EditIcon style={{ color: '#2DB532' }} />
        </IconButton>
      </div>
    ),

  },
];



export default function FacultyList() {

  const [rows, setRows] = useState(teachers);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/api/faculty');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     setRows(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const handleDeleteClick = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(row);
      }
    })
  }

  const deleteApi = async (row) => {
    //delete data request here
    Swal.fire("Deleted!", "Data has been deleted", "success");
    //fetch data again here
  }


  const handleEditClick = (row) => {
    console.log(row);
    const data = {
      id: row.id,
      name: row.name,
      designation: row.designation,
      joining_date: new Date(row.joinDate),
      teachTo: row.teachTo
    }
    console.log("in faculty : " + data.joining_date)
    setFormId(data);
    handleEditOpen();
  }

  const handleSearchClick = (value) => {
    console.log("Search value:", value);
    if (!value) {
      setRows(teachers);
      return;
    }
    if (value && typeof value === 'object') {
      const filteredTeachers = teachers.filter(teacher => teacher.name.toLowerCase().includes(value.name.toLowerCase()));
      console.log("Filtered teachers:", filteredTeachers);
      setRows(filteredTeachers);
    }
  }

  return (
    <div>
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <AddFacultyForm closeEvent={handleClose} />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <EditFacultyForm closeEvent={handleEditClose} formid={formid} />
          </Box>
        </Modal>
      </div>



      <div style={{ marginTop: '1%', padding: '1%' }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={teachers}
            sx={{ width: 300 }}
            onChange={(e, v) => handleSearchClick(v)}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} size='small' label="Search" />
            )}
          >
          </Autocomplete>
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
          </Typography>  */}
          <Button variant="outlined" endIcon={<AddCircleIcon />} onClick={handleOpen}>
            Add
          </Button>
        </Stack>

        <Box height={10} />
        {/* <Box height={10} /> */}

        <StickyHeadTable columns={columns} rows={rows} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />

      </div >
    </div>
  );
}

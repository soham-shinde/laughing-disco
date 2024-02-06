import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StickyHeadTable from "../components/TableComponent";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import ExportIcon from '@mui/icons-material/Export';
import GetAppIcon from '@mui/icons-material/GetApp';
import ScheduleForm from "../forms/ScheduleForm";

const columns = [
  { id: 'id', label: 'Sr No.', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 100 },
  {
    id: 'year',
    label: 'Year',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'semester',
    label: 'Semester',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 200,
    align: 'center',
    format: (value, row, onDeleteClick, onEditClick, onExportClick) => (
      <div>
        <IconButton onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(row)
        }}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={(e) => {
          e.stopPropagation(); onEditClick(row)
        }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={(e) => {
          e.stopPropagation(); onExportClick(row)
        }}>
          <GetAppIcon />
        </IconButton>
      </div>
    ),
  },
];


const rows = [
  { id: 1, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 2, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 3, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 4, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 5, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 6, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
  { id: 7, title: 'Unit Test', date: '06-02-2023', year: "TE", semester: "6" },
];
export default function ScheduleSection() {
  const handleDeleteClick = (row) => {
    console.log('Delete clicked:', row);
    // Add your delete logic here
  };

  const handleEditClick = (row) => {
    console.log('Edit clicked:', row);
    // Add your edit logic here
  };

  const handleExportClick = (row) => {
    console.log('Export clicked:', row);
    // Add your export logic here
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (event,reason) => {
    if (reason && reason === "backdropClick")
        return;
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleOpenModal}>
          Create New Schedule
        </Button>
      </div>
      <div>
        <StickyHeadTable columns={columns} rows={rows} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleExportClick={handleExportClick} />
      </div>
      <ScheduleForm isOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
}

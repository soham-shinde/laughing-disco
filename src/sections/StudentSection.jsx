
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import StickyHeadTable from "../components/TableComponent.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GetAppIcon from '@mui/icons-material/GetApp';
import { Autocomplete, Box, TextField, Button, Stack, Typography } from "@mui/material";

import { getSeatingArrangementList } from "../api/seating-arrangement-data.js";

import Modal from "@mui/material/Modal";
import ConfirmMessageModal from "../components/ConfirmMessageModal.jsx";
import FeedbackMessageModal from "../components/FeedbackMessageModal.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const columns = [
  { id: "sno", label: "Sr. No.", minWidth: 80 },
  { id: "title", label: "Title", minWidth: 120 },
  
  {
    id: "department",
    label: "Department",
    minWidth: 120,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "academicYear",
    label: "Academic Year",
    minWidth: 120,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value, row, onDeleteClick, onEditClick, onExportClick) => (
      <div>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(row);
          }}
          title="Delete"
        >
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(row);
          }}
          title="Edit"
        >
          <EditIcon style={{ color: "#2DB532" }} />
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

export default function StudentSection() {

  const navigate = useNavigate();
  const [seatingArrangementList, setSeatingArrangementList] = useState([]);
  const [rows, setRows] = useState([]);
  const [deleteopen, setDeleteOpen] = useState(false);
  
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMainMessage, setFeedbackMainMessage] = useState("");
  const [feedbackDetailMessage, setFeedbackDetailMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    const seatingArrangementList = getSeatingArrangementList();
    setSeatingArrangementList(seatingArrangementList);
    setRows(seatingArrangementList);
  }, []);
 
  const handleAddOpen =()=>{
    navigate('/student/add')
  };
  
  const handleEditOpen = () => {
    console.log("Edit click");
  }
  
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleFeedbackClose = () => setFeedbackOpen(false);

  const handleDeleteClick = (row) => {
   
    handleDeleteOpen();
  };

  const handleDeleteConfirm = async (row) => {
    try {
      // Perform your deletion logic here...

      // Show Feedback modal if deletion is successfull
      setFeedbackMainMessage("Deleted!");
      setFeedbackDetailMessage("Data has been deleted successfully");
      setFeedbackType("success");
      setFeedbackOpen(true);
    } catch (error) {
      console.error("Error deleting data:", error);
      setFeedbackMainMessage("Error!");
      setFeedbackDetailMessage("An error occurred during deletion");
      setFeedbackType("error");
      setFeedbackOpen(true);
    } finally {
      handleDeleteClose();
    }
  };

  const handleEditClick = (row) => {
    
    handleEditOpen();
  };

  const handleSearchClick = (value) => {

    if (!value) {
      setRows(seatingArrangementList);
      return;
    }
    if (typeof value === "object") {
      const filteredSeatingArrangementList= seatingArrangementList.filter((seatingArrangementList) =>
      seatingArrangementList.title.toLowerCase().includes(value.title.toLowerCase())
      );
      setRows(filteredSeatingArrangementList);
    }
  };

  return (
    <div>
      <Typography component="h6" variant="h6" align="center">
          Seating Arrangement
      </Typography>
      <div>
        
        <Modal
          open={deleteopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ConfirmMessageModal
              onClose={handleDeleteClose}
              onDeleteConfirm={handleDeleteConfirm}
            />
          </Box>
        </Modal>

        <Modal
          open={feedbackOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FeedbackMessageModal
              onClose={handleFeedbackClose}
              mainMessage={feedbackMainMessage}
              detailMessage={feedbackDetailMessage}
              feedbackType={feedbackType}
            />
          </Box>
        </Modal>
      </div>

      <div style={{ marginTop: "1%", padding: "1%" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className="my-2 mb-2"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={seatingArrangementList}
            sx={{ width: 300 }}
            onChange={(e, v) => handleSearchClick(v)}
            getOptionLabel={(rows) => rows.title || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search" />
            )}
          ></Autocomplete>
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={handleAddOpen}
          >
            Create
          </Button>
        </Stack>

        <Box height={10} />

        <StickyHeadTable
          columns={columns}
          rows={rows}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}


import * as React from "react";
import { useState, useEffect } from "react";
import StickyHeadTable from "../components/TableComponent.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Autocomplete, Box, TextField, Button, Stack } from "@mui/material";

import { getTeacherList } from "../api/data-service.js";

import Modal from "@mui/material/Modal";
import AddFacultyForm from "../forms/AddFacultyForm.jsx";
import EditFacultyForm from "../forms/EditFacultyForm.jsx";
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
  { id: "sno", label: "Sr. No.", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "designation",
    label: "Designation",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "joinDate",
    label: "Joining Date",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "teachTo",
    label: "Teach To",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value, row, onDeleteClick, onEditClick) => (
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
      </div>
    ),
  },
];

export default function FacultySection() {
  const [teachers, setTeachers] = useState([]);
  const [rows, setRows] = useState([]);

  const [addopen, setAddOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false);
  const [formid, setFormId] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMainMessage, setFeedbackMainMessage] = useState("");
  const [feedbackDetailMessage, setFeedbackDetailMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    const teacherList = getTeacherList();
    setTeachers(teacherList);
    setRows(teacherList);
  }, []);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleFeedbackClose = () => setFeedbackOpen(false);

  const handleDeleteClick = (row) => {
    setFormId(row);
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
    console.log(row);
    const data = {
      id: row.id,
      name: row.name,
      designation: row.designation,
      joining_date: new Date(row.joinDate),
      teachTo: row.teachTo,
    };
   
    setFormId(data);
    handleEditOpen();
  };

  const handleSearchClick = (value) => {
    
    if (!value) {
      setRows(teachers);
      return;
    }
    if (typeof value === "object") {
      const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(value.name.toLowerCase())
      );
      console.log("Filtered teachers:", filteredTeachers);
      setRows(filteredTeachers);
    }
  };

  return (
    <div>
      <div>
        <Modal
          open={addopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddFacultyForm
              onClose={handleAddClose}
              onSuccess={() => {
                setFeedbackMainMessage("Added!");
                setFeedbackDetailMessage("Data has been added successfully");
                setFeedbackType("success");
                setFeedbackOpen(true);
              }}
              onError={() => {
                setFeedbackMainMessage("Error!");
                setFeedbackDetailMessage("An error occurred during editing");
                setFeedbackType("error");
                setFeedbackOpen(true);
              }}
            />
          </Box>
        </Modal>

        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditFacultyForm
              onClose={handleEditClose}
              formid={formid}
              onSuccess={() => {
                setFeedbackMainMessage("Edited!");
                setFeedbackDetailMessage("Data has been edited successfully");
                setFeedbackType("success");
                setFeedbackOpen(true);
              }}
              onError={() => {
                setFeedbackMainMessage("Error!");
                setFeedbackDetailMessage("An error occurred during editing");
                setFeedbackType("error");
                setFeedbackOpen(true);
              }}
            />
          </Box>
        </Modal>

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
            options={teachers}
            sx={{ width: 300 }}
            onChange={(e, v) => handleSearchClick(v)}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search" />
            )}
          ></Autocomplete>
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={handleAddOpen}
          >
            Add
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


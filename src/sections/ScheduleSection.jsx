import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function ScheduleSection() {
  return (
    <div>
      <div>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Create New Schedule
        </Button>
      </div>
      <div>
        
      </div>
    </div>
  );
}

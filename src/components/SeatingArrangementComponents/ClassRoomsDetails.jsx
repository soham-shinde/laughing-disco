import React from "react";
import {

  Grid,
 
  FormControl,
  FormLabel,
 
} from "@mui/material";
import MultiSelect from "../MultiSelect";
import { getClassRoomData } from "../../api/seating-arrangement-data";
export default function ClassroomsDetails({ formData, setFormData}) {
    const classRoomData = getClassRoomData();
    const handleClassroomChange = (selectedClassrooms) => {
        const formattedClassrooms = selectedClassrooms.map(classroom => ({
          name: classroom.split(" - ")[0], // Extracting the name
          capacity: parseInt(classroom.split(" - ")[1]) // Extracting and parsing the capacity
        }));
        setFormData({ ...formData, selectedClassrooms: formattedClassrooms });
      };
      
  return (
    <Grid container item xs={12}  sx={{ my: 2 }} >
            <FormLabel required>Select Classrooms</FormLabel>
        
            <FormControl required fullWidth>
            
              <MultiSelect
                options={classRoomData.map((classroom) => `${classroom.name} - ${classroom.capacity}`)}
                value={formData.selectedClassrooms.map(classroom => `${classroom.name} - ${classroom.capacity}`)}
                onChange={handleClassroomChange}
              />

            </FormControl>
    </Grid>
  );
}

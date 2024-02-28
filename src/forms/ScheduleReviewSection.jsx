import React from 'react'
import { Typography, Box, Button } from "@mui/material";
export default function ScheduleReviewSection({ activeStep,
    handleNext,
    handleBack,
    handleClose,
    steps,
    formData,
    selectedTeachers, }) {
    return (
        <div>
            <div>
                <Typography variant="h5">Review Details</Typography>
                <Typography variant="subtitle1">Basic Details:</Typography>
                <Typography variant="body1">Title: {formData.title}</Typography>
                <Typography variant="body1">
                    Selected Years: {formData.selectedYears.join(", ")}
                </Typography>
                {Object.entries(formData.subjectsPerYear).map(([year, subjects]) => (
                    <Typography key={year} variant="body1">
                        Subjects for {year}: {subjects}
                    </Typography>
                ))}
                <Typography variant="body1">
                    Paper Slots Per Day: {formData.paperSlotsPerDay}
                </Typography>
                {formData.paperTimeSlots.map((timeSlot, index) => (
                    <Typography key={index} variant="body1">
                        Time Slot {index + 1}: {timeSlot.startTime}
                    </Typography>
                ))}
                <Typography variant="subtitle1">Selected Teachers:</Typography>
                {selectedTeachers.map((teacher) => (
                    teacher.selected ?
                        <Typography key={teacher.sno} variant="body1">
                            {teacher.name} - Teaches: {teacher.teachTo.join(", ")}
                        </Typography> : <></>
                ))}
            </div>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>
                )}
                <Button
                    onClick={() => {
                        handleClose();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Close
                </Button>

                {activeStep !== steps && (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps - 1 ? "Submit" : "Next"}
                    </Button>
                )}
            </Box>
        </div>
    )

}

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const steps = ["Enter Basic Details", "Select Teacher", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div>Step 1</div>;
    case 1:
      return <div>Step 2</div>;
    case 2:
      return <div>Step 3</div>;
    default:
      throw new Error("Unknown step");
  }
}

export default function ScheduleForm({ isOpen, handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Create new Schedule
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Close
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </Modal>
    </>
  );
}

//   {/* <Box sx={{ width: 400, bgcolor: "background.paper", p: 2, borderRadius :3 }}>
//
// <p>This is your modal content</p>
// <Button
//   variant="contained"
//   onClick={(e) => {
//     handleClose(e, "close");
//   }}
// >
//   Close
// </Button>
// </Box>

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Tour"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You Can Not Delete The Tour Because its less than 3 days to the tour
            date
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;

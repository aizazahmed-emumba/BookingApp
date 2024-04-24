import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: string;
  deleteListner: (id: string) => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  open,
  setOpen,
  deleteListner,
  id,
}) => {
  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          color={"#F83030"}
          fontSize={"30px"}
          fontWeight={"bold"}
        >
          Delete Tour
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={"20px"} id="alert-dialog-description">
            Are you sure you want to delete "{" "}
            <span className="font-bold">{title}</span>"
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button
            variant="outlined"
            color="inherit"
            autoFocus
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(false);
              deleteListner(id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;

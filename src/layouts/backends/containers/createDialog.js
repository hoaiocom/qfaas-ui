import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateDialog(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        props.choosePageChanger(0);
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create function status
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                    {props.status === "success" && (
                        <Button onClick={handleAgree} autoFocus>
                            Return invoke
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}

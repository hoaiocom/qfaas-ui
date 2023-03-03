import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, TextField, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VuiInput from 'components/VuiInput';
import { StyledVuiInput } from '../components/styledVuiInput';
import CreateBackdropWaiting from './createBackdropWaiting';
import { AuthContext } from "context/authentication";
import { useContext } from "react";

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function DeleteDialog(props) {
    const [open, setOpen] = React.useState(true);
    const [agree, setAgree] = React.useState(true);
    const [input, setInput] = React.useState('');
    const [waiting, setWaiting] = React.useState(false);
    const [result, setResult] = React.useState({
        status: '',
        body: {}
    })
    const authCtx = useContext(AuthContext);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (input === props.parentData.jobId) {
            setResult({
                status: '',
                body: {}
            })
            setWaiting(true);
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`,
                },
            };

            const url = `/api/job/${props.parentData.jobId}`;

            try {
                fetch(url, requestOptions)
                    .then((res) => {
                        if (res.status === 401) {
                            authCtx.logout();
                            window.location.replace('/');
                        }
                        return res.json()
                    }
                    ).then((data) => {
                        console.log(data)
                        if (data.statusCode === 200) {
                            setResult({
                                status: 'success',
                                message: data.message
                            })
                        } else {
                            setResult({
                                status: 'failed',
                                message: data.message
                            })
                        }
                    })
            } catch (error) {
                console.log(error)
            }
            // sleep(10000);
            setWaiting(false);
        } else {
            setResult({
                status: 'failed',
                body: {
                    detail: 'Input does not match!'
                }
            })
        }
    };

    const updateInputValue = (event) => {
        setInput(event.target.value)
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
                    Are you sure to delete job <span style={{ color: 'blue', fontWeight: 'bold' }}>{props.parentData.jobId}</span>?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please enter <span style={{ color: 'blue', fontWeight: 'bold' }}>{props.parentData.jobId}</span> below to delete this job data:
                        {waiting ? (
                            <CreateBackdropWaiting />
                        ) : (
                            <Box sx={{ mt: 2 }}>
                                <VuiInput onChange={event => updateInputValue(event)} />
                            </Box>
                        )
                        }
                        {result.status === "success" && (
                            <Typography color='#5B8930' variant='caption'> {result.message} </Typography>
                        )}
                        {result.status === "failed" && (
                            <Typography color='#ff0000' variant='caption'> {result.message} </Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

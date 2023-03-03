import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import Editor from "./codeEditor"
import { Box, Typography, Grid } from '@mui/material';
import VuiButton from "components/VuiButton";
import VuiBadge from "components/VuiBadge";
import CircularIndeterminate from "../components/circularIndeterminate"

export default function InvokeInputFormJson(props) {
    const [result, setResult] = React.useState()
    const [waiting, setWaiting] = React.useState(false)
    const [code, setCode] = React.useState(
        `{
    "input": 10,
    "shots": 10,
    "waitForResult": 1,
    "provider": "qfaas",
    "autoSelect": 1,
    "backendType": "simulator",
    "backendName": ""
}`
    );

    return (
        <>
            <div>
                <Formik
                    initialValues={{}}
                    onSubmit={async (values) => {
                        const data = JSON.parse(code);

                        setWaiting(true)
                        setResult()
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                            },
                            body: JSON.stringify(data),
                        };

                        const url = '/api/function/' + props.recentFunc.name;

                        fetch(url, requestOptions)
                            .then((res) => {
                                return res.json()
                            }
                            )
                            .then((data) => {
                                setResult(data)
                                setWaiting(false)
                            });

                    }}
                >
                    <Form>
                        <Editor code={code} codeChanger={setCode} />

                        <div>
                            <center>
                                <hr style={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    width: "100%",
                                    height: .5,
                                    borderColor: '#4B77BE',
                                    opacity: 0.3
                                }} />
                            </center>
                        </div>

                        <Box>
                            {
                                result && (
                                    <>
                                        <Typography color="#ffffff" variant="h5">
                                            Output
                                        </Typography>
                                        <Grid container spacing={0}>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Result
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#F7CA18" variant="subtitle2">
                                                        {result.data.result.data}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Job ID
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#F7CA18" variant="subtitle2">
                                                        {result.data.jobId}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Backend Device
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#F7CA18" variant="subtitle2">
                                                        {result.data.backend.name} &nbsp;
                                                        <VuiBadge badgeContent={result.data.backend.hub} variant="contained" size="xs" container />
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Submited time
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#02b574" variant="subtitle2">
                                                        {result.data.submitTime}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Last updated time
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#02b574" variant="subtitle2">
                                                        {result.data.lastUpdated}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Status
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography color="#02b574" variant="subtitle2">
                                                        <VuiBadge color={result.data.status === "DONE" ? "success" : "error"} badgeContent={result.data.status} container />
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Typography color="#ffffff" variant="caption">
                                                Details
                                            </Typography>
                                        </div>
                                        <Editor code={JSON.stringify(result.data.result, null, 2)} />

                                        {/* <VuiInput
                                            placeholder={result}
                                            multiline
                                            rows={5}
                                            value={JSON.stringify(result.data)}
                                            sx={{ mt: 2 }}
                                        /> */}
                                    </>
                                )
                            }
                            {
                                waiting === true &&
                                (
                                    <CircularIndeterminate />
                                )
                            }
                        </Box>
                        <Box textAlign="center" sx={{ mt: '20px' }}>
                            <VuiButton type="submit" variant="gradient" color="info" size="large">Invoke</VuiButton>
                        </Box>
                    </Form>
                </Formik>
            </div>
        </>
    )
}
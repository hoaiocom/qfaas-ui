import { useState } from "react";
// import Box from "components/Box";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import VuiBadge from "components/VuiBadge";
import Editor from "./codeEditor"
// Vision UI Dashboard React example components
import React from "react";
import { ProviderSelect } from "../containers/providerSelect";
import { BackendSelect } from "../containers/backendSelect";
import { StyledMultiInput } from "../components/styledMulInput"
import { StyledVuiInput } from "../components/styledVuiInput"
import CircularIndeterminate from "../components/circularIndeterminate"

// Material UI components
import {
    Box,
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useFormik, Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInput-root": {
            backgroundColor: "#0f1535 !important"
        },
        "& .MuiFilledInput-root:hover": {
            backgroundColor: "red",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: "red"
            }
        },
        "& .MuiFilledInput-root.Mui-focused": {
            backgroundColor: "red"
        },
        "& .MuiFormControlLabel-label": {
            color: "white"
        },
        "& .PrivateSwitchBase-input": {
            opacity: 0.15
        }
    }
}));

export default function InvokeInputFormUI(props) {
    const classes = useStyles();
    const [result, setResult] = useState();
    const [providerOption, setProviderOption] = useState();
    const [backendName, setBackendName] = useState();
    const [backendType, setBackendOption] = useState();
    const [waiting, setWaiting] = useState(false);
    const [autoSelect, setAutoSelect] = useState(0);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            image: "",
            shots: 10,
            waitForResult: 1,
            input: 10,
            autoSelect: 1,
            backendName: "",
            backendType: "simulator"
        },
        onSubmit: (values, actions) => {

            setWaiting(true)
            setResult()

            const data = {
                input: Number(values.input), //text area
                shots: Number(values.shots), // input
                provider: providerOption, // ibmq (qiskit), simulator
                waitForResult: Number(values.waitForResult), //radio
                autoSelect: autoSelect, //
                backendType: backendType,
                backendName: backendName
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            };

            const url = 'api/function/' + props.recentFunc.name;

            fetch(url, requestOptions)
                .then((res) => {
                    if (res.status >= 400) {
                        setWaiting(false);
                        let errorMessage = "Server responds with error! Please try again later.";
                        throw new Error(errorMessage);
                    }

                    return res.json()
                }
                )
                .then((data) => {
                    setResult(data)
                    setWaiting(false)
                });

        },
    });
    const { handleSubmit, getFieldProps } = formik;

    return (
        <Box>
            <Formik value={formik}>
                <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Grid container spacing={0}>
                        <>
                            <Grid item xs={4} sm={4}>
                                <div>
                                    <Typography color="#ffffff" variant="caption">
                                        Provider
                                    </Typography>
                                </div>
                                <div>
                                    <ProviderSelect providerOptionChanger={setProviderOption} />
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <div>
                                    <Typography color="#ffffff" variant="caption" >
                                        Wait for result
                                    </Typography>
                                </div>
                                <div>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="true"
                                        name="wait-for-result"
                                        {...getFieldProps("waitForResult")}
                                    >
                                        <FormControlLabel
                                            value="1"
                                            control={
                                                <Radio required={true} />
                                            }
                                            label="True"
                                            className={classes.root}
                                        />
                                        <FormControlLabel value="0" control={<Radio required={true} />} className={classes.root} label="False" />
                                    </RadioGroup>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <div>
                                    <Typography color="#ffffff" variant="caption">
                                        Shots
                                    </Typography>
                                </div>
                                <div>
                                    <StyledVuiInput
                                        required
                                        type="number"
                                        placeholder="Number of shots (replications)"
                                        {...getFieldProps("shots")} // get input & forward to formik 
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12}>
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
                            </Grid>

                            {
                                providerOption === "ibmq" && (
                                    <>
                                        <Grid item xs={3} sm={3}>
                                            <div>
                                                <Typography color="#ffffff" variant="caption">
                                                    Auto select most appropriate backend
                                                </Typography>
                                            </div>
                                            <div>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label-autoselect"
                                                    name="autoSelect"
                                                    required
                                                    className={classes.root}
                                                    defaultValue={true}

                                                >
                                                    <FormControlLabel
                                                        onChange={(e, value) => {
                                                            setAutoSelect(1)
                                                        }}
                                                        value="true"
                                                        control={<Radio required={true} />}
                                                        className={classes.root}
                                                        label="True" />
                                                    <FormControlLabel
                                                        onChange={(e, value) => {
                                                            setAutoSelect(0)
                                                        }}
                                                        value="false"
                                                        control={<Radio required={true} />}
                                                        className={classes.root}
                                                        label="False" />
                                                </RadioGroup>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4} >
                                            <div>
                                                <Typography color="#ffffff" variant="caption" >
                                                    Backend type
                                                </Typography>
                                            </div>
                                            <div>
                                                <BackendSelect backendOptionChanger={setBackendOption} />
                                            </div>
                                        </Grid>

                                        {autoSelect === 0 && (
                                            <Grid item xs={2} sm={2} sx={{ mr: '50px' }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Backend name (manually select)
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <VuiInput
                                                        placeholder="Type here..."
                                                        sx={{ width: "100% !important", mt: "10px" }}
                                                        {...getFieldProps("backendName")}
                                                    />
                                                </div>
                                            </Grid>
                                        )}
                                        <Grid item xs={12} sm={12}>
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
                                        </Grid>
                                    </>
                                )

                            }

                            <Grid item xs={12} sm={12}>
                                <div>
                                    <Typography color="#ffffff" variant="h5">
                                        Input
                                    </Typography>
                                </div>
                                <Box sx={{ m: "10px" }}>
                                    <StyledMultiInput
                                        placeholder="Type here..."
                                        multiline
                                        rows={5}
                                        required
                                        {...getFieldProps("input")}
                                    />
                                </Box>
                            </Grid>



                            <Grid item xs={12} sm={12}>
                                <div>
                                    <hr style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        width: "100%",
                                        height: .5,
                                        borderColor: '#4B77BE',
                                        opacity: 0.3
                                    }} />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12}>
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
                                                            <VuiBadge color={result.data.status === "DONE" ? "success" : "error"} badgeContent={result.data.status} container />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Details
                                                    </Typography>
                                                </div>
                                                <Editor code={JSON.stringify(result.data.result, null, 2)} />                                                {/* <VuiInput
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
                            </Grid>
                        </>
                    </Grid>
                </Form>
            </Formik>
        </Box >
    );
}
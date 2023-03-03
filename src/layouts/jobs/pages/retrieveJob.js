// @mui material components
import Card from "@mui/material/Card";
// Vision UI Dashboard React components
// import Box from "components/Box";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "containers/DashboardNavbar";
import Footer from "examples/Footer";
import React from "react";
import { JobStatusBadge } from "../containers/logo"
import Editor from "../containers/codeEditor"
import CircularIndeterminate from "../components/circularIndeterminate"

// Material UI components
import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import VuiBadge from "components/VuiBadge";
import InvokeInputTab from "../containers/invokeInputTab";
import InvokeJSONForm from "../containers/invokeInputFormJson"
import InvokeUIForm from "../containers/invokeInputFormUI"

import { AuthContext } from "context/authentication";
// or less ideally

export function RetrieveJobPage(props) {
    const authCtx = React.useContext(AuthContext);
    const [currentJobId, setCurrentJobId] = React.useState()
    const [jobData, setJobData] = React.useState()
    const jobId = props.currentJob.jobId
    const [waiting, setWaiting] = React.useState(true);

    const handleClickBack = () => {
        props.currentPageChanger("main");
    }

    function handleCheckResult() {
        setCurrentJobId(props.currentJob.jobId)
        setWaiting(true)
    }
    React.useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`,
                }
            };

            const url = `/api/job/${jobId}`

            fetch(url, requestOptions)
                .then(async (res) => {
                    if (res.status === 401) {
                        setWaiting(false)
                        authCtx.logout();
                        window.location.replace('/');
                    }
                    return res.json()
                }
                )
                .then((payload) => {
                    setWaiting(false)
                    const jobRawData = payload.data;
                    const postJobData = jobRawData.map((job) => {
                        return {
                            ...job,
                            status: <JobStatusBadge status={job.status} />
                        };
                    });
                    setJobData(postJobData[0])
                });

        } catch (err) {
            console.log(err)
        }
    }, [currentJobId])

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Box py={3}>
                    {/* show columns, rows from functionsTableData */}
                    <Box mb={3}>
                        <Card>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                                <VuiTypography variant="lg" color="white">
                                    Job Details
                                </VuiTypography>
                                <VuiButton onClick={handleClickBack} variant="gradient" color="info">Back</VuiButton>
                            </Box>
                            {/* Information of the function */}
                            <Box display="flex" borderRadius="lg">
                                <VuiTypography variant="body2" color="white">
                                    Job ID: &nbsp;
                                </VuiTypography>
                                <VuiTypography variant="body2" color="warning" fontWeight="bold">
                                    {props.currentJob.jobId}
                                </VuiTypography>

                            </Box>

                            <Grid item xs={12} sm={12}>
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
                                <div>
                                    <VuiButton onClick={handleCheckResult} variant="gradient" color="primary" size="medium">Retrieve Job Data</VuiButton>
                                </div>
                            </Grid>
                            {
                                waiting === true &&
                                (
                                    <div>
                                        <center>
                                            <CircularIndeterminate />
                                        </center>
                                    </div>

                                )
                            }
                            {
                                jobData && jobData !== undefined && jobData !== null &&
                                <div>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4} sm={4}>
                                            <div>
                                                <Typography color="#ffffff" variant="caption">
                                                    Function
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography color="#ffffff" variant="body2" fontWeight="medium">
                                                    {jobData.function}
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
                                                <Typography color="#ffffff" variant="body2" fontWeight="medium">
                                                    {jobData.submitTime}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <div>
                                                <Typography color="#ffffff" variant="caption">
                                                    Status
                                                </Typography>
                                            </div>
                                            <div id="jobStatus">
                                                {jobData.status}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography color="#ffffff" variant="body2">
                                            Invocation Request
                                        </Typography>
                                        <Editor code={JSON.stringify(jobData.jobRequest, null, 2)} />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Box>
                                            <Grid container spacing={0}>
                                                <Grid item xs={4} sm={4}>
                                                    <div>
                                                        <Typography color="#ffffff" variant="caption">
                                                            Result
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography color="#F7CA18" variant="subtitle2">
                                                            {jobData.result.data.toString()}
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
                                                            {jobData.backend.name} &nbsp;
                                                            <VuiBadge badgeContent={jobData.backend.hub} variant="contained" size="xs" container />
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
                                                            {jobData.lastUpdated}
                                                        </Typography>
                                                    </div>
                                                </Grid>

                                            </Grid>
                                            <div>
                                                <Typography color="#ffffff" variant="caption">
                                                    Details
                                                </Typography>
                                            </div>
                                            <Editor code={JSON.stringify(jobData.result, null, 2)} />

                                        </Box>

                                    </Grid>
                                </div>




                            }


                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout>
        </>
    );
}
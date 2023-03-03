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
// Material UI components
import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import InvokeInputTab from "../containers/invokeInputTab";
import InvokeJSONForm from "../containers/invokeInputFormJson"
import InvokeUIForm from "../containers/invokeInputFormUI"
// or less ideally

export function InvokeFuncPage(props) {

    const handleClickBack = () => {
        props.choosePageChanger(0);
    }

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
                                    Invoke Function
                                </VuiTypography>
                                <VuiButton onClick={handleClickBack} variant="gradient" color="info">Back</VuiButton>
                            </Box>
                            {/* Information of the function */}
                            <Box display="flex" borderRadius="lg">
                                <VuiTypography variant="lg" color="white">
                                    {props.recentFunc.logo}
                                </VuiTypography>
                                <VuiTypography variant="lg" color="white" >
                                    {props.recentFunc.name}
                                </VuiTypography>
                            </Box>
                            {/* input & output data from user */}
                            <Grid container spacing={0}>
                                <Grid item xs={4} sm={4}>
                                    <div>
                                        <Typography color="#ffffff" variant="caption">
                                            Status
                                        </Typography>
                                    </div>
                                    <div>
                                        {props.recentFunc.status}
                                    </div>

                                </Grid>
                                {/* <Grid item xs={4} sm={4}>
                                    <div>
                                        <Typography color="#ffffff" variant="caption" >
                                            Invocation count
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography color="#F7CA18" variant="subtitle2">
                                            {props.recentFunc.invocationCount}
                                        </Typography>
                                    </div>
                                </Grid> */}
                                <Grid item xs={8} sm={8}>
                                    <div>
                                        <Typography color="#ffffff" variant="caption">
                                            API &nbsp; URL
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography color="#F7CA18" variant="subtitle2">
                                            {props.recentFunc.url}
                                        </Typography>
                                    </div>
                                </Grid>
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

                            <Typography color="#ffffff" sx={{ mt: 2, mb: 2 }}>Invocation Request</Typography>
                            <InvokeInputTab recentFunc={props.recentFunc} />
                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout>
        </>
    );
}
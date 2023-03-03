// @mui material components
import Card from "@mui/material/Card";
// Vision UI Dashboard React components
// import Box from "components/Box";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import React from "react";
import { AuthContext } from "context/authentication";
import { decode as base64_decode } from 'base-64';
import { useState, useContext, useEffect } from "react";
// Material UI components
import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import CreateEditorTab from "../containers/createEditorTab";
// or less ideally

export function UpdateFuncPage(props) {

    const [handlerPy, setHandlerPy] = useState();
    const [handlerQs, setHandlerQs] = useState();
    const [requirementTxt, setRequirementTxt] = useState()
    const authCtx = useContext(AuthContext);

    const handleClickBack = () => {
        props.choosePageChanger(0);
    }


    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            };

            const url = `/api/function/${props.recentFunc.name}`

            fetch(url, requestOptions)
                .then(async (res) => {
                    if (res.status === 401) {
                        authCtx.logout();
                        window.location.replace('/');
                    }
                    return res.json()
                }
                )
                .then((payload) => {
                    const recentFunc = payload.data;
                    const fnCode = recentFunc.fnCode;

                    setHandlerPy(base64_decode(fnCode.handlerPy))
                    setRequirementTxt(base64_decode(fnCode.requirements))
                });
        } catch (err) {
            console.log(err)
        }
    }, [])

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
                                    Update Function
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
                                <VuiTypography variant="lg" color="white" sx={{ ml: '20px' }}>
                                    {props.recentFunc.status}
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
                                        <Typography color="#F7CA18" variant="subtitle2">
                                            Ready
                                        </Typography>
                                    </div>

                                </Grid>
                                <Grid item xs={4} sm={4}>
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
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <div>
                                        <Typography color="#ffffff" variant="caption">
                                            URL
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

                            <Typography color="#ffffff" sx={{ mt: 2, mb: 2 }}>Configurations</Typography>
                            <CreateEditorTab
                                // template={template}
                                handlerPy={handlerPy}
                                handlerPyChanger={setHandlerPy}
                                handlerQs={handlerQs}
                                handlerQsChanger={setHandlerQs}
                                requirementTxt={requirementTxt}
                                requirementTxtChanger={setRequirementTxt}
                            ></CreateEditorTab>
                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout>
        </>
    );
}
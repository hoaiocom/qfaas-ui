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
import { AuthContext } from "context/authentication";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { useState, useContext, useEffect } from "react";
import { useFormik, Form, Formik } from "formik";
import CreateDialog from "../containers/createDialog";
import CreateBackdropWaiting from "../containers/createBackdropWaiting";

// Material UI components
import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import CreateEditorTab from "../containers/createEditorTab";
// or less ideally

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function UpdateFuncPage(props) {

    const [handlerPy, setHandlerPy] = useState();
    const [handlerQs, setHandlerQs] = useState();
    const [requirementTxt, setRequirementTxt] = useState()
    const authCtx = useContext(AuthContext);
    const [result, setResult] = useState({
        status: '',
        body: {}
    })
    const [waiting, setWaiting] = useState(false);
    const template = props.recentFunc.type;

    const handleClickBack = () => {
        props.choosePageChanger(0);
    }


    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`,
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
                    setHandlerQs(base64_decode(fnCode.handlerQs))
                    setRequirementTxt(base64_decode(fnCode.requirements))
                });
        } catch (err) {
            console.log(err)
        }
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            // name: "",
            name: props.recentFunc.name
        },
        onSubmit: async (values, actions) => {

            let inputConfig;
            const template = props.recentFunc.type;


            if (template === "qsharp") {
                inputConfig = {
                    name: values.name,
                    template: template,
                    fnCode: {
                        handlerPy: base64_encode(handlerPy),
                        handlerQs: base64_encode(handlerQs),
                        requirements: base64_encode(requirementTxt)
                    },
                    public: 1
                }
            } else {
                inputConfig = {
                    name: values.name,
                    template: template,
                    fnCode: {
                        handlerPy: base64_encode(handlerPy),
                        requirements: base64_encode(requirementTxt)
                    },
                    public: 1
                }
            }
            console.log(inputConfig)
            // processing input user

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`
                },
                body: JSON.stringify(inputConfig),
            };

            const url = `/api/function/${props.recentFunc.name}`;

            setWaiting(true);

            fetch(url, requestOptions)
                .then((res) => {
                    if (res.status === 401) {
                        authCtx.logout();
                        window.location.replace('/');
                    }
                    return res.json()
                }
                ).then((data) => {
                    if (data.code === 200) {
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
            await sleep(3000)
            setWaiting(false);
        },
    });

    const { handleSubmit, getFieldProps } = formik;

    return (
        <>
            <DashboardLayout>
                {waiting && (
                    <CreateBackdropWaiting />
                )}
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
                            <Formik value={formik}>
                                <Form autoComplete="on" onSubmit={handleSubmit}>
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

                                    <Typography color="#ffffff" variant="body2" fontWeight="medium" sx={{ mt: 2, mb: 2 }}>Function codes</Typography>
                                    <CreateEditorTab
                                        template={template}
                                        handlerPy={handlerPy}
                                        handlerPyChanger={setHandlerPy}
                                        handlerQs={handlerQs}
                                        handlerQsChanger={setHandlerQs}
                                        requirementTxt={requirementTxt}
                                        requirementTxtChanger={setRequirementTxt}
                                    ></CreateEditorTab>

                                    <Box textAlign="center" sx={{ mt: '20px' }}>
                                        <VuiButton type="submit" variant="gradient" color="warning" size="large">Update</VuiButton>
                                    </Box>
                                    {waiting === false && (
                                        <>
                                            {result.status === "success" && (
                                                <CreateDialog status="success" content={result.message} choosePageChanger={props.choosePageChanger} />
                                            )}
                                            {result.status === "failed" && (
                                                <CreateDialog status="failed" content={result.message} choosePageChanger={props.choosePageChanger} />
                                            )}
                                        </>
                                    )}
                                </Form>
                            </Formik>
                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout >
        </>
    );
}
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState, useContext } from "react";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import Footer from "examples/Footer";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useFormik, Form, Formik } from "formik";
import { TemplateSelect } from "../containers/templateSelect"
import CreateEditorTab from "../containers/createEditorTab";
import { encode as base64_encode } from 'base-64';
import CreateBackdropWaiting from "../containers/createBackdropWaiting";
import CreateDialog from "../containers/createDialog";
import { handlerQsExample, handlerPyExampleQiskit, handlerPyExampleBraket, handlerPyExampleQsharp, handlerPyExampleCirq } from "data/createPage";
import { AuthContext } from "context/authentication";

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function CreateFuncPage(props) {

    const [template, setTemplate] = useState();
    const [handlerPy, setHandlerPy] = useState();
    const [handlerQs, setHandlerQs] = useState(handlerQsExample);
    const [requirementTxt, setRequirementTxt] = useState()
    const [result, setResult] = useState({
        status: '',
        body: {}
    })
    const [waiting, setWaiting] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (template === 'qiskit') {
            setHandlerPy(handlerPyExampleQiskit)
        } else if (template === 'qsharp') {
            setHandlerPy(handlerPyExampleQsharp)
        } else if (template === 'cirq') {
            setHandlerPy(handlerPyExampleCirq)
        } else if (template === 'braket') {
            setHandlerPy(handlerPyExampleBraket)
        }
    }, [template])

    const handleClickBack = () => {
        props.choosePageChanger(0);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
        },
        onSubmit: async (values, actions) => {

            let inputConfig;

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
            // console.log(inputConfig)

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`
                },
                body: JSON.stringify(inputConfig),
            };

            const url = '/api/function/';

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
                    console.log(data)
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
                <DashboardNavbar />
                {waiting && (
                    <CreateBackdropWaiting />
                )}
                <Box py={3}>
                    <Box mb={3}>
                        <Card>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                                <VuiTypography variant="lg" color="white">
                                    Create New Function
                                </VuiTypography>
                                <VuiButton onClick={handleClickBack} variant="gradient" color="info">Back</VuiButton>
                            </Box>

                            <Box>

                                <Formik value={formik}>
                                    <Form autoComplete="on" onSubmit={handleSubmit}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="h5">
                                                        Name
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <VuiInput
                                                        placeholder="enter a name..."
                                                        required
                                                        sx={{ mt: 2 }}
                                                        {...getFieldProps("name")}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="h6">
                                                        Templates
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <TemplateSelect templateChanger={setTemplate} handlerPyChanger={setHandlerPy} />
                                                </div>
                                            </Grid>
                                            {/* <Grid item xs={4} sm={4}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption" >
                                                        Public
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
                                            </Grid> */}
                                            <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="h6">
                                                        Advanced Configuration
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Add YAML variable
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Add secret
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="caption">
                                                        Config function authentication
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} sx={{ mt: 2, mb: 2 }}>
                                                <div>
                                                    <Typography color="#ffffff" variant="h6">
                                                        Choose Type Editor
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <CreateEditorTab
                                                        template={template}
                                                        handlerPy={handlerPy}
                                                        handlerPyChanger={setHandlerPy}
                                                        handlerQs={handlerQs}
                                                        handlerQsChanger={setHandlerQs}
                                                        requirementTxt={requirementTxt}
                                                        requirementTxtChanger={setRequirementTxt}
                                                    ></CreateEditorTab>
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Box textAlign="center" sx={{ mt: '20px' }}>
                                            <VuiButton type="submit" variant="gradient" color="info" size="large">Create</VuiButton>
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
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout>
        </>
    )
}
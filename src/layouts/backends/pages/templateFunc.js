import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import Footer from "examples/Footer";
import { Box, Card } from "@mui/material";

export function CreateFuncPage(props) {

    const handleClickBack = () => {
        props.choosePageChanger(0);
    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Box py={3}>
                    <Box mb={3}>
                        <Card>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                                <VuiTypography variant="lg" color="white">
                                    Create New Function
                                </VuiTypography>
                                <VuiButton onClick={handleClickBack} variant="gradient" color="info">Back</VuiButton>
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Footer />
            </DashboardLayout>
        </>
    )
}
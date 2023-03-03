/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
// Vision UI Dashboard React components
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "containers/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import MonitorIframe from "layouts/functions/components/monitorIframe";

function Monitoring() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                QFaaS Functions Monitoring
              </VuiTypography>
            </VuiBox>
            <MonitorIframe />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Monitoring;

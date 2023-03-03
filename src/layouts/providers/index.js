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
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProviderCard from "../providers/components/ProviderInfo";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "containers/DashboardNavbar";
// Overview page components
// import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "../profile/components/Welcome/index";
import CarInformations from "./components/CarInformations";
import React from "react";
import { AuthContext } from "context/authentication";

function Overview() {
  const authCtx = React.useContext(AuthContext);
  const [providerData, setProviderData] = React.useState();

  React.useEffect(() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authCtx.token}`,
        }
      };

      const url = `/api/provider/`

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
          const providerRData = payload.data[0]
          const providerList = providerRData.map((provider) => {
            return (
              <Grid
                item
                xs={12}
                xl={6}
                xxl={6}
                sx={({ breakpoints }) => ({
                  [breakpoints.only("xl")]: {
                    gridArea: "1 / 2 / 2 / 3",
                  },
                })}
              >
                <ProviderCard
                  title={provider.providerName}
                  description="Additional Information"
                  info={provider.additionalInfo}
                  token={provider.providerToken}
                />
              </Grid>

            )
          })
          setProviderData(providerList)
        });
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Header /> */}
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
            {providerData}
        </Grid>
      </VuiBox>
      
      <Footer />
    </DashboardLayout >
  );
}

export default Overview;

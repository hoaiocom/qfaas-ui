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
import ProfileInfoCard from "../profile/components/ProfileInfoCard";
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
  const [userData, setUserData] = React.useState();

  React.useEffect(() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authCtx.token}`,
        }
      };

      const url = `/api/user/`

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
          const userRData = payload.data[0]
          delete userRData["hashedPassword"] // Remove the hash password
          setUserData(userRData)
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
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <Welcome displayName={userData != undefined ? userData.displayName : "..."} />
          </Grid>
          {/* <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <CarInformations />
          </Grid> */}
          <Grid
            item
            xs={12}
            xl={8}
            xxl={8}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >

            <ProfileInfoCard
              title="profile information"
              description="General Information about your QFaaS account"
              info={userData != undefined ? {
                displayName: userData.displayName,
                userId: userData.id,
                username: userData.username,
                role: userData.role,
              } : { error: "Can't load profile information. Please check again later" }}
              currentToken={userData != undefined ? userData.currentToken : ""}
            />
          </Grid>
        </Grid>
      </VuiBox>
      {/* <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={3} height="100%">
          <PlatformSettings />
        </Grid>
        {/* <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Projects
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Architects design houses
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile1}
                    label="project #2"
                    title="modern"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile2}
                    label="project #1"
                    title="scandinavian"
                    description="Music is something that every person has his or her own specific opinion about."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile3}
                    label="project #3"
                    title="minimalist"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team4, name: "Peterson" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team1, name: "Elena Morison" },
                    ]}
                  />
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
        </Grid> */}
      {/* </Grid> */} */}

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

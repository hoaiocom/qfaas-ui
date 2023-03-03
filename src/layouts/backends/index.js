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
import { useEffect, useState, useContext } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "containers/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { LogoType, ActionButton, FunctionStatusBadge } from "./containers/logo";
import VuiButton from "components/VuiButton";

// Images
import cirqLogo from "assets/images/qfaas/cirq.png";
import qiskitLogo from "assets/images/qfaas/qiskit.png";
import qsharpLogo from "assets/images/qfaas/qsharp.svg";
import braketLogo from "assets/images/qfaas/braket.png";
import funcLogo from "assets/images/qfaas/func.png";
import React from "react";
import { InvokeFuncPage } from "./pages/invokeFunc";
import { CreateFuncPage } from "./pages/createFunc";
import { UpdateFuncPage } from "./pages/updateFunc";
import { AuthContext } from "context/authentication";

function Logo(provider) {
  if (provider === "ibmq") {
    return (<LogoType image={qiskitLogo} name="IBM Quantum" />)
  } else if (provider === "braket-sw") {
    return (<LogoType image={braketLogo} name="SW Braket" />)
  } else {
    return (<LogoType image={funcLogo} name="QFaaS" />)
  }
}


export default function Backends() {
  const authCtx = useContext(AuthContext);
  const [backendList, setBackendList] = useState()
  const [provider, setProvider] = useState('all')

  //variables of the component
  const columns = [
    { name: "provider", align: "left" },
    { name: "name", align: "left" },
    { name: "type", align: "left" },
    { name: "qubit", align: "center" },
    { name: "active", align: "center" },
    { name: "sdk", align: "left" },
  ];

  // Fetch data once after render component
  useEffect(() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authCtx.token}`,
        }
      };
      const url = `/api/backend/?provider=${provider}`

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
          const backendRawData = payload.data[0];
          const backendData = backendRawData.map((backend) => {
            // set up logo type of function
            const logo = Logo(backend.provider);
            return {
              ...backend,
              provider: logo,
            };
          });
          setBackendList(backendData);
        });
    } catch (err) {
      console.log(err)
    }
  }, [provider])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                QFaaS Backend Devices
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              {backendList && backendList !== undefined && backendList !== null &&
                <Table columns={columns} rows={backendList} />
              }
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  )
}

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

function Logo(template) {
  if (template === "qiskit") {
    return (<LogoType image={qiskitLogo} name="Qiskit" />)
  } else if (template === "cirq") {
    return (<LogoType image={cirqLogo} name="Cirq" />)
  } else if (template === "qsharp") {
    return (<LogoType image={qsharpLogo} name="Q#" />)
  } else if (template === "braket") {
    return (<LogoType image={braketLogo} name="Braket" />)
  } else {
    return (<LogoType image={funcLogo} name="Classic" />)
  }
}

function LogoWithoutName(template) {
  if (template === "qiskit") {
    return (<LogoType image={qiskitLogo} />)
  } else if (template === "cirq") {
    return (<LogoType image={cirqLogo} />)
  } else if (template === "qsharp") {
    return (<LogoType image={qsharpLogo} />)
  } else if (template === "braket") {
    return (<LogoType image={braketLogo} />)
  } else {
    return (<LogoType image={funcLogo} />)
  }
}


function Type(name) {
  const array = name.split("-");
  const type = array[0];
  return type;
}

function Functions() {
  // states of the component
  const [listFuncData, setListFuncData] = useState();
  const [choosePage, setChoosePage] = useState(0);
  const [recentFunc, setRecentFunc] = useState();
  const authCtx = useContext(AuthContext);

  //variables of the component
  const columns = [
    { name: "type", align: "left" },
    { name: "name", align: "left" },
    { name: "status", align: "center" },
    { name: "url", align: "left" },
    { name: "author", align: "center" },
    { name: "action", align: "center" },
  ];

  const handleClickNewFunction = () => {
    setChoosePage(2)
  }

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

      const url = `/api/function/`

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
          const listFunc = payload.data;
          const postData = listFunc.map((f) => {
            // set up logo type of function
            const logoWithoutName = LogoWithoutName(f.fnTemplate);
            const logo = Logo(f.fnTemplate);
            const type = f.fnTemplate;
            const url = 'https://qfaas.cloud/api/function/' + f.name;
            //Filter info func forward to child components
            const parentFuncInfo = {
              name: f.name,
              url: url,
              logo: logoWithoutName,
              type: type,
              invocationCount: f.invocationCount,
              status: <FunctionStatusBadge status={f.status} replicas={f.replicas} />
            }
            return {
              ...f,
              type: logo,
              url: url,
              status: <FunctionStatusBadge status={f.status} replicas={f.replicas} />,
              action: <ActionButton parentFunc={parentFuncInfo} recentFuncChanger={setRecentFunc} choosePageChanger={setChoosePage} />,
            };
          });

          const postDataSorted = postData.sort((a, b) => (a.name < b.name ? -1 : 1))
          setListFuncData(postDataSorted);
        });
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (choosePage === 0) {
    return (
      // <invokeFuncPage/>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          {/* show columns, rows from functionsTableData */}
          <VuiBox mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                <VuiTypography variant="lg" color="white">
                  QFaaS Functions
                </VuiTypography>
                <VuiButton onClick={handleClickNewFunction} variant="gradient" color="info">New Function</VuiButton>
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
                {listFuncData && listFuncData !== undefined && listFuncData !== null &&
                  <Table columns={columns} rows={listFuncData} />
                }
              </VuiBox>
            </Card>
          </VuiBox>
        </VuiBox>
        <Footer />
      </DashboardLayout>
    );
  } else if (choosePage === 1) {
    return (
      <InvokeFuncPage recentFunc={recentFunc} choosePageChanger={setChoosePage} />
    );
  } else if (choosePage === 2) {
    return (
      <CreateFuncPage choosePageChanger={setChoosePage} />
    )
  } else if (choosePage === 3) {
    return (
      <UpdateFuncPage recentFunc={recentFunc} choosePageChanger={setChoosePage} />
    )
  }
}

export default Functions;

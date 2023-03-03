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
import { LogoType, ActionButton, JobStatusBadge } from "./containers/logo";
import VuiButton from "components/VuiButton";

// Images
import cirqLogo from "assets/images/qfaas/cirq.png";
import qiskitLogo from "assets/images/qfaas/qiskit.png";
import qsharpLogo from "assets/images/qfaas/qsharp.svg";
import braketLogo from "assets/images/qfaas/braket.png";
import funcLogo from "assets/images/qfaas/func.png";
import React from "react";
import { RetrieveJobPage } from "./pages/retrieveJob";
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



export default function Jobs() {
  // states of the component
  const [jobList, setJobList] = useState();
  const [currentPage, setCurrentPage] = useState("main");
  const [currentJob, setCurrentJob] = useState();
  const authCtx = useContext(AuthContext);

  //variables of the component
  const columns = [
    { name: "jobId", align: "left" },
    { name: "function", align: "left" },
    { name: "backend", align: "center" },
    { name: "status", align: "center" },
    { name: "submitTime", align: "center" },
    { name: "action", align: "center" },
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

      const url = `/api/job/`

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
          const jobData = payload.data[0];
          const postData = jobData.map((job) => {

            //Filter info func forward to child components
            const parentJobData = {
              jobId: job.jobId,
              status: <JobStatusBadge status={job.status} />,
              function: job.function,
              submitTime: job.submitTime,
              currentPage: currentPage,
            }
            return {
              ...job,
              backend: job.backend.name,
              status: <JobStatusBadge status={job.status} />,
              action: <ActionButton parentData={parentJobData} currentJobChanger={setCurrentJob} currentPageChanger={setCurrentPage} />,
            };
          });
          const postDataSorted = postData.sort((a, b) => (a.submitTime > b.submitTime ? -1 : 1))
          setJobList(postDataSorted);
        });
    } catch (err) {
      console.log(err)
    }
  }, [])

  if (currentPage === "main") {
    return (
      // <invokeFuncPage/>
      <DashboardLayout>
        <DashboardNavbar />
        <VuiBox py={3}>
          {/* show columns, rows from JobsTableData */}
          <VuiBox mb={3}>
            <Card>
              <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                <VuiTypography variant="lg" color="white">
                  QFaaS Jobs
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
                {jobList && jobList !== undefined && jobList !== null &&
                  <Table columns={columns} rows={jobList} />
                }
              </VuiBox>
            </Card>
          </VuiBox>
        </VuiBox>
        <Footer />
      </DashboardLayout>
    );
  } else if (currentPage === "details") {
    return (
      <RetrieveJobPage currentJob={currentJob} currentPageChanger={setCurrentPage} />
    );
  } else if (currentPage === "update") {
    return (
      <UpdateFuncPage currentJob={currentJob} currentPageChanger={setCurrentPage} />
    )
  }
}



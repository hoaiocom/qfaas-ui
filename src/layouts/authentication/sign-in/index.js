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

import { useState, useContext } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { useFormik, Form, Formik } from "formik";
import config from "config";
import { AuthContext } from "context/authentication"
import CreateBackdropWaiting from "layouts/functions/containers/createBackdropWaiting";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [authenticateFailed, setAuthenticateFailed] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      username: ""
    },
    onSubmit: (values, actions) => {
      setWaiting(true)

      const data = {
        username: values.username,
        password: values.password,
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      };

      const url = `/api/auth/login`;

      fetch(url, requestOptions)
        .then((res) => {
          if (res.status === 401) {
            return res.json().then((data) => {
              //show error
              setWaiting(false);
              setAuthenticateFailed(true);
              let errorMessage = "Authentication failed!";
              throw new Error(errorMessage);
            });
          } else {
            return res.json();
          }
        }
        )
        .then((data) => {
          setWaiting(false)
          setAuthenticateFailed(false);
          authCtx.login(data.access_token)
          window.location.replace('/dashboard');
        });

    },
  });
  const { handleSubmit, getFieldProps } = formik;


  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="QUANTUM SERVERLESS COMPUTING"
      motto="QFaaS Framework"
      image={bgSignIn}
    >
      {waiting && (
        <CreateBackdropWaiting />
      )}
      <Formik value={formik}>
        <VuiBox component="form" role="form" onSubmit={handleSubmit}>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium" >
                Username
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              padding="1px"
              borderRadius={borders.borderRadius.lg}
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput placeholder="Your username..." {...getFieldProps("username")} sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })} />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium" >
                Password
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                {...getFieldProps("password")}
                type="password"
                placeholder="Your password..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          {authenticateFailed && (
            <VuiBox display="flex" alignItems="center">
              <VuiTypography variant="caption" sx={{ color: '#ff0000' }}>
                Incorrect username or password!
              </VuiTypography>
            </VuiBox>
          )}
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" type='submit' fullWidth>
              SIGN IN
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign up
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </Formik>
    </CoverLayout >
  );
}

export default SignIn;

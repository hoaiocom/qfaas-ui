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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

import React from "react";

function ProfileInfoCard({ title, description, info, currentToken }) {
  const labels = [];
  const values = [];
  const { size } = typography;
  const [tokenType, setTokenType] = React.useState('password');
  const [tokenButton, setTokenButton] = React.useState('Retrieve Token');

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <VuiBox key={label} display="flex" py={1} pr={2}>
      <VuiTypography variant="button" color="text" fontWeight="regular" textTransform="capitalize">
        {label}: &nbsp;
      </VuiTypography>
      <VuiTypography variant="button" fontWeight="regular" color="white">
        &nbsp;{values[key]}
      </VuiTypography>
    </VuiBox>
  ));

  function retrieveToken(event) {
    event.preventDefault();

    if (tokenType === 'password') {
      setTokenType('text');
      setTokenButton("Hide Token")
    } else if (tokenType === 'text') {
      setTokenType('password');
      setTokenButton("Retrieve Token")
    }
  }

  // Render the card social media icons
  // const renderSocial = social.map(({ link, icon, color }) => (
  //   <VuiBox
  //     key={color}
  //     component="a"
  //     href={link}
  //     target="_blank"
  //     rel="noreferrer"
  //     fontSize={size.lg}
  //     color="white"
  //     pr={1}
  //     pl={0.5}
  //     lineHeight={1}
  //   >
  //     {icon}
  //   </VuiBox>
  // ));

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <VuiBox display="flex" mb="14px" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {title}
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox mb={2} lineHeight={1}>
          <VuiTypography variant="button" color="text" fontWeight="regular">
            {description}
          </VuiTypography>
        </VuiBox>
        <VuiBox opacity={0.3}>
          <Divider />
        </VuiBox>
        <VuiBox>
          {renderItems}
        </VuiBox>
        <VuiBox>
          <VuiTypography variant="button" color="text" fontWeight="regular" textTransform="capitalize">
            Current QFaaS Token: &nbsp;
          </VuiTypography>
          <VuiInput type={tokenType} placeholder="Token" value={currentToken} />
          <VuiButton variant="text" color="info" size="small" onClick={retrieveToken}>{tokenButton}</VuiButton>
        </VuiBox>

      </VuiBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  currentToken: PropTypes.string.isRequired,
};

export default ProfileInfoCard;

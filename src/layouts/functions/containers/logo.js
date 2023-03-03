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
import Icon from "@mui/material/Icon";

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import React from "react";


//MUI components
import {
  Button,
  Popper,
  Paper,
  Box,
  Fade,
  Typography
} from "@mui/material";
import DeleteDialog from "./deleteDialog";

export function LogoType({ image, name }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

export function ActionButton(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [verify, setVerify] = React.useState(false);

  // store parent function of this button
  const [parentFunc, setParentFunc] = React.useState(props.parentFunc)

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClickChooseFunc = () => {
    props.recentFuncChanger(parentFunc)
    props.choosePageChanger(1);
  }

  const handleClickDeleteFunc = () => {
    setVerify(true);
  }

  const handleClickUpdateFunc = () => {
    props.recentFuncChanger(parentFunc)
    props.choosePageChanger(3);
  }

  return (
    <>
      <Box sx={{ width: 250 }}>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Button onClick={handleClickChooseFunc}>
                  <Typography variant="caption" sx={{ p: 1 }}>Invoke</Typography>
                </Button>
                <Button onClick={handleClickDeleteFunc}>
                  <Typography variant="caption" sx={{ p: 1 }}>Delete</Typography>
                </Button>
                <Button onClick={handleClickUpdateFunc}>
                  <Typography variant="caption" sx={{ p: 1 }}>Update</Typography>
                </Button>
                {verify && (
                  <DeleteDialog parentFunc={props.parentFunc} />
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
        <Button onClick={handleClick('right')}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
            more_vert
          </Icon>
        </Button>
      </Box>
    </>
  )
}

export function FunctionStatusBadge(props) {
  if (props.status > 0) {
    const status = `Ready ${props.status}/${props.replicas}`
    return (
      <VuiBadge
        variant="standard"
        badgeContent={status}
        color="success"
        size="xs"
        container
        sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
          background: success.main,
          border: `${borderWidth[1]} solid ${success.main}`,
          borderRadius: borderRadius.md,
          color: white.main,
        })}
      />
    )
  } else {
    const status = `Not ready ${props.status}/${props.replicas}`
    return (
      <VuiBadge
        variant="standard"
        badgeContent={status}
        color="error"
        size="xs"
        container
        sx={({ palette: { white, error }, borders: { borderRadius, borderWidth } }) => ({
          background: error.main,
          border: `${borderWidth[1]} solid ${error.main}`,
          borderRadius: borderRadius.md,
          color: white.main,
        })}
      />
    )
    // <VuiBadge
    //   variant="standard"
    //   badgeContent="Not Ready"
    //   color="success"
    //   size="xs"
    //   container
    //   sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
    //     background: success.main,
    //     border: `${borderWidth[1]} solid ${success.main}`,
    //     borderRadius: borderRadius.md,
    //     color: white.main,
    //   })}
    // />
  }
}

export const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

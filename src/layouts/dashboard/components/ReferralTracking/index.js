import React from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { FaEllipsisH } from "react-icons/fa";
import linearGradient from "assets/theme/functions/linearGradient";
import * as GradientProgress from "@delowar/react-circle-progressbar";

function ReferralTracking() {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  return (
    <Card
      sx={{
        height: "100%",
        background: linearGradient(
          gradients.cardDark.main,
          gradients.cardDark.state,
          gradients.cardDark.deg
        ),
      }}
    >
      <VuiBox sx={{ width: "100%" }}>
        <VuiBox
          display="flex"
          alignItems="center"
          justifyContent="space-beetween"
          sx={{ width: "100%" }}
          mb="40px"
        >
          <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
            Quantum Function as a Service (QFaaS) Framework
          </VuiTypography>
        </VuiBox>
        
        <VuiBox
          display="flex"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            },
            [breakpoints.up("md")]: {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          })}
        >
          <Stack
            direction="column"
            spacing="20px"
            width="500px"
            maxWidth="50%"
            sx={({ breakpoints }) => ({
              mr: "auto",
              [breakpoints.only("md")]: {
                mr: "75px",
              },
              [breakpoints.only("xl")]: {
                width: "500px",
                maxWidth: "40%",
              },
            })}
          >
            <VuiBox
              display="flex"
              width="220px"
              p="20px 22px"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                [breakpoints.up("xl")]: {
                  maxWidth: "110px !important",
                },
                [breakpoints.up("xxl")]: {
                  minWidth: "180px",
                  maxWidth: "100% !important",
                },
              })}
            >
              <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
               SDKs
              </VuiTypography>
              <VuiTypography color="white" variant="lg" fontWeight="bold">
                4 
              </VuiTypography>
            </VuiBox>
            <VuiBox
              display="flex"
              width="220px"
              p="20px 22px"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                borderRadius: "20px",
                [breakpoints.up("xl")]: {
                  maxWidth: "110px !important",
                },
                [breakpoints.up("xxl")]: {
                  minWidth: "180px",
                  maxWidth: "100% !important",
                },
              })}
            >
              <VuiTypography color="text" variant="button" fontWeight="regular" mb="5px">
                Providers
              </VuiTypography>
              <VuiTypography color="white" variant="lg" fontWeight="bold">
                3
              </VuiTypography>
            </VuiBox>
          </Stack>
          <GradientProgress
            percent={70}
            viewport
            size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
            isGradient
            gradient={{
              angle: 90,
              startColor: "rgba(5, 205, 153, 0)",
              stopColor: "#05CD99",
            }}
            emptyColor="transparent"
          >
            <VuiBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <VuiTypography color="text" variant="button" mb="4px">
                Active
              </VuiTypography>
              <VuiTypography
                color="white"
                variant="d5"
                fontWeight="bold"
                mb="4px"
                sx={({ breakpoints }) => ({
                  [breakpoints.only("xl")]: {
                    fontSize: "32px",
                  },
                })}
              >
                17
              </VuiTypography>
              <VuiTypography color="text" variant="button">
                backends
              </VuiTypography>
            </VuiBox>
          </GradientProgress>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;

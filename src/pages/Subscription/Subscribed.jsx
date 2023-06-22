import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const Subscribed = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Successfully Subscribed
        </Typography>
        <Typography>You will recieve Emails Every Monday</Typography>
      </Box>
    </Box>
  );
};

export default Subscribed;

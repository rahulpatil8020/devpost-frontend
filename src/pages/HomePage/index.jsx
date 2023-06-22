import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const HomePage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { user } = useSelector((state) => state.auth);

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
          Customize your interests {"       "} (select at least 5)
        </Typography>
        <Form user={user} />
      </Box>
    </Box>
  );
};

export default HomePage;

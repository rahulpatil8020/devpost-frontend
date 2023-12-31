import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import PrivateRoutes from "utils/PrivateRoutes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Subscribed from "pages/Subscription/Subscribed";
import Unsubscribed from "pages/Subscription/Unsubscribed";

function App() {
  const mode = useSelector((state) => state.themeMode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/subscribed" element={<Subscribed />} />
              <Route path="unsubscribed" element={<Unsubscribed />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

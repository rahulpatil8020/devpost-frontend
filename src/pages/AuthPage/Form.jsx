import { useState, useEffect } from "react";
import { Box, Button, useTheme, Grid, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "components/InputField";
import { signup, login, setStatus } from "store/slices/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [passwordError, setPasswordError] = useState("");
  // const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (
      formData.confirmPassword.length > 0 &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [formData]);

  useEffect(() => {
    if (status === "success") {
      setStatus("idle");
      navigate("/");
    }
  }, [status, navigate, error]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "idle" || status === "failed") {
      if (isSignup) {
        dispatch(signup(formData));
      } else {
        dispatch(login(formData));
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showLoading = () => {
    if (status === "idle" || status === "failed") {
      return <div>{isSignup ? "Sign Up" : "Sign In"}</div>;
    } else if (status === "loading") {
      return <CircularProgress color="info" />;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isSignup ? (
            <>
              <InputField
                name="firstName"
                handleChange={handleInputChange}
                label="First Name"
                type="text"
                half
              />
              <InputField
                name="lastName"
                handleChange={handleInputChange}
                label="Last Name"
                type="text"
                half
              />
            </>
          ) : null}
          <InputField
            name="email"
            label="Email Address"
            handleChange={handleInputChange}
            type="email"
          />
          <InputField
            name="password"
            label="Password"
            handleChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {isSignup ? (
            <>
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleInputChange}
                type="password"
                errorMessage={passwordError}
              />
              <Box paddingLeft={2} color="red">
                {passwordError}
              </Box>
            </>
          ) : null}
        </Grid>
        {error && !isSignup && (
          <Grid sx={{ marginTop: 1 }} xs={12}>
            <Alert severity="error">{error.message}</Alert>
          </Grid>
        )}
        <Button
          // disabled={buttonDisabled}
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.neutral.dark,
              color: theme.palette.primary.main,
            },
          }}
        >
          {showLoading()}
        </Button>
      </form>
      {status === "loading" ? (
        <Button disabled onClick={switchMode}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      ) : (
        <Button onClick={switchMode}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      )}
    </>
  );
};

export default Form;

import React, { useEffect, useState } from "react";
import { Chip, useTheme, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { subscribe, unsubscribe } from "store/slices/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const interests = [
  "Machine Learning",
  "Social",
  "Chemistry",
  "Photography",
  "Sports",
  "Music",
  "Painting",
  "Art",
  "Fashion",
  "Physical Chemistry",
  "Electrons",
  "Protons",
  "Sensors",
  "APIs",
  "Web Development",
  "Big Data",
];

const Form = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const [selectedInterests, setSelectedInterests] = useState([]);
  useEffect(() => {
    if (user?.interests?.length > 0) {
      setSelectedInterests(user?.interests);
    }
  }, [user]);

  const theme = useTheme();

  const handleSubmit = () => {
    const updatedUser = {
      ...user,
      interests: selectedInterests,
      subscribed: true,
    };
    dispatch(subscribe(updatedUser));
    navigate("/subscribed");
  };

  const handleUnsubscribe = () => {
    dispatch(unsubscribe(user._id));
    navigate("/unsubscribed");
  };

  const showLoading = () => {
    if (status === "idle" || status === "failed" || status === "success") {
      return <div>{user?.subscribed ? "Update Interests" : "Subscribe"}</div>;
    } else if (status === "loading") {
      return <CircularProgress color="info" />;
    }
  };

  return (
    <>
      <div>
        {interests.map((interest) => (
          <Chip
            key={interest}
            color={
              selectedInterests?.includes(interest) ? "success" : "primary"
            }
            variant="outlined"
            sx={{
              margin: "0.5rem 0.5rem 0 0",
            }}
            label={interest}
            onClick={() => {
              if (selectedInterests?.includes(interest)) {
                setSelectedInterests((prev) =>
                  prev?.filter((i) => interest !== i)
                );
              } else {
                setSelectedInterests([...selectedInterests, interest]);
              }
            }}
          />
        ))}
      </div>
      <Button
        disabled={selectedInterests.length < 5}
        fullWidth
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
        onClick={handleSubmit}
      >
        {showLoading()}
      </Button>
      {user?.subscribed && (
        <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
      )}
    </>
  );
};

export default Form;

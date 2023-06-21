import React, { useEffect, useState } from "react";
import { Chip, useTheme, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "store/slices/authSlice";
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
  console.log(user);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  console.log(status);
  const [selectedInterests, setSelectedInterests] = useState([]);
  useEffect(() => {
    if (user?.subscribed) {
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
        <Button
          onClick={() => {
            console.log("unsubscribed");
          }}
        >
          Unsubscribe
        </Button>
      )}
    </>
  );
};

export default Form;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  user: null,
  status: "idle", /// success | failed | loading | idle
  error: null,
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await api.login(user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const response = await api.signup(user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const subscribe = createAsyncThunk(
  "auth/subscribe",
  async (user, thunkAPI) => {
    try {
      const response = await api.subscribe(user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId, thunkAPI) => {
    try {
      const response = await api.getUser(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const unsubscribe = createAsyncThunk(
  "auth/unsubscribe",
  async (userId, thunkAPI) => {
    try {
      const response = await api.unsubscribe(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
      prepare(status) {
        return {
          payload: status,
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(subscribe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(unsubscribe.fulfilled, (state, action) => {
        console.log(action.payload, "unsubscribed");

        state.user = action.payload;
      });
  },
});

export const { userLogout, setStatus } = authSlice.actions;

export default authSlice.reducer;

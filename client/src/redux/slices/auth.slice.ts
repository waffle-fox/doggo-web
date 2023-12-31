import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import * as types from "./types";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData: types.IReqData) => {
    const { data } = await axios.post("/auth/reg", userData);

    return data;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: types.IReqData) => {
    console.log("userData", userData);
    const { data } = await axios.post("/auth/login", userData);

    return data;
  },
);

export const fetchMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");

  console.log(data);

  return data;
});

const initialState: types.IinitialState = {
  data: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(createUser.rejected, state => {
      state.status = "failed";
    });
    builder.addCase(createUser.pending, state => {
      state.status = "loading";
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(loginUser.rejected, state => {
      state.status = "failed";
    });
    builder.addCase(loginUser.pending, state => {
      state.status = "loading";
    });

    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchMe.rejected, state => {
      state.status = "failed";
    });
    builder.addCase(fetchMe.pending, state => {
      state.status = "loading";
    });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const { actions, reducer } = authSlice;

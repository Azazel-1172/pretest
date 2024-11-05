import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopFreeApps = createAsyncThunk(
  "apps/fetchTopFree",
  async () => {
    const response = await axios.get(
      "https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json"
    );
    return response.data.feed.entry;
  }
);

export const fetchTopGrossingApps = createAsyncThunk(
  "apps/fetchTopGrossing",
  async () => {
    const response = await axios.get(
      "https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json"
    );
    return response.data.feed.entry;
  }
);

const appSlice = createSlice({
  name: "apps",
  initialState: {
    topFreeApps: [],
    topGrossingApps: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopFreeApps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopFreeApps.fulfilled, (state, action) => {
        state.topFreeApps = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTopFreeApps.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTopGrossingApps.fulfilled, (state, action) => {
        state.topGrossingApps = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTopGrossingApps.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default appSlice.reducer;

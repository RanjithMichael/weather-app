import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,

  history:
    JSON.parse(
      localStorage.getItem("history")
    ) || [],

  loading: false,
};

const weatherSlice = createSlice({
  name: "weather",

  initialState,

  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addToHistory: (state, action) => {
      const city = action.payload;

      if (!state.history.includes(city)) {
        state.history.unshift(city);

        localStorage.setItem(
          "history",
          JSON.stringify(state.history)
        );
      }
    },

    clearHistory: (state) => {
      state.history = [];

      localStorage.removeItem("history");
    },
  },
});

export const {
  setWeather,
  setLoading,
  addToHistory,
  clearHistory,
} = weatherSlice.actions;

export default weatherSlice.reducer;
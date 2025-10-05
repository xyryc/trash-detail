// chatSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedSupportId: null,
  },
  reducers: {
    setSupportId: (state, action) => {
      console.log("from redux", setSupportId);
      state.selectedSupportId = action.payload;
    },
  },
});

// Export the action
export const { setSupportId } = chatSlice.actions;

// Export the reducer
export default chatSlice.reducer;

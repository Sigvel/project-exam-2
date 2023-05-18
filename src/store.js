import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./js/hooks/modal";
import userAuthSlice from "./js/hooks/userAuth";
import bookingSlice from "./js/hooks/bookingModal";

export const store = configureStore({
  reducer: {
    // Handles the open and closing of the modal
    modal: modalSlice,

    booking: bookingSlice,
    // checks if the user is logged inn or not.
    userAuth: userAuthSlice,
  },
});

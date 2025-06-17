import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authAPI";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(authApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
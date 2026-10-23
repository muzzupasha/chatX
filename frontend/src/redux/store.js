import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  // Configuration for persisting the Redux store, specifying the key, storage method, and which parts of the state to persist.
  key: "user",
  storage,
  whitelist: ["authUser", "otherUsers", "messages"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer); // Create a persisted reducer using the persistConfig and the userReducer, which will handle the state related to user authentication, other users, and messages.

export const store = configureStore({
  // Create the Redux store using configureStore from Redux Toolkit, passing in the persisted reducer and middleware configuration.
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure the middleware to ignore certain actions for serializability checks, specifically the persist actions and the user/setSocket action, which may contain non-serializable data.
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "user/setSocket",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

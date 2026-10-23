import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import { persistor } from "./redux/store";

createRoot(document.getElementById("root")).render(
  // Render the main application component within the root element of the HTML document. The application is wrapped with BrowserRouter for routing, Provider for Redux state management, and PersistGate for persisting the Redux store across sessions. The Toaster component is included for displaying toast notifications.
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: "14px", fontSize: "18" },
          }}
        />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

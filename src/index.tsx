import React from "react";
import ReactDOM from "react-dom/client";
import "./Scss/index.scss";
import App from "./App";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider >
                <App />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

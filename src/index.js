import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App.js";
import { registerServiceWorker } from "./register-sw";
import { createStore } from "redux";
import allReducer from "./reducers/index";
import { Provider } from "react-redux";
import "leaflet/dist/leaflet.css";

registerServiceWorker();

const store = createStore(allReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

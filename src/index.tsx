import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import "rsuite/dist/rsuite.min.css";

import { App } from "./components/App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { initialState, StateContext, DispatchContext } from "./reducer/constants";
import reducer from "./reducer";

import "./index.scss";

const AppContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ErrorBoundary>
            <ReactNotification />
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    {/* @ts-ignore */}
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </ErrorBoundary>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById("root")
);

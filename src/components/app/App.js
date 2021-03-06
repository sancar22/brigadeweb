import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import HomePage from "../homePage/HomePage";
import SignUp from "../signUp/SignUp";
import Stats from "../stats/Stats";
import ClosedCases from "../closedCases/ClosedCases";
import OpenedCases from "../openedCases/OpenedCases";
import * as ROUTES from "../../routes/Routes";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "firebase/messaging";
import firebase from "../../routes/Config";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
    selectOnlineGuards,
    selectAll,
    selectActiveCases,
    fillCases
} from "../../actions/index";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../navigation/Navigation";
import { messaging } from "../../init-fcm";

toast.configure({
    autoClose: 8000,
    draggable: false
});

function App() {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const dispatch = useDispatch();

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        margin-top: 40vh;
    `;
    function getDataOnlineUsers() {
        // Para obtener información de todos los usuarios online
        return app
            .database()
            .ref("/Users")
            .orderByChild("online")
            .equalTo(true)
            .on("value", snapshot => {
                const firebaseData = _.toArray(snapshot.val());
                dispatch(selectOnlineGuards(firebaseData)); // Se hace un dispatch a la store para guardarlo en el estado global
            });
    }

    function getDataAllUsers() {
        return app
            .database()
            .ref("/Users")
            .orderByChild("acceptRatio")
            .on("value", snapshot => {
                const firebaseData = _.toArray(snapshot.val());
                dispatch(selectAll(firebaseData));
            });
    }

    function getDataActiveCases() {
        return app
            .database()
            .ref("/Casos")
            .orderByChild("closed")
            .equalTo(false)
            .on("value", snapshot => {
                const firebaseData = _.toArray(snapshot.val());
                dispatch(selectActiveCases(firebaseData));
            });
    }
    function getDataAllCases() {
        return app
            .database()
            .ref("/Casos")
            .on("value", snapshot => {
                const firebaseData = _.toArray(snapshot.val());
                dispatch(fillCases(firebaseData));
            });
    }
    useEffect(() => {
        // Se va a ejecutar una vez
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val);
        });
        firebase.resetSelected(); // Para al refrescar la página deseleccionar todos los marcadores
        getDataOnlineUsers();
        getDataAllUsers();
        getDataActiveCases();
        getDataAllCases();
    }, []);

    return firebaseInitialized !== false ? (
        <Router basename="brigadeweb">
            <div>
                <Switch>
                    <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                    <Route exact path={ROUTES.STATS} component={Stats} />
                    <Route
                        exact
                        path={ROUTES.CLOSED_CASES}
                        component={ClosedCases}
                    />
                    <Route
                        exact
                        path={ROUTES.OPENED_CASES}
                        component={OpenedCases}
                    />
                </Switch>
            </div>
        </Router>
    ) : (
        <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={!firebaseInitialized}
        />
    );
}

export default App;

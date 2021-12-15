import * as actionTypes from "./types";
import firebase  from "../../utils/firebase";


export const Login = (email) => async (dispatch) => {
    let ems = "";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            ems = email;
        } else {
        }
    });

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.IS_AUTH,
                payload: ems
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 700)

};

export const signOut = () => async (dispatch) => {
    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.IS_AUTH,
                payload: ""
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 700)

};

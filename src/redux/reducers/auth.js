import * as actionTypes from "../actions/types";

const initialState = {
    ems: "",
    error: null,
};

function auth(state = initialState, action) {
    switch (action.type) {

        case actionTypes.IS_AUTH: {
            return {
                ...state,
                ems: action.payload,
                error: null,
            };
        }
        default:
            return {
                ...state,
            };
    }
}

export default auth;

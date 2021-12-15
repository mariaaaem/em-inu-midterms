import * as actionTypes from "../actions/types";

const initialState = {
    commentList: [],
    subComments: [],
    error: null,
};

function students(state = initialState, action) {
    switch (action.type) {

        case actionTypes.USER_COMMENTLIST: {
            return {
                ...state,
                commentList: action.payload,
                error: null,
            };
        }
        default:
            return {
                ...state,
            };
    }
}

export default students;

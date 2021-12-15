import * as actionTypes from "../actions/types";

const initialState = {
    user: "",
    studentList: [],
    topStud: [],
    viewProfile: {},
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
        case actionTypes.IS_AUTH: {
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        }
        case actionTypes.VIEW_PROFILE: {
            return {
                ...state,
                viewProfile: action.payload,
                error: null,
            };
        }
        case actionTypes.STUDENT_IS_SEARCH: {
            return {
                studentList: action.payload,
                error: null,
            };
        }
        case actionTypes.TOP_STUDENT: {
            return {
                ...state,
                topStud: action.payload,
                error: null,
            };
        }
        case actionTypes.STUDENT_LIST: {
            return {
                ...state,
                studentList: action.payload,
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

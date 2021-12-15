import * as actionTypes from "../actions/types";

const initialState = {
  search: "",
  sort: "",
  filter: "",
  error: null,
};

function serfil(state = initialState, action) {
  switch (action.type) {
    case actionTypes.STUDENT_SEARCH: {
      return {
        ...state,
        search: action.payload,
        error: null,
      };
    }
    case actionTypes.STUDENT_SORT: {
      return {
        ...state,
        sort: action.payload,
        error: null,
      };
    }
    case actionTypes.STUDENT_FILTER: {
      return {
        ...state,
        filter: action.payload,
        error: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default serfil;

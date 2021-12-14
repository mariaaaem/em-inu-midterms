import * as actionTypes from "../types";

const initialState = {
  search: "",
  sortBy: "",
  filterBy: "",
  error: null,
};

function controlsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
        error: null,
      };
    }
    case actionTypes.SET_SORTBY: {
      return {
        ...state,
        sortBy: action.payload,
        error: null,
      };
    }
    case actionTypes.SET_FILTERBY: {
      return {
        ...state,
        filterBy: action.payload,
        error: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default controlsReducer;

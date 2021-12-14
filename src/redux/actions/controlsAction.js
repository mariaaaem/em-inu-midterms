import * as actionTypes from "../types";

export const setSearch = (search) => async (dispatch) => {
    try {
        await dispatch({
            type: actionTypes.SET_SEARCH,
            payload: search
        })
    } catch (err) {
        await dispatch({
            type: actionTypes.ON_ERROR,
            payload: err
        })
    }
};

export const setSortBy = (sortBy) => async (dispatch) => {
    try {
        await dispatch({
            type: actionTypes.SET_SORTBY,
            payload: sortBy
        })
    } catch (err) {
        await dispatch({
            type: actionTypes.ON_ERROR,
            payload: err
        })
    }
};

export const setFilterBy = (filterBy) => async (dispatch) => {
    try {
        await dispatch({
            type: actionTypes.SET_FILTERBY,
            payload: filterBy
        })
    } catch (err) {
        await dispatch({
            type: actionTypes.ON_ERROR,
            payload: err
        })
    }
};




import * as actionTypes from "./types";
import firebase from "../../utils/firebase";


export const setSearch = (search) => async (dispatch) => {
  try {
    await dispatch({
      type: actionTypes.STUDENT_SEARCH,
      payload: search,
    });
  } catch (err) {
    await dispatch({
      type: actionTypes.ON_ERROR,
      payload: err,
    });
  }
};

export const isSort = (sort) => async (dispatch) => {
  try {
    await dispatch({
      type: actionTypes.STUDENT_SORT,
      payload: sort,
    });
  } catch (err) {
    await dispatch({
      type: actionTypes.ON_ERROR,
      payload: err,
    });
  }
};

export const isFilter = (filter) => async (dispatch) => {
  try {
    await dispatch({
      type: actionTypes.STUDENT_FILTER,
      payload: filter,
    });
  } catch (err) {
    await dispatch({
      type: actionTypes.ON_ERROR,
      payload: err,
    });
  }
};

export const search = (search, sortBy, filterBy) => async (dispatch) => {
  let studentList = [];
  const db = firebase.firestore();
  let data = [];
  let myData = [];
  const fetchData = () => {
    db.collection("students").onSnapshot((doc) => {
      doc.forEach((psst) => {
        db.collection("reviews")
          .where("stud_id", "==", psst.id)
          .get()
          .then((querySnapshot) => {
            let counter = 0;
            let rating = 0;
            querySnapshot.forEach((doc) => {
              rating += doc.data().rate_total;
              counter += 1;
            });
            let stud_rating = Number(rating) / Number(counter);
            data.push({
              ...psst.data(),
              id: psst.id,
              stud_reviews: counter,
              stud_rating: stud_rating || 0,
            });
          });
      });

      setTimeout(() => {
        myData = data.sort((ay, yaw) => (ay.name > yaw.name ? 1 : -1));
        if (search === "") {
          if (sortBy === "Recent" && filterBy === "With_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_reviews > yaw.rate_reviews ? 1 : -1
            );
          } else if (sortBy === "Not_Recent" && filterBy === "With_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_reviews > yaw.rate_reviews ? -1 : 1
            );
          } else if (sortBy === "Recent" && filterBy === "No_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_reviews > yaw.rate_reviews ? -1 : 1
            );
          } else if (sortBy === "Not_Recent" && filterBy === "No_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_reviews > yaw.rate_reviews ? -1 : 1
            );
          }

          if (sortBy === "Recent" && filterBy === "With_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_rating > yaw.rate_rating ? 1 : -1
            );
          } else if (sortBy === "Not_Recent" && filterBy === "With_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_rating > yaw.rate_rating ? -1 : 1
            );
          } else if (sortBy === "Recent" && filterBy === "No_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_rating > yaw.rate_rating ? -1 : 1
            );
          } else if (sortBy === "Not_Recent" && filterBy === "No_Filter") {
            myData = data.sort((ay, yaw) =>
              ay.rate_rating > yaw.rate_rating ? -1 : 1
            );
          }

          studentList = myData;
        } else {
          let newData = [];
          for (let row of myData) {
            if (search === "") {
            } else if (row.name.toLowerCase().includes(search)) {
              newData.push({ ...row });
            }
          }
          setTimeout(() => {
            studentList = newData;
          }, 200);
        }
      }, 500);
    });
  };
  fetchData();

  setTimeout(() => {
    try {
      dispatch({
        type: actionTypes.STUDENT_IS_SEARCH,
        payload: studentList,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ON_ERROR,
        payload: err,
      });
    }
  }, 1000);
};

import * as actionTypes from "./types";
import firebase from "../../utils/firebase";
import { db } from "../../utils/firebase";

export const setStudentList = () => async (dispatch) => {
  let studData = [];
  let theData = [];
  db.collection("students").onSnapshot((doc) => {
    doc.forEach((psst) => {
      db.collection("reviews")
        .where("stud_id", "==", psst.id)
        .get()
        .then((querySnapshot) => {
          let counter = 0;
          let rating = 0;
          querySnapshot.forEach((doc) => {
            rating += doc.data().total;
            counter += 1;
          });
          let stud_rating = Number(rating) / Number(counter);
          studData.push({
            ...psst.data(),
            id: psst.id,
            stud_reviews: counter,
            stud_rating: stud_rating || 0,
          });
        });
    });

    setTimeout(() => {
      theData = studData.sort((ay, yaw) => (ay.name > yaw.name ? 1 : -1));
    }, 500);
  });

  setTimeout(() => {
    try {
      dispatch({
        type: actionTypes.STUDENT_LIST,
        payload: theData,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ON_ERROR,
        payload: err,
      });
    }
  }, 700);
};

export const topStud = () => async (dispatch) => {
  let studData = [];
  let theData = [];
  db.collection("students").onSnapshot((doc) => {
    doc.forEach((psst) => {
      db.collection("reviews")
        .where("stud_id", "==", psst.id)
        .get()
        .then((querySnapshot) => {
          let counter = 0;
          let rating = 0;
          querySnapshot.forEach((doc) => {
            rating += doc.data().total;
            counter += 1;
          });
          let stud_rating = Number(rating) / Number(counter);
          studData.push({
            ...psst.data(),
            id: psst.id,
            stud_reviews: counter,
            stud_rating: stud_rating || 0,
          });
        });
    });

    setTimeout(() => {
      theData = studData.sort((ay, yaw) => (ay.stud_rating > yaw.stud_rating ? -1 : 1));
    }, 500);
  });

  setTimeout(() => {
    try {
      dispatch({
        type: actionTypes.TOP_STUDENT,
        payload: theData.slice(0, 4),
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ON_ERROR,
        payload: err,
      });
    }
  }, 700);
};

export const setViewStudent = (id) => async (dispatch) => {
  let studentsData = {
    id: "",
    name: "",
    section: "",
    gender: "",
    birthdate: "",
    address: "",
    nickname: "",
    skills: "",
    photo: "",
    stud_reviews: "",
    stud_rating: 0,
    github: "",
    fb: "",
    linkedin: "",
    twitter: "",
    rate_teamwork: 0,
    rate_creativity: 0,
    rate_adaptability: 0,
    rate_persuasion: 0,
    rate_leadership: 0,
  };
  let studData = [];
  const db = firebase.firestore();
  const fetchData = () => {
    db.collection("students").onSnapshot((doc) => {
      doc.forEach((psst) => {
        db.collection("reviews")
          .where("stud_id", "==", psst.id)
          .get()
          .then((querySnapshot) => {
            let counter = 0;
            let rating = 0;

            let teamwork = 0;
            let creativity = 0;
            let adaptability = 0;
            let leadership = 0;
            let persuasion = 0;

            querySnapshot.forEach((doc) => {
              teamwork += doc.data().teamwork;
              creativity += doc.data().creativity;
              adaptability += doc.data().adaptability;
              leadership += doc.data().leadership;
              persuasion += doc.data().persuasion;

              rating += doc.data().total;
              counter += 1;
            });

            let rate_teamwork = Number(teamwork) / Number(counter);
            let rate_creativity = Number(creativity) / Number(counter);
            let rate_adaptability = Number(adaptability) / Number(counter);
            let rate_leadership = Number(leadership) / Number(counter);
            let rate_persuasion = Number(persuasion) / Number(counter);

            // console.log(c_teamwork)

            let stud_rating = Number(rating) / Number(counter);
            studData.push({
              ...psst.data(),
              id: psst.id,
              stud_reviews: counter,
              stud_rating: stud_rating || 0,
              rate_teamwork: rate_teamwork || 0,
              rate_creativity: rate_creativity || 0,
              rate_adaptability: rate_adaptability || 0,
              rate_leadership: rate_leadership || 0,
              rate_persuasion: rate_persuasion || 0,
            });
          });
      });

      setTimeout(() => {
        for (let row of studData) {
          if (id === "") {
          } else if (row.id === id) {
            studentsData.id = row.id;
            studentsData.name = row.name;
            studentsData.gender = row.gender;
            studentsData.birthdate = row.birthdate;
            studentsData.address = row.address;
            studentsData.nickname = row.nickname;
            studentsData.skills = row.skills;

            studentsData.photo = row.photo;
            studentsData.section = row.section;
            studentsData.stud_reviews = row.stud_reviews;

            if (row.stud_rating !== 0) {
              let rate = Number(row.stud_rating).toFixed(2);
              studentsData.stud_rating = Number(rate);
            } else {
              studentsData.stud_rating = row.stud_rating;
            }

            studentsData.github = row.github;
            studentsData.fb = row.fb;
            studentsData.linkedin = row.linkedin;
            studentsData.twitter = row.twitter;

            if (row.rate_teamwork !== 0) {
              let teamwork = Number(row.rate_teamwork).toFixed(2);
              studentsData.rate_teamwork = Number(teamwork);
            } else {
              studentsData.rate_teamwork = row.rate_teamwork;
            }

            if (row.rate_creativity !== 0) {
              let creativity = Number(row.rate_creativity).toFixed(2);
              studentsData.rate_creativity = Number(creativity);
            } else {
              studentsData.rate_creativity = row.rate_creativity;
            }

            if (row.rate_adaptability !== 0) {
              let adaptability = Number(row.c_adaptability).toFixed(2);
              studentsData.rate_adaptability = Number(adaptability);
            } else {
              studentsData.rate_adaptability = row.rate_adaptability;
            }

            if (row.rate_leadership !== 0) {
              let leadership = Number(row.rate_leadership).toFixed(2);
              studentsData.rate_leadership = Number(leadership);
            } else {
              studentsData.rate_leadership = row.rate_leadership;
            }

            if (row.rate_persuasion !== 0) {
              let persuasion = Number(row.rate_persuasion).toFixed(2);
              studentsData.rate_persuasion = Number(persuasion);
            } else {
              studentsData.rate_persuasion = row.rate_persuasion;
            }

            break;
          }
        }
      }, 500);
    });
  };
  fetchData();

  setTimeout(() => {
    try {
      dispatch({
        type: actionTypes.VIEW_PROFILE,
        payload: studentsData,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ON_ERROR,
        payload: err,
      });
    }
  }, 1000);
};

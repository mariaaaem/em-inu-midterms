import * as actionTypes from "../types";
import firebase from "../../utils/firebase/firebase";


const db = firebase.firestore();

export const setList = () => async (dispatch) => {
    let datas = [];
    let myData = [];
    db.collection("students").onSnapshot((doc) => {
        doc.forEach((c) => {
            db.collection("reviews").where("stud_id", "==", c.id)
                .get()
                .then((querySnapshot) => {
                    let counter = 0;
                    let rating = 0;
                    querySnapshot.forEach((doc) => {
                        rating += doc.data().total;
                        counter += 1;
                    });
                    let c_rating = (Number(rating) / Number(counter));
                    datas.push({ ...c.data(), id: c.id, c_reviews: counter, c_rating: c_rating || 0 });
                })
        });

        setTimeout(() => {
            myData = datas.sort((a, b) => a.name > b.name ? 1 : -1);

        }, 500)

    });

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.SET_LIST,
                payload: myData
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 700)

};

export const setTopStudent = () => async (dispatch) => {
    let datas = [];
    let myData = [];
    db.collection("students").onSnapshot((doc) => {
        doc.forEach((c) => {

            db.collection("reviews")
                .where("stud_id", "==", c.id)
                .get()
                .then((querySnapshot) => {
                    let counter = 0;
                    let rating = 0;
                    querySnapshot.forEach((doc) => {
                        rating += doc.data().rate_total;
                        counter += 1;
                    });
                    let c_rating = (Number(rating) / Number(counter));
                    datas.push({ ...c.data(), id: c.id, c_reviews: counter, c_rating: c_rating || 0 });
                })
        });

        setTimeout(() => {
            myData = datas.sort((a, b) => a.c_rating > b.c_rating ? -1 : 1);
        }, 500)
    });

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.SET_TOPSTUDENT,
                payload: myData.slice(0, 4)
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 700);

};


export const goSearch = (search, sortBy, filterBy) => async (dispatch) => {
    let studentList = [];
    const db = firebase.firestore();

    let datas = [];
    let myData = [];
    const fetchData = () => {
        db.collection("students").onSnapshot((doc) => {
            doc.forEach((c) => {
                db.collection("reviews").where("stud_id", "==", c.id)
                    .get()
                    .then((querySnapshot) => {
                        let counter = 0;
                        let rating = 0;
                        querySnapshot.forEach((doc) => {
                            rating += doc.data().rate_total;
                            counter += 1;
                        });
                        let c_rating = (Number(rating) / Number(counter));
                        datas.push({ ...c.data(), id: c.id, c_reviews: counter, c_rating: c_rating || 0 });
                    })
            });

            setTimeout(() => {
                //TRIGGER WARNING BULOK CODE USING REDUX-SEARCH AHEAD
                //MANO MANO YAN GAWAIN NG MALALAKAS UMABSENT

                myData = datas.sort((a, b) => a.name > b.name ? 1 : -1);
                if (search === "") {
                    //NAME
                    if (sortBy === "ASC" && filterBy === "NAME") {
                        //FILTER BY NAME ASC
                        myData = datas.sort((a, b) => a.name > b.name ? 1 : -1);
                    } else if (sortBy === "DESC" && filterBy === "NAME") {
                        //FILTER BY NAME DESC
                        myData = datas.sort((a, b) => a.name > b.name ? -1 : 1);
                    }

                    //SECTION
                    if (sortBy === "ASC" && filterBy === "SECTION") {
                        //FILTER BY SECTION ASC
                        myData = datas.sort((a, b) => a.section > b.section ? 1 : -1);
                    } else if (sortBy === "DESC" && filterBy === "SECTION") {
                        //FILTER BY SECTION DESC
                        myData = datas.sort((a, b) => a.section > b.section ? -1 : 1);
                    }

                    //REVIEWS
                    if (sortBy === "ASC" && filterBy === "REVIEWS") {
                        //FILTER BY SECTION ASC
                        myData = datas.sort((a, b) => a.c_reviews > b.c_reviews ? 1 : -1);
                    } else if (sortBy === "DESC" && filterBy === "REVIEWS") {
                        //FILTER BY SECTION DESC
                        myData = datas.sort((a, b) => a.c_reviews > b.c_reviews ? -1 : 1);
                    }

                    //RATING
                    if (sortBy === "ASC" && filterBy === "RATING") {
                        //FILTER BY SECTION ASC
                        myData = datas.sort((a, b) => a.c_rating > b.c_rating ? 1 : -1);
                    } else if (sortBy === "DESC" && filterBy === "RATING") {
                        //FILTER BY SECTION DESC
                        myData = datas.sort((a, b) => a.c_rating > b.c_rating ? -1 : 1);
                    }

                    studentList = myData;
                } else {
                    let newData = [];
                    for (let row of myData) {
                        if (search === "") {
                        } else if (row.name.toLowerCase().includes(search)) {
                            newData.push({ ...row })
                        }
                    }
                    setTimeout(() => {
                        studentList = newData;
                    }, 200)
                }

            }, 500)

        });
    };
    fetchData();

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.SET_GOSEARCH,
                payload: studentList
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 1000)

};

export const setViewStudent = (id) => async (dispatch) => {
    let singleData = {
        id: "",
        name: "",
        section: "",
        gender: "",
        birthdate: "",
        address: "",
        nickname: "",
        skills: "",
        photo: "",
        c_reviews: "",
        c_rating: 0,
        github: "",
        fb: "",
        linkedin: "",
        twitter: "",
        c_teamwork: 0,
        c_creativity: 0,
        c_adaptability: 0,
        c_persuasion: 0

    };
    let datas = [];
    const db = firebase.firestore();
    const fetchData = () => {
        db.collection("students").onSnapshot((doc) => {
            doc.forEach((c) => {
                db.collection("reviews").where("stud_id", "==", c.id)
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

                        let c_teamwork = (Number(teamwork) / Number(counter));
                        let c_creativity = (Number(creativity) / Number(counter));
                        let c_adaptability = (Number(adaptability) / Number(counter));
                        let c_leadership = (Number(leadership) / Number(counter));
                        let c_persuasion = (Number(persuasion) / Number(counter));

                        // console.log(c_teamwork)

                        let c_rating = (Number(rating) / Number(counter));
                        datas.push({ ...c.data(), id: c.id, c_reviews: counter, c_rating: c_rating || 0,
                            c_teamwork: c_teamwork || 0, c_creativity: c_creativity || 0, 
                            c_adaptability: c_adaptability || 0, c_leadership: c_leadership || 0,
                            c_persuasion: c_persuasion || 0,});
                    })
            });

            setTimeout(() => {
                for (let row of datas) {
                    if (id === "") {

                    } else if (row.id === id) {
                        singleData.id = row.id;
                        singleData.name = row.name;
                        singleData.gender = row.gender;
                        singleData.birthdate = row.birthdate;
                        singleData.address = row.address;
                        singleData.nickname = row.nickname;
                        singleData.skills = row.skills;

                        singleData.photo = row.photo;
                        singleData.section = row.section;
                        singleData.c_reviews = row.c_reviews;

                        if (row.c_rating !== 0) {
                            let rate = Number(row.c_rating).toFixed(2);
                            singleData.c_rating = Number(rate);
                        } else {
                            singleData.c_rating = row.c_rating;
                        }

                        singleData.github = row.github;
                        singleData.fb = row.fb;
                        singleData.linkedin = row.linkedin;
                        singleData.twitter = row.twitter;

                        if (row.c_teamwork !== 0) {
                            let teamwork = Number(row.c_teamwork).toFixed(2);
                            singleData.c_teamwork = Number(teamwork);
                        } else {
                            singleData.c_teamwork = row.c_teamwork;
                        }

                        if (row.c_creativity !== 0) {
                            let creativity = Number(row.c_creativity).toFixed(2);
                            singleData.c_creativity = Number(creativity);
                        } else {
                            singleData.c_creativity = row.c_creativity;
                        }
                        
                        if (row.c_adaptability !== 0) {
                            let adaptability = Number(row.c_adaptability).toFixed(2);
                            singleData.c_adaptability = Number(adaptability);
                        } else {
                            singleData.c_adaptability = row.c_adaptability;
                        }
                        
                        if (row.c_leadership !== 0) {
                            let leadership = Number(row.c_leadership).toFixed(2);
                            singleData.c_leadership = Number(leadership);
                        } else {
                            singleData.c_leadership = row.c_leadership;
                        }

                        if (row.c_persuasion !== 0) {
                            let persuasion = Number(row.c_persuasion).toFixed(2);
                            singleData.c_persuasion = Number(persuasion);
                        } else {
                            singleData.c_persuasion = row.c_persuasion;
                        }
                        

                        break;
                    }
                }
            }, 500)

        });
    };
    fetchData();

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.VIEW_ONE_STUDENT,
                payload: singleData
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 1000)


};

export const isLogged = (email) => async (dispatch) => {
    //IS AUTH FIREBASE
    let userEmail = "";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userEmail = email;
        } else {
        }
    });

    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.SET_AUTH,
                payload: userEmail
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
                type: actionTypes.SET_AUTH,
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

export const setCommentList = (id) => async (dispatch) => {
    let datas = [];
    // let myData = [];
    db.collection("sub_comment").where("uid", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datas.push({ ...doc.data(), id: doc.id });
            });

        })


    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.SET_COMMENTLIST,
                payload: datas
            })
        } catch (err) {
            dispatch({
                type: actionTypes.ON_ERROR,
                payload: err
            })
        }
    }, 700)


};

export const addComment = (commentText, id, email, commentor_rating) => async (dispatch) => {
    db.collection("comments")
        .add({
            uid: id,
            text: commentText,
            commentor_email: email,
            commentor_rating: Number(commentor_rating),
            created_at: Date.now()
        })
        .then((docRef) => {
        })
        .catch((error) => { });

};

export const addRating = (adaptability,creativity, leadership, persuasion,
    teamwork, total, stud_id) => async (dispatch) => {


        db.collection("reviews")
            .add({
                adaptability: adaptability,
                creativity: creativity,
                leadership: leadership,
                persuasion: persuasion,
                teamwork: teamwork,
                total: total,
                stud_id: stud_id
            })
            .then((docRef) => {
            })
            .catch((error) => { });
    };

import * as actionTypes from "./types";
import { db } from "../../utils/firebase";

export const setCommentList = (id) => async (dispatch) => {
    let studData = [];
    db.collection("comments").where("uid", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                studData.push({ ...doc.data(), id: doc.id });
            });

        })


    setTimeout(() => {
        try {
            dispatch({
                type: actionTypes.USER_COMMENTLIST,
                payload: studData
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

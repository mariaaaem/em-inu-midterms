import { db } from "../../utils/firebase";
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

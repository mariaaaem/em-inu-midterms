import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    Grid
} from '@mui/material';
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

//SELECTOR
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

//STAR RATING
import StarRatings from 'react-star-ratings';

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { addComment, setCommentList, addRating, setViewStudent } from "../redux/actions/studentAction";

const StyledTextField = withStyles((theme) => ({
    root: {
        width: 300,
        "& .MuiInputBase-root": {
            color: '#D1D4C9',
            paddingLeft: 10,
            paddingRight: 10,
        }
    }
}))(TextField);

export default function BasicCard() {
    const { id } = useParams();

    //DISPATCHER
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const student = useSelector((state) => state.student);

    //HANDLE CHANGE RATING
    const [rating, setRating] = useState({
        teamwork: 0,
        creativity: 0,
        adaptability: 0,
        leadership: 0,
        persuasion: 0,
    });
    const [averageRating, setAverageRating] = useState(0);

    const changeRating = (prop) => (newRating) => {
        setRating((prevItem) => ({ ...prevItem, [prop]: newRating }));
    };

    useEffect(() => {
        let average = (Number(rating.teamwork) + Number(rating.creativity) + Number(rating.adaptability) + Number(rating.leadership) + Number(rating.persuasion)) / 5;
        setAverageRating(average);
    }, [rating])

    const [commentText, setCommentText] = useState("");

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };


    const submit = (e) => {
        if(!commentText){
            alert("Please leave a comment");
            return;
        }
        e.preventDefault();
        let email = student.authEmail;
        let commentor_rating = averageRating;

        //ADD COMMENT
        dispatch(addComment(commentText, id, email, commentor_rating));
        dispatch(setCommentList(id));
        setOpen(false);
        setAverageRating(0);
        setRating({ teamwork: 0, creativity: 0, adaptability: 0, leadership: 0, persuasion: 0 });

        //ADD RATING
        dispatch(addRating(rating.adaptability, rating.creativity, rating.leadership, rating.persuasion, rating.teamwork,
            averageRating, id));
        dispatch(setViewStudent(id));
    };

    return (
        <>
            <Typography style={{ color: '#D1D4C9', fontSize: 20, marginBottom: 5 }}>
                Add your Rating
            </Typography>
            <Box sx={{
                display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                width: 200, cursor: 'pointer'
            }} onClick={() => setOpen(!open)}>
                <StarRatings
                    rating={averageRating}
                    starRatedColor={averageRating <= 2 ? "#E03E65" : "#26CE8D"}
                    // changeRating={changeRating("teamwork")}
                    numberOfStars={5}
                    starDimension="35px"
                    starSpacing="3px"
                    isSelectable="false"
                    starHoverColor="#26CE8D"
                    starEmptyColor="#696969"
                />
            </Box>

            {open ? (
                <Card sx={{
                    minWidth: 375, marginTop: 2,
                    backgroundColor: '#1E1F20', border: '1px solid #303336'
                }}>

                    <CardContent>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>
                                Rating
                            </Typography>
                        </Box>

                        <Box style={{ marginTop: 20, cursor: 'pointer' }}>
                            <Grid container spacing={2} style={{}}>
                                <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', }}>
                                    <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>TeamWork</Typography>
                                </Grid>
                                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                                        width: 200,
                                    }}>
                                        <StarRatings
                                            rating={rating.teamwork}
                                            starRatedColor={rating.teamwork <= 2 ? "#E03E65" : "#26CE8D"}
                                            changeRating={changeRating("teamwork")}
                                            numberOfStars={5}
                                            starDimension="35px"
                                            starSpacing="3px"
                                            isSelectable="false"
                                            starHoverColor="#26CE8D"
                                            starEmptyColor="#696969"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{}}>
                                <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', }}>
                                    <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>Creativity</Typography>
                                </Grid>
                                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                                        width: 200,
                                    }}>
                                        <StarRatings
                                            rating={rating.creativity}
                                            starRatedColor={rating.creativity <= 2 ? "#E03E65" : "#26CE8D"}
                                            changeRating={changeRating("creativity")}
                                            numberOfStars={5}
                                            starDimension="35px"
                                            starSpacing="3px"
                                            isSelectable="false"
                                            starHoverColor="#26CE8D"
                                            starEmptyColor="#696969"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{}}>
                                <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', }}>
                                    <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>Adaptability</Typography>
                                </Grid>
                                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                                        width: 200,
                                    }}>
                                        <StarRatings
                                            rating={rating.adaptability}
                                            starRatedColor={rating.adaptability <= 2 ? "#E03E65" : "#26CE8D"}
                                            changeRating={changeRating("adaptability")}
                                            numberOfStars={5}
                                            starDimension="35px"
                                            starSpacing="3px"
                                            isSelectable="false"
                                            starHoverColor="#26CE8D"
                                            starEmptyColor="#696969"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{}}>
                                <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', }}>
                                    <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>Leadership</Typography>
                                </Grid>
                                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                                        width: 200,
                                    }}>
                                        <StarRatings
                                            rating={rating.leadership}
                                            starRatedColor={rating.leadership <= 2 ? "#E03E65" : "#26CE8D"}
                                            changeRating={changeRating("leadership")}
                                            numberOfStars={5}
                                            starDimension="35px"
                                            starSpacing="3px"
                                            isSelectable="false"
                                            starHoverColor="#26CE8D"
                                            starEmptyColor="#696969"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{}}>
                                <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', }}>
                                    <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>Persuasion</Typography>
                                </Grid>
                                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', pl: 2, pb: 1,
                                        width: 200,
                                    }}>
                                        <StarRatings
                                            rating={rating.persuasion}
                                            starRatedColor={rating.persuasion <= 2 ? "#E03E65" : "#26CE8D"}
                                            changeRating={changeRating("persuasion")}
                                            numberOfStars={5}
                                            starDimension="35px"
                                            starSpacing="3px"
                                            isSelectable="false"
                                            starHoverColor="#26CE8D"
                                            starEmptyColor="#696969"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box style={{ textAlign: 'center', marginTop: 30 }}>
                            <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>
                                Share us your thoughts!
                            </Typography>

                            <Box style={{ marginTop: 20 }}>
                                <StyledTextField
                                    variant="standard"
                                    multiline
                                    minRows={4}
                                    maxRows={10}
                                    style={{
                                        width: '100%', paddingTop: 5,
                                        backgroundColor: '#131414', color: '#fff',
                                        borderRadius: 8, border: '1px solid #303336'
                                    }}
                                    onChange={handleChange}

                                />
                            </Box>

                            <Box style={{
                                display: 'flex', width: '100%',
                                flexDirection: 'column',
                                height: 30, alignItems: 'center', justifyContent: 'center',
                                marginTop: 30
                            }}>
                                <Button variant="contained" style={{ width: '50%', backgroundColor: '#20C284' }} onClick={submit}>Submit</Button>
                            </Box>
                        </Box>

                    </CardContent>

                </Card>
            ) : (<div></div>)}

        </>
    );
}

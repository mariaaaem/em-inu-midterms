import React, { useState, useEffect } from 'react';
import { Typography, CardMedia, Grid, Box, } from '@mui/material';
import SubComments from './SubComments';

//SELECTOR
import { useSelector } from "react-redux";

//STAR RATING
import StarRatings from 'react-star-ratings';


export default function CommentCard() {

    const student = useSelector((state) => state.student);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if (student.commentList === undefined) {

        } else {
            setComments(student.commentList);
            setLoading(false);
        }
    }, [student.commentList])

    const CommentsComponent = () => {
        return (
            <>
                {comments.map((row) => (
                    <Box key={row.id} style={{
                        backgroundColor: '#1E1F20', minHeight: 210,
                        border: '1px solid #303336', borderRadius: 10,
                        paddingTop: 30, paddingLeft: 10, marginTop: 20
                    }}>
                        <Grid container style={{ width: 240 }}>
                            <Grid item xs={4} style={{}}>
                                <Box style={{
                                    display: 'flex', width: '100%',
                                    flexDirection: 'column',
                                    height: 40, alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <CardMedia
                                        style={{
                                            height: 40, width: 40, objectFit: 'cover', borderRadius: '50%'
                                        }}
                                        component="img"
                                        image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="Live from space album cover"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={8} style={{}}>
                                <Typography style={{ color: '#D1D4C9', fontSize: 14 }}>{row.commentor_email}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>

                                    <StarRatings
                                        rating={Number(row.commentor_rating)}
                                        starRatedColor="#26CE8D"
                                        // changeRating={changeRating}
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="0px"
                                        isSelectable="false"
                                        starHoverColor="#26CE8D"
                                        starEmptyColor="#696969"
                                    />

                                </Box>
                           </Grid>
                        </Grid>

                        <Box style={{
                            marginTop: 13,
                            paddingLeft: 80, paddingRight: 40,
                            paddingBottom: 50
                        }}>

                            <Typography style={{ color: '#D1D4C9', fontSize: 14, marginTop: 5 }}>
                                <span style={{marginRight: 5}}>&#8226;</span>
                                {row.text}
                            </Typography>
                            <SubComments id={row.id}/>
                        </Box>
                    </Box>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ? (<div></div>) : <CommentsComponent />}
        </>
    );
}

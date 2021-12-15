import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

//STAR RATING
import StarRatings from 'react-star-ratings';

//SELECTOR
import { useSelector } from "react-redux";


//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { setViewStudent } from "../redux/actions/studentsAction";
import { Link } from "react-router-dom";

export default function TopStudentCard() {

    const students = useSelector((state) => state.students);
    const [topStudents, setTopStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    //DISPATCHER
    const dispatch = useDispatch();

    useEffect(() => {
        if (students.topStud === undefined) {

        } else {
            
            setTopStudents(students.topStud);
           
            setLoading(false);
        }
        
    }, [students.topStud])

    const navigatePage = (id) => {
        dispatch(setViewStudent(id));
        setTimeout(() => {
        }, 1000)
    }
    const TopStudents = () => {
        return (
            <>
                {topStudents.map((row) => (
                    <Link key={row.id} to={`studentevaluation/${row.id}`} style={{ textDecoration: 'none', color: "#62666D" }}>
                        <Card key={row.name} sx={{
                            display: 'flex', minWidth: 210, height: 130,
                            backgroundColor: '#1E1F20', border: '1px solid #303336',
                            boxSizing: 'border-box',
                            boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.4)',
                            borderRadius: 2, cursor: 'pointer',
                            '&:hover': {
                                background: "#292929",
                            }
                        }} onClick={() => navigatePage(row.id)}>
                            
                            <CardMedia
                                component="img"
                                sx={{
                                    margin: 3,
                                    width: 60,
                                    height: 60,
                               }}
                                image={row.photo}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" style={{ fontSize: 18, color: '#D1D4C9', fontWeight: 'initial', mt: 5 }}>
                                        {row.nickname}
                                    </Typography>
                                    <Typography style={{ color: '#7C7E83', fontSize: 12 }} component="div">
                                        {row.stud_reviews} reviews
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 6 }}>
                                    
                                    <StarRatings
                                        rating={row.stud_rating}
                                        starRatedColor="#26CE8D"
                                        numberOfStars={5}
                                        starDimension="18px"
                                        starSpacing="0px"
                                        isSelectable="false"
                                        starHoverColor="#26CE8D"
                                        starEmptyColor="#696969"
                                    />
                                </Box>
                            </Box>

                        </Card>
                    </Link>
                ))}
            </>
        );
    }

    return (
        <>
            {loading ? (<div></div>) : <TopStudents />}
        </>
    );
}

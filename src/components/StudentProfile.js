import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    CardMedia,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';

//SELECTOR
import { useSelector } from "react-redux";

//STAR RATING
import StarRatings from 'react-star-ratings';


export default function StudentProfile(props) {

    const students = useSelector((state) => state.students);

    const [viewOne, setViewOne] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (students.viewProfile === undefined) {

        } else {
            // console.log(student.viewOneStudent);
            setViewOne(students.viewProfile);
            setLoading(false);
        }
    }, [students.viewProfile])

    const Profiles = () => {
        return (
            <Box sx={{ flexGrow: 1 }} style={{
                backgroundColor: '#1E1F20', height: 330,
                border: '1px solid #303336', borderRadius: 10
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={5} >
                        <Box style={{
                            display: 'flex', width: '100%',
                            flexDirection: 'column',
                            height: 300, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <CardMedia
                                style={{
                                    height: 100, width: 100, objectFit: 'cover',
                                    marginBottom: 20, border: '2px solid #fff', borderRadius: 10
                                }}
                                component="img"
                                image={viewOne.photo}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                                <StarRatings
                                    rating={viewOne.c_rating}
                                    starRatedColor="#26CE8D"
                                    numberOfStars={5}
                                    starDimension="25px"
                                    starSpacing="0px"
                                    isSelectable="false"
                                    starHoverColor="#26CE8D"
                                    starEmptyColor="#696969"
                                />

                            </Box>
                            <Typography style={{ color: '#D1D4C9', fontSize: 12 }} component="div">
                                <span style={{ fontSize: 18 }}>{viewOne.stud_rating}</span> Overall Rating
                                <span style={{ fontSize: 18, marginLeft: 10 }}>{viewOne.stud_reviews}</span> Reviews
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={7}>
                        <Box style={{
                            display: 'flex', width: '100%',
                            flexDirection: 'column',
                            height: 500, paddingTop: 20
                        }}>
                            {/* name and section */}
                            <Typography style={{ color: '#D1D4C9', fontSize: 12, paddingLeft: 16 }} component="div">
                                <span style={{ fontSize: 26, marginRight: 4 }}>{viewOne.name}</span> {viewOne.section}
                            </Typography>

                            {/* table info*/}
                            <TableContainer>
                                <Table sx={{ minWidth: '100%' }} size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ width: '40%', color: '#B0B1AE', fontWeight: 500, border: 'none' }} component="th" scope="row">
                                                Gender:
                                            </TableCell>
                                            <TableCell align="right" style={{ width: '30%', color: '#B0B1AE', border: 'none' }}>{viewOne.gender}</TableCell>
                                            <TableCell align="right" style={{ width: '10%', color: '#B0B1AE', fontWeight: 500, border: 'none' }}>Teamwork</TableCell>
                                            <TableCell align="right" style={{ width: '10%', border: 'none' }}>
                                                <Box style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                     backgroundColor: viewOne.rate_teamwork <= 2 ? '#E03E65' : '#26CE8D', padding: 5,
                                                    borderRadius: 8, color: '#fff'
                                                }}>
                                                    {viewOne.rate_teamwork}
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ width: '40%', color: '#B0B1AE', fontWeight: 500, border: 'none' }} component="th" scope="row">
                                                Birthday:
                                            </TableCell>
                                            <TableCell align="right" style={{ width: '30%', color: '#B0B1AE', border: 'none' }}>{viewOne.birthdate}</TableCell>
                                            <TableCell align="right" style={{ width: '10%', color: '#B0B1AE', fontWeight: 500, border: 'none' }}>Creativity</TableCell>
                                            <TableCell align="right" style={{ width: '10%', border: 'none' }}>
                                                <Box style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                     backgroundColor: viewOne.rate_creativity <= 2 ? '#E03E65' : '#26CE8D', padding: 5,
                                                    borderRadius: 8, color: '#fff'
                                                }}>
                                                    {viewOne.rate_creativity}
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ width: '40%', color: '#B0B1AE', fontWeight: 500, border: 'none' }} component="th" scope="row">
                                                Address:
                                            </TableCell>
                                            <TableCell align="right" style={{ width: '30%', color: '#B0B1AE', border: 'none' }}>{viewOne.address}</TableCell>
                                            <TableCell align="right" style={{ width: '10%', color: '#B0B1AE', fontWeight: 500, border: 'none' }}>Adaptability</TableCell>
                                            <TableCell align="right" style={{ width: '10%', border: 'none' }}>
                                                <Box style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                     backgroundColor: viewOne.rate_adaptability <= 2 ? '#E03E65' : '#26CE8D', padding: 5,
                                                    borderRadius: 8, color: '#fff'
                                                }}>
                                                    {viewOne.rate_adaptability}
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ width: '40%', color: '#B0B1AE', fontWeight: 500, border: 'none' }} component="th" scope="row">
                                                Nickname:
                                            </TableCell>
                                            <TableCell align="right" style={{ width: '30%', color: '#B0B1AE', border: 'none' }}>{viewOne.nickname}</TableCell>
                                            <TableCell align="right" style={{ width: '10%', color: '#B0B1AE', fontWeight: 500, border: 'none' }}>Leadership</TableCell>
                                            <TableCell align="right" style={{ width: '10%', border: 'none' }}>
                                                <Box style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                     backgroundColor: viewOne.rate_leadership <= 2 ? '#E03E65' : '#26CE8D', padding: 5,
                                                    borderRadius: 8, color: '#fff'
                                                }}>
                                                    {viewOne.rate_leadership} 
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ width: '40%', color: '#B0B1AE', fontWeight: 500, border: 'none' }} component="th" scope="row">
                                                Skills Language:
                                            </TableCell>
                                            <TableCell align="right" style={{ width: '30%', color: '#B0B1AE', border: 'none' }}>{viewOne.skills}</TableCell>
                                            <TableCell align="right" style={{ width: '10%', color: '#B0B1AE', fontWeight: 500, border: 'none' }}>Persuasion</TableCell>
                                            <TableCell align="right" style={{ width: '10%', border: 'none' }}>
                                                <Box style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                    backgroundColor: viewOne.rate_persuasion <= 2 ? '#E03E65' : '#26CE8D' , padding: 5,
                                                    borderRadius: 8, color: '#fff', paddingLeft: 12, paddingRight: 12
                                                }}>
                                                    {viewOne.rate_persuasion}
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{
                                display: 'grid',
                                gap: 1.3,
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                marginLeft: 2,
                                marginTop: 1,
                                width: '65%'
                            }}>

                                {/* SOCIAL GITHUB  */}
                                {viewOne.github === "" ? (
                                    <Typography style={{ fontSize: 14, color: '#62666D' }}>
                                        Github
                                    </Typography>
                                ) : (
                                    <Typography style={{ fontSize: 14 }}>
                                        <a target="_blank" rel="noreferrer" href={viewOne.github} style={{ color: '#26CE8D', textDecoration: 'none' }}
                                        >Github</a>
                                    </Typography>
                                )}

                                {/* SOCIAL FACEBOOK  */}
                                {viewOne.facebook === "" ? (
                                    <Typography style={{ fontSize: 14, color: '#62666D' }}>
                                        Facebook
                                    </Typography>
                                ) : (
                                    <Typography style={{ fontSize: 14 }}>
                                        <a target="_blank" rel="noreferrer" href={viewOne.fb} style={{ color: '#26CE8D', textDecoration: 'none' }}
                                        >Facebook</a>
                                    </Typography>
                                )}

                                {/* SOCIAL LINKEDIN  */}
                                {viewOne.linkedin === "" ? (
                                    <Typography style={{ fontSize: 14, color: '#62666D' }}>
                                        LinkedIn
                                    </Typography>
                                ) : (
                                    <Typography style={{ fontSize: 14 }}>
                                        <a target="_blank" rel="noreferrer" href={viewOne.linkedin} style={{ color: '#26CE8D', textDecoration: 'none' }}
                                        >LinkedIn</a>
                                    </Typography>
                                )}

                                {/* SOCIAL TWITTER  */}
                                {viewOne.twitter === "" ? (
                                    <Typography style={{ fontSize: 14, color: '#62666D' }}>
                                        Twitter
                                    </Typography>
                                ) : (
                                    <Typography style={{ fontSize: 14 }}>
                                        <a target="_blank" rel="noreferrer" href={viewOne.twitter} style={{ color: '#26CE8D', textDecoration: 'none' }}
                                        >Twitter</a>
                                    </Typography>
                                )}

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        )
    }

    return (
        <>
            {loading ? (<div></div>) : <Profiles />}
        </>
    );
}

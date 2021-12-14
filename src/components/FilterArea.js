import React, { useState, useEffect } from 'react';
import { MenuItem, Box, Select } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

//SELECTOR
import { useSelector } from "react-redux";

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { setSortBy, setFilterBy } from "../redux/actions/controlsAction";
import { goSearch } from "../redux/actions/studentAction";

const useStyles = makeStyles({
    select: {

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "purple"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "purple"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        paddingLeft: 11,
        paddingTop: 2,
        justifyContent: 'center'
    },

    icon: {
        fill: '#fff',
    },
});

export default function FilterArea() {
    //DISPATCHER
    const dispatch = useDispatch();

    const controls = useSelector((state) => state.controls);

    const classes = useStyles();

    const [sort, setSort] = useState("ASC");
    const [filter, setFilter] = useState("NAME");

    const handleChangeSort = (e) => {
        setSort(e.target.value)
    };

    useEffect(() => {
        dispatch(setSortBy(sort));
        dispatch(goSearch(controls.search, sort, filter))
    }, [sort]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
    };

    useEffect(() => {
        dispatch(setFilterBy(filter));
        dispatch(goSearch(controls.search, sort, filter))
    }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

    // console.log(controls)


    return (
        <Box>
            <Box style={{
                width: 380, height: 70, float: 'right'
                , marginRight: 23, display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                justifyContent: 'space-between'
            }}>

                <Box style={{ width: '100%', }}>
                    {/* <Typography style={{color: "#fff"}}>
                        {sort}
                    </Typography> */}
                    <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Typography style={{ color: '#D1D4C9', fontSize: 14, marginTop: 10 }}>
                            Sort by:
                        </Typography>


                        <Select
                            variant="outlined"
                            value={sort}
                            onChange={handleChangeSort}
                            style={{
                                backgroundColor: '#131414', border: '1px solid #303336',
                                borderRadius: 8, color: '#D1D4C9', width: 120, height: 40, fontSize: 14,
                                outline: 'none'
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="ASC">Asc</MenuItem>
                            <MenuItem value="DESC">Desc</MenuItem>
                        </Select>
                    </Box>

                </Box>

                <Box style={{ width: '100%', paddingLeft: 20 }}>
                    <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Typography style={{ color: '#D1D4C9', fontSize: 14, marginTop: 10 }}>
                            Filter by:
                        </Typography>
                        <Select
                            variant="outlined"
                            value={filter}
                            onChange={handleChangeFilter}
                            style={{
                                backgroundColor: '#131414', border: '1px solid #303336',
                                borderRadius: 8, color: '#D1D4C9', width: 120, height: 40, fontSize: 14,
                                outline: 'none'
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="NAME">Name</MenuItem>
                            <MenuItem value="SECTION">Section</MenuItem>
                            <MenuItem value="REVIEWS">Reviews</MenuItem>
                            <MenuItem value="RATING">Rating</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
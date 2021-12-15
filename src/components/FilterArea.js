import React, { useState, useEffect } from 'react';
import { MenuItem, Box, Select } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isSort, isFilter, search } from "../redux/actions/serfilAction";

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

    const serfil = useSelector((state) => state.serfil);

    const classes = useStyles();

    const [sort, setSort] = useState("Recent");
    const [filter, setFilter] = useState("No_Filter");

    const handleChangeSort = (e) => {
        setSort(e.target.value)
    };

    useEffect(() => {
        dispatch(isSort(sort));
        dispatch(search(serfil.search, sort, filter))
    }, [dispatch, filter, serfil.search, sort]) 

    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
    };

    useEffect(() => {
        dispatch(isFilter(filter));
        dispatch(search(serfil.search, sort, filter))
    }, [dispatch, filter, serfil.search, sort]) 


    return (
        <Box>
            <Box style={{
                width: 380, height: 70, float: 'right'
                , marginRight: 23, display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                justifyContent: 'space-between'
            }}>

                <Box style={{ width: '100%', }}>
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
                            <MenuItem value="Recent">Most Recent</MenuItem>
                            <MenuItem value="Not_Recent">Not Recent</MenuItem>
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
                            <MenuItem value="No_Filter">No Filter</MenuItem>
                            <MenuItem value="With_filter">Filter</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
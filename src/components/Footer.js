import * as React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { FiTwitter, FiFacebook } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


const classes = {

    text: {
        textAlign: 'center',
        fontSize: {
            xs:'12px',
            md:'15px',
            lg:'1rem'
        },
        margin: 1,
        color: '#62666D'
    },
    link:{
        color: '#00FF9D'
    }
}

export default function Footer() {
    return (
        <Box style={{ textAlign: 'center', paddingTop: 30, }}>

            <Box style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center',
                margin: 'auto', width: 100,
            }}>
                <FiTwitter style={{
                    color: '#00FF9D', width: 25, height: 25,
                }} />
                 <RiDiscordLine style={{
                    color: '#00FF9D', width: 25, height: 25,
                }} />
                <FiFacebook style={{
                    color: '#00FF9D', width: 25, height: 25,
                }} />
            </Box>
            <Typography sx={classes.text}>
                    Contact us: <Link underline="none" sx={classes.link} a href='#'>support@studentreview.com</Link>
                </Typography>

                <Typography sx={classes.text}>
                    &copy; 2021 Student Review. All Rights Reserved.
                </Typography>
                <Typography sx={classes.text}>
                    <Link underline="none" sx={classes.link}>Terms of Service</Link>
                    &ensp;|	&ensp;
                    <Link underline="none" sx={classes.link}>Privacy Policy</Link>
                </Typography>
            <Box style={{
                position: 'fixed', bottom: 40, right: 40, cursor: 'pointer',
                // float: 'right', marginTop: -20, marginRight: 40,
                width: 80, height: 30, backgroundColor: '#22B77E', borderRadius: 30,
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}>
                <HelpOutlineIcon style={{ fontSize: 18, color: '#fff', marginRight: 3 }} />
                <Typography style={{ fontSize: 14, color: '#fff', }}>
                    Help
                </Typography>
            </Box>


        </Box>
    );
}
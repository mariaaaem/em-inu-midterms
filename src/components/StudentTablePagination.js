import * as React from 'react';
import {
    Box,
    Typography
} from '@mui/material';
import {
    KeyboardBackspace as KeyboardBackspaceIcon,
    East as EastIcon
} from '@mui/icons-material';

export default function PaginationRounded() {
    return (
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center', marginTop: 30 }}>

            <Box style={{ width: 30, justifyContent: 'flex-end', marginTop: 13 }}>
                <KeyboardBackspaceIcon style={{
                    color: '#515456', width: 25, height: 25,
                    border: '1px solid #515456', borderRadius: 5, paddingRight: 12, paddingLeft: 12,
                    paddingTop: 2, paddingBottom: 2
                }} />
            </Box>

            <Typography style={{ color: '#D1D4C9', fontSize: 14, marginTop: 10, width: 150, }}>
                Page <span style={{ padding: 6, border: '1px solid #515456', borderRadius: 5 }}>1</span> of 100
            </Typography>

            <Box style={{ width: 30, justifyContent: 'flex-end', marginTop: 13 }}>
                <EastIcon style={{
                    color: '#fff', width: 25, height: 25,
                    border: '1px solid #515456', borderRadius: 5, paddingRight: 12, paddingLeft: 12,
                    paddingTop: 2, paddingBottom: 2
                }} />
            </Box>


        </Box>
    );
}
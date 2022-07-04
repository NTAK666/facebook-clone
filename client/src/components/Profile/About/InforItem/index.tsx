import React from 'react';
import {Box, Typography} from "@mui/material";

interface props {
    icon: string;
    name: string;
}

const InforItem:React.FC<props> = ({icon, name}) => {
    return (
        <Box>
            <Box>
                {icon}
            </Box>
            <Typography sx={{fontSize: '1.25rem', fontWeight: 'bold', padding: '0px 0px 10px 10px'}}>
                {name}
            </Typography>
        </Box>
    )
}

export default InforItem;
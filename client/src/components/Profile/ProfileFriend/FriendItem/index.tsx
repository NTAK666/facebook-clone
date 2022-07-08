import React from 'react';
import {ButtonBase, Grid, Link, Typography} from "@mui/material";

interface Props {
    img: string;
    name: string;
}

const FriendItem: React.FC<Props> = ({img, name}) => {
    return (
        <Grid item xs={4}>
            <ButtonBase>
                <img style={{borderRadius: '5px'}}
                     width="145px"
                     height="145px"
                     src={img}
                     alt=""/>

            </ButtonBase>
            <Link href="/profile" sx={{textDecoration: 'none'}}>
                <Typography
                    sx={{fontSize: '.75rem', fontWeight: '600', color: '#050505', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '5px'}}>
                    {name}
                </Typography>
            </Link>
        </Grid>
    )
}

export default FriendItem;
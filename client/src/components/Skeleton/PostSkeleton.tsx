import { Avatar, Box, Paper, Skeleton } from '@mui/material'
import React from 'react'

const PostSkeleton: React.FC = () => {
    return (
        <Box sx={{ padding: '8px 16px' }}>
            <Paper sx={{ padding: '10px', display: "flex", flexDirection: "column", gap: "10px" }}>
                <Box sx={{ display: 'flex', gap: '15px' }}>
                    <Skeleton variant='circular'>
                        <Avatar sx={{ width: '50px', height: '50px' }} />
                    </Skeleton>
                    <Skeleton width="100%"></Skeleton>
                </Box>
                <Box>
                    <Skeleton variant="rectangular" width="100%">
                        <Box sx={{ paddingTop: "57%" }}></Box>
                    </Skeleton>
                </Box>
            </Paper>
        </Box>
    )
}

export default PostSkeleton;
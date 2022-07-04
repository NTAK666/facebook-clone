import React from 'react';
import {Box, Container, Grid, Link} from "@mui/material";
import ProfileInformation from "../../../components/Profile/ProfileInformation";
import ProfileLayout from "../../../layouts/ProfileLayout";
import FriendList from "../../../components/Profile/About/FriendList";

const FriendProfile = () => {
    return (
        <ProfileLayout>
            <Box>
                <ProfileInformation/>
                <Box>
                    <Container>
                        <FriendList/>
                    </Container>
                </Box>
            </Box>
        </ProfileLayout>
    )
}

export default FriendProfile;
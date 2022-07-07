import React from 'react';
import {Box, Container} from "@mui/material";
import ProfileLayout from "../../../layouts/ProfileLayout";
import FriendList from "../../../components/Profile/About/FriendList";

const FriendProfile = () => {

    return (
        <ProfileLayout>
            <Box>

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
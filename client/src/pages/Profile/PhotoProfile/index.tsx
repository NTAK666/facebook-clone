import React from 'react';
import {Box, Container} from "@mui/material";
import ProfileLayout from "../../../layouts/ProfileLayout";
import Photo from "../../../components/Profile/About/Photo";

const PhotoProfile = () => {

    return (
        <ProfileLayout>
            <Box>

                <Box>
                    <Container>
                        <Photo/>
                    </Container>
                </Box>
            </Box>
        </ProfileLayout>
    )
}

export default PhotoProfile;
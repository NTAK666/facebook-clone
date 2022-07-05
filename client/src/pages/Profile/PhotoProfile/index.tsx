import React from 'react';
import {Box, Container, Grid, Link} from "@mui/material";
import ProfileInformation from "../../../components/Profile/ProfileInformation";
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
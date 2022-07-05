import React from 'react';
import {Box, Container, Grid, Link} from "@mui/material";
import ProfileInformation from "../../../components/Profile/ProfileInformation";
import ProfileLayout from "../../../layouts/ProfileLayout";
import About from "../../../components/Profile/About";

const AboutProfile = () => {

    return (
        <ProfileLayout>
            <Box>

                <Box>
                    <Container>
                       <About/>
                    </Container>
                </Box>
            </Box>
        </ProfileLayout>
    )
}

export default AboutProfile;
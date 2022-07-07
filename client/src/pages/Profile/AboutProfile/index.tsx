import React from 'react';
import {Box, Container} from "@mui/material";
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
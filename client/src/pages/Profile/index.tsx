import React from 'react';
import {Box} from "@mui/material";
import ProfileLayout from "../../layouts/ProfileLayout";
import ProfileInfomation from "../../components/Profile/ProfileInfomation";


const Profile = () => {
    return (
    <ProfileLayout>
        <Box>
            <ProfileInfomation/>
        </Box>
    </ProfileLayout>
    )
}

export default Profile;
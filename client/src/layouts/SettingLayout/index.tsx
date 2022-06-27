import React from 'react';
import HomeLayout from "../HomeLayout";
import Navbar from "../../components/SettingPage/Navbar";
import {Box} from "@mui/material";

interface IProps {
    children: React.ReactNode;
}

const SettingLayout: React.FC<IProps> = ({children}) => {

    return <>
        <HomeLayout isNavbarLeft={false} isNavbarRight={false}>
            <Navbar/>
            <Box sx={{padding: '30px 0', width: '960px'}}>
                {children}
            </Box>
        </HomeLayout>
    </>
}


export default SettingLayout;
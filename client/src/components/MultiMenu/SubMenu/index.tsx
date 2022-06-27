import React, {useMemo} from 'react';
import styles from './styles.module.scss'
import {Box, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MultiMenuItem from "../MultiMenuItem";
import {useNavigate} from "react-router-dom";

interface IProps {
    active: boolean;
    data: any[],
    parentTitle: string;
    handleClose: () => void;
}

const SubMenu: React.FC<IProps> = ({data, active, parentTitle, handleClose}) => {
    const navigate = useNavigate();

    const renderMenuItem = useMemo(() => {
        return data.map((item, index) => {
            const {Icon, label, to} = item;
            return <MultiMenuItem onClick={() => {
                navigate(to);
            }} key={index} icon={<Icon/>} text={label}/>
        })
    }, [data])

    return <>
        <Box className={`${styles.root} ${active ? styles.active : ''}`}>
            <Box className={styles.header}>
                <IconButton onClick={() => handleClose()}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography fontWeight={'bold'} fontSize={'large'}>{parentTitle}</Typography>
            </Box>
            <Box>
                {renderMenuItem}
            </Box>
        </Box>
    </>
}

export default SubMenu;
import React from 'react';
import {Box, Grid, Typography, Button, ButtonBase, IconButton} from "@mui/material";
import styles from './about.module.scss';
import styled from "@emotion/styled";
import FriendList from "./FriendList";
import Photo from "./Photo";
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface props {
    button: {
        name: string;
        link?: string;
    }
}


const About = () => {
    const ButtonTab: React.FC<props> = ({button}) => {
        return (
            <ButtonAboutTab>
                <TypographyTab>
                    {button.name}
                </TypographyTab>
            </ButtonAboutTab>
        )
    }

    return (
        <Box>
            <Box className={styles.about}>
                <Grid container>
                    <Grid item xs={3} sx={{borderRight: '1px solid #CED0D4', padding: '10px'}}>
                        <Typography sx={{fontSize: '1.25rem', fontWeight: 'bold', padding: '0px 0px 10px 10px'}}>
                            Giới thiệu
                        </Typography>
                        <ButtonTab button={{name: 'Tổng quan'}}/>
                        <ButtonTab button={{name: 'Công việc và học vấn'}}/>
                        <ButtonTab button={{name: 'Nơi từng sống'}}/>
                        <ButtonTab button={{name: 'Thông tin liên hệ và cơ bản'}}/>
                        <ButtonTab button={{name: 'Gia đình và các mối quan hệ'}}/>
                        <ButtonTab button={{name: 'Chi tiết về bạn'}}/>
                        <ButtonTab button={{name: 'Sự kiện trong đời'}}/>
                    </Grid>
                    <Grid item xs={9} sx={{padding: '10px'}}>
                        <Box sx={{display: 'flex', width: '100%', padding: '10px'}}>
                            <Box sx={{alignSelf: 'center'}}>
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/lzvufuLgbzd.png" alt=""
                                     width={'24px'} height={'24px'}/>
                            </Box>
                            <Typography sx={{fontSize: '.875rem', fontWeight: '400', padding: '0px 0px 10px 10px', verticalAlign: 'middle'}}>
                                0911348766
                            </Typography>
                            <IconButton className={styles.moreButton}>
                                <MoreHorizIcon/>
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <FriendList/>
            <Photo/>
        </Box>
    );
}


const ButtonAboutTab = styled(Button)`
  width: 100%;
  padding: 6px 10px 6px 10px;
  border-radius: 6px;
  background-color: transparent;
  justify-content: start;
  margin-bottom: 6px;
`
const TypographyTab = styled(Typography)`
  color: #65676B;
  font-size: .875rem;
  font-weight: 500;
  text-transform: none;
`

export default About;
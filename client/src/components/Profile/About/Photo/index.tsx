import React from 'react';
import {Box, Typography, Grid, Container, ButtonBase, Button} from "@mui/material";
import styles from "./list-photo.module.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface props {
    image: string;
}

const ListPhoto = () => {
    const PhotoItem: React.FC<props> = (props) => {
        return (
            <Grid item xs={2} className={styles.photoItem}>
                <ButtonBase>
                    <img src={props.image} alt="" className={styles.photo}/>
                </ButtonBase>
            </Grid>
        )
    }

    return (
        <Box className={styles.listPhoto}>
           <Box sx={{display: 'flex', justify: 'space-between', width: '100%', marginBottom: '10px'}}>
               <Typography sx={{fontSize: '1.25rem', fontWeight: 'bold', padding: '0px 0px 10px 10px'}}>
                   Ảnh
               </Typography>
               <Box sx={{marginLeft: 'auto'}}>
                   <Button sx={{textTransform: 'none'}}>
                       <Typography sx={{color: '#1877F2', fontSize: '.875rem', fontWeight: '600'}}>Thêm ảnh</Typography>
                   </Button>
                   <ButtonBase className={styles.moreButton}>
                       <MoreHorizIcon/>
                   </ButtonBase>
               </Box>
           </Box>
            <Container>
                <Grid container spacing={1}>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                    <PhotoItem image={'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/8b1bf252b50bcd5f7aa7ef6752bd1472~c5_720x720.jpeg?x-expires=1656752400&x-signature=peQcKlZblOtAdNOmMMrj8VyjClk%3D'}/>
                </Grid>
            </Container>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Xem tất cả</Typography>
            </Button>
        </Box>
    )
}

export default ListPhoto;
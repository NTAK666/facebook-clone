import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Typography
} from "@mui/material";
import styles from './styles.module.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// @ts-ignore
import {ColorExtractor} from 'react-color-extractor';
import styled from "@emotion/styled";
import {LikeCircle} from "../../Icons";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Fancybox from "../../Fancybox";
import Comment from "../Comment";

interface IProps {
    time?: string;
    username: string;
    avatar?: string;
    content?: string;
    image?: string;
    likeNumber?: number;
    commentNumber?: number;
    shareNumber?: number;
    postId: string;
}

const PostNormal: React.FC<IProps> = (props) => {
    const {time, postId, username, commentNumber = 0, shareNumber = 0, likeNumber = 0, avatar, content, image} = props;
    const [ratio, setRatio] = React.useState<number>(3 / 4);
    const [colorImage, setColorImage] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLoadImage = ({target}: any) => {
        const {offsetWidth, offsetHeight} = target;
        setRatio(offsetWidth / offsetHeight);
    }

    const getColors = (colors: any) => {
        setColorImage(colors);
    }

    const renderText = () => {
        if (content) {
            if (content.length > 255) {
                const text = showMore ? content : `${content.substring(0, 255)}...`;
                return (
                    <>
                        <Typography className={styles.bodyText}>
                            {text}
                        </Typography>
                        <ButtonStyled className={styles.bodyText} onClick={(e) => {
                            e.preventDefault();
                            setShowMore(!showMore);
                        }}>
                            {showMore ? 'Thu gọn' : 'Xem thêm'}
                        </ButtonStyled>
                    </>
                )
            }
            return (
                <Typography className={styles.bodyText}>
                    {content}
                </Typography>
            )
        }
        return null;
    }

    return (
        <ListItem>
            <Paper className={styles.root}>
                <Box className={styles.header}>
                    <Box className={styles.headerLeft}>
                        <Avatar src={avatar} sx={{width: '40px', height: '40px'}}/>
                        <Box className={styles.headerTitle}>
                            <Typography fontWeight={'bold'} sx={{fontSize: '15px'}}>{username}</Typography>
                            <Typography sx={{fontSize: '13px'}}>{time}</Typography>
                        </Box>
                    </Box>

                    <Box>
                        <IconButton onClick={handleClick}>
                            <MoreHorizIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ReportGmailerrorredIcon/>
                                </ListItemIcon>
                                <Typography>Báo cáo bài viết</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <NotificationsNoneIcon/>
                                </ListItemIcon>
                                <Typography>Bật thông báo về bài viết này</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Box className={styles.body}>
                    <Box>
                        {renderText()}
                    </Box>
                    <Fancybox>
                        <Box className={styles.bodyImage}>
                        <span style={colorImage ? {backgroundColor: colorImage[1]} : {}} className={styles.bgrImage}></span>
                            <Box className={styles.wrapperImage} sx={{width: `calc((100vh - 325px) * ${ratio})`}}>
                                <ColorExtractor getColors={getColors}>
                                    <img style={{cursor: 'pointer'}} onLoad={onLoadImage} data-fancybox={postId}
                                         src={image} alt=""/>
                                </ColorExtractor>
                            </Box>
                        </Box>
                    </Fancybox>
                </Box>
                <Box className={styles.footer}>
                    <Box className={styles.footerText}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <LikeCircle/>
                            <Typography>{likeNumber} lượt thích</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Typography>{commentNumber} bình luận</Typography>
                            <Typography>{shareNumber} lượt chia sẻ</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{width: '100%'}}/>
                    <Grid container className={styles.footerActions}>
                        <Grid item xs={4}>
                            <ButtonAction startIcon={<FavoriteBorderIcon/>}>Yêu thích</ButtonAction>
                        </Grid>
                        <Grid item xs={4}>
                            <ButtonAction startIcon={<ChatBubbleOutlineIcon/>}>Bình luận</ButtonAction>
                        </Grid>
                        <Grid item xs={4}>
                            <ButtonAction startIcon={<ReplyOutlinedIcon/>}>Chia sẻ</ButtonAction>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{padding: '0 10px'}}>
                    <Divider sx={{width: '100%'}}/>
                    <Comment postId={postId}/>
                </Box>
            </Paper>
        </ListItem>
    )
}

const ButtonStyled = styled.span`
  cursor: pointer;
  font-weight: bold;
`

const ButtonAction = styled(Button)`
  width: 100%;
  padding: 8px 0;
  border-radius: 6px;
  color: #333;
  text-transform: capitalize;
  font-weight: bold;
`

export default PostNormal;
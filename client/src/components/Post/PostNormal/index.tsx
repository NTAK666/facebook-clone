import React, {useEffect, useState} from 'react';
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
// @ts-ignore
import {ColorExtractor} from 'react-color-extractor';
import styled from "@emotion/styled";
import {LikeCircle} from "../../Icons";
import Fancybox from "../../Fancybox";
import Comment from "../Comment";
import {IPostFull} from "../../../app/models/Post";
import moment from "moment";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import {IReactFull} from "../../../app/models/React";
import {useAppSelector} from "../../../app/hook";
import {useReactByPostMutation} from "../../../app/services/PostService";
import {Link, useNavigate} from "react-router-dom";

interface IProps {
    post: IPostFull;
}

const PostNormal: React.FC<IProps> = ({post}) => {
    const [ratio, setRatio] = React.useState<number>(3 / 4);
    const navigate = useNavigate()
    const [reactPostApi] = useReactByPostMutation();
    const [colorImage, setColorImage] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openComment, setOpenComment] = useState(false);
    const [reactCount, setReactCount] = useState(0)
    const [liked, setLiked] = useState(false);
    const {user} = useAppSelector(state => state.authSlice)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const userReacts = post.reactPosts;
        const index = userReacts.findIndex((item: IReactFull) => item.user.id === user.id);

        if (index !== -1) {
            setLiked(true);
            setReactCount(post.reactPosts.length);
        }

    }, [post, user])

    const onLoadImage = ({target}: any) => {
        const {offsetWidth, offsetHeight} = target;
        setRatio(offsetWidth / offsetHeight);
    }

    const getColors = (colors: any) => {
        setColorImage(colors);
    }

    const handleReactPost = () => {
        const {id} = post;
        const data = {
            postId: id,
            reactType: "LIKE"
        }
        if (!liked) {
            reactPostApi(data).then((response: any) => {
                if (response.data.status === 200) {

                }
            })
            setLiked(true);
            setReactCount((reactCount) => reactCount + 1);
        }
    }

    const renderText = () => {
        if (post.body) {
            if (post.body.length > 255) {
                const text = showMore ? post.body : `${post.body.substring(0, 255)}...`;
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
            } else {
                return (
                    <>
                        <Typography className={styles.bodyText}>
                            {post.body}
                        </Typography>
                    </>
                )
            }
        }

    }

    return (
        <ListItem>
            <Paper className={styles.root}>
                <Box className={styles.header}>
                    <Box className={styles.headerLeft}>
                        <Avatar src={post.user.userInfo.avatar || ""} sx={{width: '40px', height: '40px'}}/>
                        <Box className={styles.headerTitle}>
                            <Typography fontWeight={'bold'}
                                        sx={{fontSize: '15px'}}>{`${post.user.userInfo.firstName} ${post.user.userInfo.lastName}`}</Typography>
                            <Link to={`/post/${post.slug}-${post.id}`} className={`hover-underline text-decoration-none text-color-gray`}>
                                <Typography sx={{fontSize: '13px'}}>{moment(post.createdAt).fromNow()}</Typography>
                            </Link>
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
                            <MenuItem onClick={() => navigate(`/post/${post.slug}-${post.id}`)}>
                                <ListItemIcon>
                                    <ReportGmailerrorredIcon/>
                                </ListItemIcon>
                                <Typography>Chi tiết bài viết</Typography>
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
                    {post.thumbnail && (
                        <Fancybox>
                            <Box className={styles.bodyImage}>
                                <span style={colorImage ? {backgroundColor: colorImage[1]} : {}}
                                      className={styles.bgrImage}></span>
                                <Box className={styles.wrapperImage} sx={{width: `calc((100vh - 325px) * ${ratio})`}}>
                                    <ColorExtractor getColors={getColors}>
                                        <img style={{cursor: 'pointer'}} onLoad={onLoadImage} data-fancybox={post.id}
                                             src={post.thumbnail} alt=""/>
                                    </ColorExtractor>
                                </Box>
                            </Box>
                        </Fancybox>
                    )}
                </Box>
                <Box className={styles.footer}>
                    <Box className={styles.footerText}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <LikeCircle/>
                            <Typography>{reactCount} lượt thích</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Typography>{post.commentPosts.length} bình luận</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{width: '100%'}}/>
                    <Grid container className={styles.footerActions}>
                        <Grid item xs={6}>
                            <ButtonAction onClick={handleReactPost} sx={liked ? {color: `#216fdb !important`} : {}}
                                          startIcon={<ThumbUpRoundedIcon/>}>Thích</ButtonAction>
                        </Grid>
                        <Grid item xs={6}>
                            <ButtonAction onClick={() => setOpenComment(!openComment)}
                                          startIcon={<ForumRoundedIcon/>}>Bình luận</ButtonAction>
                        </Grid>
                    </Grid>
                </Box>
                {openComment && (
                    <Box sx={{padding: '0 10px'}}>
                        <Divider sx={{width: '100%'}}/>
                        <Comment post={post}/>
                    </Box>
                )}
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
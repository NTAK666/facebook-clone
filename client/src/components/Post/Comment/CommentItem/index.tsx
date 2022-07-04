import React, {useState} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import styles from './styles.module.scss'
import Fancybox from "../../../Fancybox";
import styled from "@emotion/styled";

interface IProps {
    src?: string;
    title: string;
    content?: string;
    image?: string;
    commentId: number;
    time?: string;
}

const CommentItem: React.FC<IProps> = ({time, commentId, src, title, content, image}) => {
    const [ratio, setRatio] = useState(3 / 4);
    const [isLike, setIsLike] = useState(false);

    const onLoadImage = ({target}: any) => {
        const {offsetWidth, offsetHeight} = target;
        setRatio(offsetWidth / offsetHeight);
    }

    const handleLike = () => {
        setIsLike((like) => !like);
    }

    return <>
        <Box className={styles.root}>
            <Box className={styles.top}>
                <Avatar src={src}/>
                <Box sx={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: `6px`,
                }}>
                    <Box className={styles.wrapperText}>
                        <Typography fontSize={'medium'} fontWeight={'bold'}>{title}</Typography>
                        <Typography>{content}</Typography>
                    </Box>
                    {image && (
                        <Fancybox>
                            <Box sx={{
                                width: `calc(((100%) - 325px) * ${ratio})`,
                                border: '1px solid #b1b2b3',
                                borderRadius: `12px`,
                                display: `flex`,
                                overflow: `hidden`,
                                padding: 0,
                            }}>
                                <img data-fancybox={`${commentId}`} onLoad={onLoadImage}
                                     style={{
                                         width: `100%`,
                                         height: `100%`,
                                     }}
                                     src={image} alt=""/>
                            </Box>
                        </Fancybox>
                    )}
                    <Box sx={{
                        marginLeft: `4px`,
                        display: `flex`,
                        gap: `10px`,
                        alignItems: `center`
                    }}>
                        <CommentUtilsButton sx={isLike ? {color: '#1877f2'} : {color: "#65676B"}}
                                            onClick={handleLike}>Thích</CommentUtilsButton>
                        <CommentUtilsButton sx={{color: '#65676B'}}>Phản hồi</CommentUtilsButton>
                        {time &&
                            <Typography
                                sx={{fontSize: '14px', color: '#65676B', marginLeft: '10px'}}>{time}</Typography>}
                    </Box>
                </Box>
            </Box>

        </Box>
    </>
}


const CommentUtilsButton = styled(Typography)`
  cursor: pointer;
  transition: all .4s;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    transition: all .4s;
    text-decoration: underline;
  }

`


export default CommentItem;
import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {Box, IconButton, InputBase} from "@mui/material";
import styled from "@emotion/styled";
import AvatarOnline from "../../Avatar/AvatarOnline";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {useAppSelector} from "../../../app/hook";
import {useSendCommentByPostMutation} from "../../../app/services/PostService";
import {ICommentFull} from "../../../app/models/Comment";
import CommentItem from "./CommentItem";
import moment from "moment";
import {IPostFull} from "../../../app/models/Post";

interface IProps {
    post: IPostFull;
}

const Comment: React.FC<IProps> = ({post}) => {
    const {user} = useAppSelector(state => state.authSlice);
    const [comment, setComment] = useState<string>('');
    const [sendCommentApi] = useSendCommentByPostMutation();
    const [commentList, setCommentList] = useState<ICommentFull[]>([])

    useEffect(() => {
        setCommentList(post.commentPosts)
    }, [post.commentPosts])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const request = {
            postId: post.id,
            comment
        }
        sendCommentApi(request).then((response: any) => {
            if (response.data.status === 200) {
                const data = response.data.data;
                setCommentList([...commentList, data])
            }

        })
        setComment("");
    }

    return (
        <>
            <Box className={styles.root}>
                <form onSubmit={handleSubmit} className={styles.header}>
                    <AvatarOnline src={user.userInfo.avatar || ""} online={true}/>
                    <InputStyled value={comment} onChange={(e) => setComment(e.target.value)}
                                 placeholder={'Viết bình luận'}/>
                    <button type={`submit`} hidden></button>
                    <Box className={styles.headerActions}>
                        <IconButton>
                            <CameraAltOutlinedIcon/>
                        </IconButton>
                    </Box>
                </form>
                <Box>
                    {commentList.slice().reverse().map((comment: ICommentFull) => {
                        return (
                            <CommentItem
                                key={comment.id}
                                time={moment(comment.createdAt).fromNow()}
                                commentId={comment.id}
                                image={comment.image}
                                title={`${comment.user.userInfo.firstName} ${comment.user.userInfo.lastName}`}
                                content={comment.comment}
                                src={comment.user.userInfo.avatar || ""}/>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  border-radius: 18px;
  background-color: #F0F2F5;
  padding: 0 10px;
`

export default Comment;
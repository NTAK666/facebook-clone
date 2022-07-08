import React, {useEffect, useState} from 'react';
import Header from "../../components/HomePage/Header";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import styles from './styles.module.scss'
import CommentBankIcon from '@mui/icons-material/CommentBank';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageIcon from '@mui/icons-material/Image';
import styled from "@emotion/styled";
import {useSearchParams} from "react-router-dom";
import {useFindByNameMutation} from "../../app/services/UserService";
import {IUserFull} from "../../app/models/User";
import {useAppSelector} from "../../app/hook";
import SearchItem from "./SearchItem";

interface IProps {

}

const SearchPage: React.FC<IProps> = () => {
    const [searchParams] = useSearchParams();
    const [findByNameApi] = useFindByNameMutation();
    const [userList, setUserList] = useState<IUserFull[]>([]);
    const {user} = useAppSelector(state => state.authSlice)

    useEffect(() => {
        const keyword = searchParams.get('k');
        if (keyword) {
            findByNameApi(keyword).then((response: any) => {
                if (response.data.status === 200) {
                    let list = response.data.data;
                    list = list.filter((item: IUserFull) => item.id !== user.id);
                    setUserList([...list]);
                }
            })
        }
    }, [findByNameApi, searchParams, user]);


    return <>
        <Header/>
        <Box className={styles.navbar}>
            <Typography fontWeight={`bold`} fontSize={`x-large`}>Kết quả tìm kiếm</Typography>
            <Divider sx={{margin: "10px 0"}}/>
            <List
                subheader={<Typography variant="subtitle1" fontWeight={`bold`}>Bộ lọc</Typography>}
                disablePadding
            >
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CommentBankIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Bài viết</Typography>}/>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Mọi người</Typography>}/>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ImageIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Ảnh</Typography>}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
        <Wrapper>

            <Paper className={styles.wrapperContent}>
                {userList.length <= 0 ? (
                    <Box sx={{display: `flex`, justifyContent: `center`}}>
                        <Typography sx={{color: `#606770`}} fontWeight={`bold`} fontSize={`large`}>Không tìm thấy người
                            dùng
                            nào</Typography>
                    </Box>
                ) : (
                    <>
                        <Typography fontWeight={`bold`} fontSize={`large`}>
                            Mọi người
                        </Typography>
                        <List>
                            {userList.map((user, index) => {
                                return <SearchItem key={index} userTarget={user}/>
                            })}
                        </List>
                    </>
                )}
            </Paper>
        </Wrapper>
    </>
}

const Wrapper = styled(Box)`
  margin-top: var(--header-height);
  margin-left: var(--navbar-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  height: 100vh;
`



export default SearchPage;
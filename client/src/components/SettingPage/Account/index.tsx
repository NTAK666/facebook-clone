import React from 'react';
import {Box, List, ListItem, ListItemButton, Typography} from "@mui/material";
import styles from './styles.module.scss';


interface IProps {

}

const Account: React.FC<IProps> = () => {
    return <>
        <Box className={styles.root}>
            <Box className={styles.header}>
                <Typography fontSize={`x-large`} fontWeight={`bold`}>Cài đặt tài khoản chung</Typography>
            </Box>
            <List className={styles.list}>
                <ListItemCustom title={`Tên`} name={`Hữu Tài`}/>
                <ListItemCustom title={`Tên người dùng`} name={`Hữu Tài`}/>
                <ListItemCustom title={`Liên hệ`} name={`Hữu Tài`}/>
                <ListItemCustom title={`Cài đặt tưởng nhớ`}
                                name={`Quyết định điều gì sẽ xảy ra với trang cá nhân Facebook chính của bạn sau khi bạn qua đời.`}
                />
                <ListItemCustom title={`Xác nhận danh tính`}
                                name={`Xác nhận danh tính của bạn để làm những việc như chạy quảng cáo về vấn đề xã hội, bầu cử hoặc chính trị.`}
                />
            </List>
        </Box>
    </>
}

interface IListItemCustom {
    title: string;
    name: string;
    onClick?: () => void;
}

const ListItemCustom: React.FC<IListItemCustom> = ({title, name}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton className={styles.listItem}>
                <Box sx={{width: '200px'}}>
                    <Typography sx={{color: '#000'}} fontWeight={'bold'}>{title}</Typography>
                </Box>
                <Box sx={{width: '100%', display: 'flex', padding: '0 10px'}}>
                    <Typography>{name}</Typography>
                </Box>
                <Box sx={{width: '100px'}}>
                    <Typography className={`text-color-link`}>Chỉnh sửa</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    )
}

export default Account;
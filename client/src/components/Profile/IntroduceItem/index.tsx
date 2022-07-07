import React from 'react';
import styles from './introduce-item.module.scss';
import {Box, Typography} from "@mui/material";

interface Props {
    content: string;
    icon: string;
}

const IntroduceItem: React.FC = (props) => {
    return (
        <Box className={styles.introduceList}>
            <Box className={styles.introduceItem}>
                <Box className={styles.iconIntroduce}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png" alt=""/></Box><Typography className={styles.textIntroduce}>Đang học tại Trường Đại Học Phú Xuân</Typography>
            </Box>
            <Box className={styles.introduceItem}>
                <Box className={styles.iconIntroduce}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/1sW88456A0B.png" alt=""/></Box><Typography className={styles.textIntroduce}>Sống tại Huế</Typography>
            </Box>
            <Box className={styles.introduceItem}>
                <Box className={styles.iconIntroduce}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/JanwljMyOww.png" alt=""/></Box><Typography className={styles.textIntroduce}>Có 15.045 người theo dõi</Typography>
            </Box>
            <Box className={styles.introduceItem}>
                <Box className={styles.iconIntroduce}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/22ubiF2Af05.png" alt=""/></Box><Typography className={styles.textIntroduce}>huyhieu.nguyenphan</Typography>
            </Box>
        </Box>
    )

}

export default IntroduceItem;
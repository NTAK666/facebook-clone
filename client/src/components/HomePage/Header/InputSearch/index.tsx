import React from 'react';
import styles from './input.module.scss'
import {ButtonBase, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

interface IProps {
}


const InputSearch: React.FC<IProps> = () => {
    const [keyword, setKeyword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate(`/search?k=${keyword}`);
    }

    return <form onSubmit={handleSubmit} className={styles.root}>
        <ButtonBase type={`submit`}>
            <SearchIcon sx={{color: '#65676b'}}/>
        </ButtonBase>
        <InputBase type="text"
                   className={styles.inputSearch}
                   placeholder="Tìm kiếm trên Facebook"
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
        />
    </form>
}

export default InputSearch;
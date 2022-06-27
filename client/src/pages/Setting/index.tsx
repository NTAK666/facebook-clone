import React from 'react';
import {Route, Routes} from "react-router-dom";
import SettingLayout from "../../layouts/SettingLayout";
import Account from "../../components/SettingPage/Account";

interface IProps {

}

const SettingPage: React.FC<IProps> = () => {
    return <>
        <SettingLayout>
            <Routes>
                <Route path={`/account`} element={<Account/>}/>
            </Routes>
        </SettingLayout>
    </>
}
export default SettingPage;
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "../../app/hook";

export default function PrivateRoute() {
    const {isLoggedIn} = useAppSelector(state => state.authSlice);
    console.log(isLoggedIn)
    return isLoggedIn ? (
        <Outlet/>
    ) : <Navigate to="/login"/>;
}
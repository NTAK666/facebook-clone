import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

import NotFound from "./components/NotFound/404";
import WatchPage from "./pages/Watch";
import GamePage from "./pages/Game";
import MarketplacePage from "./pages/Marketplace";
import GroupPage from "./pages/Group";
import {useGetFriendsQuery, useGetMeQuery} from "./app/services/UserService";

function App() {
    useGetMeQuery();
    useGetFriendsQuery();
    
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/watch" element={<WatchPage/>}/>
            <Route path="/game" element={<GamePage/>}/>
            <Route path="/marketplace" element={<MarketplacePage/>}/>
            <Route path="/group" element={<GroupPage/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;

import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import WatchPage from "./pages/Watch";
import GamePage from "./pages/Game";
import MarketplacePage from "./pages/Marketplace";
import GroupPage from "./pages/Group";
import SettingPage from "./pages/Setting";
import StoriesPage from "./pages/Stories";
import CreateStories from "./pages/Stories/Create";
import Test from "./pages/test";
import {useGetMeQuery} from "./app/services/AuthService";
import LoadingCircle from "./components/Loading/LoadingCircle";
import PrivateRoute from "./components/Router/PrivateRoute";
import NotFound from "./components/NotFound/404";
import StoryDetail from "./pages/Stories/Detail";
import SearchPage from "./pages/Search";
import ProfilePage from "./pages/Profile";
import PostDetail from "./pages/Posts/Detail";
import SocketProvider from "./contexts/SocketContext";

function App() {
    const {isLoading} = useGetMeQuery();

    if (isLoading) {
        return <LoadingCircle/>;
    }

    return (
        <SocketProvider>
            <Routes>
                <Route path="login" element={<LoginPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="watch" element={<WatchPage/>}/>
                    <Route path="game" element={<GamePage/>}/>
                    <Route path="marketplace" element={<MarketplacePage/>}/>
                    <Route path="settings" element={<SettingPage/>}/>
                    <Route path="group" element={<GroupPage/>}/>
                    <Route path="post">
                        <Route path=":slug" element={<PostDetail/>}/>
                    </Route>
                    <Route path="stories">
                        <Route index element={<StoriesPage/>}/>
                        <Route path="create" element={<CreateStories/>}/>
                        <Route path=":id" element={<StoryDetail/>}/>
                    </Route>
                    <Route path="search" element={<SearchPage/>}/>
                </Route>
                <Route path="profile">
                    <Route path=":id" element={<ProfilePage/>}/>
                </Route>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </SocketProvider>
    );
}

export default App;

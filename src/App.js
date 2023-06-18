import About from "./pages/About";
import TimeLine from "./pages/TimeLine";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ShowHome from "./pages/ShowHome";
import MyAbout from "./pages/MyAbout";
import MyTimeLine from "./pages/MyTimeLine";
import PostDetail from "./pages/posts/PostDetail";
import Settings from "./pages/Settings";
import Message from "./pages/Message";
import Chat from "./pages/Chat";
import AvatarProfile from "./pages/AvatarProfile";
import Account from "./pages/Account";
import Password from "./pages/Password";
import Search from "./Search/Search";
import All from "./Search/All";
import People from "./Search/People";
import Post from "./Search/PostSearch";
import {PrivateRoute} from "./pages/PrivateRoute";
import {useEffect, useState} from "react";
import {checkNotification, getNotifications} from "./services/NotificationService";
import {socket} from "./services/socketService";



function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    useEffect(()=>{
        function onConnect() {
            setIsConnected(true);
            console.log("Success")
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);
        socket.on("sendNotification" ,()=>{
            console.log(2)
        })

    },[])
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registers" element={<Register/>}/>
            <Route path="/:idPost" element={<PrivateRoute><PostDetail/></PrivateRoute>}/>
            <Route path="/messages" element={<PrivateRoute><Message/></PrivateRoute>}/>
            <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}>
                <Route path="search" element={<PrivateRoute><Search/></PrivateRoute>}>
                    <Route path={""} element={<PrivateRoute><All/></PrivateRoute>}/>
                    <Route path={"people"} element={<PrivateRoute><People/></PrivateRoute>}/>
                    <Route path={"Post"} element={<PrivateRoute><Post/></PrivateRoute>}/>
                </Route>
                <Route path={""} element={<PrivateRoute><ShowHome/></PrivateRoute>}/>
                <Route path={"myAbout"} element={<PrivateRoute><MyAbout/></PrivateRoute>}/>
                <Route path={"about/:idAccount"} element={<PrivateRoute><About/></PrivateRoute>}/>
                <Route path={"myTimeLine"} element={<PrivateRoute><MyTimeLine/></PrivateRoute>}/>
                <Route path={"timeLine/:idAccount"} element={<PrivateRoute><TimeLine/></PrivateRoute>}/>
                <Route path={"settings"} element={<PrivateRoute><Settings/></PrivateRoute>}>
                    <Route path={"avatar"} element={<PrivateRoute><AvatarProfile/></PrivateRoute>}/>
                    <Route path={"account"} element={<PrivateRoute><Account/></PrivateRoute>}/>
                    <Route path={"password"} element={<PrivateRoute><Password/></PrivateRoute>}/>
                </Route>
            </Route>
            <Route path={"/chat"} element={<PrivateRoute><Chat/></PrivateRoute>}/>
        </Routes>

    )
}

export default App;

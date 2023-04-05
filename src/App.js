
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/registers" element={<Register/>}/>
        <Route path="/:idPost" element={<PostDetail/>}/>
        <Route path="/messages" element={<Message/>}/>
        <Route path="/home" element={<Home/>}>
            <Route path={""} element={<ShowHome/>}/>
            <Route path={"myAbout"} element={<MyAbout/>}/>
            <Route path={"about/:idAccount"} element={<About/>}/>
            <Route path={"myTimeLine"} element={<MyTimeLine/>}/>
            <Route path={"timeLine/:idAccount"} element={<TimeLine/>}/>
            <Route path={"settings"} element={<Settings/>}/>
        </Route>

    </Routes>
  )
}

export default App;

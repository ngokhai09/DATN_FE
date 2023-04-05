import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../component/Header";


const Home = () => {
    return (
        <>
            <div>
                <Header/>
                <Outlet/>
            </div>
        </>

    )
}
export default Home;

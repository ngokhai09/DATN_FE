import {CometChat} from "@cometchat-pro/chat";
import {CometChatUI} from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import Header from "../component/Header";
import React, {useEffect} from "react";
import md5 from 'md5';



function Chat() {

    useEffect(()=>{
        const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
        const region = process.env.REACT_APP_COMETCHAT_REGION;
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

        CometChat.init(appID, appSetting).then(
            () => {
                console.log("Init success")
            },
            error => {
                console.log('Init false')
            }
        )
        const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
        const account = JSON.parse(localStorage.getItem("account"))
        const uid = md5(account.username);
        const name = account.username;
        let user = new CometChat.User(uid);
        user.setName(name);
        user.setAvatar(account.avatar);
        CometChat.createUser(user, authKey).then(
            user=>{
                console.log("user create", user);
            }, error=>{
                console.log(error)
            }
        )
        CometChat.login(uid, authKey).then(
            user => {
                console.log("Login", {user})
            }, error => {
                console.log("False")
            }
        )
    }, [])

    return (
        <>
            <Header/>
            <main>
                <div style={{width: "100%", height: '640px'}}>
                    <CometChatUI/>
                </div>
            </main>
        </>
    )
}

export default Chat;
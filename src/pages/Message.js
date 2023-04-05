import React, {useEffect, useRef, useState} from 'react';
import Header from "../component/Header";
import {useDispatch, useSelector} from "react-redux";
import {getListMessage, getMessage} from "../services/MessageService";
import {Link, useLocation, useParams} from "react-router-dom";
import {findById, searchOtherAccount} from "../services/AccountService";
import * as socketIOClient from "socket.io-client";
import LeftMess from "./LeftMess";

const host = "http://localhost:4000";
const Message = () => {

    const dispatch = useDispatch();
    const [messages, setMessage] = useState('');
    const [id, setId] = useState();
    const socketRef = useRef();
    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const otherAccount = useSelector(state => {
        return state.account.account
    })
    let message = useSelector(state => {
        return state.message.messages
    })
    // console.log(message,1)
    let existURL = useLocation().search
    const [mess, setMess] = useState()
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            sendMessage().then()
        }
    }
    // cho tin nhắn xuống cuối cùng
    const scrollBottom = () => {
        window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth"});
    }
    const sendMessage = async () => {
        if (messages !== null) {
            const msg = {
                content: messages,
                id: id,
                idReceiver: otherAccount.idAccount
            }
            await socketRef.current.emit('sendDataClient', msg)
            await setMessage('')
            scrollBottom()
        }
    }
    console.log(mess,2)

    useEffect(() => {
        setMess(message)
        socketRef.current = socketIOClient.connect(host)
        setId(account.idAccount)
        socketRef.current.on('sendDataServer', dataGot => {
            setMess(dataGot.content)
            scrollBottom()
        }) // mỗi khi có tin nhắn thì mess sẽ được render thêm
        return () => {
            socketRef.current.disconnect();
        };
    }, [message]);
    let last2 = existURL.slice(-2);
    console.log(last2)
    useEffect(() => {
        dispatch(getMessage(existURL))
        dispatch(searchOtherAccount(otherAccount.idAccount))
        dispatch(getListMessage(account.idAccount))
        dispatch(findById(last2))
    }, [existURL])

    return (
        <>
            <Header/>
            <main>
                <div className="container">

                    <div className="row gx-0">
                        <LeftMess/>
                        <div className="col-lg-8 col-xxl-9">
                            <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
                                <div className="card-body h-100" style={{overflow: "auto"}}>
                                    <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
                                        <div className="fade tab-pane show active h-100" id="chat-1" role="tabpanel"
                                             aria-labelledby="chat-1-tab">
                                            <div className="d-sm-flex justify-content-between align-items-center">
                                                <div className="d-flex mb-2 mb-sm-0">
                                                    <div className="flex-shrink-0 avatar me-2">
                                                        <img className="avatar-img rounded-circle"
                                                             src={otherAccount.avatar} alt=""/>
                                                    </div>
                                                    <div className="d-block flex-grow-1">
                                                        <h6 className="mb-0 mt-1">{otherAccount.name}</h6>
                                                        <div className="small text-secondary"><i
                                                            className="fa-solid fa-circle text-success me-1"></i>Online
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a href="#!"
                                                       className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                                                       data-bs-toggle="tooltip" data-bs-placement="top"
                                                       title="Audio call"><i className="bi bi-telephone-fill"></i></a>
                                                    <a href="#!"
                                                       className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                                                       data-bs-toggle="tooltip" data-bs-placement="top"
                                                       title="Video call"><i
                                                        className="bi bi-camera-video-fill"></i></a>
                                                    <div className="dropdown">
                                                        <a className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                                                           href="#" id="chatcoversationDropdown" role="button"
                                                           data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                                           aria-expanded="false"><i
                                                            className="bi bi-three-dots-vertical"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-end"
                                                            aria-labelledby="chatcoversationDropdown">
                                                            <li><a className="dropdown-item" href="#"><i
                                                                className="bi bi-check-lg me-2 fw-icon"></i>Mark as read</a>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#"><i
                                                                className="bi bi-mic-mute me-2 fw-icon"></i>Mute
                                                                conversation</a></li>
                                                            <li><a className="dropdown-item" href="#"><i
                                                                className="bi bi-person-check me-2 fw-icon"></i>View
                                                                profile</a></li>
                                                            <li><a className="dropdown-item" href="#"><i
                                                                className="bi bi-trash me-2 fw-icon"></i>Delete chat</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"><i
                                                                className="bi bi-archive me-2 fw-icon"></i>Archive chat</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {mess !== undefined && mess.map(item => (
                                                <>
                                                    {item.senderIdAccount !== account.idAccount ? <>
                                                        <div>
                                                            <div className="chat-conversation-content custom-scrollbar">
                                                                <div className="d-flex mb-1 mt-4">
                                                                    <div
                                                                        className="flex-shrink-0 avatar avatar-xs me-2">
                                                                        <img className="avatar-img rounded-circle"
                                                                             src={otherAccount.avatar} alt=""/>
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div className="w-100">
                                                                            <div
                                                                                className="d-flex flex-column align-items-start">
                                                                                <div
                                                                                    className="bg-light text-secondary p-2 px-3 rounded-2 ">{item.content}
                                                                                </div>
                                                                                <div
                                                                                    className="text-center small my-2">{item.time}</div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> : <>
                                                        <div className="d-flex justify-content-end text-end mb-1">
                                                            <div className="w-100">
                                                                <div className="d-flex flex-column align-items-end">
                                                                    <div
                                                                        className="bg-primary text-white p-2 px-3 rounded-2 mt-4">{item.content}
                                                                    </div>
                                                                    <div
                                                                        className="text-center small my-2">{item.time}</div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </>}
                                                </>
                                            ))}

                                        </div>

                                    </div>
                                </div>
                                <div id='add-form1'>
                                    <div className="card-footer">
                                        <div className="d-sm-flex align-items-end">
                                                <textarea className="form-control mb-sm-0 mb-3" data-autoresize
                                                          placeholder="Type a message" rows="1" value={messages}
                                                          onChange={handleChange} onKeyDown={onEnterPress}
                                                          name={'content'}></textarea>
                                            <button className="btn btn-sm btn-primary ms-2" type={"submit"}
                                                    onClick={sendMessage}><i
                                                className="fa-solid fa-paper-plane fs-6"></i></button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </>

    )
}
export default Message;

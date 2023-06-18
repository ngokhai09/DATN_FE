import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {findByIdAccount, findByIdPost, getPosts} from "../services/PostService";
import {Link} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../services/fireBase";
import ShowPost from "./posts/ShowPost";
import CreatePost from "./posts/CreatePost";
import {searchOtherAccount} from "../services/AccountService";
import {checkFriend, confirmFriend, deleteFriend, getFriendRequest, getFriends} from "../services/FriendService";
import {socket} from "../services/socketService";
import {addNotification, checkNotification, getNotifications} from "../services/NotificationService";

const ShowHome = () => {

    const [images, setImages] = useState([]);

    const account = useSelector(state => {
        return state.account.currentAccount
    })
    const otherAccount = useSelector(state => {
        return state.account.otherAccount
    })
    const friends = useSelector(state => {
        return state.friends.friends
    })
    const [friendRequests, setFriendRequests] = useState([]);
    const handleConfirmFriend = async (id)=>{
        let values = {idSender:id,idReceiver:account.idAccount,status:"Friend Confirm"};
        setFriendRequests(prev=> prev.filter(item=> item.idAccount !== id))
        socket.emit("ConfirmFriends", values)
        dispatch(getFriends(account.idAccount))
        console.log(friends)

    }
    const handleDeleteFriend = async (idSent) => {
        let data = {idSender:idSent,idReceiver:account.idAccount};
        dispatch(deleteFriend(data));
        setFriendRequests(prev=> prev.filter(item=> item.idAccount !== idSent))

    }

    const dispatch = useDispatch();

    useEffect(() => {
        handleUpload()
    }, [images])


    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on("state_changed", (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setUrls(prevState => [...prevState, downloadURLs])
                        console.log("File available at", downloadURLs);
                    });
                });
            });
        }
        Promise.all(promises)
            .then()
            .catch((err) => console.log(err));

    }

    const [urls, setUrls] = useState([]);

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        dispatch(getPosts())
        dispatch(getFriends(account.idAccount))
        dispatch(getFriendRequest(account.idAccount)).then((data)=>{
            setFriendRequests(data.payload)
        })

    }, [])


    return (<>

            <main>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center d-lg-none">
                                <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasSideNavbar" aria-controls="offcanvasSideNavbar">
                                    <i className="btn btn-primary fw-bold fa-solid fa-sliders-h"></i>
                                    <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
                                </button>
                            </div>
                            <nav className="navbar navbar-expand-lg mx-0">
                                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSideNavbar">
                                    <div className="offcanvas-header">
                                        <button type="button" className="btn-close text-reset ms-auto"
                                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>

                                    <div className="offcanvas-body d-block px-2 px-lg-0">
                                        <div className="card overflow-hidden">
                                            <div className="card-body pt-0 mt-5">
                                                <div className="text-center">
                                                    <div className="avatar avatar-lg mt-n5 mb-3">
                                                        <a><img
                                                            className="avatar-img rounded border border-white border-3"
                                                            src={account.avatar} alt=""/></a>
                                                    </div>
                                                    <h5 className="mb-0"><Link
                                                        to={`/home/myTimeline`}>{account.name}</Link>
                                                    </h5>
                                                    <small>Lập trình viên web </small>
                                                    <p className="mt-3">Tôi muốn thay đổi thế giới, nhưng họ không cho
                                                        tôi mã nguồn..</p>

                                                </div>

                                                <hr/>
                                                <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to={"/home"}> <img
                                                            className="me-2 h-20px fa-fw"
                                                            src="assets/images/icon/home-outline-filled.svg"
                                                            alt=""/><span>Feed </span></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to={"/home/myTimeline"}> <img
                                                            className="me-2 h-20px fa-fw"
                                                            src="assets/images/icon/person-outline-filled.svg"
                                                            alt=""/><span>Connections </span></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link"
                                                              to={`/messages?senderId=${account.idAccount}&receiverId=${otherAccount.idAccount}`}>
                                                            <img
                                                                className="me-2 h-20px fa-fw"
                                                                src="assets/images/icon/chat-alt-outline-filled.svg"
                                                                alt=""/><span>Message </span></Link>
                                                    </li>

                                                </ul>

                                            </div>
                                        </div>
                                        <ul className="nav small mt-4 justify-content-center lh-1">
                                            <li className="nav-item">
                                                <a className="nav-link" href="my-profile-about.html">About</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="settings.html">Settings</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" target="_blank"
                                                   href="https://support.webestica.com/login">Support </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" target="_blank" href="docs/index.html">Docs </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="help.html">Help</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="privacy-and-terms.html">Privacy &
                                                    terms</a>
                                            </li>
                                        </ul>
                                        <p className="small text-center mt-1">©2023 <a className="text-body"
                                                                                       target="_blank"
                                                                                       href="https://www.webestica.com/"> Webestica </a>
                                        </p>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <CreatePost/>
                            <ShowPost/>
                            <a href="#!" role="button" className="btn btn-loader btn-primary-soft"
                               data-bs-toggle="button"
                               aria-pressed="true">
                                <span className="load-text"> Load more </span>
                                <div className="load-icon">
                                    <div className="spinner-grow spinner-grow-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <div className="row g-4">

                                <div className="col-sm-6 col-lg-12">
                                    <div className="card">
                                        <div className="card-header pb-0 border-0">
                                            <h5 className="card-title mb-0">Friends Request</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="hstack gap-2 mb-3">
                                                {friendRequests.length > 0 ? friendRequests.map(item =>  { return <>
                                                    <div className="avatar"><img className="avatar-img rounded-circle"
                                                                                 src={item.avatar} alt=""/>
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="row"><Link to={`timeLine/${item.idAccount}`} className="h6 mb-0">{item.name}</Link></div>

                                                        <button className={"btn "} style={{padding: "2px"}}><span
                                                            className="badge bg-primary" onClick={()=>handleConfirmFriend(item.idAccount)}>Confirm</span>
                                                        </button>
                                                        <button className={"btn "} style={{padding: "2px"}}><span
                                                            className="badge badge-danger" onClick={()=>handleDeleteFriend(item.idAccount)}> Cancel </span>
                                                        </button>
                                                    </div>
                                                </>
                                                }): <p style={{textAlign: "center"}}>No friend requests</p>}


                                            </div>
                                            <div className="d-grid mt-3" >
                                                <Link className="btn btn-sm btn-primary-soft" to={""} style={friendRequests.length > 0 ? {}: {pointerEvents: "none"}}>View more</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card">
                                        <div className="card-header pb-0 border-0">
                                            <h5 className="card-title mb-0">Friends</h5>
                                        </div>
                                        <div className="card-body">
                                            {friends !== undefined && friends.map(it => (
                                                <div className="hstack gap-2 mb-3">
                                                    <div className="avatar">
                                                        <a href="#"> <img className="avatar-img rounded-circle"
                                                                          src={it.avatar}
                                                                          alt=""/> </a>
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <Link className="h6 mb-0"
                                                              to={`/home/timeLine/${it.idAccount}`}>{it.name} </Link>
                                                    </div>

                                                </div>

                                            ))}

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
export default ShowHome;

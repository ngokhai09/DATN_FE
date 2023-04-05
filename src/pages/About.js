import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {searchOtherAccount} from "../services/AccountService";
import {addFriend, checkFriend, confirmFriend, deleteFriend, getFriends} from "../services/FriendService";


const About = () => {

    const {idAccount} = useParams();
    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const otherAccount = useSelector(state => {
        return state.account.otherAccount
    });

    const friend = useSelector(state => {
        return state.friends.friend
    });

    const friends = useSelector(state => {
        return state.friends.friends
    })

    const dispatch = useDispatch();

    const handleAddFriend = async ()=>{
        let data = {idSender:account.idAccount,idReceiver:idAccount};
        dispatch(addFriend(data));
    }

    const handleDeleteFriend = async (id)=>{
        dispatch(deleteFriend(id));
    }

    const handleConfirmFriend = async (id)=>{
        dispatch(confirmFriend(id));
    }

    useEffect(()=>{
        dispatch(searchOtherAccount(idAccount));
        let data = {thisId:account.idAccount,thatId:idAccount};
        dispatch(checkFriend(data));
        dispatch(getFriends(idAccount))
    },[])


    return (
        <>
            <main>


                <div className="container">
                    <div className="row g-4">


                        <div className="col-lg-8 vstack gap-4">

                            <div className="card">
                                <div className="h-200px rounded-top"
                                     style={{
                                         backgroundimage: "url(assets/images/bg/05.jpg)",
                                         backgroundposition: "center",
                                         backgroundsize: "cover",
                                         backgroundrepeat: "no-repeat"
                                     }}></div>

                                <div className="card-body py-0">
                                    <div className="d-sm-flex align-items-start text-center text-sm-start">
                                        <div>

                                            <div className="avatar avatar-xxl mt-n5 mb-3">
                                                <img className="avatar-img rounded-circle border border-white border-3"
                                                     src={otherAccount.avatar} alt=""/>
                                            </div>
                                        </div>
                                        <div className="ms-sm-4 mt-sm-3">

                                            <h1 className="mb-0 h5">{otherAccount.name} <i
                                                className="bi bi-patch-check-fill text-success small"></i></h1>
                                            <p>250 connections</p>
                                        </div>

                                    </div>
                                    <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                                        <li className="list-inline-item"><i className="bi bi-geo-alt fa-fw me-2"></i>{otherAccount.address}</li>
                                        {friend === "Add Friend" && <span as={"button"} className="badge bg-primary" onClick={()=>{handleAddFriend()}}>Add Friend</span>}
                                        {friend.status === "Friends" &&
                                            <>
                                                <span as={"button"} className="badge bg-primary">Friends</span>
                                                <span as={"button"} className="badge bg-primary bg-opacity-10 text-secondary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}> Delete </span>
                                            </>}
                                        {friend.status === "Cancel Request" && <span as={"button"} className="badge bg-primary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}>Cancel Request</span>}
                                        {friend.status === "Confirm" &&
                                            <>
                                                <span as={"button"} className="badge bg-primary" onClick={()=>{handleConfirmFriend(friend.friend.id)}}>Confirm</span>
                                                <span as={"button"} className="badge bg-primary bg-opacity-10 text-secondary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}> Delete </span>
                                            </>}
                                    </ul>
                                </div>

                                <div className="card-footer mt-3 pt-2 pb-0">

                                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                                        <li className="nav-item"><Link className="nav-link"
                                                                       to={`/home/timeLine/${idAccount}`}> Posts </Link></li>
                                        <li className="nav-item"><Link className="nav-link active"
                                                                       to={""}> About </Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">

                                <div className="card-header border-0 pb-0">
                                    <h5 className="card-title"> Profile Info</h5>
                                </div>

                                <div className="card-body">
                                    <div className="rounded border px-3 py-2 mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6>{otherAccount.name}</h6>
                                        </div>
                                        <p>Thích màu hồng.</p>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-sm-6">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-calendar-date fa-fw me-2"></i> Born: <strong> {otherAccount.birthday} </strong>
                                                </p>
                                                <div className="dropdown ms-auto">

                                                    <a className="nav-link text-secondary mb-0" href="#"
                                                       id="aboutAction2" data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                        <i className="bi bi-three-dots"></i>
                                                    </a>

                                                    <ul className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="aboutAction2">
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-pencil-square fa-fw pe-2"></i>Edit</a></li>
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-trash fa-fw pe-2"></i>Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-heart fa-fw me-2"></i> German: <strong> {otherAccount.german} </strong>
                                                </p>
                                                <div className="dropdown ms-auto">

                                                    <a className="nav-link text-secondary mb-0" href="#"
                                                       id="aboutAction3" data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                        <i className="bi bi-three-dots"></i>
                                                    </a>

                                                    <ul className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="aboutAction3">
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-pencil-square fa-fw pe-2"></i>Edit</a></li>
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-trash fa-fw pe-2"></i>Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-briefcase fa-fw me-2"></i> <strong> Lead
                                                    Developer </strong>
                                                </p>
                                                <div className="dropdown ms-auto">

                                                    <a className="nav-link text-secondary mb-0" href="#"
                                                       id="aboutAction4" data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                        <i className="bi bi-three-dots"></i>
                                                    </a>

                                                    <ul className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="aboutAction4">
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-pencil-square fa-fw pe-2"></i>Edit</a></li>
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-trash fa-fw pe-2"></i>Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-geo-alt fa-fw me-2"></i> Lives
                                                    in: <strong> {otherAccount.address} </strong>
                                                </p>
                                                <div className="dropdown ms-auto">

                                                    <a className="nav-link text-secondary mb-0" href="#"
                                                       id="aboutAction5" data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                        <i className="bi bi-three-dots"></i>
                                                    </a>

                                                    <ul className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="aboutAction5">
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-pencil-square fa-fw pe-2"></i>Edit</a></li>
                                                        <li><a className="dropdown-item" href="#"> <i
                                                            className="bi bi-trash fa-fw pe-2"></i>Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <div className="row g-4">


                                <div className="col-sm-6 col-lg-12">
                                    <div className="card">
                                        <div className="card-header border-0 pb-0">
                                            <h5 className="card-title">{otherAccount.name}</h5>

                                        </div>

                                        <div className="card-body position-relative pt-0">
                                            <p>Có rất nhiều việc tựa như gió thoảng mây bay. Chỉ cần trân trọng những gì
                                                mình đang có, chúng ta mới không phải nuối tiếc trong cuộc sống. – Đừng
                                                lựa chọn an nhàn khi còn trẻ</p>
                                            <ul className="list-unstyled mt-3 mb-0">
                                                <li className="mb-2"><i className="bi bi-calendar-date fa-fw pe-1"></i> Born: <strong> {otherAccount.birthday} </strong>
                                                </li>
                                                <li className="mb-2"><i className="bi bi-heart fa-fw pe-1"></i> German: <strong> {otherAccount.german} </strong>
                                                </li>
                                                <li><i className="bi bi-geo-alt fa-fw me-2"></i>Address: <strong> {otherAccount.address} </strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-12">
                                    <div className="card">

                                        <div
                                            className="card-header d-sm-flex justify-content-between align-items-center border-0">
                                            <h5 className="card-title">Friends</h5>
                                        </div>

                                        <div className="card-body position-relative pt-0">
                                            <div className="row g-3">

                                                {friends !== undefined && friends.map(it=>(
                                                    <div className="col-6">

                                                        <div className="card shadow-none text-center h-100">

                                                            <div className="card-body p-2 pb-0">
                                                                <div className="avatar avatar-story avatar-xl">
                                                                    <a href="#!"><img
                                                                        className="avatar-img rounded-circle"
                                                                        src={it.avatar}
                                                                        alt=""/></a>
                                                                </div>
                                                                <h6 className="card-title mb-1 mt-3"><Link
                                                                    to={`/home/timeLine/${it.idAccount}`}> {it.name}</Link></h6>
                                                            </div>

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
                </div>


            </main>
        </>
    )
}

export default About;

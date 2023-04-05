import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteFriend, getFriends} from "../services/FriendService";


const MyAbout = () => {


    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const friends = useSelector(state => {
        return state.friends.friends
    })

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getFriends(account.idAccount))
    }, [])

    return (
        <>

                <main>

                <div className="container">
                    <div className="row g-4">


                        <div className="col-lg-8 vstack gap-4">

                            <div className="card">
                                <div className="h-200px rounded-top"
                                     style={{
                                         backgroundImage: "url(/assets/images/building-6822998.jpg)",
                                         backgroundPosition: "center",
                                         backgroundSize: "cover",
                                         backgroundRepeat: "no-repeat"
                                     }}></div>

                                <div className="card-body py-0">
                                    <div className="d-sm-flex align-items-start text-center text-sm-start">
                                        <div>

                                            <div className="avatar avatar-xxl mt-n5 mb-3">
                                                <img className="avatar-img rounded-circle border border-white border-3"
                                                     src={account.avatar} alt=""/>
                                            </div>
                                        </div>
                                        <div className="ms-sm-4 mt-sm-3">

                                            <h1 className="mb-0 h5">{account.name} <i
                                                className="bi bi-patch-check-fill text-success small"></i></h1>
                                            <p>250 connections</p>
                                        </div>

                                        <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                                            <div className="dropdown">
                                                <button className="icon-md btn btn-light" type="button"
                                                        id="profileAction2" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="profileAction2">
                                                    <li><Link className="dropdown-item" to={`/home/settings`}> <i
                                                        className="bi bi-lock fa-fw pe-2"></i>Setting Account</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                                        <li className="list-inline-item"><i className="bi bi-geo-alt fa-fw me-2"></i>{account.address}
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-footer mt-3 pt-2 pb-0">

                                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                                        <li className="nav-item"><Link className="nav-link"
                                                                       to={"/home/myTimeLine"}> Posts </Link></li>
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
                                            <h6>{account.name}</h6>
                                        </div>
                                        <p>Thích màu hồng.</p>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-sm-6 py-2">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-calendar-date fa-fw me-2"></i> Born: <strong> {account.birthday} </strong>
                                                </p>
                                            </div>

                                        </div>
                                        <div className="col-sm-6 py-2">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-heart fa-fw me-2"></i> German: <strong> {account.german} </strong>
                                                </p>
                                            </div>

                                        </div>
                                        <div className="col-sm-6 py-2">

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-briefcase fa-fw me-2"></i> <strong> Lead
                                                    Developer </strong>
                                                </p>
                                            </div>

                                        </div>
                                        <div className="col-sm-6 py-2" >

                                            <div className="d-flex align-items-center rounded border px-3 py-2">

                                                <p className="mb-0">
                                                    <i className="bi bi-geo-alt fa-fw me-2"></i> Lives
                                                    in: <strong> {account.address} </strong>
                                                </p>
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
                                            <h5 className="card-title">{account.name}</h5>

                                        </div>

                                        <div className="card-body position-relative pt-0">
                                            <p>Có rất nhiều việc tựa như gió thoảng mây bay. Chỉ cần trân trọng những gì
                                                mình đang có, chúng ta mới không phải nuối tiếc trong cuộc sống. – Đừng
                                                lựa chọn an nhàn khi còn trẻ</p>
                                            <ul className="list-unstyled mt-3 mb-0">
                                                <li className="mb-2"><i className="bi bi-calendar-date fa-fw pe-1"></i> Born: <strong> {account.birthday} </strong>
                                                </li>
                                                <li className="mb-2"><i className="bi bi-heart fa-fw pe-1"></i> German: <strong> {account.german} </strong>
                                                </li>
                                                <li><i className="bi bi-geo-alt fa-fw me-2"></i>Address: <strong> {account.address} </strong>
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

export default MyAbout;

import {Link, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findByIdAccount} from "../services/PostService";
import {searchOtherAccount} from "../services/AccountService";
import {addFriend, checkFriend, confirmFriend, deleteFriend, getFriends} from "../services/FriendService";
import {addNotification} from "../services/NotificationService";
import Post from "../component/Post";
import {socket} from "../services/socketService";

const TimeLine = () => {

    const {idAccount} = useParams();

    const posts = useSelector(state => {
        return state.posts.posts
    });

    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const otherAccount = useSelector(state => {
        return state.account.otherAccount
    })

    const friend = useSelector(state => {
        return state.friends.friend
    })

    const friends = useSelector(state => {
        return state.friends.friends
    })

    const dispatch = useDispatch();

    const handleAddFriend = async ()=>{
        let values = {idSender:account.idAccount,idReceiver:idAccount,status:"Friend Request"};
        socket.emit("friendRequest", values)
    }

    const handleDeleteFriend = async (idSent) => {
        let data = {idSender:idSent,idReceiver:account.idAccount};
        dispatch(deleteFriend(data));
    }

    const handleConfirmFriend = async (id)=>{
        dispatch(confirmFriend(id));
        let values = {idSender:account.idAccount,idReceiver:idAccount,status:"Friend Confirm"};
        dispatch(addNotification(values));

    }

    useEffect(() => {
        dispatch(findByIdAccount(idAccount));
        dispatch(searchOtherAccount(idAccount));
        let data = {thisId:account.idAccount,thatId:idAccount};
        dispatch(checkFriend(data));
        dispatch(getFriends(idAccount))
        socket.on("friendRequestSuccess", ()=>{
            dispatch(checkFriend(data));
        })
    }, [])

    return (
        <>
            <main>
                <div className="container">
                    <div className="row g-4">


                        <div className="col-lg-8 vstack gap-4">

                            <div className="card">

                                <div className="h-200px rounded-top" style={{
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

                                        </div>

                                    </div>

                                    <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">

                                        <li className="list-inline-item"><i
                                            className="bi bi-geo-alt me-1"></i> {otherAccount.address}</li>
                                        {otherAccount.idAccount !== account.idAccount &&
                                            <>
                                                {console.log(friend)}
                                                {friend === "Add Friend" && <span as={"button"} className="badge bg-primary" onClick={()=>{handleAddFriend()}}>Add Friend</span>}
                                                {friend.status === "Friends" &&
                                                    <>
                                                        <span as={"button"} className="badge bg-primary">Friends</span>
                                                        <span as={"button"} className="badge bg-primary bg-opacity-10 text-secondary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}> Unfriend </span>
                                                    </>}
                                                {friend.status === "Cancel Request" && <span as={"button"} className="badge bg-primary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}>Cancel Request</span>}
                                                {friend.status === "Confirm" &&
                                                    <>
                                                        <span as={"button"} className="badge bg-primary" onClick={()=>{handleConfirmFriend(friend.friend.id)}}>Confirm</span>
                                                        <span as={"button"} className="badge bg-primary bg-opacity-10 text-secondary" onClick={()=>{handleDeleteFriend(friend.friend.id)}}> Delete </span>
                                                    </>}
                                            </>

                                        }

                                    </ul>
                                </div>

                                <div className="card-footer mt-3 pt-2 pb-0">

                                    <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                                        <li className="nav-item"><Link className="nav-link active" to={""}> Posts </Link></li>
                                        <li className="nav-item"><Link className="nav-link" to={`/home/about/${idAccount}`}> About </Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to={`/messages?senderId=${account.idAccount}&receiverId=${otherAccount.idAccount}`}> Message </Link></li>
                                    </ul>
                                </div>
                            </div>


                            {posts !== undefined && posts.map(it => (
                                <Post it={it}/>
                            ))}

                        </div>

                        <div className="col-lg-4">

                            <div className="row g-4">


                                <div className="col-md-6 col-lg-12">
                                    <div className="card">
                                        <div className="card-header border-0 pb-0">
                                            <h5 className="card-title">{otherAccount.name}</h5>

                                        </div>

                                        <div className="card-body position-relative pt-0">
                                            <p>Có rất nhiều việc tựa như gió thoảng mây bay. Chỉ cần trân trọng những gì
                                                mình đang có, chúng ta mới không phải nuối tiếc trong cuộc sống. – Đừng
                                                lựa chọn an nhàn khi còn trẻ</p>

                                            <ul className="list-unstyled mt-3 mb-0">
                                                <li className="mb-2"><i
                                                    className="bi bi-calendar-date fa-fw pe-1"></i> Born: <strong> {otherAccount.birthday} </strong>
                                                </li>
                                                <li className="mb-2"><i
                                                    className="bi bi-heart fa-fw pe-1"></i> German: <strong> {otherAccount.german} </strong>
                                                </li>
                                                <li><i
                                                    className="bi bi-geo-alt me-1"></i> Address: <strong> {otherAccount.address} </strong>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-12">
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
                                                                    to={`/home/timeLine/${it.idAccount}`} onClick={()=>{
                                                                    dispatch(findByIdAccount(it.idAccount));
                                                                    dispatch(searchOtherAccount(it.idAccount));
                                                                    let data = {thisId:account.idAccount,thatId:it.idAccount};
                                                                    dispatch(checkFriend(data));
                                                                    dispatch(getFriends(it.idAccount))
                                                                }}> {it.name}</Link></h6>
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

            <div className="modal fade" id="modalCreateFeed" tabindex="-1" aria-labelledby="modalLabelCreateFeed"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabelCreateFeed">Create post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                        </div>

                        <div className="modal-footer row justify-content-between">

                            <div className="col-lg-3">
                                <select className="form-select js-choice" data-position="top" data-search-enabled="false">
                                    <option value="PB">Public</option>
                                    <option value="PV">Friends</option>
                                    <option value="PV">Only me</option>
                                    <option value="PV">Custom</option>
                                </select>
                            </div>

                            <div className="col-lg-8 text-sm-end">
                                <button type="button" className="btn btn-danger-soft me-2"><i
                                    className="bi bi-image-fill text-success pe-2"></i>Photo
                                </button>
                                <button type="button" className="btn btn-success-soft">Post</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="feedActionPhoto" tabindex="-1" aria-labelledby="feedActionPhotoLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="feedActionPhotoLabel">Add post photo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            <div className="d-flex mb-3">

                                <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt=""/>
                                </div>

                                <form className="w-100">
                                    <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows="2"
                                              placeholder="Share your thoughts..."></textarea>
                                </form>
                            </div>


                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div className="dropzone dropzone-default card shadow-none" data-dropzone='{"maxFiles":2}'>
                                    <div className="dz-message">
                                        <i className="bi bi-images display-3"></i>
                                        <p>Drag here or click to upload photo.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer ">

                            <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal">Cancel
                            </button>
                            <button type="button" className="btn btn-success-soft">Post</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="feedActionVideo" tabindex="-1" aria-labelledby="feedActionVideoLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="feedActionVideoLabel">Add post video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            <div className="d-flex mb-3">

                                <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt=""/>
                                </div>

                                <form className="w-100">
                                    <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows="2"
                                              placeholder="Share your thoughts..."></textarea>
                                </form>
                            </div>


                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div className="dropzone dropzone-default card shadow-none" data-dropzone='{"maxFiles":2}'>
                                    <div className="dz-message">
                                        <i className="bi bi-camera-reels display-3"></i>
                                        <p>Drag here or click to upload video.</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-danger-soft me-2"><i
                                className="bi bi-camera-video-fill pe-1"></i> Live video
                            </button>
                            <button type="button" className="btn btn-success-soft">Post</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalCreateEvents" tabindex="-1" aria-labelledby="modalLabelCreateAlbum"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabelCreateAlbum">Create event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            <form className="row g-4">

                                <div className="col-12">
                                    <label className="form-label">Title</label>
                                    <input type="email" className="form-control" placeholder="Event name here"/>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="2"
                                              placeholder="Ex: topics, schedule, etc."></textarea>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Date</label>
                                    <input type="text" className="form-control flatpickr" placeholder="Select date"/>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Time</label>
                                    <input type="text" className="form-control flatpickr" data-enableTime="true"
                                           data-noCalendar="true" placeholder="Select time"/>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Duration</label>
                                    <input type="email" className="form-control" placeholder="1hr 23m"/>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Location</label>
                                    <input type="email" className="form-control" placeholder="Logansport, IN 46947"/>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Add guests</label>
                                    <input type="email" className="form-control" placeholder="Guest email"/>
                                </div>

                                <div className="col-12 mt-3">
                                    <ul className="avatar-group list-unstyled align-items-center mb-0">
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/06.jpg"
                                                 alt="avatar"/>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg"
                                                 alt="avatar"/>/
                                        </li>
                                        <li className="ms-3">
                                            <small> +50 </small>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <label className="form-label">Upload attachment</label>
                                    <div className="dropzone dropzone-default card shadow-none"
                                         data-dropzone='{"maxFiles":2}'>
                                        <div className="dz-message">
                                            <i className="bi bi-file-earmark-text display-3"></i>
                                            <p>Drop presentation and document here or click to upload.</p>
                                        </div>
                                    </div>
                                </div>

                            </form>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel
                            </button>
                            <button type="button" className="btn btn-success-soft">Create now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeLine;

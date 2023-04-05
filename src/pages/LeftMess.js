import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getListMessage, getMessage} from "../services/MessageService";


const LeftMess = () => {
    const navigate = useNavigate();
    const list = useSelector(state => {
        return state.message.list
    })
    const dispatch = useDispatch()
    const account = useSelector(state => {
        return state.account.currentAccount
    })
    useEffect(() => {
        dispatch(getListMessage(account.idAccount))
    }, [])
    return (
        <>
            <div className="col-lg-4 col-xxl-3" id="chatTabs" role="tablist">
                <div className="d-flex align-items-center mb-4 d-lg-none">
                    <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <i className="btn btn-primary fw-bold fa-solid fa-sliders"></i>
                        <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
                    </button>
                </div>
                <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0">
                    <div className=" d-flex justify-content-between align-items-center">
                        <h1 className="h5 mb-0">Active chats <span
                            className="badge bg-success bg-opacity-10 text-success"></span></h1>
                        <div className="dropend position-relative">
                            <div className="nav">
                                <a className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn"
                                   data-target="chatToast" href="#"> <i className="bi bi-pencil-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-light navbar-expand-lg mx-0">
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close text-reset ms-auto"
                                    data-bs-dismiss="offcanvas"></button>
                        </div>

                        <div className="offcanvas-body p-0">
                            <div
                                className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
                                <form className="position-relative">
                                    <input className="form-control py-2" type="search"
                                           placeholder="Search for chats" aria-label="Search"/>
                                    <button
                                        className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                                        type="submit">
                                        <i className="bi bi-search fs-5"></i>
                                    </button>
                                </form>
                                {list !== undefined && list.map(it => (
                                    <>
                                        {it.idAccount !== account.idAccount ? <>
                                            <div className="mt-4 ">
                                                <div className="chat-tab-list custom-scrollbar">
                                                    <ul className="nav flex-column nav-pills nav-pills-soft">
                                                        <li data-bs-dismiss="offcanvas">
                                                            <a className="nav-link active text-start"
                                                               id="chat-1-tab" data-bs-toggle="pill"
                                                               role="tab">
                                                                <div className="d-flex">
                                                                    <div
                                                                        className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                                                        <img
                                                                            className="avatar-img rounded-circle"
                                                                            src={it.avatar}/>
                                                                    </div>
                                                                    <div className="flex-grow-1 d-block">
                                                                        <Link
                                                                            to={`/messages?senderId=${account.idAccount}&receiverId=${it.idAccount}`}>
                                                                            <h6 className="mb-0 mt-1" onClick={() => {
                                                                                navigate(`/messages?senderId=${account.idAccount}&receiverId=${it.idAccount}`)
                                                                            }
                                                                            }>{it.name}</h6>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </> : <></>}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>


        </>

    )
}
export default LeftMess;

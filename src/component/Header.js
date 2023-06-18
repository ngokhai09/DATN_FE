import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../services/socketService";



import {
    checkNotification,
    editNotification,
    getNotifications,
} from "../services/NotificationService";
import {Field, Form, Formik, FormikProps} from "formik";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const account = useSelector((state) => {
        return state.account.currentAccount;
    });
    const notifications = useSelector((state) => {
        return state.notifications.notifications;
    });

    const check = useSelector((state) => {
        return state.notifications.check;
    });

    useEffect(() => {
        dispatch(getNotifications(account.idAccount));
        dispatch(checkNotification(account.idAccount));
    }, []);

    useEffect(() => {
        dispatch(getNotifications(account.idAccount));
        dispatch(checkNotification(account.idAccount));
        socket.on("sendNotification", (data)=>{
            console.log(2)
             dispatch(getNotifications(account.idAccount)).then(()=>{
                 dispatch(checkNotification(account.idAccount));
             });
        })


    }, []);
    return (
        <>
        <header className="navbar-light fixed-top header-static bg-mode">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img
                            className="light-mode-item navbar-brand-item"
                            src="/logo512.png"
                            alt="logo"
                        />
                        <img
                            className="dark-mode-item navbar-brand-item"
                            src="/logo512.png"
                            alt="logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler ms-auto icon-md btn btn-light p-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-animation"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                            <div className="nav-item w-100">
                                <Formik
                                    initialValues={{ search: ''}}
                                    onSubmit={(values, actions) => {
                                        navigate("/home")
                                        navigate(`search?keyword=${values.search}`)
                                    }}
                                >
                                    {() => (
                                        <Form>
                                            <Field
                                                className="form-control ps-5 bg-light"
                                                type="text"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                name="search"
                                            />

                                            <button
                                                className="btn bg-transparent px-2 py-0 position-absolute top-50 start-10 translate-middle-y"
                                                type="submit"
                                            >
                                                <i className="bi bi-search fs-5"> </i>
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            {/*    <form className="rounded position-relative">*/}

                            {/*        <Link to={"search"} >*/}

                            {/*        </Link>*/}
                            {/*</form>*/}
                        </div>
                    </div>
                </div>
                <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
                    <li className="nav-item ms-2">
                        <Link
                            to={`/chat`}
                            className="nav-link icon-md btn btn-light p-0"
                        >
                            <i className="bi bi-chat-left-text-fill fs-6"> </i>
                        </Link>
                    </li>
                    <li className="nav-item ms-2">
                        <Link
                            className="nav-link icon-md btn btn-light p-0"
                            to={"/home/settings/account"}
                        >
                            <i className="bi bi-gear-fill fs-6"> </i>
                        </Link>
                    </li>
                    <li className="nav-item dropdown ms-2">
                        <a
                            className="nav-link icon-md btn btn-light p-0"
                            href="#"
                            id="notifDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                        >
                            {check > 0 ? (
                                <span className="total-count">{check}</span>
                            ) : null}
                            <i
                                className="bi bi-bell-fill fs-6"
                                onClick={() => {
                                    dispatch(editNotification(account.idAccount));
                                }}
                            >
                                {" "}
                            </i>
                        </a>

                        <div
                            className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0"
                            aria-labelledby="notifDropdown"
                        >
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">
                                        Notifications{" "}
                                        <span className="badge bg-danger bg-opacity-10 text-danger ms-2"></span>
                                    </h6>
                                </div>
                                <div style={{overflow: "auto", height: "300px"}}>
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush list-unstyled p-2">
                                            {notifications !== undefined &&
                                                notifications.map((it) => (
                                                    <Link to={`/home/timeLine/${it.idAccount}`}>
                                                        <li>
                                                            <div
                                                                className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3 position-relative">
                                                                <div
                                                                    className="avatar text-center d-none d-sm-inline-block">
                                                                    <img
                                                                        className="avatar-img rounded-circle"
                                                                        src={it.avatar}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="ms-sm-3 d-flex">
                                                                    <div>
                                                                        {it.status === "Friend Request" && (
                                                                            <p className="small mb-2">
                                                                                {it.name} sent a friend request
                                                                            </p>
                                                                        )}
                                                                        {it.status === "Friend Confirm" && (
                                                                            <p className="small mb-2">
                                                                                {it.name} became friends
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </Link>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <a href="#" className="btn btn-sm btn-primary-soft">
                                        See all incoming activity
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item ms-2 dropdown">
                        <a
                            className="nav-link btn icon-md p-0"
                            href="#"
                            id="profileDropdown"
                            role="button"
                            data-bs-auto-close="outside"
                            data-bs-display="static"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                className="avatar-img rounded-2"
                                src={account.avatar}
                                alt=""
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                            aria-labelledby="profileDropdown"
                        >
                            <li className="px-3">
                                <div className="d-flex align-items-center position-relative">
                                    <div className="avatar me-3">
                                        <img
                                            className="avatar-img rounded-circle"
                                            src={account.avatar}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div>
                                        <Link
                                            className="h6 stretched-link"
                                            to={`/home/myTimeline`}
                                        >
                                            {account.name}
                                        </Link>
                                        <p className="small m-0">Web Developer</p>
                                    </div>
                                </div>
                                <Link
                                    className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center "
                                    to={`/home/myTimeline`}
                                >
                                    View profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={"/home/settings"}>
                                    <i className="bi bi-gear fa-fw me-2"></i>Settings &
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="https://support.webestica.com/"
                                    target="_blank"
                                >
                                    <i className="fa-fw bi bi-life-preserver me-2"></i>Support
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="docs/index.html"
                                    target="_blank"
                                >
                                    <i className="fa-fw bi bi-card-text me-2"></i>
                                    Documentation
                                </a>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                                <a
                                    className="dropdown-item bg-danger-soft-hover"
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate("/");
                                    }}
                                >
                                    <i className="bi bi-power fa-fw me-2"></i>Sign Out
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <div className="modeswitch-wrap" id="darkModeSwitch">
                                    <div className="modeswitch-item">
                                        <div className="modeswitch-icon"></div>
                                    </div>
                                    <span>Dark mode</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        </header>
</>
)
    ;
};
export default Header;

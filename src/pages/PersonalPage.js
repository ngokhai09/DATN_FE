import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {changePassword, searchOtherAccount} from "../services/AccountService";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";

const PersonalPage = () => {
    const {idAccount} = useParams();
    const [check, setCheck] = useState(false);
    const [timeLine, setTimeLine] = useState('active');
    const [about, setAbout] = useState('');

    const account = useSelector(state => {
        return state.account.currentAccount
    })
    const otherAccount = useSelector(state => {
        return state.account.otherAccount
    })

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(searchOtherAccount(idAccount))
    }, [])


    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required(<p style={{color: "red", marginTop: -15}}>Please enter password.</p>)
            .min(6, <p style={{color: "red", marginTop: -15}}>Passwords must be at least 6 characters</p>)
            .max(32, <p style={{color: "red", marginTop: -15}}>Password must be at most 14 characters</p>),
        repeatPassword: Yup.string()
            .required(<p style={{color: "red", marginTop: -15}}>Please re-enter your password.</p>)
    });

    return (<>
            <section style={{marginTop: 50}}>
                <div className="gap2 gray-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row merged20" id="page-contents">

                                    <div className="user-profile">
                                        <figure>
                                            <div className="edit-pp">
                                                <label className="fileContainer">
                                                    <i className="fa fa-camera"></i>
                                                    <input type="file"/>
                                                </label>
                                            </div>
                                            <img src="/images/resources/profile-image.jpg" alt=""/>
                                            <ul className="profile-controls">
                                                <li><a href="#" title="Add friend" data-toggle="tooltip"><i
                                                    className="fa fa-user-plus"></i></a></li>
                                                <li><a href="#" title="Follow" data-toggle="tooltip"><i
                                                    className="fa fa-star"></i></a></li>
                                                <li><a className="send-mesg" href="#" title="Send Message"
                                                       data-toggle="tooltip"><i className="fa fa-comment"></i></a>
                                                </li>
                                                <li>
                                                    <div className="edit-seting" title="Edit Profile image"><i
                                                        className="fa fa-sliders"></i>
                                                        <ul className="more-dropdown">
                                                            <li><a href="setting.html" title="">Update Profile
                                                                Photo</a></li>
                                                            <li><a href="setting.html" title="">Update Header
                                                                Photo</a></li>
                                                            <li><a href="support-and-help.html" title="">Find
                                                                Support</a></li>
                                                            <li><a className="bad-report" href="#" title="">Report
                                                                Profile</a></li>
                                                            <li><a href="#" title="">Block Profile</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ol className="pit-rate">
                                                <li className="rated"><i className="fa fa-star"></i></li>
                                                <li className="rated"><i className="fa fa-star"></i></li>
                                                <li className="rated"><i className="fa fa-star"></i></li>
                                                <li className="rated"><i className="fa fa-star"></i></li>
                                                <li className=""><i className="fa fa-star"></i></li>
                                                <li><span>4.7/5</span></li>
                                            </ol>
                                        </figure>
                                        <div className="profile-section">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3">
                                                    <div className="profile-author">
                                                        <div className="profile-author-thumb">
                                                            <img alt="author" src={otherAccount.avatar}/>

                                                            <div className="edit-dp">
                                                                <label className="fileContainer">
                                                                    <i className="fa fa-camera"></i>
                                                                    <input type="file"/>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="author-content">
                                                            <a className="h4 author-name">{otherAccount.name}</a>
                                                            <div className="country">{account.address}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-10 col-md-9">
                                                    <ul className="profile-menu">
                                                        <li>
                                                            <Link className={timeLine}
                                                                  to={`/home/PersonalPage/MyTimeLine/${idAccount}`}
                                                                  onClick={() => {
                                                                      setTimeLine('active')
                                                                      setAbout('')
                                                                  }}>Timeline</Link>
                                                        </li>
                                                        <li>
                                                            <Link className={about}
                                                                  to={`/home/PersonalPage/MyAbout/${idAccount}`}
                                                                  onClick={() => {
                                                                      setTimeLine('')
                                                                      setAbout('active')
                                                                  }}>About</Link>
                                                        </li>
                                                        <li>
                                                            <a className="" href="timeline-friends.html">Friends</a>
                                                        </li>
                                                        <li>
                                                            <a className="" href="timeline-photos.html">Photos</a>
                                                        </li>
                                                        <li>
                                                            <a className="" href="timeline-videos.html">Videos</a>
                                                        </li>
                                                        <li>
                                                            {account.idAccount == idAccount && <div className="more">
                                                                <i className="fa fa-ellipsis-h"></i>
                                                                <ul className="more-dropdown">
                                                                    <li>
                                                                        <a as={'i'} onClick={() => {
                                                                            setCheck(true)
                                                                        }}>Account Settings</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="statistics.html">Profile
                                                                            Analytics</a>
                                                                    </li>
                                                                </ul>
                                                            </div>}

                                                        </li>
                                                    </ul>
                                                    <ol className="folw-detail">
                                                        <li><span>Posts</span>
                                                            <ins>101</ins>
                                                        </li>
                                                        <li><span>Followers</span>
                                                            <ins>1.3K</ins>
                                                        </li>
                                                        <li><span>Following</span>
                                                            <ins>22</ins>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*profile banner*/}

                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {check ? <>
                <Formik initialValues={{}}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            values.id = account.idAccount;
                            if (values.repeatPassword === values.newPassword) {
                                dispatch(changePassword(values)).then(() => {
                                    alert('Change password success!!')
                                    setCheck(false)
                                })
                            } else {
                                alert(' can not')
                            }
                        }}
                        enableReinitialize={true}>
                    <div className="popup-wraper active">
                        <div className="popup" style={{width: 400, height: 400, textAlignLast: "center"}}>
                                <span className="popup-closed" onClick={() => {
                                    setCheck(false)
                                }}><i className="ti-close"></i></span>
                            <div className="popup-meta">
                                <div className="popup-head">
                                    <h5>Change Password</h5>
                                </div>
                                <div className="forum-form">
                                    <div className="postbox">
                                        <div className="new-postbox">
                                            <Form>
                                                <div className="newpst-input">
                                                    <div>
                                                        <label>oldPassword</label>
                                                        <Field type="password" name={'oldPassword'}/>

                                                    </div>
                                                    <div>
                                                        <label>newPassword</label>
                                                        <Field type="password" name={'newPassword'}/>
                                                        <br/>
                                                        <alert>
                                                            <ErrorMessage name={"newPassword"}></ErrorMessage>
                                                        </alert>
                                                    </div>
                                                    <div>
                                                        <label>repeatPassword</label>
                                                        <Field type="password" name={'repeatPassword'}/>
                                                        <br/>
                                                        <alert>
                                                            <ErrorMessage name={"repeatPassword"}></ErrorMessage>
                                                        </alert>
                                                    </div>
                                                    <button className="post-btn" type="submit" data-ripple="">Edit
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Formik>
            </> : <>

            </>}

        </>

    )
}
export default PersonalPage;

import {Link, useNavigate} from "react-router-dom";
import DateTime from "./DateTime";
import DeletePost from "../pages/posts/DeletePost";
import {like, unLike} from "../services/LikeService";
import {likePost, likePostDetail, unlikePost, unlikePostDetail} from "../services/PostService";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import DeleteComment from "../pages/comments/DeleteComment";
import {addComment, findByIdComment} from "../services/CommentService";
import * as Yup from "yup";
import EditPost from "../pages/posts/EditPost";

function Post({it, isComment = false}) {
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentCount] = useState(0);
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const validationSchema = Yup.object().shape({
        content: Yup.string()
            .required("Please enter comments")
    });
    const findByC = async (values) => {
        await dispatch(findByIdComment(values)).then(() => {
        });
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Xử lý submit form ở đây
        }
    }
    const account = useSelector(state => {
        return state.account.currentAccount
    })
    useEffect(() => {
        axios.get("http://localhost:4000/comments/posts/" + it.idPost).then(data => {
            setCommentCount(data.data.length);
            if(isComment || data.data.length < 3){
                setComments([...data.data])
            }else{
                setComments([...data.data.splice(0, 2)])
            }

        })
    }, [it])
    const dispatch = useDispatch();
    const handleAddComment = (values) => {
        let data = {...values, post: it.idPost}
        dispatch(addComment(data)).then(() => {
            dispatch(findByIdComment(data)).then((comments) => {
                console.log(comments.payload)
                setComments(comments.payload)
            })
        })
    }
    const deleteComment =(id)=>{
        setComments(prevState => prevState.filter(item => item.idComment != id))
    }
    return (
        <>
            <EditPost id={it.idPost}/>

            <div className="card card-body">
            <div className="d-flex align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-story me-2">
                        <a href="#!"> <img className="avatar-img rounded-circle"
                                           src={it.account.avatar} alt=""/> </a>
                    </div>
                    <div>
                        <div className="nav nav-divider">
                            <h6 className="nav-item card-title mb-0">{it.account.idAccount !== account.idAccount ?
                                <Link
                                    to={`/Home/timeLine/${it.account.idAccount}`}> {it.account.name} </Link> :
                                <Link to={`/Home/myTimeLine`}> {it.account.name} </Link>
                            }</h6>
                            <span className="nav-item small"> <DateTime date={it.time} /> </span>
                        </div>
                        {it.status === "Public" &&
                            <div className="nav nav-divider">
                                                        <span className="nav-item small"> <i
                                                            className="bi bi-globe"></i></span>
                            </div>}
                        {it.status === "Friends" &&
                            <div className="nav nav-divider">
                                                        <span className="nav-item small"> <i
                                                            className="bi bi-people"></i></span>
                            </div>}
                        {it.status === "Onlyme" &&
                            <div className="nav nav-divider">
                                <span className="nav-item small"> <i className="bi bi-lock"></i></span>
                            </div>}
                    </div>
                </div>
                {it.account.idAccount == localStorage.getItem("isAccount") ? <>
                    <div className="dropdown">
                        <a href="#"
                           className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                           id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-three-dots"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardFeedAction">
                            <li className="nav-item">
                                <a className="nav-link  py-1 px-4 mb-0"
                                   data-bs-toggle="modal"
                                   data-bs-target="#feedActionVideo"> <i
                                    className="bi bi-pencil-fill pe-1"></i> Edit </a>
                            </li>
                            <li>
                                <DeletePost id={it.idPost}/>
                            </li>

                        </ul>
                    </div>
                </> : <> </>}
            </div>
            <p>{it.content}</p>
            <div>
                {it.image && <img className="card-img rounded" src={it.image[0]?.url} alt=""/>}
            </div>

            <ul className="nav nav-stack flex-wrap small mb-3">
                {it.isLike == 2 ?
                    <li className="nav-item">
                        <a as={'button'} className="nav-link active"> <i
                            className="bi bi-hand-thumbs-up-fill pe-1" onClick={() => {
                            dispatch(unLike({post: it.idPost, account: account.idAccount}))
                                .then(() => {
                                        dispatch(unlikePostDetail(it))
                                    }
                                )
                        }}></i> {it.like !== undefined && it.like.length}</a>
                    </li> :
                    <li className="nav-item">
                        <a as={'button'} className="nav-link"> <i
                            className="bi bi-hand-thumbs-up-fill pe-1" onClick={() => {
                            dispatch(like({post: it.idPost, account: account.idAccount}))
                                .then(() => {
                                    dispatch(likePostDetail(it))
                                })
                        }}></i> {it.like !== undefined && it.like.length}</a>
                    </li>
                }
                <li className="nav-item">
                    <Link to={`/${it.idPost}`} className="nav-link" > <i
                        className="bi bi-chat-fill pe-1"></i>{commentsCount} Comment</Link>
                </li>

            </ul>

            {isComment &&<div className="d-flex mb-3">
                <div className="avatar avatar-xs me-2">
                    <a href="#!"> <img className="avatar-img rounded-circle"
                                       src={account.avatar} alt=""/> </a>
                </div>
                 <Formik initialValues={{content: ""}}
                        onSubmit={(values) => {
                            values.account = account.idAccount
                            handleAddComment(values)
                            document.getElementById('add-form1').reset();
                            setUrls([])

                        }
                        } validationSchema={validationSchema}>
                    <Form className="w-100" id='add-form1'>
                        <Field data-autoresize className="form-control pe-4 bg-light" rows="1"
                               type={'text'} name={'content'}
                               placeholder="Add a comment..." onKeyDown={handleKeyDown}></Field>
                        <ErrorMessage name={'content'}/>
                    </Form>
                </Formik>
            </div>}

            {comments !== undefined && comments.map((it, index) => (
                <>
                    <ul className="comment-wrap list-unstyled">
                        <li className="comment-item">

                            <div className="d-flex position-relative">
                                <div className="avatar avatar-xs">
                                    <a href="#!"><img className="avatar-img rounded-circle"
                                                      src={it.account.avatar} alt=""/></a>
                                </div>
                                <div className="ms-2">
                                    <div className="bg-light rounded-start-top-0 p-3 rounded">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-1"><Link
                                                to={account.idAccount == it.account.idAccount? "myTimeline":`timeLine/${it.account.idAccount}`}> {it.account.name} </Link>
                                            </h6>
                                        </div>
                                        <p className="small mb-0">{it.content}  </p>
                                    </div>
                                    <a className="nav-link"> <DateTime date={it.time}/></a>
                                </div>
                                <ul className="nav nav-divider py-2 small">
                                    <li className="nav-item">
                                        {it.account.idAccount == localStorage.getItem("isAccount") ? <>
                                            <div className="dropdown">
                                                <a href="#"
                                                   className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                                                   id="cardFeedAction" data-bs-toggle="dropdown"
                                                   aria-expanded="false">
                                                    <i className="bi bi-three-dots"></i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="cardFeedAction">
                                                    <li className="nav-item">
                                                        <a onClick={() => {
                                                            findByC(it.idComment)
                                                        }}
                                                           className="nav-link  py-1 px-4 mb-0"
                                                           data-bs-toggle="modal"
                                                           data-bs-target="#modalCreateEvents"><i
                                                            className="bi bi-pencil-fill text-primary ">
                                                        </i> Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <DeleteComment comments={deleteComment} id={it.idComment}/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </> : <> </>}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </>
            ))}
            <ul className="nav nav-stack flex-wrap small mb-3">
            </ul>
        </div>
        </>
    )
}

export default Post;
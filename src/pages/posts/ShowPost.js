import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPosts, likePost, unlikePost} from "../../services/PostService";
import DeletePost from "./DeletePost";
import {Link} from "react-router-dom";
import {like, unLike} from "../../services/LikeService";

const ShowPost = () => {

    const posts = useSelector(state => {
        return state.posts.posts
    });

    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    return (
        <>
            {posts !== undefined && posts.map((it, index) =>
                <>
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="avatar avatar-story me-2">
                                        <img className="avatar-img rounded-circle" src={it.account.avatar}
                                             alt=""/>
                                    </div>
                                    <div>
                                        <div className="nav nav-divider">
                                            <h6 className="nav-item card-title mb-0">
                                                {it.account.idAccount !== account.idAccount ?
                                                    <Link
                                                        to={`/Home/timeLine/${it.account.idAccount}`}> {it.account.name} </Link> :
                                                    <Link to={`/Home/myTimeLine`}> {it.account.name} </Link>
                                                }
                                            </h6>
                                            <span className="nav-item small"> {it.time}</span>
                                        </div>
                                        {it.status === "Public" &&
                                            <div className="nav nav-divider">
                                                <span className="nav-item small"> <i className="bi bi-globe"></i></span>
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
                            {it.account.idAccount == localStorage.getItem('isAccount') ? <>
                                <div className="dropdown">
                                    <a
                                        className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                                        id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="cardFeedAction">

                                        <li><Link to={`/${it.idPost}`} className="dropdown-item" > <i
                                            className="bi bi-pencil-square fa-fw pe-2"></i>Edit</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <DeletePost id={it.idPost}></DeletePost>
                                    </ul>

                                </div>
                            </> : <></>}
                        </div>
                    </div>
                    <div className="card-body">
                        <p>{it.content}</p>
                        {it.image != 1 ? <>
                            <Link to={`/${it.idPost}`}> <img src={it.image} style={{width : "550px", height : "500px", borderRadius:10}} alt="#"/> </Link>
                        </> : <></>}

                            <ul className="nav nav-stack py-3 small">
                                {it.isLike == 2 ?
                                    <li className="nav-item">
                                        <a as={'button'} className="nav-link active"> <i
                                            className="bi bi-hand-thumbs-up-fill pe-1" onClick={() => {
                                            dispatch(unLike({post: it.idPost, account: account.idAccount}))
                                                .then(() => {
                                                    dispatch(unlikePost(it));
                                                    }
                                                )
                                        }}></i> {it.like !== undefined && it.like.length}</a>
                                    </li> :
                                    <li className="nav-item">
                                        <a as={'button'} className="nav-link"> <i
                                            className="bi bi-hand-thumbs-up-fill pe-1" onClick={() => {
                                            dispatch(like({post: it.idPost, account: account.idAccount}))
                                                .then(() => {
                                                    dispatch(likePost(it));
                                                })
                                        }}></i> {it.like !== undefined && it.like.length}</a>
                                    </li>
                                }

                                <li className="nav-item">
                                    <Link to={`/${it.idPost}`}><a className="nav-link" href="#!"> <i
                                        className="bi bi-chat-fill pe-1"></i>{it.comment != undefined && it.comment.length} Comments</a></Link>
                                </li>
                            </ul>
                            {it.comment != undefined && it.comment.slice(-2).reverse().map(itc => <>
                                <ul className="comment-wrap list-unstyled">
                                    <li className="comment-item">
                                        <div className="d-flex position-relative">
                                            <div className="avatar avatar-xs">
                                                <a href="#!"><img className="avatar-img rounded-circle"
                                                                  src={itc.account !== undefined && itc.account.avatar} alt=""/></a>
                                            </div>
                                            <div className="ms-2">
                                                <div className="bg-light rounded-start-top-0 p-3 rounded">
                                                    <div className="d-flex justify-content-between">
                                                        <h6 className="mb-1"><a href="#!"> {itc.account !== undefined && itc.account.name} </a></h6>

                                                    </div>
                                                    <p className="small mb-0">{itc.account !== undefined && itc.content}</p>
                                                </div>
                                                <small className="ms-2">{itc.account !== undefined && itc.time}</small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </>)}

                        </div>
                    </div>
                </>)}
        </>)
}
export default ShowPost;

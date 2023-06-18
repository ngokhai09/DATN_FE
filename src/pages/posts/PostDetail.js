import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    findByIdPost,
    getPosts,
    likePostDetail,
    unlikePostDetail
} from "../../services/PostService";
import {useDispatch, useSelector} from "react-redux";
import EditPost from "./EditPost";
import Header from "../../component/Header";
import DeletePost from "./DeletePost";
import {addComment, editComment, findByIdComment, findByIdPostComment} from "../../services/CommentService";
import DeleteComment from "../comments/DeleteComment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {like, unLike} from "../../services/LikeService";
import DateTime from "../../component/DateTime";
import Post from "../../component/Post";

const PostDetail = () => {
    let {idPost} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPost = useSelector(state => {
        return state.currentPost.currentPost
    })

    const account = useSelector(state => {
        return state.account.currentAccount
    })
    const comments = useSelector(state => {
        return state.comments.comments
    })
    const handleAddComment = (values) => {
        let data = {...values, post: currentPost.idPost}
        dispatch(addComment(data)).then(() => {
            dispatch(findByIdComment(data)).then(() => {
                navigate('')
            })
        })
    }

    const currentComment = useSelector(state => {
        return state.currentComment.currentComment
    })

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Xử lý submit form ở đây
        }
    }
    const findByC = async (values) => {
        await dispatch(findByIdComment(values)).then(() => {
        });
    }
    const handleEditComment = async (values) => {
        let data = {...values}
        await dispatch(editComment(data)).then(() => {
            navigate('')
        })
    }
    const validationSchema = Yup.object().shape({
        content: Yup.string()
            .required("Please enter comments")
    });

    const [urls, setUrls] = useState([]);
    useEffect(() => {
        dispatch(getPosts()).then(()=>{
            dispatch(findByIdPost(idPost))
        })
        dispatch(findByIdPostComment(idPost))
    }, [])
    return (
        <>
            <Header/>
            <main>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                {currentPost.idPost && <Post it={currentPost} isComment={true}></Post> }
                            </div>
                        </div>
                    </div>
                </div>



            </main>

        </>

    )
}
export default PostDetail;

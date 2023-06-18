import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPosts, likePost, unlikePost} from "../../services/PostService";
import DeletePost from "./DeletePost";
import {Link} from "react-router-dom";
import {like, unLike} from "../../services/LikeService";
import DateTime from "../../component/DateTime";
import Post from "../../component/Post";

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
                    <Post it={it}/>
                </>)}
        </>)
}
export default ShowPost;

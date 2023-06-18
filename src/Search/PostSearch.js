import Avatar from "react-avatar-edit";
import {useEffect, useState} from "react";
import React from "react";
import Post from "../component/Post";
import {useDispatch, useSelector} from "react-redux";
import {findByContent} from "../services/PostService";
import {useSearchParams} from "react-router-dom";

function PostSearch() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams()
    let [posts, setPosts] = useState([])
    useEffect(() => {
        dispatch(findByContent(searchParams.get("keyword"))).then(data => {
            console.log(data.payload)
            setPosts(data.payload)
        })
    }, [searchParams])


    return (
        <div className={"card"}>
            {posts?.length > 0 && posts.map(post => (
                <Post it={post}/>)
            )}
        </div>
    );
}

export default PostSearch;
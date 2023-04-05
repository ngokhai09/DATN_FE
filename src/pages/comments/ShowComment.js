import ShowPost from "../posts/ShowPost";
import React, {useEffect} from "react";
import {getComment} from "../../services/CommentService";
import {useDispatch, useSelector} from "react-redux";
const ShowComment = () => {
    const dispatch = useDispatch();
    const comments = useSelector(state => {
        console.log(state.comments.comments,22)
        return state.comments.comments
    });


    useEffect(() => {
        dispatch(getComment())
    }, [])
    return(
        <>
            {
                <ul className="comment-wrap list-unstyled">
                    <li className="comment-item">
                        <div className="d-flex position-relative">
                            <div className="avatar avatar-xs">
                                <a href="#!"><img className="avatar-img rounded-circle"
                                                  src="" alt=""/></a>
                            </div>
                            <div className="ms-2">
                                <div className="bg-light rounded-start-top-0 p-3 rounded">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-1"><a href="#!"> Name </a></h6>

                                    </div>
                                    <p className="small mb-0">viet vao day</p>
                                </div>
                                <small className="ms-2">thoi gian</small>
                            </div>
                        </div>
                    </li>
                </ul>
        }


        </>
    )
}
export default ShowComment;
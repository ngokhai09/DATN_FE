import React from 'react';
import swal from "sweetalert";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteComment} from "../../services/CommentService";

const DeleteComment = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleDeleteComment = async () => {
        dispatch(deleteComment(props.id))
        navigate('')
    }
    return (
        <>
            <li>
                <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => {
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDeleteComment().then(() => {
                                    swal("Poof! Your imaginary file has been deleted!", {
                                        icon: "success",
                                    })
                                });
                            } else {
                                swal("Your imaginary file is safe!")
                            }
                        });
                }}> <i className="bi bi-trash3-fill" style={{color: "red"}}></i> Delete</a></li>
        </>

    )
}
export default DeleteComment;

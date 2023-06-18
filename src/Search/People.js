
import React, {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../services/socketService";
import {confirmFriend, deleteFriend} from "../services/FriendService";
import {addNotification} from "../services/NotificationService";
import {findByContent} from "../services/PostService";
import axios from "axios";

function People(){
    const {idAccount} = useParams();

    const posts = useSelector(state => {
        return state.posts.posts
    });

    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const otherAccount = useSelector(state => {
        return state.account.otherAccount
    })

    const friend = useSelector(state => {
        return state.friends.friend
    })

    const friends = useSelector(state => {
        return state.friends.friends
    })

    const dispatch = useDispatch();

    const handleAddFriend = async ()=>{
        let values = {idSender:account.idAccount,idReceiver:idAccount,status:"Friend Request"};
        socket.emit("friendRequest", values)
    }

    const [searchParams, setSearchParams] = useSearchParams()
    let [people, setPeople] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/accounts/findByName?search=${searchParams.get("keyword")}`).then(data => {
            setPeople(data.data)
        })
    }, [searchParams])
    const handleConfirmFriend = async (id)=>{
        dispatch(confirmFriend(id));
        let values = {idSender:id,idReceiver:account.idAccount,status:"Friend Confirm"};
        dispatch(addNotification(values));
        setPeople(prev=> prev.filter(item=> item.idAccount !== id))

    }
    const handleDeleteFriend = async (idSent) => {
        let data = {idSender:idSent,idReceiver:account.idAccount};
        dispatch(deleteFriend(data));
        setPeople(prev=> prev.filter(item=> item.idAccount !== idSent))

    }
    return (
        <div className={"row mt-3 mb-3 ml-1"}>
            {people.length > 0 && people.map((item)=>(
                <div className={"card col-3 mr-3"} >
                    <div className="card-body">
                        <div className="hstack gap-2 mb-3">
                            <div className="avatar">
                                <Link to={`/home/timeLine/${item.idAccount}`} > <img className="avatar-img rounded-circle"
                                                                                     src={item.avatar} alt=""/> </Link>
                            </div>
                            <div className="overflow-hidden">
                                <Link to={`/home/timeLine/${item.idAccount}`} className="h6 mb-0" >{item.name} </Link>
                                <button className={"btn "} style={{padding: "2px"}}><span
                                    className="badge bg-primary">Confirm</span>
                                </button>
                                <button className={"btn "} style={{padding: "2px"}}><span
                                    className="badge badge-danger"> Cancel </span>
                                </button>
                            </div>


                        </div>
                        <div className="d-grid mt-3">

                        </div>
                    </div>
                </div>
            ))}




        </div>

    );
}
export default People;
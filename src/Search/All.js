import Avatar from "react-avatar-edit";
import {useEffect, useState} from "react";
import React from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../services/fireBase";
import axios from "axios";
import {useDispatch} from "react-redux";
import {AccountsEdit} from "../services/AccountService";
import swal from "sweetalert";
import People from "./People";
import PostSearch from "./PostSearch";
import {useOutletContext, useSearchParams} from 'react-router-dom'
function All(){

    return (
        <div>
            <People/>
            <PostSearch/>
        </div>
    );
}
export default All;
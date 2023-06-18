import Avatar from "react-avatar-edit";
import {useEffect, useState} from "react";
import React from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../services/fireBase";
import axios from "axios";
import {useDispatch} from "react-redux";
import {AccountsEdit} from "../services/AccountService";
import swal from "sweetalert";

function AvatarProfile() {
    const [preview, setPreview] = useState(null);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const dispatch = useDispatch();
    let a = JSON.parse(localStorage.getItem("account"))
    delete a.token;
    const [account, setAccount] = useState(a)

    function onClose() {
        setImages("")
        setPreview(null);
    }

    function onCrop(pv) {
        urlToFile(pv, 'a.png')
            .then((file) => {
                file["id"] = Math.random();
                return setImages(file)
            });
    }

    function urlToFile(url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    return new File([buf], filename, {type: mimeType});
                })
        );
    }


    const [progress, setProgress] = useState(0);
    const handleUpload = async () => {
        const promises = [];
        if (images) {
            const storageRef = ref(storage, `images/${images}`);
            const uploadTask = uploadBytesResumable(storageRef, images);
            promises.push(uploadTask);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                    setUrls(prevState => [...prevState, downloadURLs])
                    setAccount(prev => ({...prev, avatar: downloadURLs}))
                    console.log("File available at", downloadURLs, account);
                });
            });
        }
        Promise.all(promises)
            .catch((err) => console.log(err));

    }

    const onSubmit = async () => {
        await handleUpload();

    }
    useEffect(() => {
        if (urls != "")
             dispatch(AccountsEdit(account)).then(() => {
                swal(`Update information`, {
                    icon: "success"
                })
            })
        onClose();
    }, [urls])


    return (
        <div className={"card"} style={{alignItems: "center"}}>
            <Avatar
                exportMimeType
                width={300}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                src={null}
            />
            <br/>
            <button className="btn btn-success-soft" style={{width: '100px'}} onClick={onSubmit}
                    type={'submit'} disabled={images == ""}>Save
            </button>
        </div>
    );
}

export default AvatarProfile;
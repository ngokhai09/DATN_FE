import React, {useEffect, useState} from 'react';
import {editPost, findByIdPost} from "../../services/PostService";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../services/fireBase";

const EditPost = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEditPost = (values) => {
        let data = {...values}
        console.log(data)
        dispatch(editPost(data)).then(() => {
            navigate('/home')
        })
    }
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState([]);
    const account = useSelector(state => {
        return state.account.currentAccount
    })
    const currentPost = useSelector(state => {
        return state.currentPost.currentPost
    })
    const handleChange = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }

    };
    useEffect(() => {
        dispatch(findByIdPost(props.id))
    }, [])
    useEffect(() => {
        handleUpload()
    }, [images])
    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on("state_changed", (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setUrls(prevState => [...prevState, downloadURLs])
                        console.log("File available at", downloadURLs);
                    });
                });
            });
        }
        Promise.all(promises)
            .then()
            .catch((err) => console.log(err));

    }

    return (<>
            <div className="modal fade" id="feedActionVideo" tabIndex="-1" aria-labelledby="feedActionVideoLabel"
                 aria-hidden="true">
                <Formik initialValues={{
                    content:currentPost.content
                }}
                        onSubmit={(values) => {
                            values.idPost = currentPost.idPost
                            values.account = currentPost.account.idAccount
                            values.image = urls[urls.length - 1]
                            handleEditPost(values)
                        }}
                        enableReinitialize={true}>
                    <Form id='add-form'>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="feedActionPhotoLabel">Edit post photo</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>

                                <div className="modal-body">

                                    <div className="d-flex mb-3">

                                        <div className="avatar avatar-xs me-2">
                                            <img className="avatar-img rounded-circle"
                                                 src={account.avatar}
                                                 alt=""/>
                                        </div>

                                        <Field className="form-control pe-4 fs-3 lh-1 border-0" rows="2" as={'textarea'}
                                               name={'content'}
                                               placeholder="Share your thoughts..."></Field>
                                    </div>
                                    {(currentPost && currentPost.image) ? <div className="image-container2">
                                        <img src={currentPost.image[0]?.url} style={{width: 400,height : 350}}/>

                                        <div className="close-button" data-bs-dismiss="modal"
                                             style={{color: '#cc0000', fontSize: "30px", position: "absolute", right: 86, top: 85, borderRadius: 1}}
                                             onClick={() => {
                                                 let newPost = {...currentPost};
                                                 newPost.image = "1"
                                                 dispatch(handleEditPost(newPost))
                                             }}>&times;</div>
                                    </div> : <></>}
                                    <div>
                                        <label className="form-label">Upload attachment</label>
                                        <div className="dropzone dropzone-default card shadow-none"
                                             data-dropzone='{"maxFiles":2}'>
                                            {urls.length === 0 ? <>
                                                <div className="dz-message"><input type="file" id="myFile"
                                                                                   name="myFile"
                                                                                   onChange={handleChange}/>
                                                    <label htmlFor="myFile" className="file-upload"><i
                                                        className="bi bi-images display-3"></i>
                                                        <p>Drag here or click to upload photo.</p></label>

                                                </div>
                                            </> : <>
                                                <div className="dz-message"><input type="file" id="myFile"
                                                                                   name="myFile"
                                                                                   onChange={handleChange}/>
                                                    <label htmlFor="myFile"><img src={urls[urls.length - 1]} alt=""
                                                                                 style={{
                                                                                     width: '300px', height: '300px'
                                                                                 }}/></label>
                                                </div>
                                            </>}
                                        </div>
                                    </div>
                                    <Field as={"select"} name="status"
                                           className="form-select js-choice choice-select-text-none mt-3"
                                           data-position="top" data-search-enabled="false">
                                        <option value="Public">Public</option>
                                        <option value="Friends">Friends</option>
                                        <option value="Onlyme">Only me</option>
                                    </Field>

                                </div>

                                <div className="modal-footer ">

                                    <button type="button" className="btn btn-danger-soft me-2"
                                            data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button className="btn btn-success-soft" data-bs-dismiss="modal"
                                            type={'submit'}>Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>

    )
}
export default EditPost;

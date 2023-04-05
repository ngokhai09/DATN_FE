import React, {useEffect, useState} from "react";
import './create.css'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../services/fireBase";
import {useDispatch, useSelector} from "react-redux";
import {addPosts} from "../../services/PostService";
import {Field, Form, Formik} from "formik";

const CreatePost = (props) => {
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const account = useSelector(state => {
        return state.account.currentAccount
    })

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

    const [urls, setUrls] = useState([]);

    const [progress, setProgress] = useState(0);


    return (
        <>
            <div className="modal fade" id="feedActionVideo" tabIndex="-1" aria-labelledby="feedActionVideoLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="feedActionVideoLabel">Edit Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle" src="/assets/images/avatar/03.jpg" alt=""/>
                                </div>
                                <form className="w-100">
                                    <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows="2"
                                              placeholder="Share your thoughts..."></textarea>
                                </form>
                            </div>
                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div className="dropzone dropzone-default card shadow-none"
                                     data-dropzone='{"maxFiles":2}'>
                                    <div className="dz-message">
                                        <i className="bi bi-camera-reels display-3"></i>
                                        <p>Drag here or click to upload video.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger-soft me-2"><i
                                className="bi bi-camera-video-fill pe-1"></i> Live video
                            </button>
                            <button type="button" className="btn btn-success-soft">Post</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalCreateFeed" tabIndex="-1" aria-labelledby="modalLabelCreateFeed"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabelCreateFeed">Create post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt=""/>
                                </div>
                                <form className="w-100">
                                    <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows="2"
                                              placeholder="Share your thoughts..."></textarea>
                                </form>
                            </div>


                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div className="dropzone dropzone-default card shadow-none"
                                     data-dropzone='{"maxFiles":2}'>
                                    <div className="dz-message">
                                        <i className="bi bi-images display-3"></i>
                                        <p>Drag here or click to upload photo.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>

                        </div>

                        <div className="modal-footer row justify-content-between">
                            <div className="col-lg-3">
                                <select className="form-select js-choice" data-position="top"
                                        data-search-enabled="false">
                                    <option value="PB">Public</option>
                                    <option value="PV">Friends</option>
                                    <option value="PV">Only me</option>
                                    <option value="PV">Custom</option>
                                </select>
                            </div>
                            <div className="col-lg-8 text-sm-end">
                                <button type="button" className="btn btn-danger-soft me-2"><i
                                    className="bi bi-camera-video-fill pe-1"></i> Live video
                                </button>
                                <button type="button" className="btn btn-success-soft">Post</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        <div className="card card-body">
            <div className="d-flex mb-3">
                <div className="avatar avatar-xs me-2">
                    <a> <img className="avatar-img rounded-circle" src={account.avatar}
                             alt=""/> </a>
                </div>
                <Formik initialValues={{content: "", image: ""}}
                        onSubmit={(values) => {
                            values.account = account.idAccount;
                            values.image = 1
                            dispatch(addPosts(values))
                            document.getElementById('add-form1').reset();
                            setUrls([])
                        }}>
                    <Form id='add-form1'>
                        <Field className="form-control pe-4 border-0" rows="2" type={'text'}
                               name={'content'} placeholder="Share your thoughts..."></Field>
                    </Form>
                </Formik>
            </div>
            <ul className="nav nav-pills nav-stack small fw-normal">
                <li className="nav-item">
                    <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal"
                       data-bs-target="#feedActionPhoto"> <i
                        className="bi bi-image-fill text-success pe-2"></i>Photo</a>
                </li>
            </ul>
        </div>


        <div className="modal fade" id="feedActionPhoto" tabIndex="-1" aria-labelledby="feedActionPhotoLabel"
             aria-hidden="true">
            <Formik initialValues={{content: "", image: "", status: ""}}
                    onSubmit={(values) => {
                        values.account = account.idAccount;
                        values.image = urls[urls.length - 1]
                        dispatch(addPosts(values))
                        document.getElementById('add-form').reset();
                        setUrls([])
                    }}>
                <Form id='add-form'>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="feedActionPhotoLabel">Add post photo</h5>
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


                                <div>
                                    <label className="form-label">Upload attachment</label>
                                    <div className="dropzone dropzone-default card shadow-none"
                                         data-dropzone='{"maxFiles":2}'>
                                        {urls.length === 0 ? <>
                                            <div className="dz-message">
                                                <input type="file" id="myFile" name="myFile" onChange={handleChange}/>
                                                <label htmlFor="myFile" className="file-upload"><i
                                                    className="bi bi-images display-3"></i>
                                                    <p>Drag here or click to upload photo.</p></label>

                                            </div>
                                        </> : <>
                                            <div className="dz-message"><input type="file" id="myFile" name="myFile"
                                                                               onChange={handleChange}/>
                                                <label htmlFor="myFile"><img src={urls[urls.length - 1]} alt="" style={{
                                                    width: '500px', height: '300px'
                                                }}/>
                                                </label>
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
                                <button className="btn btn-success-soft" data-bs-dismiss="modal" type={'submit'}>Post
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>

    </>)
}
export default CreatePost;

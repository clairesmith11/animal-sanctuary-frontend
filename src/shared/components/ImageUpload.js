import React, { useState, useEffect } from 'react';

import Button from '../../components/Forms/Button';
import { useHttp } from '../hooks/useHttp';
import Loading from '../../shared/components/Loading';
import Modal from '../../shared/components/Modal';

import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttp();

    // Set and display image preview when a file is selected
    useEffect(() => {

        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }, [file]);

    const selectedImageHandler = (e) => {
        let selectedFile;
        if (e.target.files && e.target.files.length === 1) {
            selectedFile = e.target.files[0];
            console.log(selectedFile);
            setFile(selectedFile);
        } else {
            return;
        }
        // props.onInput(selectedFile.name, props.id);

    };

    // Send patch request to user model when user selects a new profile image. Image is sent via form data and run
    // through multer on backend to save the file
    const uploadPhotoHandler = async () => {
        try {
            const form = new FormData();
            form.append('image', file);
            await sendRequest(
                `${process.env.REACT_APP_URL}/user/updatePhoto/${props.user}`,
                'PATCH',
                form
            );

            if (!error) {
                window.location.reload();
            }
        } catch { }
    };

    return (
        <React.Fragment>
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'
                    onClose={clearError}>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            <div className={`image-upload ${props.show ? 'show' : 'hide'}`}>
                <input
                    className="image-upload__browse"
                    type="file"
                    name="image"
                    accept=".jpg,.png,.jpeg"
                    id={props.id}
                    onChange={selectedImageHandler} />
                <div className="image-upload__preview">
                    {preview && <img src={preview} alt="Preview" className="image-upload__preview-img" />}
                    {!preview && <p className="image-upload-preview__text">Select an image</p>}
                </div>
                {isLoading && <Loading />}
                <Button
                    type="button"
                    text="Upload"
                    clicked={uploadPhotoHandler}
                    isValid={true}
                    className="image-upload__btn" />
            </div>
        </React.Fragment>

    );
};

export default ImageUpload;
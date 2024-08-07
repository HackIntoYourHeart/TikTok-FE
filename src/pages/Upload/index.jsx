import React, { useState } from 'react';
import styles from './Upload.module.scss';
import Page404 from '../404';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '~/api/api';
import { toast } from 'react-toastify';
import LoadingWrapper from '~/components/Loading/LoadingWrapper';

const Upload = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setSelectedVideo(file);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
        // Xử lý tải lên video
        if (selectedVideo && title && description) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('video', selectedVideo);

                const uploadResponse = await api.post('/upload/upload-video', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (uploadResponse.status === 200) {
                    const data = {
                        title: title,
                        description: description,
                        url: uploadResponse.data.videoUrl,
                        owner: user.id,
                    };

                    const videoResponse = await api.post('/video', data);

                    if (videoResponse.status === 201) {
                        toast.success('Upload video successfully!');
                        navigate('/');
                    }
                }
                setLoading(false);
            } catch (error) {
                toast.error('Upload video failed!');
                setLoading(false);
            }
        } else {
            toast.error('Please fill in all fields');
        }
    };

    return (
        <LoadingWrapper loading={isLoading}>
            <>
                {user.id ? (
                    <div className={styles.wrapper}>
                        <div className={styles.container}>
                            <h1>Upload Video</h1>
                            <div className={styles.item}>
                                <label htmlFor="video">Video:</label>
                                <input
                                    className={styles.file}
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                />
                            </div>
                            <div className={styles.item}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" value={title} onChange={handleTitleChange} />
                            </div>
                            <div className={styles.item}>
                                <label htmlFor="description">Description:</label>
                                <textarea id="description" value={description} onChange={handleDescriptionChange} />
                            </div>
                            <div className={styles.item}>
                                <button onClick={handleUpload}>Upload</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.wrapper}>
                        <Page404 />
                    </div>
                )}
            </>
        </LoadingWrapper>
    );
};

export default Upload;

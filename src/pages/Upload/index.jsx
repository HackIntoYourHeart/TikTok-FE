import React, { useState } from 'react';
import styles from './Upload.module.scss';
import Page404 from '../404';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '~/api/api';

const Upload = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const user = useSelector((state) => state.user);
    
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
                const formData = new FormData();
                formData.append('video', selectedVideo);
                // Gọi API hoặc thực hiện các thao tác cần thiết tại đây
                await axios({
                    method: 'post',
                    url: `${api}/upload/upload-video`,
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }).then(async (res) => {
                    const data = {
                        title: title,
                        description: description,
                        url: res.data.videoUrl,
                        owner: user.id,
                    };
                    if (res.status === 200) {
                        await axios({
                            method: 'post',
                            url: `${api}/video`,
                            data: data,
                            headers: {
                                Authorization: `Bearer ${user.accessToken}`,
                            },
                        });
                    }
                });
                console.log('Tải lên video:', selectedVideo.name);
                console.log('Title:', title);
                console.log('Description:', description);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
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
    );
};

export default Upload;
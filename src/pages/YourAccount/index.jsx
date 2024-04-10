import React, { useEffect, useState } from 'react';
import styles from './YourAccount.module.scss';
import Page404 from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { api } from '~/api/api';
import { updateCurrentUser } from '~/slice/userSlice';
import { Link } from 'react-router-dom';

const YourAccount = () => {
    const defaultPicture =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditDisplayName, setEditDisplayName] = useState(false);
    const [isChangeUsername, setChangeUsername] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(selectedImage);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    const updateUser = async () => {
        if (selectedImage && selectedImage.type.startsWith('image/')) {
            try {
                const formData = new FormData();
                formData.append('image', selectedImage);
                const response = await axios({
                    method: 'post',
                    url: `${api}/upload/upload-image`,
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }).then(async (res) => {
                    if (res.status === 200) {
                        const data = {
                            picture: res.data.imageUrl,
                        };
                        console.log(data);
                        const resp = await axios({
                            method: 'patch',
                            url: `${api}/users/${user.id}`,
                            data: data,
                            headers: {
                                Authorization: `Bearer ${user.accessToken}`,
                            },
                        }).then((reply) => {
                            console.log("here: ", reply.data);
                            const data = {
                                id: reply.data.id,
                                displayName: reply.data.displayName,
                                username: reply.data.username,
                                picture: reply.data.picture,
                            };
                            dispatch(updateCurrentUser(data));
                        });
                        if (resp.status === 200) {
                            console.log(response.data);
                        }
                    }
                });

                if (response.status === 200) {
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    return (
        <>
            {user?.id ? (
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <div className={styles.picture}>
                            <Link to={`/profile/:${user.id}`}>
                                <img src={previewImage ? previewImage : defaultPicture} alt="avatar" />
                            </Link>
                        </div>
                        <div>
                            <label htmlFor="picture">Picture profile:</label>
                            <input
                                className={styles.file}
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        {isEditDisplayName ? (
                            <div>
                                <label htmlFor="displayName">Display name:</label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    autoComplete="off"
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <span>Display Name: </span> {user.displayName}{' '}
                                <FontAwesomeIcon onClick={() => setEditDisplayName(true)} icon={faPen} />
                            </div>
                        )}
                        {isChangeUsername ? (
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <span>Username: </span> {user.username}{' '}
                                <FontAwesomeIcon onClick={() => setChangeUsername(true)} icon={faPen} />
                            </div>
                        )}
                        <div className={styles.button}>
                            <button onClick={updateUser} type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Page404 />
            )}
        </>
    );
};

export default YourAccount;

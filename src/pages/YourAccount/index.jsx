import React, { useState } from 'react';
import styles from './YourAccount.module.scss';
import Page404 from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import api from '~/api/api';
import { updateCurrentUser } from '~/slice/userSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const YourAccount = () => {
    const defaultPicture =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditDisplayName, setEditDisplayName] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
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
                
                const uploadResponse = await api.post('/upload/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (uploadResponse.status === 200) {
                    const data = {
                        picture: uploadResponse.data.imageUrl,
                        displayName: displayName ? displayName : undefined,
                    };

                    const updateResponse = await api.patch(`/users/${user.id}`, data);

                    if (updateResponse.status === 200) {
                        const updatedUser = {
                            id: updateResponse.data.id,
                            displayName: updateResponse.data.displayName,
                            username: updateResponse.data.username,
                            picture: updateResponse.data.picture,
                        };
                        dispatch(updateCurrentUser(updatedUser));
                        toast.success('Profile updated successfully!');
                    } else {
                        toast.error('Failed to update profile');
                    }
                } else {
                    toast.error('Failed to upload image');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.code === 400) {
                    toast.error('Display name is not blank');
                } else {
                    toast.error('An error occurred');
                }
            }
        } else {
            try {
                const data = {
                    displayName: displayName ? displayName : undefined,
                };
                const updateResponse = await api.patch(`/users/${user.id}`, data);

                if (updateResponse.status === 200) {
                    const updatedUser = {
                        id: updateResponse.data.id,
                        displayName: updateResponse.data.displayName,
                        username: updateResponse.data.username,
                        picture: updateResponse.data.picture,
                    };
                    dispatch(updateCurrentUser(updatedUser));
                    toast.success('Profile updated successfully!');
                } else {
                    toast.error('Failed to update profile');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.code === 400) {
                    toast.error('Display name is not blank');
                } else {
                    toast.error('An error occurred');
                }
            }
        }
    };

    return (
        <>
            {user?.id ? (
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <div className={styles.picture}>
                            <Link to={`/profile/${user.id}`}>
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

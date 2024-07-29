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
    const [selectedImage, setSelectedImage] = useState();

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
                const response = await api({
                    method: 'post',
                    url: `/upload/upload-image`,
                    data: formData,
                }).then(async (res) => {
                    if (res.status === 200) {
                        const data = {
                            picture: res.data.imageUrl,
                            displayName: displayName ? displayName : undefined,
                        };
                        await api({
                            method: 'patch',
                            url: `/users/${user.id}`,
                            data: data,
                        }).then((reply) => {
                            if (reply.code === 400) {
                                toast.error(reply.message);
                            }
                            const data = {
                                id: reply.data.id,
                                displayName: reply.data.displayName,
                                username: reply.data.username,
                                picture: reply.data.picture,
                            };
                            dispatch(updateCurrentUser(data));
                        });
                    }
                });
                if (response.code === 400) {
                    toast.error(response.message);
                }
            } catch (error) {
                if (error.response.data.code === 400) {
                    toast.error('Display name is not blank');
                }
            }
        } else {
            try {
                await api({
                    method: 'patch',
                    url: `/users/${user.id}`,
                    data: {
                        displayName: displayName ? displayName : undefined,
                    },
                }).then((reply) => {
                    console.log(reply);
                    if (reply.status === 400) {
                        toast.error(reply.message);
                    }
                    const data = {
                        id: reply.data.id,
                        displayName: reply.data.displayName,
                        username: reply.data.username,
                        picture: reply.data.picture,
                    };
                    dispatch(updateCurrentUser(data));
                });
            } catch (error) {
                if (error.response.data.code === 400) {
                    toast.error('Display name is not blank');
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

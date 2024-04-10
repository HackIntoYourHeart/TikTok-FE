import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { faBookmark, faCommentDots, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '~/api/api';
import clsx from 'clsx';
import Comment from './Comment/Comment';

const Home = () => {
    const user = useSelector((state) => state.user);
    const [userVideos, setUserVideos] = useState();
    const [listUser, setListUser] = useState();
    const { videoSearch } = useSelector((state) => state.video);
    console.log('log: ', videoSearch);

    useEffect(() => {
        if (videoSearch.length > 0) {
            setUserVideos(videoSearch);
            console.log('videoSearch: ', videoSearch);
        }
    }, [videoSearch]);

    const data = [
        {
            userId: '01a',
            comId: '012',
            fullName: 'Riya Negi',
            avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'Hey, Loved your blog! ',
            replies: [
                {
                    userId: '02a',
                    comId: '013',
                    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    fullName: 'Adam Scott',
                    avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
                    text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰',
                },
                {
                    userId: '01a',
                    comId: '014',
                    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    fullName: 'Riya Negi',
                    avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
                    text: 'thanks!😊',
                },
            ],
        },
        {
            userId: '02b',
            comId: '017',
            fullName: 'Lily',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'I have a doubt about the 4th point🤔',
            avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
            replies: [],
        },
    ];

    const likeVideoRequest = async (id, userId) => {
        axios
            .patch(
                `${api}/video/req-reaction/${id}`,
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    getVideos();
                }
            })
            .catch((error) => {
                // Xử lý lỗi ở đây
                console.error(error);
            });
    };

    const getVideos = async () => {
        let listVideos = [];
        let listUsers = [];
        console.log('here!!!');
        const fetUserData = async (userId) => {
            try {
                console.log('here2!!!');
                const response = await axios.get(`${api}/users/public/${userId}`);
                if (response.status === 200) {
                    listUsers.push(response.data);
                    setListUser(listUsers);
                }
            } catch (error) {
                // Xử lý lỗi nếu cần
                console.error(error);
            }
        };
        const fetchData = async (userId) => {
            try {
                const response = await axios.get(`${api}/video/get-videos/${userId}`);
                if (response.status === 200) {
                    listVideos = [...listVideos, ...response.data];
                }
            } catch (error) {
                // Xử lý lỗi nếu cần
                console.error(error);
            }
        };

        for (let i = 0; i < user.followingList.length; i++) {
            await fetUserData(user.followingList[i]);
            await fetchData(user.followingList[i]);
        }
        const videosWithUser = listVideos.map((video) => {
            const user = listUsers.find((user) => user.id === video.owner);
            return { ...video, user };
        });
        setUserVideos(videosWithUser);
    };

    useEffect(() => {
        if (user) {
            getVideos();
        }
    }, [user]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.videoList}>
                {userVideos?.map((video) => (
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <span className={styles.displayName}></span>
                            <div className={styles.userInfo}>
                                <Link to={`/profile/:${video.owner}`}>
                                    <img src={video?.user?.picture} alt="avatar" />
                                </Link>
                                <Link to={`/profile/${video?.user?.id}`}>
                                    <span className={styles.displayName}>{video?.user?.displayName}</span>
                                </Link>
                            </div>
                            <div className={styles.text}>
                                <span className={styles.title}>{video?.title}</span>
                                <span className={styles.description}>{video.description}</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.videoInner}>
                            <video controls>
                                <source src={video.url} type="video/mp4" />
                            </video>

                            <Comment video={video} likeVideoRequest={likeVideoRequest} data={data} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

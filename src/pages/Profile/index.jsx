import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import axios from 'axios';
import { api } from '~/api/api';
import { useSelector } from 'react-redux';
import { updateCurrentUser } from '~/slice/userSlice';
import c from 'clsx';
const Profile = () => {
    const user = useSelector((state) => state.user);
    const { userId } = useParams();
    const [userVideo, setUserVideo] = useState();
    const [userInfo, setUserInfo] = useState();
    const [frameIcon, setFrameIcon] = useState();

    const checkRanking = (rank) => {
        switch (rank) {
            case 1:
                return styles.top1;
            case 2:
                return styles.top2;
            case 3:
                return styles.top3;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetUserData = async () => {
            try {
                const response = await axios.get(`${api}/users/public/${userId.slice(1)}`);
                if (response.status === 200) {
                    console.log(response.data);
                    setUserInfo(response.data);
                }
            } catch (error) {
                // Xử lý lỗi nếu cần
                console.error(error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/video/get-videos/${userId.slice(1)}`);
                if (response.status === 200) {
                    setUserVideo(response.data);
                }
            } catch (error) {
                // Xử lý lỗi nếu cần
                console.error(error);
            }
        };

        if (userId) {
            fetUserData();
            fetchData();
        }
    }, [userId]);

    useEffect(() => {
        console.log(userInfo?.yesterdayRank);
        setFrameIcon(checkRanking(userInfo?.yesterdayRank));
    }, [userInfo]);

    const addIfNotExists = (array, value) => {
        let isUpdate = true;
        if (!array.includes(value)) {
            array.push(value);
        } else {
            isUpdate = false;
        }

        return isUpdate;
    };

    const handleFollow = async () => {
        try {
            const result = addIfNotExists(userInfo?.followingList, userId.slice(1));

            if (result) {
                const data = {
                    followingId: userId.slice(1),
                };
                await axios({
                    method: 'patch',
                    url: `${api}/users/following/${user.id}`,
                    data: data,
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }).then((res) => {
                    if (res.status === 200) {
                        updateCurrentUser({ followingList: res.data.followingList });
                    }
                });
            }
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error(error);
        }
    };
    const defaultPicture =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const follower = {
        displayName: 'Abbbbba',
        username: 'Relickt',
        follower: ['823y78y8wey', '823y78y8wey', '823y78y8wey'],
        following: ['823y78y8wey', '823y78y8wey', '823y78y8wey'],
    };

    const [isVideoList, setToggleTab] = useState(true);
    return (
        <div className={styles.wrapper}>
            <div className={c(styles.avatar, frameIcon)}>
                <img src={userInfo?.picture ? userInfo?.picture : defaultPicture} alt="avatar" />
            </div>
            <div className={styles.action}>
                <span>{userInfo?.displayName}</span>
                {userId.slice(1) !== user.id && (
                    <button onClick={handleFollow} className={styles.followButton}>
                        {user.followingList.includes(userId.slice(1)) ? <span>Follow</span> : <span>Unfollow</span>}
                    </button>
                )}
                <div className={styles.switch}>
                    <button onClick={() => setToggleTab(true)}>Videos</button>
                    <button onClick={() => setToggleTab(false)}>Liked</button>
                </div>
            </div>
            {isVideoList ? (
                <div className={styles.videos}>
                    {userVideo?.map((video) => (
                        <video controls>
                            <source src={video.url} />
                        </video>
                    ))}
                </div>
            ) : (
                <div className={styles.likedVideos}>Liked</div>
            )}
        </div>
    );
};

export default Profile;

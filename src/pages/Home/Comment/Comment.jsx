import React, { useEffect, useState } from 'react';
import { faBookmark, faCancel, faCommentDots, faHeart, faShareNodes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Home.module.scss';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';
import { api } from '~/api/api';
import Copy from '../Copy/Copy';

const Comment = ({ likeVideoRequest, video }) => {
    const [showComments, setShowComments] = useState(false);
    const user = useSelector((state) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setCopied(false); // Reset copy status when toggling
    };

    const handleDeleteComment = (comment, userId) => {
        if (user.role === 'admin' || userId === user.id) {
            // axios.delete(
            //     `${api}/comments/${comment.comIdToDelete}`,
            //     { userId },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${user.accessToken}`,
            //         },
            //     },
            // );
            console.log(userId);
        } else {
            console.log("You don't have permission to delete this comment.");
        }
    };

    console.log(user);
    const data = [
        {
            userId: '01a',
            comId: '012',
            fullName: user.displayName,
            avatarUrl: user.picture,
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'Hey, Loved your blog! ',
            replies: [],
        },
        {
            userId: '01a',
            comId: '012',
            fullName: user.displayName,
            avatarUrl: user.picture,
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'wow! nice wild Africa',
            replies: [],
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

    return (
        <>
            {!showComments && (
                <div class={styles.actions}>
                    <div className={styles.custom}>
                        <div>
                            <FontAwesomeIcon
                                onClick={() => {
                                    likeVideoRequest(video?._id, user?.id);
                                }}
                                className={clsx(styles.icon, video.listLikes.includes(user.id) ? styles.liked : '')}
                                icon={faHeart}
                            />
                            <span>{video?.listLikes?.length}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={faCommentDots}
                                onClick={() => setShowComments(!showComments)}
                            />
                            <span>{data.length}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon className={styles.icon} icon={faBookmark} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <FontAwesomeIcon onClick={toggleVisibility} className={styles.icon} icon={faShareNodes} />
                            <div style={{ position: 'absolute', bottom: '-90px' }}>
                                <Copy text={video.url} isVisible={isVisible} setCopied={setCopied} copied={copied} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showComments && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px' }}>
                        <FontAwesomeIcon
                            className={styles.icon}
                            style={{ height: '20px' }}
                            icon={faXmark}
                            onClick={() => setShowComments(!showComments)}
                        />
                    </div>
                    {/* <CommentSection
                        currentUser={{
                            currentUserId: '01a',
                            currentUserImg: user.picture,
                            currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
                            currentUserFullName: user.displayName,
                        }}
                        onDeleteAction={(commentId, userId) => handleDeleteComment(commentId, userId)}
                        commentData={data}
                        logIn={{
                            loginLink: 'http://localhost:3001/',
                            signupLink: 'http://localhost:3001/',
                        }}
                        onSubmitAction={(data) => console.log('check submit, ', data)}
                        currentData={(data) => {
                            console.log('curent data', { ...data, avatarUrl: user.picture });
                        }}
                    /> */}
                </div>
            )}
        </>
    );
};

export default Comment;

import React, { useEffect, useState } from 'react';
import { faBookmark, faCommentDots, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Home.module.scss';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Copy from '../Copy/Copy';
import CommentSection from './CommentSection/CommentSection';

const Comment = ({ likeVideoRequest, video }) => {
    const [showComments, setShowComments] = useState(false);
    const user = useSelector((state) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setCopied(false); // Reset copy status when toggling
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
                    <CommentSection setShowComments={setShowComments} showComments={showComments} videoId={video?._id} />
                </div>
            )}
        </>
    );
};

export default Comment;

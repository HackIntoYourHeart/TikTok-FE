import React, { useState } from 'react';
import styles from './CommentItem.module.scss';

const CommentItem = ({ text, user }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img
                    src={
                        user.picture ??
                        'https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png'
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                />
            </div>
            <div className={styles.content}>
                <span className={styles.name}>{user.displayName}</span>
                <div>
                    <p className={isExpanded ? styles.none : styles.collapsed}>{text}</p>
                    {text.split(' ').length > 30 && (
                        <button onClick={toggleExpand}>{isExpanded ? '<<<' : '>>>'}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;

import React from 'react';
import styles from './CommentInput.module.scss';

const CommentInput = ({ setContent, postComment, content }) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img
                    src="https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png"
                    alt="avatar"
                    width={40}
                    height={40}
                />
            </div>
            <div className={styles.input}>
                <input
                    value={content}
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onKeyDown={postComment}
                />
            </div>
        </div>
    );
};

export default CommentInput;

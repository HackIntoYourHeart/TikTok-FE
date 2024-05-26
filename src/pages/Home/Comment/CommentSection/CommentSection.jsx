import React, { useEffect, useState } from 'react';
import CommentItem from '../CommmentItem/CommentItem';
import styles from './CommentSection.module.scss';
import { faXmark, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentInput from '../CommentInput/CommentInput';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { api } from '~/api/api';

const CommentSection = ({ setShowComments, showComments, videoId }) => {
    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [content, setContent] = useState('');
    const getComments = async (pageNew) => {
        await axios({
            method: 'get',
            url: `${api}/get-comments-by-video?video=${videoId}&page=${pageNew ?? page}&sortBy=_id:desc`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        }).then((res) => {
            if (res.status === 200) {
                const data = comments ?? [];
                if (pageNew) {
                    setComments(res.data.results);
                    setPage(1);
                } else {
                    setComments([...data, ...res.data.results]);
                }
                setTotal(res.data.totalResults);
                setTotalPage(res.data.totalPages);
            }
        });
    };
    useEffect(() => {
        getComments();
    }, [page]);

    const postComment = async (e) => {
        if (content && e.key === 'Enter') {
            await axios({
                method: 'post',
                url: `${api}/comments`,
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
                data: {
                    video: videoId,
                    content,
                },
            }).then(async (res) => {
                if (res.status === 201) {
                    setComments([]);
                    setContent('');
                    await getComments(1);
                }
            });
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px' }}>
                <h1 style={{ paddingLeft: '16px' }}>{`Comments: ${total}`}</h1>
                <FontAwesomeIcon
                    className={styles.icon}
                    style={{ height: '20px' }}
                    icon={faXmark}
                    onClick={() => setShowComments(!showComments)}
                />
            </div>
            <div className={styles.list}>
                {comments?.length > 0 &&
                    comments?.map((comment) => <CommentItem text={comment.content} user={comment.user} />)}
                {totalPage >= page && (
                    <FontAwesomeIcon
                        className={styles.icon}
                        style={{ height: '20px' }}
                        icon={faAnglesDown}
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    />
                )}
            </div>
            <CommentInput setContent={setContent} postComment={postComment} content={content} picture={user.picture} />
        </div>
    );
};

export default CommentSection;

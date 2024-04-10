import React from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faVideoCamera,
    faCompass,
    faHouseChimney,
    faUserFriends,
    faCheckCircle,
    faRankingStar,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const SideBar = () => {
    const listSuggestedUser = [
        {
            user: 'mèo',
            displayName: 'Ngài mèo',
            avatarURL: 'https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?pid=ImgDet&rs=1',
            isCheck: true,
        },
        {
            user: 'mm',
            displayName: 'meo',
            avatarURL: 'https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-trai-tim-6.jpg',
            isCheck: true,
        },
        {
            user: 'hoaa.hanassii',
            displayName: 'Đào Lê Phương Hoa',
            avatarURL: 'https://th.bing.com/th/id/OIP.TVCVLmkgxKICt4tke7LLvgHaE5?pid=ImgDet&rs=1',
            isCheck: false,
        },
    ];
    const listFollowing = [
        {
            user: 'hoaa.hanassii',
            displayName: 'Đào Lê Phương Hoa',
            avatarURL: 'https://th.bing.com/th/id/OIP.TVCVLmkgxKICt4tke7LLvgHaE5?pid=ImgDet&rs=1',
            isCheck: true,
        },
        {
            user: 'hoaa.hanassii',
            displayName: 'Đào Lê Phương Hoa',
            avatarURL: 'https://toplist.vn/images/800px/dao-le-phuong-hoa-838625.jpg',
            isCheck: true,
        },
        {
            user: 'hoaa.hanassii',
            displayName: 'Đào Lê Phương Hoa',
            avatarURL: 'https://toplist.vn/images/800px/dao-le-phuong-hoa-838625.jpg',
            isCheck: false,
        },
    ];
    return (
        <aside className={cx('wrapper')}>
            <div className={styles.module1}>
                <Link to="/">
                    <div>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faHouseChimney} />
                        </div>
                        <span>For You</span>
                    </div>
                </Link>
                <Link to="/following">
                    <div>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faUserFriends} />
                        </div>
                        <span>Following</span>
                    </div>
                </Link>
                <Link to="/ranking">
                    <div>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faRankingStar} />
                        </div>
                        <span>Ranking</span>
                    </div>
                </Link>

                <div>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faCompass} />
                    </div>
                    <span>Explore</span>
                </div>
                <div>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faVideoCamera} />
                    </div>
                    <span>LIVE</span>
                </div>
            </div>
            <div className={styles.suggested}>
                <span className={styles.title}>Suggested accounts</span>
                <ul>
                    {listSuggestedUser.map((e, k) => (
                        <li className={styles.userItem}>
                            <img src={e.avatarURL} />
                            <div>
                                <div className={styles.name}>
                                    <span>{e.user}</span>
                                    {e.isCheck ? <FontAwesomeIcon className={styles.check} icon={faCheckCircle} /> : ''}
                                </div>
                                <div>{e.displayName}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.following}>
                <span className={styles.title}>Following</span>
                <ul>
                    {listFollowing.map((e, k) => (
                        <li className={styles.userItem}>
                            <img src={e.avatarURL} />
                            <div>
                                <div className={styles.name}>
                                    <span>{e.user}</span>
                                    {e.isCheck ? <FontAwesomeIcon className={styles.check} icon={faCheckCircle} /> : ''}
                                </div>
                                <span>{e.displayName}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;

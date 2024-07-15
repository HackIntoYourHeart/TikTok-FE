import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AccountItem = ({ user }) => {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={
                    user.picture ??
                    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                }
                alt="Hoaa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{user.displayName}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>{user.username}</span>
            </div>
        </div>
    );
};

export default AccountItem;

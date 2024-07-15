import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/slice/userSlice';
import { getVideos, clearVideos } from '~/slice/videoSlice';
import axios from 'axios';
import logo from '~/components/Layout/components/Header/77eb36e6c4b80ce9bb83a3a269664357.png';
import { api } from '~/api/api';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const defaultPicture =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
    const navigate = useNavigate();

    useEffect(() => {
        if (!isFocused) {
            dispatch(clearVideos());
        }
    }, [isFocused, dispatch]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResult([]);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${api}/users/search-users`, {
                params: { displayName: searchTerm },
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            setSearchResult(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Log out':
                dispatch(logout());
                break;
            case 'View profile':
                navigate('/your-profile');
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/your-profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img width={42} height={42} src={logo} alt="logo" />
                </Link>
                <HeadlessTippy
                    interactive
                    visible={isFocused || searchResult.length > 0}
                    render={(attrs) =>
                        searchResult?.length > 0 && (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    {searchResult.map((user) => (
                                        <Link to={`/profile/${user.id}`} onClick={() => setSearchResult([])}>
                                            <div>
                                                <AccountItem key={user.id} user={user} />
                                            </div>
                                        </Link>
                                    ))}
                                </PopperWrapper>
                            </div>
                        )
                    }
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search accounts"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            spellCheck={false}
                            value={searchTerm}
                        />
                        <button className={cx('clear')} onClick={() => setSearchTerm('')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        <button className={cx('search-btn')} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    {user?.id ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <Link to={'/upload'}>
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faCloudUpload} />
                                    </button>
                                </Link>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Link to={'/upload'}>
                                <Button text>Upload</Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button primary>Log in</Button>
                            </Link>
                        </>
                    )}

                    <Menu items={user?.id ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {user?.id ? (
                            <Link to={'/your-profile'}>
                                <img
                                    className={cx('user-avatar')}
                                    src={user.picture ? user?.picture : defaultPicture}
                                    alt="Nguyen Van A"
                                />
                            </Link>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;

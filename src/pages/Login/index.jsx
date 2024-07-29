import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/api/api';
import { useDispatch } from 'react-redux';
import { login } from '~/slice/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api({
                method: 'post',
                url: `/auth/login`,
                data: { email, password },
            }).then((res) => {
                if (res.status === 200) {
                    const user = {
                        id: res.data.user.id,
                        displayName: res.data.user.displayName,
                        picture: '',
                        accessToken: res.data.tokens.access.token,
                        refreshToken: res.data.tokens.refresh.token,
                        username: res.data.user.username,
                        picture: res.data.user.picture,
                        followingList: res.data.user.followingList,
                        likeList: res.data.user.likeList,
                        role: res.data.user.role,
                    };
                    localStorage.setItem('accessToken', res.data.tokens.access.token);
                    localStorage.setItem('refreshToken', res.data.tokens.refresh.token);
                    toast.success('Login successfully!');
                    dispatch(login(user));
                    navigate('/');
                }
            });
        } catch (error) {
            toast.error('Login failed!');
        }
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className={styles.button}>
                    <button type="submit">Login</button>
                </div>
                <div className={styles.link}>
                    <span>
                        If you don't have an accout, let's sign up{' '}
                        <Link to={'/sign-up'}>
                            <span>here</span>
                        </Link>
                        !
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;

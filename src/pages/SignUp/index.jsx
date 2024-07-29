import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import api from '~/api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '~/slice/userSlice';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordError, setPasswordError] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const checkPassword = (password) => {
        const regex = /^(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const registerUser = async (userData) => {
        try {
            await api({
                method: 'post',
                url: `/auth/register`,
                data: userData,
            }).then((res) => {
                if (res.status === 201) {
                    navigate('/login');
                }
            });
        } catch (error) {
            throw error.response.data; // Ném lỗi nếu có lỗi từ phản hồi
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkPassword(formData.password)) {
            if (formData.password !== formData.confirmPassword) {
                setPasswordError('Password is not match');
            } else {
                // Gửi dữ liệu đăng ký đến server
                registerUser({
                    username: formData.username,
                    password: formData.password,
                    displayName: formData.displayName,
                    email: formData.email,
                });
                // Reset form
                setFormData({
                    username: '',
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setPasswordError('');
            }
        } else {
            setPasswordError(
                'password must have at least one uppercase character and one lowercase character with min length equal 8',
            );
        }
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                {passwordError && <p>{passwordError}</p>}
                <div className={styles.button}>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

// src/pages/ProfilePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { refreshToken } from '../redux/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Handle response or set user state
      } catch (error) {
        if (error.response.status === 401) {
          // Token might be expired, refresh it
          await dispatch(refreshToken(refreshToken)).unwrap();
        } else {
          console.error('Failed to fetch profile', error);
        }
      }
    };

    fetchProfile();
  }, [accessToken, refreshToken, dispatch]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <img src={user.avatar} alt="Avatar" />
    </div>
  );
};

export default ProfilePage;

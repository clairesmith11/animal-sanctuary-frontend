import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './UserOverview.css';
import UserDetails from '../../components/UserDetails/UserDetails';
import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/useHttp';
import Loading from '../../shared/components/Loading';
import Modal from '../../shared/components/Modal';
import Button from '../../components/Forms/Button';

const UserOverview = props => {
    const userId = useParams().userId;
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [loadedUser, setLoadedUser] = useState();

    // Get logged in user information from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_URL}/user/${userId}`,
                    'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                setLoadedUser(responseData.data.user);
            } catch (error) { }

        };
        fetchUser();
    }, [sendRequest, auth.token, userId]);

    return (
        <div className="user-overview">
            {isLoading && <Loading />}
            {error &&
                <Modal
                    show={error !== null}
                    message={error}
                    heading='Oops, something went wrong!'
                    onClose={clearError}>
                    <Button type="button" isValid={true} clicked={clearError} text="Close" />
                </Modal>}
            {loadedUser && <UserDetails user={loadedUser} />}
        </div>
    );


};

export default UserOverview;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (props) => {

    const { isLoggedIn } = useSelector((state) => state.authSlice);

    return isLoggedIn ? props.children : (
        <Navigate to="/login" replace={true} />
    );
};

export default ProtectedRoute;
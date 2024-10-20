import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import config from 'config';

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const message = window.localStorage.getItem('mensaje');
    const menu = window.localStorage.getItem('systemMenu');
    const itemsMenu = JSON.parse(menu);

    useEffect(() => {
        if (isLoggedIn) {
            if (message === "actualizar") {
                navigate('/change-password');
            } else {
                navigate(itemsMenu[0].children[0].url, { replace: true });
            }
        }
    }, [isLoggedIn, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
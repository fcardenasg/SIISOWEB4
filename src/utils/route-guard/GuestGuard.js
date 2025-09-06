import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default GuestGuard;
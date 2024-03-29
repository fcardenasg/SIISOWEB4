import { useContext } from 'react';

// auth provider
//import FirebaseContext from 'contexts/FirebaseContext';
import JWTContext from 'contexts/JWTContext';
// import Auth0Context from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const context = useContext(JWTContext);

    if (!context) throw new Error('El contexto debe usarse dentro del proveedor');

    return context;
};

export default useAuth;
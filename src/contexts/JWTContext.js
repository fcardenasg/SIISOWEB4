import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'axios';
//import axios from 'utils/axios';
import { Url } from 'api/instances/AuthRoute';
import { getData } from 'api/UtilInstance';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        window.localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        window.localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};


const setIdUsuario = (idusuariologueado) => {
    if (idusuariologueado) {
        window.localStorage.setItem('idusuariologueado', idusuariologueado);
    } else {
        window.localStorage.removeItem('idusuariologueado');
    }
};

const setMessage = (mensaje) => {
    if (mensaje) {
        window.localStorage.setItem('mensaje', mensaje);
    } else {
        window.localStorage.removeItem('mensaje');
    }
};

const setRenderMenu = (systemMenu) => {
    if (systemMenu) {
        window.localStorage.setItem('systemMenu', systemMenu);
    } else {
        window.localStorage.removeItem('systemMenu');
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const idusuariologueado = window.localStorage.getItem('idusuariologueado');

                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get(`${Url.Base}api/Usuarios/id?id=${idusuariologueado}`);
                    const { data } = response;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: {
                                id: data.id,
                                email: data.correo,
                                nameuser: data.nombreUsuario,
                                namerol: data.rolUsuario,
                                namesede: data.sedeUsuario,
                                idsede: data.idSede,
                                idarea: data.idArea,
                                namearea: data.nameArea
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (usuario, password) => {
        const response = await axios({
            method: 'post',
            url: `${Url.Base}${Url.Login}`,
            data: { usuario, password },
        });

        if (response.data.message === 'Usuario o contraseña invalidos' ||
            response.data.message === 'Usuario inactivo') {
            throw Error(response.data.message);
        }

        if (response.data.token !== undefined) {
            const { token, dataUser, message } = response.data;

            setSession(token);
            setMessage(message);
            setRenderMenu(JSON.stringify(dataUser.menu));
            setIdUsuario(dataUser.id);

            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: {
                        id: dataUser.id,
                        email: dataUser.correo,
                        nameuser: dataUser.nombreUsuario,
                        namerol: dataUser.nombreRol,
                        namesede: dataUser.nombreSede,
                        idsede: dataUser.idSede,
                        idarea: dataUser.idArea,
                        namearea: dataUser.nameArea
                    }
                }
            });
        }
        else {
            throw Error(response.data.message);
        }
    };

    const register = async (email, password, firstName, lastName) => {

        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });

        window.localStorage.removeItem('idusuariologueado');
        window.localStorage.removeItem('systemMenu');
    };

    const resetPassword = async (correo) => {
        const response = await getData(Url.RecuperarPasswordCorreo, { correo });

        if (response.data !== 'Correo enviado') {
            throw Error(response.data);
        }
    };

    const updateProfile = () => { };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                resetPassword,
                updateProfile
            }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default JWTContext;

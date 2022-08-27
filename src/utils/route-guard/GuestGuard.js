import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';

/* Validate */
import firebase from 'firebase/app';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAuth() {
            try {
                if (isLoggedIn) {
                    var docRef = firebase.firestore().doc(`Usuarios/${user.id}`);

                    const datosFin = await docRef.get().then((doc) => {
                        if (doc.exists) {
                            /* console.log("Documento datos:", doc.data()); */
                            return doc.data();
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });

                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        rol: datosFin.rol
                    }

                    if (userData.rol === "visitante") {
                        return navigate("/dashboard/questionnaire", { replace: true });
                    } else {
                        return navigate("/dashboard/select", { replace: true });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        getAuth();
    }, [isLoggedIn, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
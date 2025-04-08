import { GetSharePermission } from "api/clients/UserClient";
import { AccionMenu } from "components/helpers/Enums";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const ValidateAction = ({ children, idModulo, idAccion }) => {
    const { user } = useAuth();
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (idModulo) {
            const getAll = async () => {
                try {
                    const model = {
                        idUsuario: user?.id,
                        idModulo: idModulo
                    };

                    const lsServer = await GetSharePermission(model);
                    if (lsServer.status === 200) {
                        const permissions = lsServer.data;
                        setHasPermission(
                            (idAccion === AccionMenu.agregar && permissions.puedeAgregar) ||
                            (idAccion === AccionMenu.actualizar && permissions.puedeActualizar) ||
                            (idAccion === AccionMenu.eliminar && permissions.puedeEliminar)
                        );
                    }
                } catch (error) {
                    setError('No se pudo validar');
                } finally {
                    setLoading(false);
                }
            };

            getAll();
        }
    }, [idModulo, user?.id, idAccion]);

    if (loading) return null;
    if (error) return <div>{error}</div>;

    return hasPermission ? children : null;
};

export default ValidateAction;
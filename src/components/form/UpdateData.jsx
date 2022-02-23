import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetById } from 'api/clients/OthersClients';
import Cargando from 'components/Cargando';
import PropTypes from 'prop-types';

const UpdateData = ({ children, url }) => {

    const { id } = useParams();
    const [entidad, setEntidad] = useState([]);

    async function GetAll() {
        const lsServer = await GetById(url, id);
        console.log("lsServer = ", lsServer);
        if (lsServer.status === 200) {
            setEntidad(lsServer.data);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    return (
        <>
            {entidad.length !== 0 ? children(entidad) : <Cargando />}
        </>
    )
}

export default UpdateData;

UpdateData.propTypes = {
    children: PropTypes.node,
    url: PropTypes.string.isRequired
};
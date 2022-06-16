import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { GetById } from 'api/clients/OthersClients';
import Cargando from 'components/loading/Cargando';
import PropTypes from 'prop-types';

const UpdateData = ({ children, url }) => {

    const { id } = useParams();
    const [entidad, setEntidad] = useState([]);

    async function GetAll() {
        try {
            const lsServer = await GetById(url, id);
            if (lsServer.status === 200) {
                setEntidad(lsServer.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    return (
        <Fragment>
            {entidad.length !== 0 ? children(entidad) : <Cargando />}
        </Fragment>
    )
}

export default UpdateData;

UpdateData.propTypes = {
    children: PropTypes.any,
    url: PropTypes.string.isRequired
};
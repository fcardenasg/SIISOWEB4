import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetByIdTypeCatalog } from 'api/clients/TypeCatalogClient';
import Cargando from 'components/Cargando';
import PropTypes from 'prop-types';


const UpdateData = ({ children }) => {

    const { id } = useParams();
    console.log("ID del parametro = ", id);
    const [entidad, setEntidad] = useState([]);
    console.log(" Entidad = ", entidad);

    async function GetAll() {
        const lsServer = await GetByIdTypeCatalog(id);
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
    children: PropTypes.node
};
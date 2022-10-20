import Cargando from "components/loading/Cargando";
import { Fragment } from "react";

const ViewPDF = ({ dataPDF }) => {
    return (
        <Fragment>
            {dataPDF !== null ?
                <object type="application/pdf"
                    data={dataPDF}
                    width="1200"
                    height="400"
                /> : <Cargando />
            }
        </Fragment>
    )
}

export default ViewPDF;
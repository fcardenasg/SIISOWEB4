import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetExcelEmployee } from "api/clients/EmployeeClient";
import { ArrayTodoContrato } from "components/Arrays";
import ControlModal from "components/controllers/ControlModal";
import { CodCatalogo, TitleButton } from "components/helpers/Enums";
import { ViewFormat } from "components/helpers/Format";
import SelectOnChange from "components/input/SelectOnChange";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactExport from "react-export-excel";
import AnimateButton from "ui-component/extended/AnimateButton";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const GenerateExcel = ({ setOpenModal, openModal }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsContrato, setLsContrato] = useState([]);
    const [tipoContrato, setTipoContrato] = useState(0);
    const [lsEmployeeExcel, setLsEmployeeExcel] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getAll() {
        try {
            const lsServerTipoContrato = await GetByTipoCatalogoCombo(CodCatalogo.TipoContrato);
            const arrayTipoContrato = lsServerTipoContrato.data.concat(ArrayTodoContrato);
            setLsContrato(arrayTipoContrato);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getDataForExport() {
        try {
            const lsServerExcel = await GetExcelEmployee(tipoContrato);

            if (lsServerExcel.status === 200) {
                setLsEmployeeExcel(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) { }
    }

    const handleClose = () => {
        setTipoContrato(0);
        setOpenModal(false);
    }

    return (
        <Fragment>
            <ControlModal
                title="Generar Excel"
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="tipoContrato"
                            label="Tipo de Contrato"
                            value={tipoContrato}
                            options={lsContrato}
                            onChange={(e) => setTipoContrato(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <AnimateButton>
                            <Button onClick={getDataForExport} size="large" variant="contained" fullWidth>
                                {TitleButton.GenerarExcel}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {statusData ?
                            <ExcelFile element={
                                <AnimateButton>
                                    <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                        {TitleButton.DescargarExcel}
                                    </Button>
                                </AnimateButton>
                            } filename={`LISTA_DE_EMPLEADO_${new Date().toLocaleString()}`}>
                                <ExcelSheet data={lsEmployeeExcel} name="Registro De Empleados">
                                    <ExcelColumn label="Documento" value="documento" />
                                    <ExcelColumn label="Nombres" value="nombres" />
                                    <ExcelColumn label="Fecha Nacimiento" value={(fe) => ViewFormat(fe.fechaNaci)} />
                                    <ExcelColumn label="Type" value="nameType" />
                                    <ExcelColumn label="Departamento" value="nameDepartamento" />
                                    <ExcelColumn label="Area" value="nameArea" />
                                    <ExcelColumn label="SubArea" value="nameSubArea" />
                                    <ExcelColumn label="Grupo" value="nameGrupo" />
                                    <ExcelColumn label="MunicipioNacido" value="nameMunicipioNacido" />
                                    <ExcelColumn label="DptoNacido" value="nameDptoNacido" />
                                    <ExcelColumn label="Fecha De Contrato" value={(fe) => ViewFormat(fe.fechaContrato)} />
                                    <ExcelColumn label="Roster Position" value="nameRosterPosition" />
                                    <ExcelColumn label="Tipo De Contrato" value="nameTipoContrato" />
                                    <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                    <ExcelColumn label="Genero" value="nameGenero" />
                                    <ExcelColumn label="Sede" value="nameSede" />

                                    <ExcelColumn label="Dirección De Residencia" value="direccionResidencia" />
                                    <ExcelColumn label="Dirección De Residencia Trabaja" value="direccionResidenciaTrabaja" />
                                    <ExcelColumn label="Departameto De Residencia Trabaja" value="nameDptoResidenciaTrabaja" />
                                    <ExcelColumn label="Municipio De Residencia Trabaja" value="nameMunicipioResidenciaTrabaja" />
                                    <ExcelColumn label="MunicipioDe Residencia" value="nameMunicipioResidencia" />
                                    <ExcelColumn label="Departamento De Residencia" value="nameDptoResidencia" />

                                    <ExcelColumn label="Celular" value="celular" />
                                    <ExcelColumn label="Eps" value="nameEps" />
                                    <ExcelColumn label="Afp" value="nameAfp" />
                                    <ExcelColumn label="Turno" value="nameTurno" />
                                    <ExcelColumn label="Email" value="email" />
                                    <ExcelColumn label="Telefono De Contacto" value="telefonoContacto" />
                                    <ExcelColumn label="Estado Civil" value="nameEstadoCivil" />
                                    <ExcelColumn label="Empresa" value="empresa" />
                                    <ExcelColumn label="Arl" value="nameArl" />
                                    <ExcelColumn label="Contacto" value="contacto" />
                                    <ExcelColumn label="Escolaridad" value="nameEscolaridad" />
                                    <ExcelColumn label="Cesantias" value="nameCesantias" />
                                    <ExcelColumn label="Rotation" value="rotation" />
                                    <ExcelColumn label="Pay Status" value="namePayStatus" />
                                    <ExcelColumn label="Fecha Terminación" value={(fe) => ViewFormat(fe.termDate)} />
                                    <ExcelColumn label="Bandera" value="nameBandera" />
                                    <ExcelColumn label="Ges" value="nameGes" />
                                    <ExcelColumn label="Oficio" value="nameOficio" />

                                    <ExcelColumn label="Usuario Registro" value="UsuarioRegistro" />
                                    <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                    <ExcelColumn label="Usuario Modifico" value="UsuarioModifico" />
                                    <ExcelColumn label="Fecha Modifico" value={(fe) => ViewFormat(fe.fechaModifico)} />
                                </ExcelSheet>
                            </ExcelFile> : null
                        }
                    </Grid>
                </Grid>
            </ControlModal>
        </Fragment>
    );
}

export default GenerateExcel;
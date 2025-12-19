import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetIELHistoriaLaboralDLTD, GetIELHistoriaLaboralOtrosEmpresas } from 'api/clients/InvestigationClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { ViewFormat } from 'components/helpers/Format';
import EmptyState from 'components/loading/EmptyState';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import { StyledTableCell, StyledTableRow } from './methods';

export function TableDLTD({ documento }) {
  const [listHL, setListHL] = useState([]);
  const idIEL = useFormContext().getValues('id');

  useEffect(() => {
    async function getData() {
      try {
        if (documento) {
          var statusData = idIEL ? true : false;
          const response = await GetIELHistoriaLaboralDLTD(documento, statusData);
          if (response.data.exito) {
            const mappedData = (response.data.datos || []).map((item) => ({
              id: item.id,
              fecha: item.fecha,
              cargo: item.nameCargo,
              turno: item.nameTurno,
              rotacion: item.nameRotacion,
              anios: item.anio,
              meses: item.meses
            }));

            setListHL(mappedData);
          }
        }
      } catch (error) {
        toast.error("Error al cargar la historia laboral DLTD");
      }
    }

    getData();
  }, [documento, idIEL]);

  return (
    <SubCard content={false}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="historia laboral table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha de ingreso</StyledTableCell>
              <StyledTableCell>Cargo inicial</StyledTableCell>
              <StyledTableCell>Turno</StyledTableCell>
              <StyledTableCell>Rotación</StyledTableCell>
              <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHL.length > 0 ? (
              listHL.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{ViewFormat(item.fecha)}</StyledTableCell>
                  <StyledTableCell>{item.cargo}</StyledTableCell>
                  <StyledTableCell>{item.turno}</StyledTableCell>
                  <StyledTableCell>{item.rotacion}</StyledTableCell>
                  <StyledTableCell>{`${item.anios} año(s) / ${item.meses} mes(es)`}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <EmptyState seeSubtitle={false} title="No hay registros" />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </SubCard>
  );
}

export function TableOtherCompanies({ documento }) {
  const [listHLOE, setListHLOE] = useState([]);
  const idIEL = useFormContext().getValues('id');

  useEffect(() => {
    async function getData() {
      try {
        if (documento) {
          var statusData = idIEL ? true : false;
          const response = await GetIELHistoriaLaboralOtrosEmpresas(documento, statusData);
          if (response.data.exito) {
            const mappedData = response.data.datos.map((item) => ({
              id: item.id,
              empresa: item.empresa,
              cargo: item.cargo,
              anios: item.anio,
              meses: item.meses
            }));

            setListHLOE(mappedData);
          }
        }
      } catch (error) {
        toast.error("Error al cargar la historia laboral de otras empresas");
      }
    }

    getData();
  }, [documento]);

  return (
    <SubCard content={false}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="otras empresas table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Empresa</StyledTableCell>
              <StyledTableCell>Cargo</StyledTableCell>
              <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHLOE.length > 0 ? (
              listHLOE.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.empresa}</StyledTableCell>
                  <StyledTableCell>{item.cargo}</StyledTableCell>
                  <StyledTableCell>
                    {`${item.anios} año(s) / ${item.meses} mes(es)`}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  No hay registros
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </SubCard>
  );
}

export function TableControlMethods({ listMC }) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Control</StyledTableCell>
            <StyledTableCell>Tipo de control</StyledTableCell>
            <StyledTableCell>Observaciones sobre uso brindado</StyledTableCell>
            <StyledTableCell>Observaciones sobre nivel de protección</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listMC?.length > 0 ? (
            listMC.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.nameControl}
                </StyledTableCell>
                <StyledTableCell>{row.nameTipoControl}</StyledTableCell>
                <StyledTableCell>{row.observacionesUso}</StyledTableCell>
                <StyledTableCell>{row.observacionesProteccion}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                <EmptyState seeSubtitle={false} title="No hay registros" />
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableDiagnosisRating({ methods }) {
  const { control, getValues, setValue } = methods;
  const { fields } = useFieldArray({
    control,
    name: "listCalificacion"
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await GetByTipoCatalogoCombo(4002);
        const lsServerCalificacion = (response.data || []).sort((a, b) => a.value - b.value);

        // 1. Usamos getValues de forma específica
        const currentValues = getValues("listCalificacion");

        // Solo inicializamos si el array está vacío o no existe
        if (!currentValues || currentValues.length === 0) {
          const initialRows = lsServerCalificacion.map((item) => ({
            calificacion: item.value,
            nombreCalificacion: item.label,
            entidad: null,
            fechaCalificacion: null,
            origen: null,
            dictamen: null
          }));

          // 2. CAMBIO CLAVE: Usar setValue en lugar de reset
          // Esto actualiza SOLO la lista sin tocar el resto de los campos (como 'documento')
          setValue("listCalificacion", initialRows, { shouldDirty: false, shouldValidate: false });
        }
      } catch (error) {
        console.error("Error cargando catálogo:", error);
      }
    }

    getData();
    // 3. Limpiamos dependencias: setValue y getValues son estables, 
    // no causarán re-renders infinitos.
  }, [setValue, getValues]);

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', mt: 2 }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Calificación</StyledTableCell>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell>Fecha de calificación</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Dictamen #</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <StyledTableRow key={item?.calificacion}>
              <StyledTableCell sx={{ textTransform: 'capitalize' }}>
                {item?.nombreCalificacion?.toLowerCase()}
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.entidad`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth variant="standard" />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.fechaCalificacion`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      variant="standard"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.origen`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} variant="standard" fullWidth />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.dictamen`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} variant="standard" fullWidth />
                  )}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableCharacterizationAbsenteeism() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Diagnósticos</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Fuente de la información</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Incapacidad (días)</StyledTableCell>
            <StyledTableCell>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.diagnostico}</StyledTableCell>
              <StyledTableCell>{row.fecha}</StyledTableCell>
              <StyledTableCell>{row.fuenteInformacion}</StyledTableCell>
              <StyledTableCell>{row.origen}</StyledTableCell>
              <StyledTableCell>{row.incapacidad}</StyledTableCell>
              <StyledTableCell>{row.observaciones}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TablePreventiveActions({ methods }) {
  // 1. Desestructuramos setValue en lugar de reset
  const { control, setValue, getValues } = methods;

  const { fields } = useFieldArray({
    control,
    name: "listAspectosConsiderar"
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await GetByTipoCatalogoCombo(CodCatalogo.IEL_ASPCONSI);
        const lsServer = response.data || [];

        const currentValues = getValues("listAspectosConsiderar");

        // Verificamos si la lista ya tiene datos para no sobrescribir si el usuario ya escribió algo
        if (!currentValues || currentValues.length === 0) {
          const initialRows = lsServer.map((item) => ({
            aspectoConsiderar: item.value,
            nombreAspectoConsiderar: item.label,
            opcion: false,
            observacion: null
          }));

          // 2. Usamos setValue con la ruta específica. 
          // Esto NO toca el 'documento' ni el 'id' del formulario.
          setValue("listAspectosConsiderar", initialRows, {
            shouldValidate: false,
            shouldDirty: false // Evita que el formulario se marque como "tocado" solo por cargar el catálogo
          });
        }
      } catch (error) {
        toast.error("Error al obtener las acciones preventivas");
      }
    }

    getData();
    // 3. Dependencias limpias
  }, [setValue, getValues]);

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="preventive actions table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '30%' }}>Aspectos para considerar</StyledTableCell>
            <StyledTableCell sx={{ width: '15%' }}>Si / No</StyledTableCell>
            <StyledTableCell sx={{ width: '55%' }}>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.nombreAspectoConsiderar}
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listAspectosConsiderar.${index}.opcion`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label={field.value ? 'Si' : 'No'}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listAspectosConsiderar.${index}.observacion`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={4}
                    />
                  )}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
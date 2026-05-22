import { useEffect, useRef, useState } from 'react';

// material-ui
import { Button, Dialog, useMediaQuery } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';



import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CalendarStyled from './CalendarStyled';
import Toolbar from './Toolbar';
import AddEventForm from './AddEventForm';



import swal from 'sweetalert';
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';
import { ajustarFechaUTC, linkAgoramedico, linkAgorapaciente } from '../service-calendar/agora';
import { getEvents, addEvent, updateEvent, removeEvent } from '../service-calendar/calendar';
import useAuth from 'hooks/useAuth';
import { MessageDelete, ParamDelete, MessageError, MessageSuccess } from 'components/alert/AlertAll';

const Calendar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [chosenDate, setChosenDate] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [date, setDate] = useState(new Date());
    const [save, setSave] = useState(false);
    const usuario = useAuth()
    const calendarRef = useRef(null);
    const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [events, setEvents] = useState([]);

    const getAll = async (filtercitas) => {
        const response = await getEvents(filtercitas);
        setEvents(response);
    };

    useEffect(() => {
        if (usuario) {
            const filtercitas = {
                idmedico: usuario?.user?.id.toString(),
                fechaactual: date.toISOString()
            }

            getAll(filtercitas);
        }
    }, [date, save]);

    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    const handleDateToday = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    useEffect(() => {
        handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    }, [matchSm]);

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };


    const handleDateClick = (arg) => {
        if (!ajustarFechaUTC(arg.date)) {
            setIsModalOpen(false);
            setErrorMessage("¡No se puede seleccionar una fecha anterior a la actual!")
            setOpenError(true)
            return;

        } else {
            setIsModalOpen(true);
            setChosenDate(new Date(arg.date))
        }
    }

    const handleEventSelect = (arg) => {

        if (arg.event.id) {
            const selectEvent = events.find((_event) => _event.id == arg.event.id);
            setSelectedEvent(selectEvent);
            setIsModalOpen(true);
            return;
        } else {
            if (!ajustarFechaUTC(arg.date)) {
                setErrorMessage("¡No se puede seleccionar una fecha anterior a la actual!")
                setOpenError(true)
                return;
            } else {
                setIsModalOpen(true);
                setChosenDate(new Date(arg.date))
                setSelectedEvent(null);
            }
        }
    };

    const handleEventUpdate = async ({ event }) => {
        try {
            updateEvent({
                eventId: event.id,
                update: {
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end
                }
            });
        } catch (err) {
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleEventCreate = async (data) => {
        const fechaSeleccionada = new Date(data?.fecha);
        const fechaAjustada = new Date(fechaSeleccionada.getTime() - fechaSeleccionada.getTimezoneOffset() * 60000);

        const uniqueId = Date.now();

        const formtData = {
            ...data,
            fecha: fechaAjustada.toISOString(),
            usuarioregistro: usuario?.user?.nameuser,
            estado: true,
            url: linkAgoramedico(fechaAjustada.toISOString(), data, uniqueId),
            urlpaciente: linkAgorapaciente(fechaAjustada.toISOString(), uniqueId),
        };

        try {
            const response = await addEvent(formtData);
            if (response.exito) {
                setOpenSuccess(true)
                setSave(!save)
                handleModalClose();
            } else {
                setErrorMessage(response.datos)
                setOpenError(true)
            }
        } catch (error) {
        }

    };

    const handleUpdateEvent = async (eventId, data) => {
        const fechaSeleccionada = new Date(data?.fecha);
        const fechaAjustada = new Date(fechaSeleccionada.getTime() - fechaSeleccionada.getTimezoneOffset() * 60000);

        const uniqueId = Date.now();

        const formtData = {
            ...data,
            id: eventId,
            fecha: fechaAjustada.toISOString(),
            usuarioedicion: usuario?.user?.nameuser,
            estado: true,
            url: linkAgoramedico(fechaAjustada.toISOString(), data, uniqueId),
            urlpaciente: linkAgorapaciente(fechaAjustada.toISOString(), uniqueId),
        };

        try {
            const response = await updateEvent(formtData);
            if (response.exito) {
                setOpenSuccess(true)
                setSave(!save)
                handleModalClose();
            } else {
                setErrorMessage(response.datos)
                setOpenError(true)
            }

        } catch (error) {
            setErrorMessage("Error al actualizar la cita")
            setOpenError(true)
        }
    };

    const handleEventDelete = async (id) => {
        swal(ParamDelete).then(async (willDelete) => {
            if (willDelete) {
                removeEvent(id);
                setOpenDelete(true);
                handleModalClose();
                setSave(!save)
            }
        });
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <MainCard
                title="Agenda de citas"
                secondary={
                    <Button color="secondary" variant="contained" onClick={handleAddClick}>
                        <AddAlarmTwoToneIcon fontSize="small" sx={{ mr: 0.75 }} />
                        Añadir cita
                    </Button>
                }
            >
                <CalendarStyled>
                    <Toolbar
                        date={date}
                        view={view}
                        onClickNext={handleDateNext}
                        onClickPrev={handleDatePrev}
                        onClickToday={handleDateToday}
                        onChangeView={handleViewChange}
                    />
                    <SubCard>
                        <FullCalendar
                            weekends
                            editable
                            droppable
                            selectable
                            locale={esLocale}
                            events={events}
                            ref={calendarRef}
                            rerenderDelay={10}
                            initialDate={date}
                            initialView={view}
                            dayMaxEventRows={3}
                            eventDisplay="block"
                            headerToolbar={false}
                            allDayMaintainDuration
                            eventResizableFromStart
                            eventDrop={handleEventUpdate}
                            eventClick={handleEventSelect}
                            eventResize={handleEventUpdate}
                            dateClick={handleDateClick}
                            height={matchSm ? 'auto' : 720}
                            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                            eventTimeFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: 'short',
                                hour12: true
                            }}
                            eventContent={(arg) => (
                                <div className="fc-event-custom">
                                    <div className="fc-event-title">{arg.event.title}</div>
                                    <div className="fc-event-time">{arg.timeText}</div>
                                </div>
                            )}
                        />
                    </SubCard>
                </CalendarStyled>

                <Dialog maxWidth="lg" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                    {isModalOpen && (
                        <AddEventForm
                            event={selectedEvent}
                            listEvents={events}
                            range={selectedRange}
                            chosenDate={chosenDate}
                            onCancel={handleModalClose}
                            handleDelete={handleEventDelete}
                            handleCreate={handleEventCreate}
                            handleUpdate={handleUpdateEvent}
                        />
                    )}
                </Dialog>
            </MainCard>
        </>
    );
};

export default Calendar;

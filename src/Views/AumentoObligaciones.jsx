import { useState } from "react";
import CampoInput from "../components/CampoInput";
import CampoSelect from "../components/CampoSelect";
import ModalFormulario from "../components/ModalFormulario";
import DomicilioFiscal from "../components/DomicilioFiscal";
import IdentificacionContribuyente from "../components/IdentificacionContribuyente";
import HeaderModulo from "../components/HeaderModulo";

import {
    Search,
    Users,
    User,
    FileText,
    Briefcase,
    CheckCircle,
    Building2,
    Smartphone,
    BookUser,
    ChevronDown,
    Pencil,
    Trash2,
    AlertTriangle,
    Home,
    MapPin,
    Copy,
    ArrowRight,
    FilePenLine,
    ClipboardList,
    UserRound,
    FileBadge,
    ScrollText,
    Upload,
    UserPlus,
    X,
    Save,
    Plus,
    FileWarning,
    BriefcaseBusiness,
    PieChart,
    Percent,
    ChevronUp,
    ReceiptText,
    CalendarDays
} from "lucide-react";
import { Fragment } from "react";

export default function AumentoObligaciones() {

    const [obligacionAbierta, setObligacionAbierta] = useState(null);
    const [mostrarSeleccion, setMostrarSeleccion] = useState(false);
    const [obligacionSeleccionada, setObligacionSeleccionada] = useState("");
    const [obligacionConfirmada, setObligacionConfirmada] = useState(false);
    const [actividadEditando, setActividadEditando] = useState(null);
    const [mostrarCaptura, setMostrarCaptura] = useState(false);

    const [actividadEconomica, setActividadEconomica] = useState("");

    const [porcentaje, setPorcentaje] = useState("");

    const [mostrarTrabajadores, setMostrarTrabajadores] = useState(false);

    const [trabajadoresTemporales, setTrabajadoresTemporales] = useState(0);

    const [trabajadoresPermanentes, setTrabajadoresPermanentes] = useState(0);

    const [actividadesAgregadas, setActividadesAgregadas] = useState([]);
    const [porcentajeAcumulado, setPorcentajeAcumulado] = useState(0);
    const opcionesObligaciones = [
        { value: "", label: "Seleccione..." },
        { value: "nominas", label: "Impuesto Sobre Nóminas" },
        { value: "hospedaje", label: "Impuesto Sobre Hospedaje" },
        { value: "erogaciones", label: "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal" }
    ];

    const opcionesActividades =
        [
            { value: "", label: "Seleccione..." },
            { value: "comercio", label: "Comercio" },
            { value: "servicios", label: "Servicios Profesionales" },
            { value: "manufactura", label: "Manufactura" }
        ];


    const [totalTemporales, setTotalTemporales] = useState(0);
    const [sinRegistros, setSinRegistros] = useState(true);
    const [datosContribuyente, setDatosContribuyente] = useState({
        nombreComercial: "",
        correo: "",
        telefono: "",
        fechaNacimiento: "",
    });
    const [totalPermanentes, setTotalPermanentes] = useState(0);
    const confirmarEliminar = () => {

        const nuevasActividades = actividadesAgregadas.filter(

            actividad => actividad.id !== actividadEliminar.id

        );

        setActividadesAgregadas(nuevasActividades);

        recalcularPorcentaje(nuevasActividades);

        recalcularTrabajadores(nuevasActividades);

        setModalEliminar(false);

        setActividadEliminar(null);

    };
    const recalcularPorcentaje = (lista) => {

        const total = lista.reduce(

            (suma, actividad) =>

                suma + Number(actividad.porcentaje),

            0

        );

        setPorcentajeAcumulado(total);

    };
    const recalcularTrabajadores = (lista) => {

        const temporales = lista.reduce(

            (suma, actividad) =>

                suma + Number(actividad.temporales || 0),

            0

        );

        const permanentes = lista.reduce(

            (suma, actividad) =>

                suma + Number(actividad.permanentes || 0),

            0

        );

        setTotalTemporales(temporales);

        setTotalPermanentes(permanentes);

    };

    const agregarActividad = () => {

        if (!actividadEconomica || !porcentaje) {
            console.log("Actividad Económica:", actividadEconomica);
            console.log("Porcentaje:", porcentaje);
            alert("Complete la información requerida para continuar.");

            return;

        }

        const nuevaActividad = {

            id: Date.now(),

            obligacion: obligacionSeleccionada,

            actividad: actividadEconomica,

            porcentaje: Number(porcentaje),

            fecha: new Date().toLocaleDateString(),

            erogaciones:
                obligacionSeleccionada ===
                "erogaciones",

            temporales: Number(trabajadoresTemporales || 0),

            permanentes: Number(trabajadoresPermanentes || 0),

        };

        const lista = [...actividadesAgregadas, nuevaActividad];

        setActividadesAgregadas(lista);

        recalcularPorcentaje(lista);

        recalcularTrabajadores(lista);

        // Limpiar formulario

        setActividadEconomica("");
        setPorcentaje("");

        setTrabajadoresTemporales(0);
        setTrabajadoresPermanentes(0);

    };
    const guardarCambios = () => {

        setActividadEditando(null);

        recalcularPorcentaje(actividadesAgregadas);

        recalcularTrabajadores(actividadesAgregadas);

    };
    const [modalEliminar, setModalEliminar] = useState(false);
    const actualizarActividad = (id, campo, valor) => {

        setActividadesAgregadas((prev) =>
            prev.map((actividad) =>
                actividad.id === id
                    ? {
                        ...actividad,
                        [campo]: valor,
                    }
                    : actividad
            )
        );

    };

    const [actividadEliminar, setActividadEliminar] = useState(null);
    const obligaciones = [
        {
            id: 1,
            nombre: "IMPUESTO SOBRE NÓMINAS",
            estatus: "ACTIVA",
            porcentaje: "100 %",
            actividades: [
                {
                    id: 1,
                    nombre: "Servicios Profesionales",
                    porcentaje: "70 %",
                },
                {
                    id: 2,
                    nombre: "Comercio",
                    porcentaje: "30 %",
                },
            ],
            declaraciones: {
                ejercicio: 2026,
                periodos: [
                    "ENERO - FEBRERO",
                    "MARZO - ABRIL",
                    "MAYO - JUNIO",
                ],
            },
        },

        {
            id: 2,
            nombre: "IMPUESTO SOBRE HOSPEDAJE",
            estatus: "ACTIVA",
            porcentaje: "100 %",
            actividades: [
                {
                    id: 1,
                    nombre: "Hotel",
                    porcentaje: "100 %",
                },
            ],
            declaraciones: {
                ejercicio: 2025,
                periodos: ["ANUAL"],
            },
        },
    ];
    const [expandida, setExpandida] = useState(false);
    return (

        <div className="space-y-6">

            {/*======================================================
                            HEADER
      =======================================================*/}

            <HeaderModulo

                titulo="Aumento de Obligaciones"

                descripcion="Seleccione y registre las obligaciones fiscales que serán incorporadas al contribuyente conforme a la información proporcionada."

                icono="PlusCircle"

                color="emerald"

            />

            {/*======================================================
                  OBLIGACIONES DEL CONTRIBUYENTE 2
      =======================================================*/}
            <div className="bg-white rounded-xl border shadow-sm">

                <div className="border-b px-6 py-5 flex justify-between">
                    <div className="">


                        <h3 className="font-semibold text-slate-800">

                            Obligaciones del Contribuyente

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                            Consulte las obligaciones fiscales asociadas al contribuyente actualmente

                        </p>
                    </div>
                    <button
                        onClick={() => setMostrarSeleccion(true)}
                        className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg transition"
                    >

                        <Plus size={18} />

                        Aumentar Obligación

                    </button>
                </div>

                <div className="p-6 space-y-5">

                    <div className="space-y-4">

                        {obligaciones.map((obligacion) => {
                            const totalParticipacion = obligacion.actividades.reduce(
                                (total, actividad) =>
                                    total + parseFloat(actividad.porcentaje),
                                0
                            );

                            const totalTemporales = obligacion.actividades.reduce(
                                (total, actividad) =>
                                    total + Number(actividad.temporales ?? 0),
                                0
                            );

                            const totalPermanentes = obligacion.actividades.reduce(
                                (total, actividad) =>
                                    total + Number(actividad.permanentes ?? 0),
                                0
                            );
                            return (
                                <div
                                    key={obligacion.id}
                                    className="bg-white rounded-xl border shadow-sm overflow-hidden"
                                >

                                    <div className="px-6 py-5 flex justify-between items-center">

                                        <div className="flex items-start gap-4">

                                            <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                                <BriefcaseBusiness
                                                    size={22}
                                                    className="text-sky-700"
                                                />

                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-slate-800 text-lg">

                                                    {obligacion.nombre}

                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1">

                                                    {obligacion.actividades.length} actividad(es) económica(s)

                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                setExpandida(
                                                    expandida === obligacion.id
                                                        ? null
                                                        : obligacion.id
                                                )
                                            }
                                            className="rounded-lg border p-2 hover:bg-slate-100 transition"
                                        >

                                            {expandida === obligacion.id ? (

                                                <ChevronUp size={20} />

                                            ) : (

                                                <ChevronDown size={20} />

                                            )}

                                        </button>

                                    </div>

                                    {/*======================================================
            RESUMEN
        ======================================================*/}

                                    <div className="px-6 pb-6">

                                        <div className="flex flex-wrap gap-3 mt-4">

                                            {/* Actividades */}

                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">

                                                <BriefcaseBusiness size={16} />

                                                {obligacion.actividades.length} Actividad(es) Económica(s)

                                            </span>

                                            {/* Participación */}

                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium">

                                                <Percent size={16} />

                                                Participación: {totalParticipacion}%

                                            </span>

                                            {/* Trabajadores */}

                                            {obligacion.nombre.includes("Erogaciones") && (

                                                <>
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">

                                                        <Users size={16} />

                                                        Temporales { }

                                                    </span>

                                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">

                                                        <Users size={16} />

                                                        Permanentes { }

                                                    </span>
                                                </>

                                            )}

                                        </div>

                                    </div>

                                    {expandida === obligacion.id && (

                                        <div className="border-t bg-slate-50">

                                            <div className="p-6 space-y-3">

                                                <h4 className="font-semibold text-slate-700">

                                                    Actividades Económicas

                                                </h4>

                                                <p className="text-sm text-slate-500">

                                                    Consulte la información correspondiente a las actividades económicas asociadas a esta obligación fiscal.

                                                </p>

                                                <div className="space-y-4">

                                                    {/* Encabezado */}

                                                    <div className="grid grid-cols-[1fr_180px] px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">

                                                        <span>Actividad Económica</span>

                                                        <span className="text-right">

                                                            Participación

                                                        </span>

                                                    </div>

                                                    {/* Registros */}

                                                    <div className="space-y-3">

                                                        {obligacion.actividades.map((actividad) => (

                                                            <div
                                                                key={actividad.id}
                                                                className="bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition"
                                                            >

                                                                <div className="grid grid-cols-[1fr_180px] items-center">

                                                                    {/* Nombre */}

                                                                    <div>

                                                                        <h4 className="font-medium text-slate-800">

                                                                            {actividad.nombre}

                                                                        </h4>

                                                                    </div>

                                                                    {/* Porcentaje */}

                                                                    <div className="flex justify-end">

                                                                        <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 font-semibold text-sky-700">

                                                                            {actividad.porcentaje}

                                                                        </span>

                                                                    </div>

                                                                </div>

                                                                {"temporales" in actividad && (

                                                                    <div className="flex gap-3 mt-4">

                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">

                                                                            <Users size={15} />

                                                                            Temp.

                                                                            <span className="font-bold">

                                                                                {actividad.temporales}

                                                                            </span>

                                                                        </span>

                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700">

                                                                            <Users size={15} />

                                                                            Perm.

                                                                            <span className="font-bold">

                                                                                {actividad.permanentes}

                                                                            </span>

                                                                        </span>

                                                                    </div>

                                                                )}

                                                            </div>

                                                        ))}

                                                    </div>

                                                    {/* <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">

                                                        <div className="grid md:grid-cols-3 gap-6">

                                                            <div>

                                                                <p className="text-xs uppercase tracking-wide text-slate-500">

                                                                    Participación Total

                                                                </p>

                                                                <p className="mt-2 text-2xl font-bold text-sky-700">

                                                                    {totalParticipacion}%

                                                                </p>

                                                            </div>

                                                            {totalTemporales > 0 && (

                                                                <div>

                                                                    <p className="text-xs uppercase tracking-wide text-slate-500">

                                                                        Trabajadores Temporales

                                                                    </p>

                                                                    <p className="mt-2 text-2xl font-bold text-orange-600">

                                                                        {totalTemporales}

                                                                    </p>

                                                                </div>

                                                            )}

                                                            {totalPermanentes > 0 && (

                                                                <div>

                                                                    <p className="text-xs uppercase tracking-wide text-slate-500">

                                                                        Trabajadores Permanentes

                                                                    </p>

                                                                    <p className="mt-2 text-2xl font-bold text-emerald-600">

                                                                        {totalPermanentes}

                                                                    </p>

                                                                </div>

                                                            )}

                                                        </div>

                                                    </div> */}
                                                </div>
                                            </div>

                                        </div>

                                    )}

                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>
            {/*======================================================
                OBLIGACIÓN A AUMENTAR
======================================================*/}

            {mostrarSeleccion && (

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="border-b px-6 py-5 flex items-center gap-3">

                        <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">

                            <BriefcaseBusiness
                                size={20}
                                className="text-sky-700"
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-800">

                                Obligación a Aumentar

                            </h3>

                            <p className="text-sm text-slate-500 mt-1">

                                Seleccione la obligación fiscal que desea incorporar
                                al contribuyente.

                            </p>

                        </div>

                    </div>

                    <div className="p-6">

                        <div className="grid md:grid-cols-1 gap-6">

                            <CampoSelect
                                etiqueta="Obligación Fiscal"
                                obligatorio
                                value={obligacionSeleccionada}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    setObligacionSeleccionada(value);

                                }}
                                opciones={opcionesObligaciones}
                                disabled={obligacionConfirmada}
                            />

                        </div>

                        <div className="flex justify-end mt-8">

                            {!obligacionConfirmada ? (

                                <button
                                    type="button"
                                    disabled={!obligacionSeleccionada}
                                    onClick={() => {

                                        setObligacionConfirmada(true);
                                        setMostrarCaptura(true);

                                    }}
                                    className="px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white disabled:bg-slate-300"
                                >

                                    Seleccionar Obligación

                                </button>

                            ) : (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setObligacionConfirmada(false);

                                        setMostrarCaptura(false);

                                        setMostrarTrabajadores(false);

                                        setObligacionSeleccionada("");

                                    }}
                                    className="px-6 py-3 rounded-lg border hover:bg-slate-50"
                                >

                                    Cambiar Selección

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

            {/*======================================================
            CAPTURA DE ACTIVIDAD ECONÓMICA
======================================================*/}

            {mostrarCaptura && (

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="border-b px-6 py-5 flex items-center gap-3">

                        <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">

                            <BriefcaseBusiness
                                size={20}
                                className="text-emerald-700"
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-800">

                                Captura de Actividad Económica

                            </h3>

                            <p className="text-sm text-slate-500 mt-1">

                                Capture la información correspondiente a la actividad
                                económica que será asociada a la obligación fiscal.

                            </p>

                        </div>

                    </div>

                    <div className="p-6">

                        <div className="grid md:grid-cols-2 gap-6">

                            <CampoSelect
                                etiqueta="Actividad Económica"
                                obligatorio
                                value={actividadEconomica}
                                onChange={(e) => {

                                    const valor = e.target.value;

                                    setActividadEconomica(valor);

                                    setMostrarTrabajadores(
                                        obligacionSeleccionada === "erogaciones"
                                    );

                                }}
                                opciones={opcionesActividades}
                            />


                            <CampoInput
                                etiqueta="Porcentaje de Participación"
                                obligatorio
                                value={porcentaje}
                                onChange={(e) => setPorcentaje(e.target.value)}
                            />
                            {obligacionSeleccionada === "erogaciones" && (
                                <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                                    <CampoInput
                                        etiqueta="Trabajadores Temporales"
                                        value={trabajadoresTemporales}
                                        onChange={(e) => setTrabajadoresTemporales(e.target.value)}
                                    />

                                    <CampoInput
                                        etiqueta="Trabajadores Permanentes"
                                        value={trabajadoresPermanentes}
                                        onChange={(e) => setTrabajadoresPermanentes(e.target.value)}
                                    />
                                </div>
                            )
                            }

                        </div>

                        <div className="flex justify-end mt-8">

                            <button
                                type="button"
                                onClick={agregarActividad}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white"
                            >

                                <Plus size={18} />

                                Agregar Actividad Económica

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/*======================================================
            OBLIGACIONES A INCORPORAR
======================================================*/}

            {actividadesAgregadas.length > 0 && (
                <div>
                    <div className={`grid gap-6 ${obligacionSeleccionada === "erogaciones" && obligacionConfirmada
                        ? "lg:grid-cols-2"
                        : "grid-cols-1"
                        }`}
                    >
                        {obligacionSeleccionada === "erogaciones" && obligacionConfirmada && (

                            <div className="bg-white rounded-xl border shadow-sm h-full">

                                <div className="border-b px-6 py-5 flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center">

                                        <Users
                                            size={20}
                                            className="text-violet-700"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">

                                            Información de Trabajadores

                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">

                                            Consulte el número total de trabajadores registrados
                                            para las actividades económicas asociadas a la obligación fiscal.

                                        </p>

                                    </div>

                                </div>

                                <div className="p-6">

                                    <div className="grid md:grid-cols-2 gap-6">

                                        <div className="rounded-xl border bg-sky-50 p-5">

                                            <p className="text-sm text-slate-500">

                                                Total Trabajadores Temporales

                                            </p>

                                            <h2 className="text-3xl font-bold text-sky-700 mt-2">

                                                {totalTemporales}

                                            </h2>

                                        </div>

                                        <div className="rounded-xl border bg-emerald-50 p-5">

                                            <p className="text-sm text-slate-500">

                                                Total Trabajadores Permanentes

                                            </p>

                                            <h2 className="text-3xl font-bold text-emerald-700 mt-2">

                                                {totalPermanentes}

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}

                        {/*======================================================
            PORCENTAJE DE PARTICIPACIÓN
======================================================*/}

                        {mostrarCaptura && (

                            <div className="bg-white rounded-xl border shadow-sm h-full">

                                <div className="border-b px-6 py-5 flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">

                                        <PieChart
                                            size={20}
                                            className="text-amber-700"
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">

                                            Porcentaje de Participación

                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">

                                            Consulte el porcentaje acumulado correspondiente
                                            a las actividades económicas registradas.

                                        </p>

                                    </div>

                                </div>

                                <div className="p-6 space-y-6">

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <div className="rounded-xl border p-5 bg-slate-50">

                                            <p className="text-sm text-slate-500">

                                                Porcentaje Acumulado

                                            </p>

                                            <h2 className="text-3xl font-bold text-slate-800 mt-2">

                                                {porcentajeAcumulado}%

                                            </h2>

                                        </div>

                                        <div className="rounded-xl border p-5 bg-green-50">

                                            <p className="text-sm text-slate-500">

                                                Porcentaje Disponible

                                            </p>

                                            <h2 className="text-3xl font-bold text-green-700 mt-2">

                                                {100 - porcentajeAcumulado}%

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>
                    {/* Actividades agregadas */}
                    <div className="bg-white rounded-xl border shadow-sm mt-6">

                        {/* HEADER */}

                        <div className="border-b px-6 py-5 flex items-center gap-3">

                            <div className="h-10 w-10 rounded-lg bg-cyan-100 flex items-center justify-center">

                                <ClipboardList
                                    size={20}
                                    className="text-cyan-700"
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-800">

                                    Obligaciones a Incorporar

                                </h3>

                                <p className="text-sm text-slate-500 mt-1">

                                    Consulte las relaciones Obligación Fiscal –
                                    Actividad Económica que serán incorporadas al
                                    contribuyente.

                                </p>

                            </div>

                        </div>

                        {/* BODY */}

                        <div className="p-6 space-y-5">

                            {actividadesAgregadas.map((item) => {
                                const actividad = opcionesActividades.find(
                                    op => op.value === item.actividad
                                );

                                const nombreActividad = actividad?.label ?? item.actividad;
                                const nombreObligacion =
                                    opcionesObligaciones.find(
                                        op => op.value === item.obligacion
                                    )?.label ?? item.obligacion;
                                return (
                                    <div
                                        key={item.id}
                                        className="relative flex rounded-xl border overflow-hidden bg-white hover:shadow-md transition"
                                    >

                                        {/* INDICADOR */}

                                        <div className="w-2 bg-cyan-700" />

                                        {/* CONTENIDO */}

                                        <div className="flex-1 p-5">

                                            <div className="flex justify-between">

                                                <div className="space-y-5 flex-1">

                                                    {/* OBLIGACION */}
                                                    <div className="flex flex-wrap items-center gap-3">

                                                        <span className="text-xs uppercase tracking-wide text-slate-500">

                                                            Obligación Fiscal

                                                        </span>

                                                        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sky-700 font-semibold">

                                                            <ReceiptText size={16} />

                                                            {nombreObligacion}

                                                        </span>

                                                    </div>

                                                    {/* ACTIVIDAD */}

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                            Actividad Económica

                                                        </p>

                                                        <div className="flex flex-wrap gap-2">

                                                            <span
                                                                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-sky-100
                px-4
                py-2
                text-sm
                font-semibold
                text-sky-700
            "
                                                            >

                                                                {nombreActividad}

                                                            </span>

                                                        </div>

                                                    </div>
                                                    {/* GRID */}

                                                    <div className="grid md:grid-cols-2 gap-5">

                                                        {actividadEditando === item.id ? (

                                                            <CampoInput
                                                                etiqueta="Porcentaje de Participación"
                                                                value={item.porcentaje}
                                                                onChange={(e) =>
                                                                    actualizarActividad(
                                                                        item.id,
                                                                        "porcentaje",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            <div>

                                                                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                                    Participación

                                                                </p>

                                                                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-700">

                                                                    <Percent size={15} />

                                                                    {item.porcentaje} %

                                                                </span>

                                                            </div>

                                                        )}
                                                        <div>

                                                            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                                Inicio de Operación

                                                            </p>

                                                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-700">

                                                                <CalendarDays size={15} />

                                                                {item.fecha}

                                                            </span>

                                                        </div>
                                                    </div>

                                                    {/* TRABAJADORES */}

                                                    {item.erogaciones && (
                                                        <div>
                                                            {actividadEditando == item.id ? (

                                                                <div className="grid md:grid-cols-2 gap-5">

                                                                    <CampoInput
                                                                        etiqueta="Trabajadores Temporales"
                                                                        value={item.temporales}
                                                                        onChange={(e) => actualizarActividad(item.id, "temporales", e.target.value)}
                                                                    />

                                                                    <CampoInput
                                                                        etiqueta="Trabajadores Permanentes"
                                                                        value={item.permanentes}
                                                                        onChange={(e) => actualizarActividad(item.id, "permanentes", e.target.value)}
                                                                    />

                                                                </div>


                                                            ) : (
                                                                <div className="flex flex-col gap-1">
                                                                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                                        TRABAJADORES    

                                                                    </p>
                                                                    <div className="flex flex-wrap gap-3">

                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 font-medium text-orange-700">

                                                                            <Users size={15} />

                                                                            Temporales

                                                                            <span className="font-bold">

                                                                                {item.temporales}

                                                                            </span>

                                                                        </span>

                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-medium text-emerald-700">

                                                                            <Users size={15} />

                                                                            Permanentes

                                                                            <span className="font-bold">

                                                                                {item.permanentes}

                                                                            </span>

                                                                        </span>

                                                                    </div>
                                                                </div>

                                                            )}
                                                        </div>
                                                    )}

                                                </div>


                                                <div className="flex flex-col gap-2 ml-8 justify-end">
                                                    {actividadEditando === item.id ? (

                                                        <div className="flex gap-2">

                                                            <button

                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white"
                                                                onClick={guardarCambios}
                                                            >
                                                                <Save size={18} />
                                                                Guardar Cambios
                                                            </button>

                                                            <button
                                                                onClick={() => setActividadEditando(null)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border"
                                                            >
                                                                <X size={18} />
                                                                Cancelar

                                                            </button>

                                                        </div>

                                                    ) : (
                                                        // botones editar eliminar
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => setActividadEditando(item.id)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-50"
                                                            >
                                                                <Pencil size={18} />
                                                                Editar
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setActividadEliminar(item);
                                                                    setModalEliminar(true);
                                                                }}
                                                                className="inline-flex items-center gap-2 border rounded-lg px-4 py-2 text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 size={18} />
                                                                Eliminar
                                                            </button>
                                                        </>
                                                    )}


                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>


            )}
            {/*======================================================
            MODAL ELIMINAR ACTIVIDAD
======================================================*/}

            {modalEliminar && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">

                        {/* HEADER */}

                        <div className="px-6 py-5 border-b flex items-center gap-3">

                            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">

                                <Trash2
                                    size={22}
                                    className="text-red-600"
                                />

                            </div>

                            <div>

                                <h3 className="text-lg font-semibold">

                                    Eliminar Actividad Económica

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Confirme la eliminación del registro.

                                </p>

                            </div>

                        </div>

                        {/* BODY */}

                        <div className="p-6">

                            <div className="rounded-lg border bg-slate-50 p-5">

                                <p className="text-center text-slate-700">

                                    ¿DESEA ELIMINAR LA ACTIVIDAD ECONÓMICA
                                    SELECCIONADA?

                                </p>

                            </div>

                            {actividadEliminar && (

                                <div className="mt-6 rounded-xl border p-5">

                                    <div className="space-y-4">

                                        <div>

                                            <span className="text-xs uppercase text-slate-500">

                                                Obligación Fiscal

                                            </span>

                                            <p className="font-semibold">

                                                {actividadEliminar.obligacion}

                                            </p>

                                        </div>

                                        <div>

                                            <span className="text-xs uppercase text-slate-500">

                                                Actividad Económica

                                            </span>

                                            <p className="font-medium">

                                                {actividadEliminar.actividad}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                        {/* FOOTER */}

                        <div className="border-t px-6 py-4 flex justify-end gap-3">

                            <button

                                onClick={() => setModalEliminar(false)}

                                className="px-5 py-2 rounded-lg border hover:bg-slate-50"

                            >

                                Cancelar

                            </button>

                            <button

                                onClick={confirmarEliminar}

                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"

                            >

                                Eliminar

                            </button>

                        </div>

                    </div>

                </div>

            )}
            <ModalFormulario
                abierto={sinRegistros}
                onClose={() => setSinRegistros(false)}
                titulo="CAPTURA DE INFORMACIÓN DEL CONTRIBUYENTE"
                descripcion="Capture la información del contribuyente y seleccione el domicilio para notificaciones."
                icono={<Home className="text-white" size={28} />}
                textoBoton="Cerrar"
            >

                <IdentificacionContribuyente
                    datos={datosContribuyente}
                    setDatos={setDatosContribuyente}
                />

                <DomicilioFiscal
                    onGuardar={() => { }}
                    onCancelar={() => { }}
                    className="border border-gray-300 shadow-sm"
                    titulo="Domicilio para Notificaciones"
                    descripcion="Seleccione el domicilio que será utilizado para efectos de conservación de la contabilidad y recepción de notificaciones."
                />

            </ModalFormulario>

        </div>

    );

}

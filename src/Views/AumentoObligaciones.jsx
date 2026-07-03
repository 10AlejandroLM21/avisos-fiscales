import { useState } from "react";
import CampoInput from "../Components/CampoInput";
import CampoSelect from "../Components/CampoSelect";
import ModalFormulario from "../components/ModalFormulario";
import DomicilioFiscal from "../components/DomicilioFiscal";
import IdentificacionContribuyente from "../components/IdentificacionContribuyente";
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
    PieChart
} from "lucide-react";

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

    return (

        <div className="space-y-6">

            {/*======================================================
                            HEADER
      =======================================================*/}

            <div className="bg-white rounded-xl border shadow-sm">

                <div className="px-6 py-5 border-b">

                    <h2 className="text-2xl font-semibold text-slate-800">

                        Aumento de Obligaciones

                    </h2>

                    <p className="text-sm text-slate-500 mt-1">

                        Seleccione las obligaciones fiscales y actividades
                        económicas que serán incorporadas al contribuyente.

                    </p>

                </div>

            </div>

            {/*======================================================
                  OBLIGACIONES DEL CONTRIBUYENTE
      =======================================================*/}

            <div className="bg-white rounded-xl border shadow-sm">

                <div className="border-b px-6 py-5 flex justify-between items-center">

                    <div>

                        <h3 className="text-lg font-semibold text-slate-800">

                            Obligaciones del Contribuyente

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                            El contribuyente actualmente cuenta con las siguientes
                            obligaciones fiscales.

                        </p>

                    </div>

                    <button
                        onClick={() => setMostrarSeleccion(true)}
                        className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-5 py-3 rounded-lg transition"
                    >

                        <Plus size={18} />

                        Aumentar Obligación

                    </button>

                </div>

                <div className="p-6 space-y-5">

                    {obligaciones.map((item) => (

                        <div
                            key={item.id}
                            className="rounded-xl border overflow-hidden"
                        >

                            <button
                                onClick={() =>
                                    setObligacionAbierta(
                                        obligacionAbierta === item.id
                                            ? null
                                            : item.id
                                    )
                                }
                                className="w-full p-5 text-left hover:bg-slate-50 transition"
                            >

                                <div className="flex justify-between">

                                    <div className="flex gap-4">

                                        <div className="w-2 rounded-full bg-sky-700" />

                                        <div>

                                            <span className="text-xs uppercase tracking-wide text-slate-500">

                                                Obligación Fiscal

                                            </span>

                                            <h4 className="font-semibold text-slate-800 mt-1">

                                                {item.nombre}

                                            </h4>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">

                                            {item.estatus}

                                        </span>

                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform ${obligacionAbierta === item.id
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />

                                    </div>

                                </div>

                                <div className="grid md:grid-cols-2 gap-5 mt-6">

                                    <div>

                                        <span className="text-xs text-slate-500">

                                            Actividades Económicas

                                        </span>

                                        <p className="font-semibold mt-1">

                                            {item.actividades.length}

                                        </p>

                                    </div>

                                    <div>

                                        <span className="text-xs text-slate-500">

                                            Participación Total

                                        </span>

                                        <p className="font-semibold mt-1">

                                            {item.porcentaje}

                                        </p>

                                    </div>

                                </div>

                            </button>

                            {obligacionAbierta === item.id && (

                                <div className="border-t bg-slate-50 p-6 space-y-6">

                                    {/* ACTIVIDADES */}

                                    <div>

                                        <h5 className="font-semibold text-slate-700 mb-4">

                                            Actividades Económicas

                                        </h5>

                                        <div className="space-y-3">

                                            {item.actividades.map((actividad) => (

                                                <div
                                                    key={actividad.id}
                                                    className="bg-white rounded-lg border p-4 flex justify-between"
                                                >

                                                    <div>

                                                        <p className="font-medium">

                                                            {actividad.nombre}

                                                        </p>

                                                        <span className="text-xs text-slate-500">

                                                            Actividad Económica

                                                        </span>

                                                    </div>

                                                    <div className="text-right">

                                                        <p className="font-semibold">

                                                            {actividad.porcentaje}

                                                        </p>

                                                        <span className="text-xs text-slate-500">

                                                            Participación

                                                        </span>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                    {/* DECLARACIONES */}

                                    <div>

                                        <div className="flex items-center gap-2 mb-4">

                                            <FileWarning
                                                size={18}
                                                className="text-amber-600"
                                            />

                                            <h5 className="font-semibold text-slate-700">

                                                Declaraciones Pendientes

                                            </h5>

                                        </div>

                                        <div className="space-y-3">

                                            {item.declaraciones.periodos.map(
                                                (periodo, index) => (

                                                    <div
                                                        key={index}
                                                        className="bg-white rounded-lg border p-4 flex justify-between"
                                                    >

                                                        <div>

                                                            <p className="font-medium">

                                                                {periodo}

                                                            </p>

                                                            <span className="text-xs text-slate-500">

                                                                Ejercicio {item.declaraciones.ejercicio}

                                                            </span>

                                                        </div>

                                                        <span className="text-red-600 font-medium">

                                                            No Cumplido

                                                        </span>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

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
                                    const opcion = opcionesObligaciones.find(op => op.value === value).label;

                                    console.log(value);       
                                    console.log(opcion.label);   

                                    setObligacionSeleccionada(opcion);
                                }}
                                opciones={opcionesObligaciones}
                                disabled={obligacionConfirmada}
                            >

                            </CampoSelect>

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
                                    const opcion = opcionesActividades.find((op) => op.value === valor).label;

                                    setActividadEconomica(opcion);

                                    if (obligacionSeleccionada === "erogaciones") {

                                        setMostrarTrabajadores(true);

                                    } else {

                                        setMostrarTrabajadores(false);

                                    }

                                }}
                                opciones={opcionesActividades}
                                
                            >

                            </CampoSelect>

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
                INFORMACIÓN DE TRABAJADORES
======================================================*/}

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

                                    {/* <div>

                                <div className="flex justify-between mb-2">

                                    <span className="font-medium">

                                        Participación Acumulada

                                    </span>

                                    <span className="font-semibold text-sky-700">

                                        {porcentajeAcumulado}%

                                    </span>

                                </div>

                                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                                    <div
                                        className="bg-sky-700 h-full transition-all"
                                        style={{
                                            width: `${porcentajeAcumulado}%`,
                                        }}
                                    />

                                </div>

                            </div> */}

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

                            {actividadesAgregadas.map((item) => (

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
                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <div>

                                                        <p className="text-xs uppercase tracking-wide text-slate-500">

                                                            Obligación Fiscal

                                                        </p>

                                                        <p className="font-semibold text-slate-800 mt-1">

                                                            {item.obligacion}

                                                        </p>


                                                    </div>
                                                    <div>

                                                        <p className="text-xs uppercase tracking-wide text-slate-500">

                                                            Inicio de Operación

                                                        </p>

                                                        <p className="font-medium mt-1">

                                                            {item.fecha}

                                                        </p>

                                                    </div>
                                                </div>

                                                {/* ACTIVIDAD */}

                                                <div>

                                                    <p className="text-xs uppercase tracking-wide text-slate-500">

                                                        Actividad Económica

                                                    </p>

                                                    <p className="font-medium mt-1">

                                                        {item.actividad}

                                                    </p>

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
                                                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                                                Participación
                                                            </p>

                                                            <p className="font-medium mt-1">
                                                                {item.porcentaje} %
                                                            </p>
                                                        </div>

                                                    )}

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
                                                            <div className="grid md:grid-cols-2 gap-5">

                                                                <div>

                                                                    <p className="text-xs uppercase tracking-wide text-slate-500">

                                                                        Trabajadores Temporales

                                                                    </p>

                                                                    <p className="font-medium mt-1">

                                                                        {item.temporales}

                                                                    </p>

                                                                </div>

                                                                <div>

                                                                    <p className="text-xs uppercase tracking-wide text-slate-500">

                                                                        Trabajadores Permanentes

                                                                    </p>

                                                                    <p className="font-medium mt-1">

                                                                        {item.permanentes}

                                                                    </p>

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

                            ))}

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
            <div className="bg-white rounded-xl border shadow-sm">

                <div className="px-6 py-5 flex justify-between">

                    <button

                        className="px-6 py-3 rounded-lg border hover:bg-slate-50"

                    >

                        Regresar

                    </button>

                    <button

                        className="px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white"

                    >

                        Siguiente

                    </button>

                </div>

            </div>
        </div>

    );

}
import { useState, useEffect, useRef } from "react";
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
    Pencil,
    Trash2,
    AlertTriangle,
    Home,
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
    CircleCheckBig,
    CircleX,
    ArrowLeft,
    CheckCircle2,
    Eye,
    BadgeCheck,
    Check,
    MapPinned,
    CalendarDays,
    ChevronDown,
    ChevronRight,
    MapPin,
    BriefcaseBusiness,
    Building,
    Plus
} from "lucide-react";
import HeaderModulo from "../components/HeaderModulo";
import DocumentacionRequerida from "../components/DocumentacionRequerida";
const obligacionesDisponibles = [
    "Impuesto Sobre la Renta",
    "Impuesto al Valor Agregado",
    "Impuesto Especial sobre Producción y Servicios",
    "Impuesto sobre Erogaciones",
];

const actividadesEconomicas = [
    "Comercio",
    "Servicios",
    "Industria",
    "Construcción",
    "Servicios profesionales",
    "Comercio al por menor",
];

export default function ObligacionesFiscales() {
    const [mostrarDatosContacto, setMostrarDatosContacto] = useState(true);
    const [mostrarDocumentacion, setMostrarDocumentacion] = useState(false);
    const obligacionesActuales = [
        {
            id: 1,
            obligacion: "IMPUESTO SOBRE EROGACIONES POR REMUNERACIONES AL TRABAJO PERSONAL",
            fechaInicioOperaciones: "01/01/2026",
            trabajadores: true,
            fijo: true,
            actividades: [
                {
                    id: 1,
                    actividadEconomica: "Servicios profesionales",
                    porcentaje: "80%",
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 8,
                },
                {
                    id: 2,
                    actividadEconomica: "Comercio al por menor",
                    porcentaje: "10%",
                    trabajadoresTemporales: 2,
                    trabajadoresPermanentes: 5,
                },
            ],
        },

        {
            id: 2,
            obligacion: "DIVERSIONES Y ESPECTACULOS PUBLICOS",
            fechaInicioOperaciones: "15/02/2026",
            trabajadores: false,
            fijo: true,
            actividades: [
                {
                    id: 3,
                    actividadEconomica: "Comercio al por menor",
                    porcentaje: "10%",
                    trabajadoresTemporales: null,
                    trabajadoresPermanentes: null,
                },
            ],
        },
    ];

    // =====================================================
    // OBLIGACIONES A MODIFICAR
    // Parte de las obligaciones actuales del contribuyente
    // =====================================================

    const [obligaciones, setObligaciones] = useState(() => {

        return obligacionesActuales.map((obligacion) => ({
            id: obligacion.id,
            nombre: obligacion.obligacion,
            fechaInicio: obligacion.fechaInicioOperaciones,
            trabajadores: obligacion.trabajadores,
            fijo: true,
            registros: obligacion.actividades.map((actividad) => ({
                id: actividad.id,

                // Actividad ya vinculada a la obligación
                actividadEconomica: actividad.actividadEconomica,

                // Porcentaje ya registrado
                participacion: actividad.porcentaje.replace("%", ""),

                // Solo aplica para Erogaciones
                trabajadoresTemporales:
                    actividad.trabajadoresTemporales,

                trabajadoresPermanentes:
                    actividad.trabajadoresPermanentes,

                // Fecha perteneciente a la obligación
                fechaInicio:
                    obligacion.fechaInicioOperaciones,
            })),
        }));

    });

    const [obligacionSeleccionada, setObligacionSeleccionada] =
        useState("");

    const siguienteObligacionId =
        obligaciones.length > 0
            ? Math.max(...obligaciones.map((obligacion) => obligacion.id)) + 1
            : 1;

    const [siguienteRegistroId, setSiguienteRegistroId] =
        useState(1);

    // =====================================================
    // AGREGAR OBLIGACIÓN
    // =====================================================

    const agregarObligacion = () => {
        if (!obligacionSeleccionada) {
            return;
        }

        const existe = obligaciones.some(
            (obligacion) =>
                obligacion.nombre === obligacionSeleccionada
        );

        if (existe) {
            alert("La obligación fiscal ya fue agregada.");
            return;
        }

        const siguienteObligacionId =
            obligaciones.length > 0
                ? Math.max(
                    ...obligaciones.map(
                        (obligacion) => obligacion.id
                    )
                ) + 1
                : 1;

        const nuevaObligacion = {
            id: siguienteObligacionId,
            nombre: obligacionSeleccionada,
            fechaInicio: "",
            registros: [],
            fijo: false,
        };

        setObligaciones((actuales) => [
            nuevaObligacion,
            ...actuales,
        ]);

        setObligacionSeleccionada("");
    };
    // =====================================================
    // AGREGAR REGISTRO
    // =====================================================

    const agregarRegistro = (idObligacion) => {

        const obligacion =
            obligaciones.find(
                (item) =>
                    item.id === idObligacion
            );

        if (!obligacion) {
            return;
        }

        const esErogaciones =
            obligacion.nombre ===
            "Impuesto sobre Erogaciones";


        const nuevoRegistro = {

            id: siguienteRegistroId,

            actividadEconomica: "",

            participacion: "",

            trabajadoresTemporales:
                esErogaciones ? 0 : null,

            trabajadoresPermanentes:
                esErogaciones ? 0 : null,

            fechaInicio:
                obligacion.fechaInicio,

        };


        setObligaciones((actuales) =>

            actuales.map((obligacion) => {

                if (
                    obligacion.id !==
                    idObligacion
                ) {
                    return obligacion;
                }

                return {

                    ...obligacion,

                    registros: [
                        ...obligacion.registros,
                        nuevoRegistro,
                    ],

                };

            })

        );


        setSiguienteRegistroId(
            (id) => id + 1
        );
    };

    // =====================================================
    // ACTUALIZAR REGISTRO
    // =====================================================

    const actualizarRegistro = (
        idObligacion,
        idRegistro,
        campo,
        valor
    ) => {

        setObligaciones((actuales) =>
            actuales.map((obligacion) => {

                if (obligacion.id !== idObligacion) {
                    return obligacion;
                }

                return {
                    ...obligacion,

                    registros:
                        obligacion.registros.map(
                            (registro) => {

                                if (
                                    registro.id !== idRegistro
                                ) {
                                    return registro;
                                }

                                return {
                                    ...registro,
                                    [campo]: valor,
                                };
                            }
                        ),
                };
            })
        );
    };

    // =====================================================
    // ELIMINAR REGISTRO
    // =====================================================

    const eliminarRegistro = (
        idObligacion,
        idRegistro
    ) => {

        setObligaciones((actuales) =>
            actuales.map((obligacion) => {

                if (
                    obligacion.id !== idObligacion
                ) {
                    return obligacion;
                }

                return {
                    ...obligacion,

                    registros:
                        obligacion.registros.filter(
                            (registro) =>
                                registro.id !== idRegistro
                        ),
                };
            })
        );
    };

    // =====================================================
    // ELIMINAR OBLIGACIÓN
    // =====================================================

    const eliminarObligacion = (
        idObligacion
    ) => {

        setObligaciones((actuales) =>
            actuales.filter(
                (obligacion) =>
                    obligacion.id !== idObligacion
            )
        );
    };


    const [barraCompacta, setBarraCompacta] = useState(false);

    const barraAumentoRef = useRef(null);
    const barraActualizacionRef = useRef(null);


    const obtenerPorcentajeAcumulado = () => {
        return obligaciones.reduce((total, obligacion) => {
            return total + obligacion.registros.reduce(
                (subtotal, registro) => {
                    return subtotal + (Number(registro.participacion) || 0);
                },
                0
            );
        }, 0);
    };

    const porcentaje = obtenerPorcentajeAcumulado();

    const colorBarra =
        porcentaje < 100
            ? "bg-yellow-500"
            : porcentaje === 100
                ? "bg-green-500"
                : "bg-red-500";

    const porcentajeVisual = Math.min(porcentaje, 100);

    const [tipoOperacion, setTipoOperacion] = useState("");
    useEffect(() => {
        const handleScroll = () => {

            const barra =
                tipoOperacion === "aumento"
                    ? barraAumentoRef.current
                    : tipoOperacion === "actualizacion"
                        ? barraActualizacionRef.current
                        : null;

            if (!barra) return;

            const rect = barra.getBoundingClientRect();

            setBarraCompacta(rect.top <= 16);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tipoOperacion]);
    const [seccionAbierta, setSeccionAbierta] = useState(true);
    return (

        <div className="w-full">
            {/* Header */}
            <HeaderModulo

                titulo="Aumento de obligaciones fiscales"

                // descripcion="Consulte el domicilio fiscal actual y los datos del nuevo domicilio fiscal"

                icono="ReceiptText"

            />
            {/* OBligaciones actuales */}
            <div className="bg-white mt-6 rounded-lg shadow-md">

                <button
                    type="button"
                    onClick={() => setSeccionAbierta(!seccionAbierta)}
                    className="flex w-full items-center justify-between px-6 py-6 text-left bg-slate-100"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <ClipboardList size={18} strokeWidth={2} />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                                Obligaciones fiscales actuales
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                Consulte las obligaciones fiscales vigentes y las actividades económicas asociadas al contribuyente.
                            </p>
                        </div>
                    </div>

                    <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-200 ${seccionAbierta ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {seccionAbierta && (
                    <div className="border-t border-gray-200 px-6 py-4">
                        {obligacionesActuales.length === 0 ? (

                            /* =========================================
                               SIN OBLIGACIONES
                            ========================================= */

                            <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-600">

                                    <Info
                                        size={18}
                                        strokeWidth={2}
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-medium text-blue-900">
                                        El contribuyente no cuenta con obligaciones fiscales registradas
                                    </p>

                                </div>

                            </div>

                        ) : (

                            /* =========================================
                               TABLA
                            ========================================= */

                            <div className="overflow-hidden rounded-lg border border-gray-200">

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[950px]">

                                        <thead>

                                            <tr className="border-b border-gray-200 bg-gray-50">

                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                    Obligaciòn Fiscal
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                    Actividad económica
                                                </th>

                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                    Porcentaje
                                                </th>

                                                <>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                        Trabajadores temporales
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                        Trabajadores permanentes
                                                    </th>
                                                </>


                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                                                    Fecha inicio de operaciones
                                                </th>



                                            </tr>

                                        </thead>

                                        <tbody>

                                            {obligacionesActuales.map((obligacion) => (

                                                <>
                                                    {/* =====================================
                                                FILAS DE ACTIVIDADES
                                            ===================================== */}

                                                    {obligacion.actividades.map(
                                                        (actividad, index) => (

                                                            <tr
                                                                key={actividad.id}
                                                                className="
                                                            border-b
                                                            border-gray-100
                                                            last:border-b-0
                                                            hover:bg-gray-50
                                                        "
                                                            >

                                                                {/* =================================
                                                            OBLIGACIÓN
                                                        ================================= */}

                                                                <td className="px-4 py-3 align-top">

                                                                    {index === 0 ? (

                                                                        <div className="flex items-center gap-2">

                                                                            <span
                                                                                className="
                                                                            inline-flex
                                                                            rounded-md
                                                                            bg-gray-100
                                                                            px-2.5
                                                                            py-1.5
                                                                            text-xs
                                                                            font-semibold
                                                                            text-gray-700
                                                                        "
                                                                            >
                                                                                {obligacion.obligacion}
                                                                            </span>

                                                                        </div>

                                                                    ) : (

                                                                        <span className="text-gray-300">
                                                                            —
                                                                        </span>

                                                                    )}

                                                                </td>


                                                                {/* =================================
                                                            ACTIVIDAD ECONÓMICA
                                                        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    <span className="text-sm text-gray-700">
                                                                        {actividad.actividadEconomica}
                                                                    </span>

                                                                </td>

                                                                {/* =================================
                                                            PORCENTAJE
                                                        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    <span
                                                                        className="
                                                                    inline-flex
                                                                    rounded-full
                                                                    bg-blue-50
                                                                    px-2.5
                                                                    py-1
                                                                    text-xs
                                                                    font-medium
                                                                    text-blue-700
                                                                "
                                                                    >
                                                                        {actividad.porcentaje}
                                                                    </span>

                                                                </td>


                                                                {/* =================================
                                                            TRABAJADORES TEMPORALES
                                                        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    {actividad.trabajadoresTemporales !== null ? (

                                                                        <span className="text-sm text-gray-700">
                                                                            {actividad.trabajadoresTemporales}
                                                                        </span>

                                                                    ) : (

                                                                        <span className="text-xs text-gray-400">
                                                                            No aplica
                                                                        </span>

                                                                    )}

                                                                </td>


                                                                {/* =================================
                                                            TRABAJADORES PERMANENTES
                                                        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    {actividad.trabajadoresPermanentes !== null ? (

                                                                        <span className="text-sm text-gray-700">
                                                                            {actividad.trabajadoresPermanentes}
                                                                        </span>

                                                                    ) : (

                                                                        <span className="text-xs text-gray-400">
                                                                            No aplica
                                                                        </span>

                                                                    )}

                                                                </td>

                                                                {/* =================================
                                                            FECHA INICIO
                                                        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    {index === 0 ? (

                                                                        <span className="text-sm text-gray-700">
                                                                            {obligacion.fechaInicioOperaciones}
                                                                        </span>

                                                                    ) : (

                                                                        <span className="text-gray-300">
                                                                            —
                                                                        </span>

                                                                    )}

                                                                </td>

                                                            </tr>

                                                        )
                                                    )}

                                                </>
                                            )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        )}
                    </div>
                )}
            </div>

            {/* =================================================
    TIPO DE OPERACIÓN
================================================= */}

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-md">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                    <h3 className="text-base font-semibold text-gray-900">
                        Tipo de operación
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Seleccione la operación que desea realizar.
                    </p>
                </div>

                {/* Opciones */}
                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">

                    {/* AUMENTO DE OBLIGACIONES */}
                    <button
                        type="button"
                        onClick={() => setTipoOperacion("aumento")}
                        className={`
                group
                flex
                items-start
                gap-4
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${tipoOperacion === "aumento"
                                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                                : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                            }
            `}
                    >
                        {/* Icono */}
                        <div
                            className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${tipoOperacion === "aumento"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-indigo-50 text-indigo-600"
                                }
                `}
                        >
                            <Plus size={20} strokeWidth={2} />
                        </div>

                        {/* Texto */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-gray-900">
                                    Aumentar obligación fiscal
                                </span>

                                {tipoOperacion === "aumento" && (
                                    <span className="text-xs font-semibold text-indigo-600">
                                        Seleccionado
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Incorpore nuevas obligaciones fiscales al contribuyente
                                y registre sus actividades económicas asociadas.
                            </p>
                        </div>
                    </button>

                    {/* ACTUALIZACIÓN DE ACTIVIDADES */}
                    <button
                        type="button"
                        onClick={() => setTipoOperacion("actualizacion")}
                        className={`
                group
                flex
                items-start
                gap-4
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${tipoOperacion === "actualizacion"
                                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                                : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                            }
            `}
                    >
                        {/* Icono */}
                        <div
                            className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${tipoOperacion === "actualizacion"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-indigo-50 text-indigo-600"
                                }
                `}
                        >
                            <ClipboardList size={20} strokeWidth={2} />
                        </div>

                        {/* Texto */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-gray-900">
                                    Actualización de actividades
                                </span>

                                {tipoOperacion === "actualizacion" && (
                                    <span className="text-xs font-semibold text-indigo-600">
                                        Seleccionado
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Actualice las actividades económicas asociadas a las
                                obligaciones fiscales existentes.
                            </p>
                        </div>
                    </button>

                </div>
            </div>

            {/*Secciòn Agregar obligaciòn fiscal */}
            {tipoOperacion === "aumento" && (

                <div className="shadow-md sm:rounded-lg sm:border sm:border-gray-200 bg-white mt-4">

                    {/* Header */}
                    <div className="p-4 bg-slate-100">

                        {/* Header */}
                        <div className="flex items-start gap-4">

                            {/* Icono */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                <Plus size={20} strokeWidth={2} />
                            </div>

                            {/* Título y descripción */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">
                                    Aumentar obligación fiscal
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Seleccione la obligación fiscal que desea incorporar al contribuyente
                                    y registre las actividades económicas asociadas a la misma.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/*Barra */}
                    <div
                        ref={barraAumentoRef}
                        className="h-px"
                    ></div>
                    <div
                        className="
        sticky
        top-4
        z-20
        flex
        w-full
        justify-center
        px-6
        mt-3
        pointer-events-none
    "
                    >
                        <div
                            className={`
            rounded-lg
            border
            border-gray-200
            bg-white/95
            shadow-md
            backdrop-blur-sm
            pointer-events-auto
            transition-all
            duration-300
            ease-in-out
            ${barraCompacta
                                    ? "w-[400px] px-5 py-4"
                                    : " w-full px-5 py-3"
                                }
        `}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium text-gray-700">
                                    Porcentaje acumulado
                                </span>

                                <span
                                    className={`text-sm font-bold ${porcentaje < 100
                                        ? "text-yellow-600"
                                        : porcentaje === 100
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {porcentaje}%
                                </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${colorBarra}`}
                                    style={{
                                        width: `${porcentajeVisual}%`,
                                    }}
                                />
                            </div>

                            <div
                                className={`
                overflow-hidden
                transition-all
                duration-300
               
            `}
                            >
                                <p
                                    className={`text-xs ${porcentaje < 100
                                        ? "text-yellow-600"
                                        : porcentaje === 100
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {porcentaje < 100
                                        ? `Falta ${100 - porcentaje}% para completar`
                                        : porcentaje === 100
                                            ? "Porcentaje completado"
                                            : `Excede el porcentaje permitido en ${porcentaje - 100
                                            }%`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                        {/* =================================================
          AGREGAR OBLIGACIÓN
      ================================================= */}

                        <div className="mb-6 flex items-center gap-2">

                            <select
                                value={obligacionSeleccionada}
                                onChange={(e) =>
                                    setObligacionSeleccionada(
                                        e.target.value
                                    )
                                }
                                className="
            h-10
            w-[360px]
            rounded-lg
            border
            border-gray-300
            bg-white
            px-3
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
                            >

                                <option value="">
                                    Seleccione obligación fiscal...
                                </option>

                                {obligacionesDisponibles.map(
                                    (obligacion) => (

                                        <option
                                            key={obligacion}
                                            value={obligacion}
                                        >
                                            {obligacion}
                                        </option>

                                    )
                                )}

                            </select>


                            <button
                                type="button"
                                onClick={agregarObligacion}
                                disabled={!obligacionSeleccionada}
                                className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-blue-200
            bg-blue-600
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
                                title="Agregar obligación fiscal"
                            >

                                <Plus
                                    size={19}
                                    strokeWidth={2}
                                />

                            </button>

                        </div>

                        {/* =================================================
          OBLIGACIONES
      ================================================= */}

                        <div className="space-y-5">

                            {obligaciones.map((obligacion) => {
                                const tienetrabajadores = obligacion.trabajadores
                                return (
                                    <div
                                        key={obligacion.id}
                                        className="
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                    "
                                    >

                                        {/* =========================================
                  ENCABEZADO OBLIGACIÓN
              ========================================= */}

                                        <div
                                            className={`
        grid
        grid-cols-[minmax(0,1fr)_220px_80px_80px]
        items-center
        gap-4
        px-5
        py-4
        border-b
        ${!obligacion.fijo
                                                    ? "border-emerald-400 bg-emerald-100"
                                                    : "border-indigo-100 bg-indigo-100"
                                                }
    `}
                                        >

                                            {/* IDENTIFICADOR + OBLIGACIÓN FISCAL */}
                                            <div className="flex min-w-0 items-center gap-3">
                                                {/* Número de obligación */}
                                                <div
                                                    className={`
            flex
            h-9
            w-9
            shrink-0
            
            items-center
            justify-center
            rounded-lg
            text-sm
            font-bold
            ${!obligacion.fijo
                                                            ? "bg-emerald-200 text-emerald-700 ring-1 ring-emerald-200"
                                                            : "bg-blue-200 text-indigo-700 ring-1 ring-indigo-200"
                                                        }
        `}
                                                >
                                                    {obligacion.id}
                                                </div>

                                                {/* Información de la obligación */}
                                                <div className="min-w-0">
                                                    <span
                                                        className="
                block
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-indigo-600
            "
                                                    >
                                                        Obligación fiscal
                                                    </span>

                                                    <span
                                                        className="
                mt-1
                block
                truncate
                text-[15px]
                font-semibold
                leading-5
                text-gray-900
            "
                                                        title={obligacion.nombre}
                                                    >
                                                        {obligacion.nombre}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* FECHA DE INICIO */}
                                            <div className="text-right">
                                                <span
                                                    className="
                block
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-500
            "
                                                >
                                                    Inicio de operaciones
                                                </span>

                                                <span
                                                    className="
                mt-1.5
                inline-flex
                items-center
                rounded-md
                border
                border-gray-200
                bg-white/70
                px-3
                py-1
                text-xs
                font-semibold
                tabular-nums
                text-gray-700
            "
                                                >
                                                    {obligacion.fechaInicio ||
                                                        new Date().toLocaleDateString("es-MX", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}
                                                </span>
                                            </div>

                                            {/* ESTADO NUEVO */}
                                            <div className="flex min-w-[55px] justify-center">
                                                {!obligacion.fijo && (
                                                    <span
                                                        className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-emerald-700
                "
                                                    >
                                                        Nuevo
                                                    </span>
                                                )}
                                            </div>

                                            {/* ACCIONES */}
                                            <div className="flex items-center justify-end gap-2">

                                                {/* AGREGAR REGISTRO */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        agregarRegistro(obligacion.id)
                                                    }
                                                    className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-blue-200
                bg-white
                text-blue-600
                shadow-sm
                transition-all
                duration-200
                hover:border-blue-500
                hover:bg-blue-50
                hover:shadow
                active:scale-95
            "
                                                    title="Agregar registro"
                                                >
                                                    <Plus
                                                        size={18}
                                                        strokeWidth={2}
                                                    />
                                                </button>

                                                {/* ELIMINAR OBLIGACIÓN */}
                                                {!obligacion.fijo && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            eliminarObligacion(
                                                                obligacion.id
                                                            )
                                                        }
                                                        className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-400
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                    hover:shadow
                    active:scale-95
                "
                                                        title="Eliminar obligación"
                                                    >
                                                        <Trash2
                                                            size={17}
                                                            strokeWidth={2}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>


                                        {/* =========================================
                  TABLA DE REGISTROS
              ========================================= */}

                                        <div className="overflow-x-auto">

                                            <table className="w-full min-w-[900px]">

                                                <thead>

                                                    <tr
                                                        className="
                        border-b
                        border-gray-200
                        bg-gray-50
                      "
                                                    >

                                                        <th
                                                            className="
                          px-4
                          py-3
                          text-left
                          text-xs
                          font-semibold
                          text-gray-600
                        "
                                                        >
                                                            Actividad económica
                                                        </th>

                                                        <th
                                                            className="
                          px-4
                          py-3
                          text-left
                          text-xs
                          font-semibold
                          text-gray-600
                        "
                                                        >
                                                            % participación
                                                        </th>
                                                        <th
                                                            className="
        px-4
        py-3
        text-left
        text-xs
        font-semibold
        text-gray-600
    "
                                                        >
                                                            Trab. perm.
                                                            {tienetrabajadores && (
                                                                <span className="ml-1 text-red-500">*</span>
                                                            )}
                                                        </th>

                                                        <th
                                                            className="
        px-4
        py-3
        text-left
        text-xs
        font-semibold
        text-gray-600
    "
                                                        >
                                                            Trab. perm.
                                                            {tienetrabajadores && (
                                                                <span className="ml-1 text-red-500">*</span>
                                                            )}
                                                        </th>


                                                        {/* 
                                                    <th
                                                        className="
                          px-4
                          py-3
                          text-left
                          text-xs
                          font-semibold
                          text-gray-600
                        "
                                                    >
                                                        Fecha inicio de operaciones
                                                    </th> */}

                                                        <th
                                                            className="
                          w-16
                          px-4
                          py-3
                          text-center
                          text-xs
                          font-semibold
                          text-gray-600
                        "
                                                        >
                                                            Eliminar
                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {/* SIN REGISTROS */}

                                                    {obligacion.registros.length === 0 && (

                                                        <tr>

                                                            <td
                                                                colSpan={6}
                                                                className="
                            px-4
                            py-8
                            text-center
                            text-sm
                            text-gray-400
                          "
                                                            >

                                                                No hay registros para esta
                                                                obligación.

                                                                <br />

                                                                <span className="text-xs">

                                                                    Presione el botón +

                                                                    para agregar una actividad
                                                                    económica.

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )}


                                                    {/* REGISTROS */}

                                                    {obligacion.registros.map(
                                                        (registro) => (

                                                            <tr
                                                                key={registro.id}
                                                                className="
                            border-b
                            border-gray-100
                            last:border-b-0
                            hover:bg-gray-50
                          "
                                                            >

                                                                {/* ACTIVIDAD ECONÓMICA */}

                                                                <td className="px-4 py-3">

                                                                    <select
                                                                        value={registro.actividadEconomica}
                                                                        onChange={(e) =>
                                                                            actualizarRegistro(
                                                                                obligacion.id,
                                                                                registro.id,
                                                                                "actividadEconomica",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="
        w-full
        rounded-md
        border
        border-gray-300
        bg-white
        px-2.5
        py-2
        text-sm
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
    "
                                                                    >
                                                                        <option value="">
                                                                            Seleccione...
                                                                        </option>

                                                                        {[
                                                                            ...new Set([
                                                                                ...obligacion.registros
                                                                                    .map((item) => item.actividadEconomica)
                                                                                    .filter(Boolean),

                                                                                ...actividadesEconomicas,
                                                                            ]),
                                                                        ].map((actividad) => (
                                                                            <option
                                                                                key={actividad}
                                                                                value={actividad}
                                                                            >
                                                                                {actividad}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                </td>


                                                                {/* % PARTICIPACIÓN */}

                                                                <td className="px-4 py-3">

                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        max="100"
                                                                        value={
                                                                            registro.participacion
                                                                        }
                                                                        onChange={(e) =>
                                                                            actualizarRegistro(
                                                                                obligacion.id,
                                                                                registro.id,
                                                                                "participacion",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="%"
                                                                        className="
                                w-28
                                rounded-md
                                border
                                border-gray-300
                                px-2.5
                                py-2
                                text-sm
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                              "
                                                                    />

                                                                </td>



                                                                {/* =================================
            TRABAJADORES TEMPORALES
        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        value={registro.trabajadoresTemporales}
                                                                        onChange={(e) =>
                                                                            actualizarRegistro(
                                                                                obligacion.id,
                                                                                registro.id,
                                                                                "trabajadoresTemporales",
                                                                                Number(e.target.value)
                                                                            )
                                                                        }
                                                                        className="
                    w-24
                    rounded-md
                    border
                    border-gray-300
                    px-2.5
                    py-2
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                "
                                                                    />

                                                                </td>


                                                                {/* =================================
            TRABAJADORES PERMANENTES
        ================================= */}

                                                                <td className="px-4 py-3">

                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        value={registro.trabajadoresPermanentes}
                                                                        onChange={(e) =>
                                                                            actualizarRegistro(
                                                                                obligacion.id,
                                                                                registro.id,
                                                                                "trabajadoresPermanentes",
                                                                                Number(e.target.value)
                                                                            )
                                                                        }
                                                                        className="
                    w-24
                    rounded-md
                    border
                    border-gray-300
                    px-2.5
                    py-2
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                "
                                                                    />

                                                                </td>



                                                                {/* FECHA INICIO */}


                                                                {/* <td className="px-4 py-3">
                                                                {obligacion.fechaInicio}
                                                            </td> */}

                                                                {/* ELIMINAR REGISTRO */}

                                                                <td
                                                                    className="
                              px-4
                              py-3
                              text-center
                            "
                                                                >
                                                                    {!obligacion.fijo && (

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                eliminarRegistro(
                                                                                    obligacion.id,
                                                                                    registro.id
                                                                                )
                                                                            }
                                                                            className="
                                inline-flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-gray-400
                                shadow-sm
                                transition-all
                                duration-200
                                hover:border-red-200
                                hover:bg-red-50
                                hover:text-red-600
                                hover:shadow
                                active:scale-95
                              "
                                                                            title="Eliminar registro"
                                                                        >

                                                                            <Trash2
                                                                                size={16}
                                                                                strokeWidth={2}
                                                                            />

                                                                        </button>
                                                                    )}
                                                                </td>

                                                            </tr>

                                                        )
                                                    )}

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                )
                            }
                            )}

                        </div>

                    </div>

                </div>
            )
            }
            {/* ACTUALIZACIÓN DE ACTIVIDADES ECONÓMICAS*/}
            {tipoOperacion === "actualizacion" && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-md">
                    {/* =================================================
            ENCABEZADO
        ================================================= */}

                    <div className="border-b border-gray-200 bg-slate-100 px-5 py-4">

                        <div className="flex items-start gap-4">

                            {/* ICONO */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <ClipboardList
                                    size={20}
                                    strokeWidth={2}
                                />
                            </div>

                            {/* TÍTULO */}
                            <div>

                                <h3 className="text-base font-semibold text-gray-900">
                                    Actualización de actividades económicas
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Actualice las actividades económicas y los datos
                                    asociados a las obligaciones fiscales del contribuyente.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
            BARRA DE PORCENTAJE
        ================================================= */}

                    <div
                        ref={barraActualizacionRef}
                        className="h-px"
                    ></div>
                    <div
                        className="
        sticky
        top-4
        z-20
        flex
        w-full
        justify-center
        px-6
        mt-3
        pointer-events-none
    "
                    >
                        <div
                            className={`
            rounded-lg
            border
            border-gray-200
            bg-white/95
            shadow-md
            backdrop-blur-sm
            pointer-events-auto
            transition-all
            duration-300
            ease-in-out
            ${barraCompacta
                                    ? "w-[400px] px-5 py-4"
                                    : " w-full px-5 py-3"
                                }
        `}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium text-gray-700">
                                    Porcentaje acumulado
                                </span>

                                <span
                                    className={`text-sm font-bold ${porcentaje < 100
                                        ? "text-yellow-600"
                                        : porcentaje === 100
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {porcentaje}%
                                </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${colorBarra}`}
                                    style={{
                                        width: `${porcentajeVisual}%`,
                                    }}
                                />
                            </div>

                            <div
                                className={`
                overflow-hidden
                transition-all
                duration-300
               
            `}
                            >
                                <p
                                    className={`text-xs ${porcentaje < 100
                                        ? "text-yellow-600"
                                        : porcentaje === 100
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {porcentaje < 100
                                        ? `Falta ${100 - porcentaje}% para completar`
                                        : porcentaje === 100
                                            ? "Porcentaje completado"
                                            : `Excede el porcentaje permitido en ${porcentaje - 100
                                            }%`}
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* =================================================
            OBLIGACIONES FISCALES
        ================================================= */}

                    <div className="p-6">

                        <div className="space-y-5">

                            {obligaciones.map((obligacion) => (

                                <div
                                    key={obligacion.id}
                                    className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                        "
                                >

                                    {/* =================================================
                            ENCABEZADO DE OBLIGACIÓN
                        ================================================= */}

                                    <div
                                        className="
                                grid
                                grid-cols-[minmax(0,1fr)_220px]
                                items-center
                                gap-4
                                border-b
                                border-indigo-100
                                bg-indigo-100
                                px-5
                                py-4
                            "
                                    >

                                        {/* OBLIGACIÓN */}
                                        <div className="flex min-w-0 items-center gap-3">

                                            {/* NÚMERO */}
                                            <div
                                                className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-blue-200
                                        text-sm
                                        font-bold
                                        text-indigo-700
                                        ring-1
                                        ring-indigo-200
                                    "
                                            >
                                                {obligacion.id}
                                            </div>


                                            {/* INFORMACIÓN */}
                                            <div className="min-w-0">

                                                <span
                                                    className="
                                            block
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.12em]
                                            text-indigo-600
                                        "
                                                >
                                                    Obligación fiscal
                                                </span>

                                                <span
                                                    className="
                                            mt-1
                                            block
                                            truncate
                                            text-[15px]
                                            font-semibold
                                            leading-5
                                            text-gray-900
                                        "
                                                    title={obligacion.nombre}
                                                >
                                                    {obligacion.nombre}
                                                </span>

                                            </div>

                                        </div>


                                        {/* FECHA DE INICIO */}
                                        <div className="text-right">

                                            <span
                                                className="
                                        block
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-gray-500
                                    "
                                            >
                                                Inicio de operaciones
                                            </span>

                                            <span
                                                className="
                                        mt-1.5
                                        inline-flex
                                        items-center
                                        rounded-md
                                        border
                                        border-gray-200
                                        bg-white/70
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        tabular-nums
                                        text-gray-700
                                    "
                                            >
                                                {obligacion.fechaInicio ||
                                                    new Date().toLocaleDateString(
                                                        "es-MX",
                                                        {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        }
                                                    )}
                                            </span>

                                        </div>

                                    </div>


                                    {/* =================================================
                            TABLA DE ACTIVIDADES
                        ================================================= */}

                                    <div className="overflow-x-auto">

                                        <table className="w-full min-w-[900px]">

                                            {/* =================================================
                                    CABECERA
                                ================================================= */}

                                            <thead>

                                                <tr
                                                    className="
                                            border-b
                                            border-gray-200
                                            bg-gray-50
                                        "
                                                >



                                                    {/* ACTIVIDAD */}
                                                    <th
                                                        className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                text-gray-600
                                            "
                                                    >
                                                        Actividad económica
                                                    </th>


                                                    {/* PARTICIPACIÓN */}
                                                    <th
                                                        className="
                                                w-36
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                text-gray-600
                                            "
                                                    >
                                                        % participación
                                                    </th>


                                                    {/* TRABAJADORES TEMPORALES */}
                                                    <th
                                                        className="
                                                w-40
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                text-gray-600
                                            "
                                                    >
                                                        Trab. temp.
                                                        <span className="ml-1 font-bold text-red-500">
                                                            *
                                                        </span>
                                                    </th>


                                                    {/* TRABAJADORES PERMANENTES */}
                                                    <th
                                                        className="
                                                w-40
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                text-gray-600
                                            "
                                                    >
                                                        Trab. perm.
                                                        <span className="ml-1 font-bold text-red-500">
                                                            *
                                                        </span>
                                                    </th>

                                                </tr>

                                            </thead>


                                            {/* =================================================
                                    CUERPO
                                ================================================= */}

                                            <tbody>

                                                {obligacion.registros.length === 0 && (

                                                    <tr>

                                                        <td
                                                            colSpan={5}
                                                            className="
                                                    px-4
                                                    py-8
                                                    text-center
                                                    text-sm
                                                    text-gray-400
                                                "
                                                        >
                                                            No hay actividades económicas
                                                            registradas para esta obligación.

                                                        </td>

                                                    </tr>

                                                )}


                                                {obligacion.registros.map(
                                                    (registro) => (

                                                        <tr
                                                            key={registro.id}
                                                            className="
                                                    border-b
                                                    border-gray-100
                                                    last:border-b-0
                                                    hover:bg-gray-50
                                                "
                                                        >

                                                            {/* =================================================
                                                    #
                                                ================================================= */}

                                                            {/* <td className="px-4 py-3 text-center">

                                                                <span
                                                                    className="
                                                            text-xs
                                                            font-medium
                                                            text-gray-500
                                                        "
                                                                >
                                                                    {registro.id}
                                                                </span>

                                                            </td> */}


                                                            {/* =================================================
                                                    ACTIVIDAD ECONÓMICA
                                                    EDITABLE
                                                ================================================= */}

                                                            <td className="px-4 py-3">

                                                                <select
                                                                    value={
                                                                        registro.actividadEconomica
                                                                    }
                                                                    onChange={(e) =>
                                                                        actualizarRegistro(
                                                                            obligacion.id,
                                                                            registro.id,
                                                                            "actividadEconomica",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="
                                                            w-full
                                                            rounded-md
                                                            border
                                                            border-indigo-300
                                                            bg-white
                                                            px-2.5
                                                            py-2
                                                            text-sm
                                                            text-gray-700
                                                            outline-none
                                                            transition
                                                            focus:border-indigo-500
                                                            focus:ring-2
                                                            focus:ring-indigo-100
                                                        "
                                                                >

                                                                    <option value="">
                                                                        Seleccione...
                                                                    </option>

                                                                    {[
                                                                        ...new Set([
                                                                            ...obligacion.registros
                                                                                .map(
                                                                                    (item) =>
                                                                                        item.actividadEconomica
                                                                                )
                                                                                .filter(Boolean),

                                                                            ...actividadesEconomicas,
                                                                        ]),
                                                                    ].map(
                                                                        (actividad) => (

                                                                            <option
                                                                                key={actividad}
                                                                                value={actividad}
                                                                            >
                                                                                {actividad}
                                                                            </option>

                                                                        )
                                                                    )}

                                                                </select>

                                                            </td>


                                                            {/* =================================================
                                                    % PARTICIPACIÓN
                                                    EDITABLE
                                                ================================================= */}

                                                            <td className="px-4 py-3">

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={
                                                                        registro.participacion
                                                                    }
                                                                    onChange={(e) =>
                                                                        actualizarRegistro(
                                                                            obligacion.id,
                                                                            registro.id,
                                                                            "participacion",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder="%"
                                                                    className="
                                                            w-28
                                                            rounded-md
                                                            border
                                                            border-indigo-300
                                                            bg-white
                                                            px-2.5
                                                            py-2
                                                            text-sm
                                                            text-gray-700
                                                            outline-none
                                                            transition
                                                            focus:border-indigo-500
                                                            focus:ring-2
                                                            focus:ring-indigo-100
                                                        "
                                                                />

                                                            </td>


                                                            {/* =================================================
                                                    TRABAJADORES TEMPORALES
                                                    EDITABLE
                                                ================================================= */}

                                                            <td className="px-4 py-3">

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={
                                                                        registro.trabajadoresTemporales ?? 0
                                                                    }
                                                                    onChange={(e) =>
                                                                        actualizarRegistro(
                                                                            obligacion.id,
                                                                            registro.id,
                                                                            "trabajadoresTemporales",
                                                                            Number(
                                                                                e.target.value
                                                                            )
                                                                        )
                                                                    }
                                                                    className="
                                                            w-24
                                                            rounded-md
                                                            border
                                                            border-indigo-300
                                                            bg-white
                                                            px-2.5
                                                            py-2
                                                            text-sm
                                                            text-gray-700
                                                            outline-none
                                                            transition
                                                            focus:border-indigo-500
                                                            focus:ring-2
                                                            focus:ring-indigo-100
                                                        "
                                                                />

                                                            </td>


                                                            {/* =================================================
                                                    TRABAJADORES PERMANENTES
                                                    EDITABLE
                                                ================================================= */}

                                                            <td className="px-4 py-3">

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={
                                                                        registro.trabajadoresPermanentes ?? 0
                                                                    }
                                                                    onChange={(e) =>
                                                                        actualizarRegistro(
                                                                            obligacion.id,
                                                                            registro.id,
                                                                            "trabajadoresPermanentes",
                                                                            Number(
                                                                                e.target.value
                                                                            )
                                                                        )
                                                                    }
                                                                    className="
                                                            w-24
                                                            rounded-md
                                                            border
                                                            border-indigo-300
                                                            bg-white
                                                            px-2.5
                                                            py-2
                                                            text-sm
                                                            text-gray-700
                                                            outline-none
                                                            transition
                                                            focus:border-indigo-500
                                                            focus:ring-2
                                                            focus:ring-indigo-100
                                                        "
                                                                />

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>
            )}

            {tipoOperacion && (
                <div>

                    {/* DATOS DE CONTACTO */}
                    < div className="rounded-lg mb-4 rounded shadow-md overflow-hidden mt-4">

                        {/* Encabezado */}
                        <button
                            onClick={() => setMostrarDatosContacto(!mostrarDatosContacto)}
                            className="
                            w-full bg-white hover:bg-slate-100 flex items-center justify-between
                            px-6 py-5 text-left
                            transition-colors
                           "
                        >
                            <div className="flex items-center justify-content gap-3">
                                <span className="bg-blue-100 rounded-lg">

                                    <Smartphone
                                        size={20}
                                        className="text-sky-700 m-3"
                                    />

                                </span>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Datos de contacto
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Verifica y actualiza los datos de contacto del contribuyente                      </p>
                                </div>

                            </div>

                            <ChevronDown
                                size={20}
                                className={`
                              text-slate-500
                              transition-transform
                              duration-700
                              ease-in-out
                        ${mostrarDatosContacto ? "rotate-180" : ""}`}
                            />

                        </button>

                        {/* Contenido */}
                        <div className={`
                          px-6
                          bg-white
                          overflow-hidden
                          transition-all
                          duration-700
                          ease-in-out
                          ${mostrarDatosContacto
                                ? "max-h-[1000px] opacity-100 pb-6"
                                : "max-h-0 opacity-0"
                            }
    `}>
                            {/* Campos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">

                                {/* Correo electrónico */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Correo electrónico <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="email"
                                        maxLength={100}
                                        placeholder="usuario@dominio.extensión"
                                        className="
                                    w-full h-11 px-3
                                    border border-slate-300
                                    rounded-lg
                                    text-sm text-slate-700
                                    outline-none
                                    focus:border-sky-500
                                    focus:ring-2 focus:ring-sky-100
                                  "
                                    />

                                    <p className="text-xs text-slate-400">
                                        Máximo 100 caracteres.
                                    </p>
                                </div>

                                {/* Correo electrónico alternativo */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Correo electrónico alternativo
                                    </label>

                                    <input
                                        type="email"
                                        maxLength={100}
                                        placeholder="usuario@dominio.extensión"
                                        className="
          w-full h-11 px-3
          border border-slate-300
          rounded-lg
          text-sm text-slate-700
          outline-none
          focus:border-sky-500
          focus:ring-2 focus:ring-sky-100
        "
                                    />

                                    <p className="text-xs text-slate-400">
                                        Máximo 100 caracteres.
                                    </p>
                                </div>

                                {/* Teléfono fijo */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Teléfono fijo <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        maxLength={10}
                                        inputMode="numeric"
                                        placeholder="Ingrese 10 dígitos"
                                        className="
          w-full h-11 px-3
          border border-slate-300
          rounded-lg
          text-sm text-slate-700
          outline-none
          focus:border-sky-500
          focus:ring-2 focus:ring-sky-100
        "
                                    />

                                    <p className="text-xs text-slate-400">
                                        Ingrese únicamente números. Máximo 10 caracteres.
                                    </p>
                                </div>

                                {/* Teléfono alternativo */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Teléfono alternativo <span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex gap-2">

                                        {/* Tipo de teléfono */}
                                        <select
                                            className="
            h-11
            w-40
            px-3
            border border-slate-300
            rounded-lg
            bg-white
            text-sm text-slate-700
            outline-none
            focus:border-sky-500
            focus:ring-2 focus:ring-sky-100
          "
                                        >
                                            <option value="">
                                                Tipo
                                            </option>

                                            <option value="fijo">
                                                Teléfono fijo
                                            </option>

                                            <option value="movil">
                                                Teléfono móvil
                                            </option>
                                        </select>

                                        {/* Número */}
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            inputMode="numeric"
                                            placeholder="Ingrese 10 dígitos"
                                            className="
            flex-1
            h-11 px-3
            border border-slate-300
            rounded-lg
            text-sm text-slate-700
            outline-none
            focus:border-sky-500
            focus:ring-2 focus:ring-sky-100
          "
                                        />

                                    </div>

                                    <p className="text-xs text-slate-400">
                                        Ingrese únicamente números. Máximo 10 caracteres.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* DOCUMENTACIÓN REQUERIDA */}
                    <div className=" bg-white rounded-lg shadow-md rounded overflow-hidden">

                        {/* Encabezado */}
                        <button
                            type="button"
                            onClick={() => setMostrarDocumentacion(!mostrarDocumentacion)}
                            className="
                            w-full
                            flex
                            items-center
                            justify-between
                            px-6
                            py-5
                            text-left
                            bg-white
                            hover:bg-slate-100
                            transition-colors
                            bg-slate-100
                        "
                        >
                            <div className="flex items-center justify-content gap-3">
                                <span className="bg-blue-100 rounded-lg">
                                    <Building2
                                        size={20}
                                        className="text-sky-700 m-3"
                                    />
                                </span>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Documentación Requerida
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Capture la información de contacto del contribuyente.
                                    </p>
                                </div>

                            </div>

                            <ChevronDown
                                size={20}
                                className={`
                              text-slate-500
                              transition-transform
                              duration-700
                              ease-in-out
                        ${mostrarDocumentacion ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Contenido */}
                        <div className={`
                          px-6
                          overflow-hidden
                          transition-all
                          duration-700
                          ease-in-out
                          ${mostrarDocumentacion
                                ? "max-h-[1000px] opacity-100 pb-6"
                                : "max-h-0 opacity-0"
                            }
    `}>
                            {/* Campos */}
                            <DocumentacionRequerida mostrarDocumentos={false} />


                        </div>


                    </div>
                </div >
            )
            }
        </div >
    );
}
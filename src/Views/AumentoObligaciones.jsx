import { useState } from "react";
import {
    Plus,
    Trash2,
    ClipboardList,
    Info
} from "lucide-react";
import HeaderModulo from "../components/HeaderModulo";
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
                    porcentaje: "60%",
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 8,
                },
                {
                    id: 2,
                    actividadEconomica: "Comercio al por menor",
                    porcentaje: "40%",
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
                    porcentaje: "100%",
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

    const [siguienteObligacionId, setSiguienteObligacionId] =
        useState(1);

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
            alert(
                "La obligación fiscal ya fue agregada."
            );

            return;
        }

        const nuevaObligacion = {

            id: siguienteObligacionId,

            nombre: obligacionSeleccionada,

            fechaInicio: "",

            registros: [],

        };

        setObligaciones((actuales) => [
            ...actuales,
            nuevaObligacion,
        ]);

        setSiguienteObligacionId(
            (id) => id + 1
        );

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
    const porcentaje = 75;

    const colorBarra =
        porcentaje < 100
            ? "bg-yellow-500"
            : porcentaje === 100
                ? "bg-green-500"
                : "bg-red-500";

    const porcentajeVisual = Math.min(porcentaje, 100);

    return (

        <div className="w-full">
            {/* Header */}
            <HeaderModulo

                titulo="Aumento de obligaciones fiscales"

                // descripcion="Consulte el domicilio fiscal actual y los datos del nuevo domicilio fiscal"

                icono="ReceiptText"

            />
               <div className="shadow-sm sm:rounded-lg sm:border sm:border-gray-200 bg-white mt-4">

                <div className="p-6">

                    {/* =================================================
            HEADER
        ================================================= */}

                    <div className="flex items-start gap-4">

                        {/* ICONO */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                            <ClipboardList
                                size={20}
                                strokeWidth={2}
                            />

                        </div>

                        {/* TÍTULO */}
                        <div>

                            <h3 className="text-base font-semibold text-gray-900">
                                Obligaciones fiscales actuales
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Consulte las obligaciones fiscales vigentes y
                                las actividades económicas asociadas al contribuyente.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
            CONTENIDO
        ================================================= */}

                    <div className="mt-6">

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

                </div>

            </div>

            {/*Secciòn Agregar obligaciòn fiscal */}
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
                <div className="w-full px-6 py-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                            Porcentaje acumulado
                        </span>

                        <span
                            className={`text-sm font-semibold ${porcentaje < 100
                                ? "text-yellow-600"
                                : porcentaje === 100
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {porcentaje}%
                        </span>
                    </div>

                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${colorBarra}`}
                            style={{ width: `${porcentajeVisual}%` }}
                        />
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
                                        className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-indigo-200
                  bg-indigo-50
                  px-5
                  py-4
                "
                                    >

                                        <div>

                                            <span
                                                className="
                      block
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-indigo-600
                    "
                                            >
                                                Obligación fiscal
                                            </span>

                                            <span
                                                className="
                      mt-1
                      block
                      text-base
                      font-semibold
                      text-indigo-950
                    "
                                            >
                                                {obligacion.nombre}
                                            </span>

                                        </div>


                                        <div className="flex items-center gap-2">

                                            {/* AGREGAR REGISTRO */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    agregarRegistro(
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
                                            )

                                            }
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

                                                    {tienetrabajadores && (
                                                        <>
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
                                                                Trab. temp.
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
                                                            </th>
                                                        </>
                                                    )}

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
                                                    </th>

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


                                                            {tienetrabajadores && (
                                                                <>
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
                                                                </>
                                                            )}

                                                            {/* FECHA INICIO */}


                                                            <td className="px-4 py-3">
                                                                {obligacion.fechaInicio}
                                                            </td>

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

        </div>
    );
}
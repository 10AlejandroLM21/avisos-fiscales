import React, { useState } from "react";
import {
    Pencil,
    Trash2,
    Check,
    X,
    BriefcaseBusiness
} from "lucide-react";
import CampoSelect from "../components/CampoSelect";
import CampoInput from "../components/CampoInput";
import HeaderModulo from "../components/HeaderModulo";
const ReanudacionDeActividades = () => {

    // ==========================================
    // CATÁLOGO DE OBLIGACIONES
    // ==========================================

    const catalogoObligaciones = [
        {
            id: 1,
            nombre: "IMPUESTO SOBRE NÓMINAS",
            clave: "nominas",
            requiereTrabajadores: false
        },
        {
            id: 2,
            nombre: "IMPUESTO SOBRE HOSPEDAJE",
            clave: "hospedaje",
            requiereTrabajadores: false
        },
        {
            id: 3,
            nombre: "IMPUESTO SOBRE EROGACIONES POR REMUNERACIONES AL TRABAJO PERSONAL",
            clave: "erogaciones",
            requiereTrabajadores: true
        },
        {
            id: 4,
            nombre: "EXTRACCIÓN",
            clave: "extraccion",
            requiereTrabajadores: false
        }
    ];


    // ==========================================
    // ACTIVIDADES
    // ==========================================

    const catalogoActividades = {

        nominas: [
            { id: 1, nombre: "Comercio" },
            { id: 2, nombre: "Servicios" },
            { id: 3, nombre: "Industria" },
            { id: 4, nombre: "Construcción" },
            { id: 5, nombre: "Transporte" }
        ],

        hospedaje: [
            { id: 101, nombre: "Hotel" },
            { id: 102, nombre: "Motel" },
            { id: 103, nombre: "Hostal" },
            { id: 104, nombre: "Cabañas" },
            { id: 105, nombre: "Casa de huéspedes" }
        ],

        erogaciones: [
            { id: 201, nombre: "Comercio" },
            { id: 202, nombre: "Servicios Profesionales" },
            { id: 203, nombre: "Industria" },
            { id: 204, nombre: "Construcción" },
            { id: 205, nombre: "Educación" },
            { id: 206, nombre: "Salud" }
        ],

        extraccion: [
            { id: 301, nombre: "Extracción de minerales" },
            { id: 302, nombre: "Extracción de materiales pétreos" },
            { id: 303, nombre: "Extracción de arena y grava" },
            { id: 304, nombre: "Extracción de piedra" },
            { id: 305, nombre: "Extracción de arcilla" },
            { id: 306, nombre: "Extracción de otros minerales no metálicos" }
        ]

    };


    // ==========================================
    // DATOS DE EJEMPLO
    // ==========================================

    const [obligaciones, setObligaciones] = useState([
        {
            id: 1,
            clave: "nominas",
            nombre: "IMPUESTO SOBRE NÓMINAS",
            requiereTrabajadores: false,
            actividades: [
                {
                    id: 1,
                    nombre: "Comercio",
                    porcentaje: 40,
                    fechaOperaciones: "24/10/2026"
                },
                {
                    id: 2,
                    nombre: "Servicios",
                    porcentaje: 60,
                    fechaOperaciones: "24/10/2026"
                }
            ],
            actividadesAgregadas: []
        },

        {
            id: 2,
            clave: "hospedaje",
            nombre: "IMPUESTO SOBRE HOSPEDAJE",
            requiereTrabajadores: false,
            actividades: [
                {
                    id: 101,
                    nombre: "Hotel",
                    porcentaje: 100,
                    fechaOperaciones: "24/10/2026"
                }
            ],
            actividadesAgregadas: []
        }
    ]);

    const [actividadEditando, setActividadEditando] =
        useState(null);

    const [formEditar, setFormEditar] = useState({
        porcentaje: "",
        trabajadoresTemporales: "",
        trabajadoresPermanentes: ""
    });

    const editarActividad = (obligacion, actividad) => {

        setActividadEditando({
            obligacionId: obligacion.id,
            actividadId: actividad.id,
            agregado: actividad.agregado
        });

        setFormEditar({
            porcentaje: actividad.porcentaje ?? "",
            trabajadoresTemporales:
                actividad.trabajadoresTemporales ?? "",
            trabajadoresPermanentes:
                actividad.trabajadoresPermanentes ?? ""
        });

    };

    const cancelarEdicion = () => {

        setActividadEditando(null);

        setFormEditar({
            porcentaje: "",
            trabajadoresTemporales: "",
            trabajadoresPermanentes: ""
        });

    };

    const guardarEdicion = () => {

        if (!actividadEditando) return;

        setObligaciones(prev =>

            prev.map(obligacion => {

                if (
                    obligacion.id !==
                    actividadEditando.obligacionId
                ) {
                    return obligacion;
                }

                const actualizar = (actividad) => {

                    if (
                        actividad.id !==
                        actividadEditando.actividadId
                    ) {
                        return actividad;
                    }

                    return {
                        ...actividad,

                        porcentaje:
                            Number(formEditar.porcentaje),

                        trabajadoresTemporales:
                            obligacion.requiereTrabajadores
                                ? Number(
                                    formEditar.trabajadoresTemporales
                                )
                                : null,

                        trabajadoresPermanentes:
                            obligacion.requiereTrabajadores
                                ? Number(
                                    formEditar.trabajadoresPermanentes
                                )
                                : null
                    };

                };


                return {
                    ...obligacion,

                    actividades:
                        obligacion.actividades.map(actualizar),

                    actividadesAgregadas:
                        obligacion.actividadesAgregadas.map(actualizar)
                };

            })

        );

        cancelarEdicion();

    };

    const eliminarActividad = (
        obligacionId,
        actividadId
    ) => {

        setObligaciones(prev =>

            prev.map(obligacion => {

                if (
                    obligacion.id !== obligacionId
                ) {
                    return obligacion;
                }

                return {
                    ...obligacion,

                    actividadesAgregadas:
                        obligacion.actividadesAgregadas.filter(
                            actividad =>
                                actividad.id !== actividadId
                        )
                };

            })

        );

    };

    const [obligacionSeleccionada, setObligacionSeleccionada] = useState("");
    // ==========================================
    // DATOS PARA CAPTURA DE NUEVA ACTIVIDAD
    // ==========================================

    const [actividadSeleccionada, setActividadSeleccionada] =
        useState("");

    const [porcentaje, setPorcentaje] =
        useState("");

    const [actividadesAgregadas, setActividadesAgregadas] =
        useState([]);

    const [trabajadoresTemporales, setTrabajadoresTemporales] =
        useState("");

    const [trabajadoresPermanentes, setTrabajadoresPermanentes] =
        useState("");

    return (

        <div>
            <HeaderModulo

                titulo="Reanudación de Actividades"

                // descripcion="Registre la reanudación de actividades del contribuyente y actualice la información fiscal correspondiente."

                icono="PlayCircle"

                color="emerald"

            />

            <div className="bg-white rounded-xl shadow-md border border-slate-200 mb-6 mt-4 overflow-hidden">
                {/* Header */}

                <div className="mb-6 border-b border-slate-200 p-6 bg-slate-100 flex items-center gap-4">

                    <div className="bg-sky-100 w-12 h-12 rounded-lg flex justify-center items-center">
                        <BriefcaseBusiness className="h-6 w-6 text-sky-600" />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-md font-bold text-slate-800">
                            OBLIGACIONES FISCALES Y ACTIVIDADES ECONÓMICAS
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Seleccione la obligación fiscal y las actividades económicas que serán incorporadas al contribuyente.
                        </p>

                    </div>

                </div>

                <div className="flex flex-col p-4 gap-4 w-full">

                    <CampoSelect
                        etiqueta="Obligación Fiscal"
                        value={obligacionSeleccionada}
                        onChange={(e) =>
                            setObligacionSeleccionada(e.target.value)
                        }
                        className="w-full"
                        opciones={[
                            { value: "", label: "Seleccione" },
                            ...catalogoObligaciones.map(obligacion => ({
                                value: obligacion.nombre,
                                label: obligacion.nombre
                            }))
                        ]}
                    />

                    <div className="grid grid-cols-5 gap-4">
                        <CampoSelect
                            etiqueta="Actividad Económica"
                            className="col-span-2"
                            value={actividadSeleccionada}
                            onChange={(e) =>
                                setActividadSeleccionada(e.target.value)
                            }
                            opciones={[
                                { value: "", label: "Seleccione" },
                                ...(catalogoActividades[
                                    catalogoObligaciones.find(o => o.nombre === obligacionSeleccionada)?.clave] ?? []).map(actividad => ({
                                    value: actividad.nombre,
                                    label: actividad.nombre
                                }))
                            ]}
                        />

                        <CampoInput etiqueta="Porcentaje"
                            className='col-span-2'
                            onChange={(e) => {
                                setPorcentaje(e.target.value)
                            }}
                            type="number"
                        ></CampoInput>

                        <button
                            type="button"
                            onClick={() => {

                                setActividadesAgregadas([
                                    ...actividadesAgregadas,
                                    {
                                        obligacion: obligacionSeleccionada,
                                        actividad: actividadSeleccionada,
                                        porcentaje,
                                        fecha: "01/01/2026",
                                        trabajadoresTemporales: "",
                                        trabajadoresPermanentes: ""
                                    }
                                ]);

                                setActividadSeleccionada("");
                                setPorcentaje("");

                            }}
                            className="self-end px-5 py-3 h-12 bg-blue-600 hover:bg-green-700 text-white rounded-lg shadow-md"
                        >
                            + Agregar
                        </button>
                    </div>

                </div>

                {obligacionSeleccionada ===
                    "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal" && (

                        <>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Trabajadores Temporales
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={trabajadoresTemporales}
                                    onChange={(e) =>
                                        setTrabajadoresTemporales(e.target.value)
                                    }
                                    className="w-full  rounded-lg px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Trabajadores Permanentes
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={trabajadoresPermanentes}
                                    onChange={(e) =>
                                        setTrabajadoresPermanentes(e.target.value)
                                    }
                                    className="w-full  rounded-lg px-4 py-3"
                                />
                            </div>
                        </>

                    )
                }
            </div>

            {/* HEADER */}
            <section className="bg-white rounded-xl shadow-md border border-slate-200 mb-6 mt-4 overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-lg font-semibold text-slate-800">
                        Obligaciones del Contribuyente
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Consulte las actividades económicas asociadas
                        a las obligaciones fiscales del contribuyente.
                    </p>

                </div>


                {/* TABLA */}

                <div className="p-4 overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                                    Obligación Fiscal
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                                    Actividad Económica
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    %
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    Trab. Temp.
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    Trab. Perm.
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    Tipo
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    Fecha de Inicio de Operaciones
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                                    Acciones
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">

                            {obligaciones.map(obligacion => {

                                const actividades = [

                                    ...(obligacion.actividades ?? [])
                                        .map(actividad => ({
                                            ...actividad,
                                            agregado: false
                                        })),

                                    ...(obligacion.actividadesAgregadas ?? [])
                                        .map(actividad => ({
                                            ...actividad,
                                            agregado: true
                                        }))

                                ];


                                return actividades.map(actividad => (

                                    <tr
                                        key={`${obligacion.id}-${actividad.id}-${actividad.agregado}`}
                                        className="hover:bg-sky-50 transition"
                                    >

                                        <td className="px-4 py-3 font-medium">
                                            {obligacion.nombre}
                                        </td>


                                        <td className="px-4 py-3">
                                            {actividad.nombre}
                                        </td>


                                        {/* PORCENTAJE */}

                                        <td className="px-4 py-3 text-center">

                                            {actividadEditando?.actividadId === actividad.id ? (

                                                <input
                                                    type="number"
                                                    className="w-20 border rounded p-1 text-center"
                                                    value={formEditar.porcentaje}
                                                    onChange={e =>
                                                        setFormEditar(prev => ({
                                                            ...prev,
                                                            porcentaje:
                                                                e.target.value
                                                        }))
                                                    }
                                                />

                                            ) : (

                                                `${actividad.porcentaje}%`

                                            )}

                                        </td>


                                        {/* TEMPORALES */}

                                        <td className="px-4 py-3 text-center">

                                            {obligacion.requiereTrabajadores ? (

                                                actividadEditando?.actividadId === actividad.id ? (

                                                    <input
                                                        type="number"
                                                        className="w-20 border rounded p-1 text-center"
                                                        value={
                                                            formEditar.trabajadoresTemporales
                                                        }
                                                        onChange={e =>
                                                            setFormEditar(prev => ({
                                                                ...prev,
                                                                trabajadoresTemporales:
                                                                    e.target.value
                                                            }))
                                                        }
                                                    />

                                                ) : (

                                                    actividad.trabajadoresTemporales

                                                )

                                            ) : "—"}

                                        </td>


                                        {/* PERMANENTES */}

                                        <td className="px-4 py-3 text-center">

                                            {obligacion.requiereTrabajadores ? (

                                                actividadEditando?.actividadId === actividad.id ? (

                                                    <input
                                                        type="number"
                                                        className="w-20 border rounded p-1 text-center"
                                                        value={
                                                            formEditar.trabajadoresPermanentes
                                                        }
                                                        onChange={e =>
                                                            setFormEditar(prev => ({
                                                                ...prev,
                                                                trabajadoresPermanentes:
                                                                    e.target.value
                                                            }))
                                                        }
                                                    />

                                                ) : (

                                                    actividad.trabajadoresPermanentes

                                                )

                                            ) : "—"}

                                        </td>


                                        {/* TIPO */}

                                        <td className="px-4 py-3 text-center">

                                            <span
                                                className={`
                                                px-3 py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                ${actividad.agregado
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }
                                            `}
                                            >

                                                {actividad.agregado
                                                    ? "Agregada"
                                                    : "Existente"
                                                }

                                            </span>

                                        </td>


                                        {/* FECHA */}

                                        <td className="px-4 py-3 text-center">

                                            {actividad.fechaOperaciones ?? "—"}

                                        </td>


                                        {/* ACCIONES */}

                                        <td className="px-4 py-3">

                                            {actividadEditando?.actividadId === actividad.id ? (

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={guardarEdicion}
                                                        className="bg-emerald-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        <Check size={16} />
                                                    </button>

                                                    <button
                                                        onClick={cancelarEdicion}
                                                        className="bg-gray-500 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        <X size={16} />
                                                    </button>

                                                </div>

                                            ) : (

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() =>
                                                            editarActividad(
                                                                obligacion,
                                                                actividad
                                                            )
                                                        }
                                                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>


                                                    {actividad.agregado && (

                                                        <button
                                                            onClick={() =>
                                                                eliminarActividad(
                                                                    obligacion.id,
                                                                    actividad.id
                                                                )
                                                            }
                                                            className="bg-red-600 text-white px-3 py-2 rounded-lg"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                    )}

                                                </div>

                                            )}

                                        </td>

                                    </tr>

                                ));

                            })}

                        </tbody>

                    </table>

                </div>

            </section>
        </div>
    );

};

export default ReanudacionDeActividades;
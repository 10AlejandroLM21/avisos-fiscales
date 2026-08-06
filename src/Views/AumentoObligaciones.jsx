import { useMemo, useState } from "react";
import {
    Pencil,
    Trash2,
    Plus,
    Check,
    X,
} from "lucide-react";
import Obligaciones from "../components/Obligaciones";
import HeaderModulo from "../components/HeaderModulo";
const AumentoObligaciones = () => {

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
            nombre: "IMPUESTO SOBRE EROGACIONES...",
            clave: "erogaciones",
            requiereTrabajadores: true
        }
    ];
    const catalogoActividades = {
        nominas: [
            {
                id: 1,
                nombre: "Comercio"
            },
            {
                id: 2,
                nombre: "Servicios"
            },
            {
                id: 3,
                nombre: "Industria"
            },
            {
                id: 4,
                nombre: "Construcción"
            },
            {
                id: 5,
                nombre: "Transporte"
            }
        ],

        hospedaje: [
            {
                id: 101,
                nombre: "Hotel"
            },
            {
                id: 102,
                nombre: "Motel"
            },
            {
                id: 103,
                nombre: "Hostal"
            },
            {
                id: 104,
                nombre: "Cabañas"
            },
            {
                id: 105,
                nombre: "Casa de huéspedes"
            }
        ],

        erogaciones: [
            {
                id: 201,
                nombre: "Comercio"
            },
            {
                id: 202,
                nombre: "Servicios Profesionales"
            },
            {
                id: 203,
                nombre: "Industria"
            },
            {
                id: 204,
                nombre: "Construcción"
            },
            {
                id: 205,
                nombre: "Educación"
            },
            {
                id: 206,
                nombre: "Salud"
            }
        ]
    };

    const [formActividad, setFormActividad] = useState({
        obligacionId: "",
        actividadId: "",
        porcentaje: "",
        trabajadoresTemporales: "",
        trabajadoresPermanentes: "",
    });

    const obligacionSeleccionada = catalogoObligaciones.find(
        o => o.id === Number(formActividad.obligacionId)
    );
    const [obligaciones, setObligaciones] = useState([
        {
            id: 1,
            clave: "nominas",
            nombre: "IMPUESTO SOBRE NÓMINAS",
            estatus: "Activo",
            requiereTrabajadores: false,
            actividades: [
                {
                    id: 1,
                    nombre: "Comercio",
                    porcentaje: 10,
                    trabajadoresTemporales: 5,
                    trabajadoresPermanentes: 15,
                    fechaOperaciones: "24/10/2026"
                },
                {
                    id: 2,
                    nombre: "Servicios",
                    porcentaje: 20,
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 10,
                    fechaOperaciones: "24/10/2026"
                },

            ],
            actividadesAgregadas: []
        },
        {
            id: 2,
            clave: "hospedaje",
            nombre: "IMPUESTO SOBRE HOSPEDAJE",
            requiereTrabajadores: false,
            estatus: "Activo",
            actividades: [
                {
                    id: 3,
                    nombre: "Hotel",
                    porcentaje: 20,
                    fechaOperaciones: "24/10/2026"

                }
            ],
            actividadesAgregadas: []
        },
        {
            id: 3,
            clave: "erogaciones",
            nombre: "IMPUESTO SOBRE EROGACIONES...",
            requiereTrabajadores: true,
            estatus: "Activo",
            actividades: [
                {
                    id: 1,
                    nombre: "Comercio",
                    porcentaje: 30,
                    trabajadoresTemporales: 5,
                    trabajadoresPermanentes: 15,
                    fechaOperaciones: "24/10/2026"
                },
                {
                    id: 2,
                    nombre: "Servicios",
                    porcentaje: 20,
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 10,
                    fechaOperaciones: "24/10/2026"
                }
            ],
            actividadesAgregadas: []
        }
    ]);
    const actividadesDisponibles = obligacionSeleccionada
        ? catalogoActividades[obligacionSeleccionada.clave] ?? []
        : [];

    // Actividad que se está editando
    // Formulario de edición
    const [formEditar, setFormEditar] = useState({
        porcentaje: "",
        trabajadoresTemporales: "",
        trabajadoresPermanentes: "",
    });

    // Validaciones
    const [errores, setErrores] = useState({});

    const requiereTrabajadores =
        obligacionSeleccionada?.requiereTrabajadores ?? false;
    const handleChange = (campo, valor) => {

        setFormActividad(prev => ({
            ...prev,
            [campo]: valor
        }));

    };
    const seleccionarObligacion = (id) => {
        setFormActividad({
            obligacionId: id,
            actividadId: "",
            porcentaje: "",
            trabajadoresTemporales: "",
            trabajadoresPermanentes: ""
        });

    };
    const seleccionarActividad = (id) => {
        setFormActividad(prev => ({

            ...prev,
            actividadId: id,
            porcentaje: "",
            trabajadoresTemporales: "",
            trabajadoresPermanentes: ""

        }));

    };
    const agregarObligacion = () => {
        console.log("formActividad " + formActividad.obligacionId);
        const fechaActual = new Date().toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        if (!formActividad.obligacionId) return;

        setObligaciones(prev => {

            // Buscar si la obligación ya existe
            const indice = prev.findIndex(
                o => o.id === Number(formActividad.obligacionId)
            );

            // Si no existe, obtenerla del catálogo y agregarla
            if (indice === -1) {

                const catalogo = catalogoObligaciones.find(
                    o => o.id === Number(formActividad.obligacionId)
                );
                const actividad = actividadesDisponibles.find(
                    a => a.id === Number(formActividad.actividadId)
                );

                if (!actividad) return;
                return [...prev,
                {
                    ...catalogo,
                    actividades: [],
                    actividadesAgregadas: [
                        {
                            ...actividad,
                            porcentaje: Number(formActividad.porcentaje),
                            fechaOperaciones: fechaActual,
                            trabajadoresTemporales: Number(formActividad.trabajadoresTemporales || 0),
                            trabajadoresPermanentes: Number(formActividad.trabajadoresPermanentes || 0)
                        }
                    ]
                }
                ];
            }

            // Si ya existe, agregar la actividad a esa obligación
            return prev.map(obligacion => {

                if (obligacion.id !== Number(formActividad.obligacionId)) {
                    return obligacion;
                }
                const actividad = actividadesDisponibles.find(
                    a => a.id === Number(formActividad.actividadId)
                );
                return {
                    ...obligacion,
                    actividadesAgregadas: [
                        ...obligacion.actividadesAgregadas,
                        {
                            ...actividad,
                            fechaOperaciones: fechaActual,
                            porcentaje: Number(formActividad.porcentaje),
                            trabajadoresTemporales: Number(formActividad.trabajadoresTemporales || 0),
                            trabajadoresPermanentes: Number(formActividad.trabajadoresPermanentes || 0)
                        }
                    ]
                };

            });

        });

        setFormActividad({

            obligacionId: "",
            actividadId: "",
            porcentaje: "",
            trabajadoresTemporales: "",
            trabajadoresPermanentes: ""

        });

    };
    const agregarActividad = () => {

        if (!formActividad.obligacionId) return;
        if (!formActividad.actividadId) return;
        if (!formActividad.porcentaje) return;

        const actividad = actividadesDisponibles.find(

            a => a.id === Number(formActividad.actividadId)

        );

        if (!actividad) return;

        setObligaciones(prev =>

            prev.map(obligacion => {

                if (obligacion.id !== Number(formActividad.obligacionId))
                    return obligacion;

                const existe = obligacion.actividadesAgregadas.some(

                    a => a.id === actividad.id

                );

                if (existe) {

                    alert("La actividad ya existe.");

                    return obligacion;

                }

                return {

                    ...obligacion,

                    actividadesAgregadas: [

                        ...obligacion.actividadesAgregadas,

                        {

                            ...actividad,

                            porcentaje: Number(formActividad.porcentaje),

                            trabajadoresTemporales:
                                requiereTrabajadores
                                    ? Number(formActividad.trabajadoresTemporales)
                                    : null,

                            trabajadoresPermanentes:
                                requiereTrabajadores
                                    ? Number(formActividad.trabajadoresPermanentes)
                                    : null

                        }

                    ]

                };

            })

        );

        setFormActividad(prev => ({

            ...prev,

            actividadId: "",

            porcentaje: "",

            trabajadoresTemporales: "",

            trabajadoresPermanentes: ""

        }));

    };

    const formularioValido =

        formActividad.obligacionId &&
        formActividad.actividadId &&
        formActividad.porcentaje &&
        (
            !requiereTrabajadores ||

            (
                formActividad.trabajadoresTemporales !== "" &&
                formActividad.trabajadoresPermanentes !== ""
            )
        );

    const [actividadEditando, setActividadEditando] = useState(null);


    const editarActividad = (obligacion, actividad) => {

        setActividadEditando({
            obligacionId: obligacion.id,
            actividadId: actividad.id,
            agregado: actividad.agregado
        });

        setFormEditar({
            porcentaje: actividad.porcentaje,
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

                if (obligacion.id !== actividadEditando.obligacionId)
                    return obligacion;

                const actualizar = (actividad) => {

                    if (actividad.id !== actividadEditando.actividadId)
                        return actividad;

                    return {

                        ...actividad,

                        porcentaje: Number(formEditar.porcentaje),

                        trabajadoresTemporales:
                            obligacion.requiereTrabajadores
                                ? Number(formEditar.trabajadoresTemporales)
                                : null,

                        trabajadoresPermanentes:
                            obligacion.requiereTrabajadores
                                ? Number(formEditar.trabajadoresPermanentes)
                                : null

                    };

                };

                return {

                    ...obligacion,

                    actividades: obligacion.actividades.map(actualizar),

                    actividadesAgregadas:
                        obligacion.actividadesAgregadas.map(actualizar)

                };

            })

        );

        cancelarEdicion();

    };
    const eliminarActividad = (obligacionId, actividadId) => {

        setObligaciones(prev =>

            prev.map(obligacion => {

                if (obligacion.id !== obligacionId)
                    return obligacion;

                return {

                    ...obligacion,

                    actividadesAgregadas:
                        obligacion.actividadesAgregadas.filter(
                            actividad => actividad.id !== actividadId
                        )

                };

            })

        );

    };
    const obtenerTotalPorObligacion = (obligacion) => {

        const actividades = [
            ...(obligacion.actividades ?? []),
            ...(obligacion.actividadesAgregadas ?? [])
        ];

        return actividades.reduce(

            (total, actividad) =>
                total + Number(actividad.porcentaje),

            0

        );

    };
    const obligacionCompleta = (obligacion) => {

        return obtenerTotalPorObligacion(obligacion) === 100;

    };
    const todasLasObligacionesCompletas = obligaciones.every(

        obligacionCompleta

    );
    const obligacionesDisponibles = catalogoObligaciones.filter(
        ecatalogo => !obligaciones.some(obligacion => obligacion.id === ecatalogo.id)
    );
    const [conAgregados, setConAgregados] = useState(false);

    return (
        <div className="space-y-6">

            <HeaderModulo titulo="Aumento de obligaciones"
                icono="FilePlus2" />

            {!conAgregados && (
                <Obligaciones obligaciones={obligaciones} />

            )
            }


            {/*======================================
    AGREGAR ACTIVIDAD ECONÓMICA
======================================*/}

            <section className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

                {/* Encabezado */}

                <div className="border-b bg-gray-50 px-8 py-6">

                    <h2 className="text-xl font-bold text-slate-800">
                        Agregar Actividad Económica
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Seleccione una obligación fiscal y capture la información correspondiente para asociar una nueva actividad económica al contribuyente.
                    </p>

                </div>

                <div className="p-8">

                    {/* ===================== */}
                    {/* Obligación Fiscal */}
                    {/* ===================== */}

                    <div className="mb-8">

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Obligación Fiscal
                        </label>

                        <select
                            className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-500
                    focus:border-sky-500
                    transition
                "
                            value={formActividad.obligacionId}
                            onChange={(e) =>
                                seleccionarObligacion(e.target.value)
                            }
                        >

                            <option value="">
                                Seleccione una obligación fiscal...
                            </option>

                            {obligacionesDisponibles.map((obligacion) => (

                                <option
                                    key={obligacion.id}
                                    value={obligacion.id}
                                >
                                    {obligacion.nombre}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Separador */}

                    <div className="border-t border-dashed border-gray-300 mb-8"></div>

                    {/* Título */}

                    <div className="mb-5">

                        <h3 className="font-semibold text-slate-700">
                            Datos de la actividad
                        </h3>

                        <p className="text-sm text-gray-500">
                            Capture la información de la actividad económica seleccionada.
                        </p>

                    </div>

                    {/* ===================== */}
                    {/* Datos */}
                    {/* ===================== */}

                    <div className="grid grid-cols-12 gap-6 items-end">

                        {/* Actividad */}

                        <div className="col-span-4">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Actividad Económica
                            </label>

                            <select
                                disabled={!obligacionSeleccionada}
                                value={formActividad.actividadId}
                                onChange={(e) =>
                                    seleccionarActividad(e.target.value)
                                }
                                className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        bg-white
                        disabled:bg-gray-100
                        disabled:text-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-500
                        transition
                    "
                            >

                                <option value="">
                                    Seleccione...
                                </option>

                                {actividadesDisponibles.map((actividad) => (

                                    <option
                                        key={actividad.id}
                                        value={actividad.id}
                                    >
                                        {actividad.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* Porcentaje */}

                        <div className="col-span-2">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Participación (%)
                            </label>

                            <input
                                type="number"
                                min={1}
                                max={100}
                                disabled={!formActividad.actividadId}
                                value={formActividad.porcentaje}
                                onChange={(e) =>
                                    handleChange("porcentaje", e.target.value)
                                }
                                className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        disabled:bg-gray-100
                        disabled:text-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />

                        </div>

                        {/* Trabajadores Temporales */}

                        {requiereTrabajadores && (

                            <div className="col-span-2">

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Trab. Temporales
                                </label>

                                <input
                                    type="number"
                                    min={0}
                                    disabled={!formActividad.porcentaje}
                                    value={formActividad.trabajadoresTemporales}
                                    onChange={(e) =>
                                        handleChange(
                                            "trabajadoresTemporales",
                                            e.target.value
                                        )
                                    }
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            disabled:bg-gray-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-sky-500
                        "
                                />

                            </div>

                        )}

                        {/* Trabajadores Permanentes */}

                        {requiereTrabajadores && (

                            <div className="col-span-2">

                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Trab. Permanentes
                                </label>

                                <input
                                    type="number"
                                    min={0}
                                    disabled={!formActividad.porcentaje}
                                    value={formActividad.trabajadoresPermanentes}
                                    onChange={(e) =>
                                        handleChange(
                                            "trabajadoresPermanentes",
                                            e.target.value
                                        )
                                    }
                                    className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            disabled:bg-gray-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-sky-500
                        "
                                />

                            </div>

                        )}

                        {/* Botón */}

                        <div className={requiereTrabajadores ? "col-span-2" : "col-span-6"}>

                            <button
                                onClick={() => {
                                    agregarObligacion;
                                    setConAgregados(true);
                                }}
                                disabled={!formularioValido}
                                className="
                        w-full
                        h-12
                        rounded-xl
                        bg-sky-600
                        hover:bg-sky-700
                        text-white
                        font-semibold
                        shadow-md
                        hover:shadow-lg
                        transition-all
                        duration-200
                        disabled:bg-gray-300
                        disabled:shadow-none
                        disabled:cursor-not-allowed
                    "
                            >
                                + Agregar Actividad
                            </button>

                        </div>

                    </div>

                </div>

            </section>
            {/*======================================
          RESUMEN DE OBLIGACIONES
      ======================================*/}

            {conAgregados && (
                <section>
                    {!todasLasObligacionesCompletas && (

                        <div
                            className="
        bg-yellow-50
        border
        border-yellow-300
        rounded-lg
        p-4
        text-yellow-800
    "
                        >

                            Para continuar, el porcentaje total de participación de cada obligación fiscal deberá ser igual a 100%.

                        </div>

                    )
                    }
                    <div className="bg-white rounded-lg shadow-xl">

                        <div className="border-b px-6 py-4 flex justify-between items-center">

                            <div>

                                <h2 className="text-lg font-semibold">
                                    Resumen de Obligaciones
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Consulte las actividades económicas asociadas a las obligaciones fiscales del contribuyente.
                                </p>

                            </div>

                        </div>
                        <div className="p-4">
                            <div className="overflow-hidden rounded-lg">

                                <table className="min-w-full divide-y divide-gray-200">

                                    <thead className="bg-slate-100 border-b border-slate-200">

                                        <tr>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Obligación Fiscal
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Actividad Económica
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                %
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Trab. Temp.
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Trab. Perm.
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Tipo
                                            </th>
                                            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 text-center">
                                                Fecha de Inicio de Operaciones
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Acciones
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {obligaciones.map((obligacion) => {

                                            const actividades = [

                                                ...obligacion.actividades.map(a => ({
                                                    ...a, agregado: false
                                                })),

                                                ...obligacion.actividadesAgregadas.map(a => ({
                                                    ...a, agregado: true
                                                }))

                                            ];
                                            console.log(actividades)
                                            return actividades.map((actividad) => (

                                                <tr
                                                    key={`${obligacion.id}-${actividad.id}-${actividad.agregado}`}
                                                    className="
        hover:bg-sky-50
        transition-all
        duration-200
        even:bg-gray-50/40
    "
                                                >

                                                    {/* Obligación */}

                                                    <td className="px-4 py-3 font-medium">

                                                        {obligacion.nombre}

                                                    </td>

                                                    {/* Actividad */}

                                                    <td className="px-4 py-3">

                                                        {actividad.nombre}

                                                    </td>

                                                    {/* Porcentaje */}

                                                    <td className="px-4 py-3 text-center">

                                                        {actividadEditando?.actividadId === actividad.id ? (

                                                            <input
                                                                type="number"
                                                                className="w-20 border rounded p-1 text-center"
                                                                value={formEditar.porcentaje}
                                                                onChange={(e) =>
                                                                    setFormEditar(prev => ({
                                                                        ...prev,
                                                                        porcentaje: e.target.value
                                                                    }))
                                                                }
                                                            />

                                                        ) : (

                                                            `${actividad.porcentaje}%`

                                                        )}

                                                    </td>

                                                    {/* Trabajadores Temporales */}

                                                    <td className="px-4 py-3 text-center">

                                                        {obligacion.requiereTrabajadores
                                                            ? actividad.trabajadoresTemporales
                                                            : "—"}

                                                    </td>

                                                    {/* Trabajadores Permanentes */}

                                                    <td className="px-4 py-3 text-center">

                                                        {obligacion.requiereTrabajadores
                                                            ? actividad.trabajadoresPermanentes
                                                            : "—"}

                                                    </td>

                                                    {/* Tipo */}

                                                    <td className="px-4 py-3 text-center">

                                                        <span
                                                            className={`
px-3
py-1
rounded-full
text-xs
font-semibold
shadow-sm
${actividad.agregado
                                                                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                                                }
`}
                                                        >

                                                            {actividad.agregado
                                                                ? "Agregada"
                                                                : "Existente"}

                                                        </span>

                                                    </td>

                                                    {/* Acciones */}
                                                    <td className="text-center">
                                                        {actividad.fechaOperaciones}
                                                    </td>
                                                    <td>

                                                        {actividadEditando?.actividadId === actividad.id ? (

                                                            <div className="flex justify-center gap-2">
                                                                <button
                                                                    onClick={guardarEdicion}
                                                                    className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-emerald-600
        hover:bg-emerald-700
        text-white
        px-3
        py-2
        text-sm
        transition
    "
                                                                >
                                                                    <Check size={16} />
                                                                    Guardar
                                                                </button>

                                                                <button
                                                                    onClick={cancelarEdicion}
                                                                    className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-gray-500
        hover:bg-gray-600
        text-white
        px-3
        py-2
        text-sm
        transition
    "
                                                                >
                                                                    <X size={16} />
                                                                    Cancelar
                                                                </button>

                                                            </div>

                                                        ) : (

                                                            <div className="flex justify-center gap-2">

                                                                <button
                                                                    onClick={() => editarActividad(obligacion, actividad)}
                                                                    className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-3
        py-2
        text-sm
        transition
    "
                                                                >
                                                                    <Pencil size={16} />
                                                                    Editar
                                                                </button>

                                                                {actividad.agregado && (
                                                                    <button
                                                                        onClick={() =>
                                                                            eliminarActividad(
                                                                                obligacion.id,
                                                                                actividad.id
                                                                            )
                                                                        }
                                                                        className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-red-600
        hover:bg-red-700
        text-white
        px-3
        py-2
        text-sm
        transition
    "
                                                                    >
                                                                        <Trash2 size={16} />
                                                                        Eliminar
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
                        </div>

                        {/* <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${total === 100
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >

                        {total}%


                    </span> */}
                    </div>

                </section>
            )}


            {/*======================================
          NAVEGACIÓN
      ======================================*/}

            <section>

                {/* Botón Regresar */}

                {/* Botón Siguiente */}

            </section>

        </div>
    );
};

export default AumentoObligaciones;
import { useState } from "react";
import CampoInput from "../components/CampoInput";
import CampoSelect from "../components/CampoSelect";
import {
    MinusCircle,
    BriefcaseBusiness,
    BadgeCheck,
    Percent,
    ChevronDown,
    ChevronUp,
    Trash2,
    PieChart,
    Users,
    CircleMinus,
    Check,
    CheckCircle2,
    Pencil
} from "lucide-react";


export default function DisminucionDeObligaciones() {
    const [modalPorcentaje, setModalPorcentaje] = useState(false);
    const [modalGuardado, setModalGuardado] = useState(false);
    const [actividadEditar, setActividadEditar] = useState(null);
    const [nuevaActividad, setNuevaActividad] = useState("");
    const [mostrarSeleccion, setMostrarSeleccion] = useState(false);
    const [mostrarEdicion, setMostrarEdicion] = useState(false);
    const [modalActividad, setModalActividad] = useState(false);
    const [obligacionesDisminuir, setObligacionesDisminuir] = useState([]);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
    const [obligacionSeleccionada, setObligacionSeleccionada] = useState(null);

    const recalcularTrabajadores = () => {

        let temporales = 0;

        let permanentes = 0;

        obligacionesRestantes.forEach((item) => {

            if (item.obligacion === "ISERTP") {

                temporales += Number(item.temporales);

                permanentes += Number(item.permanentes);

            }

        });

        setTotalTemporales(temporales);

        setTotalPermanentes(permanentes);

    };
    const obtenerColorPorcentaje = () => {

        if (porcentajeTotal < 100)
            return "bg-orange-500";

        if (porcentajeTotal > 100)
            return "bg-red-600";

        return "bg-emerald-600";

    };
    const seleccionarObligacion = (item) => {

        setObligacionSeleccionada(
            obligacionSeleccionada === item.id
                ? null
                : item.id
        );

    };
    const actualizarPorcentaje = (id, valor) => {

        const nuevas = obligacionesRestantes.map((item) =>

            item.id === id

                ? {
                    ...item,
                    porcentaje: Number(valor)
                }

                : item

        );

        setObligacionesRestantes(nuevas);

        const total = nuevas.reduce(

            (suma, item) => suma + Number(item.porcentaje),

            0

        );

        setPorcentajeTotal(total);

    };

    const [obligacionEditando, setObligacionEditando] = useState(null);
    const obtenerTextoColor = () => {

        if (porcentajeTotal < 100)
            return "text-orange-600";

        if (porcentajeTotal > 100)
            return "text-red-600";

        return "text-emerald-600";

    };
    const [obligaciones, setObligaciones] = useState([
        {
            id: 1,
            nombre: "ISR Personas Morales",
            estatus: "ACTIVA",
            porcentaje: 100,
            actividades: [
                "Comercio al por mayor",
                "Servicios Profesionales",
            ],
        },
        {
            id: 2,
            nombre: "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal",
            estatus: "ACTIVA",
            porcentaje: 100,
            actividades: [
                "Prestación de Servicios",
            ],
            temporales: 12,
            permanentes: 28,
        },
        {
            id: 3,
            nombre: "Hospedaje",
            estatus: "ACTIVA",
            porcentaje: 100,
            actividades: [
                "Hotel",
            ],
        },
    ]);
    const obligacionesRestantes = obligaciones.filter(
        (item) => item.id !== obligacionSeleccionada
    );
    const obligacionesErogaciones = obligacionesRestantes.filter(
        (o) => o.nombre.includes("Erogaciones")
    );
    const agregarObligacion = () => {

        if (!obligacionSeleccionada) return;

        const obligacion = obligaciones.find(
            o => o.id === Number(obligacionSeleccionada)
        );

        if (!obligacion) return;

        const existe = obligacionesDisminuir.some(
            o => o.id === obligacion.id
        );

        if (existe) return;

        setObligacionesDisminuir([
            ...obligacionesDisminuir,
            obligacion
        ]);

        setObligacionSeleccionada("");

    };
    const actualizarObligacion = (id, campo, valor) => {

        setObligaciones((prev) =>

            prev.map((item) =>

                item.id === id

                    ? {
                        ...item,
                        [campo]: valor,
                    }

                    : item

            )

        );

    };

    const eliminarObligacion = (id) => {

        setObligacionesDisminuir(

            obligacionesDisminuir.filter(
                o => o.id !== id
            )

        );

    };
    const [expandida, setExpandida] = useState(null);

    const guardarDisminucion = () => {

        if (porcentajeTotal !== 100) {

            setModalPorcentaje(true);

            return;

        }

        setModalGuardado(true);

    };
    const totalTemporales = obligacionesRestantes
        .filter(item => item.nombre.includes("Erogaciones"))
        .reduce(
            (total, item) => total + (Number(item.temporales) || 0),
            0
        );

    const totalPermanentes = obligacionesRestantes
        .filter(item => item.nombre.includes("Erogaciones"))
        .reduce(
            (total, item) => total + (Number(item.permanentes) || 0),
            0
        );

    const porcentajeTotal = obligacionesRestantes.reduce(
        (total, item) => total + (Number(item.porcentaje) || 0),
        0
    );
    return (

        <div className="space-y-6">

            {/*======================================================
                    HEADER
            ======================================================*/}

            <div className="bg-white rounded-xl border shadow-sm">

                <div className="px-6 py-6 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-xl bg-red-100 flex items-center justify-center">

                            <MinusCircle
                                size={30}
                                className="text-red-700"
                            />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-slate-800">

                                Disminución de Obligaciones

                            </h2>

                            <p className="text-slate-500 mt-1">

                                El contribuyente actualmente cuenta con las siguientes obligaciones fiscales.

                            </p>

                        </div>

                    </div>

                </div>



            </div>

            {/*======================================================
                    OBLIGACIONES
            ======================================================*/}

            <div className="bg-white rounded-xl border shadow-sm">

                <div className="border-b px-6 py-5">

                    <h3 className="font-semibold text-slate-800">

                        Obligaciones del Contribuyente

                    </h3>

                    <p className="text-sm text-slate-500 mt-1">

                        Consulte las obligaciones fiscales vigentes registradas para el contribuyente.

                    </p>

                </div>

                {/* Obligaciones adquiridas */}
                <div className="p-6 space-y-5">

                    {obligaciones
                        .filter(
                            (item) =>
                                obligacionSeleccionada === null ||
                                item.id === obligacionSeleccionada
                        )
                        .map((item) => (

                            <div
                                key={item.id}
                                className={`
    rounded-xl
    border
    overflow-hidden
    transition-all
    ${obligacionSeleccionada === item.id
                                        ? "border-red-600 bg-red-50 shadow-md"
                                        : "border-slate-200 bg-white"
                                    }
`}
                            >

                                {/* HEADER CARD */}

                                <div className="flex justify-between items-center px-5 py-4 bg-slate-50">

                                    <div className="flex items-center gap-4">

                                        <div className="h-11 w-11 rounded-lg bg-red-100 flex items-center justify-center">

                                            <BriefcaseBusiness
                                                size={22}
                                                className="text-red-700"
                                            />

                                        </div>

                                        <div>

                                            <h4 className="font-semibold text-slate-800">

                                                {item.nombre}

                                            </h4>

                                            <p className="text-sm text-slate-500">

                                                {item.actividades.length} Actividad(es) Económica(s)

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between gap-4">

                                        {/* Estado */}
                                        <div>

                                            {obligacionSeleccionada === item.id && (

                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">

                                                    <CheckCircle2 size={16} />

                                                    Obligación seleccionada para disminuir

                                                </span>

                                            )}

                                        </div>

                                        {/* Acciones */}

                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() => {
                                                    seleccionarObligacion(item);
                                                    setObligacionSeleccionada(
                                                        obligacionSeleccionada === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                }
                                                className={`
                                                rounded-lg
                                                 border
                                                 p-2
                                                 transition-all
                                                 ${obligacionSeleccionada === item.id
                                                        ? "bg-red-700 text-white border-red-700"
                                                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                    }
                                                  `}
                                                title="Seleccionar obligación para disminuir"
                                            >

                                                {obligacionSeleccionada === item.id ? (

                                                    <div className="flex items-center gap-2">
                                                        <Check size={18} />
                                                        <span className="hidden md:inline">
                                                            Seleccionada
                                                        </span>
                                                    </div>

                                                ) : (

                                                    <div className="flex items-center gap-2">
                                                        <CircleMinus size={18} />
                                                        <span className="hidden md:inline">
                                                            Disminuir
                                                        </span>
                                                    </div>
                                                )}



                                            </button>

                                            <button
                                                onClick={() =>
                                                    setExpandida(
                                                        expandida === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                className="rounded-lg border p-2 hover:bg-white"
                                                title="Ver detalle"
                                            >

                                                {expandida === item.id
                                                    ? <ChevronUp size={20} />
                                                    : <ChevronDown size={20} />
                                                }

                                            </button>

                                        </div>

                                    </div>

                                </div>

                                {/* DETALLE */}

                                {expandida === item.id && (

                                    <div className="p-6">

                                        <div className="grid lg:grid-cols-3 gap-6">

                                            <div>

                                                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                    Actividades Económicas

                                                </p>

                                                <div className="space-y-2">

                                                    {item.actividades.map((actividad) => (

                                                        <div
                                                            key={actividad}
                                                            className="rounded-lg bg-slate-100 px-3 py-2 text-sm"
                                                        >

                                                            {actividad}

                                                        </div>

                                                    ))}

                                                </div>

                                            </div>

                                            <div>

                                                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                    Participación

                                                </p>

                                                <div className="flex items-center gap-2">

                                                    <Percent
                                                        size={18}
                                                        className="text-sky-700"
                                                    />

                                                    <span className="font-semibold">

                                                        {item.porcentaje} %

                                                    </span>

                                                </div>

                                            </div>

                                            <div>

                                                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                                                    Estatus

                                                </p>

                                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium">

                                                    <BadgeCheck size={16} />

                                                    {item.estatus}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>

                        ))}

                </div>

            </div>

            {obligacionSeleccionada && (

                <div className="grid lg:grid-cols-2 gap-6">

                    {/*TRABAJADORES TOTALES*/}

                    {obligacionesErogaciones.length > 0 && (

                        <div className="bg-white rounded-xl border shadow-sm">

                            <div className="border-b px-6 py-5 flex items-center gap-3">

                                <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center">

                                    <Users
                                        size={20}
                                        className="text-violet-700"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold">

                                        Información de Trabajadores

                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">

                                        Total de trabajadores registrados.

                                    </p>

                                </div>

                            </div>

                            <div className="p-6">

                                <div className="grid grid-cols-2 gap-5">

                                    <div className="rounded-xl bg-sky-50 border p-5">

                                        <p className="text-sm text-slate-500">

                                            Temporales

                                        </p>

                                        <h2 className="text-4xl font-bold text-sky-700 mt-3">

                                            {totalTemporales}

                                        </h2>

                                    </div>

                                    <div className="rounded-xl bg-emerald-50 border p-5">

                                        <p className="text-sm text-slate-500">

                                            Permanentes

                                        </p>

                                        <h2 className="text-4xl font-bold text-emerald-700 mt-3">

                                            {totalPermanentes}

                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                    {/*PORCENTAJE PARTICIPACIÓN*/}

                    <div className={`
                        ${(obligacionSeleccionada && obligacionesErogaciones.length === 0 )? "col-span-2" : ""} 
                        "bg-white rounded-xl border shadow-sm
                        `}>

                        <div className="bg-white border-b px-6 py-5 flex items-center gap-3">

                            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">

                                <PieChart
                                    size={20}
                                    className="text-amber-700"
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    Porcentaje de Participación

                                </h3>

                                <p className="text-sm text-slate-500 mt-1">

                                    Total acumulado de participación.

                                </p>

                            </div>

                        </div>

                        <div className=" bg-white p-6 space-y-6">

                            {/* Barra */}

                            {/* <div>

                                <div className="flex justify-between mb-2">

                                    <span>

                                        Participación Total

                                    </span>

                                    <span className={`font-semibold ${obtenerTextoColor()}`}>

                                        {porcentajeTotal}%

                                    </span>

                                </div>

                                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                                    <div

                                        className={`${obtenerColorPorcentaje()} h-full transition-all`}

                                        style={{

                                            width: `${Math.min(porcentajeTotal, 100)}%`

                                        }}

                                    />

                                </div>

                            </div> */}

                            {/* Indicadores */}

                            <div className="grid grid-cols-2 gap-5">

                                <div className="rounded-xl border bg-slate-50 p-5">

                                    <p className="text-sm text-slate-500">

                                        Participación

                                    </p>

                                    <h2 className={`text-4xl font-bold mt-3 ${obtenerTextoColor()}`}>

                                        {porcentajeTotal}%

                                    </h2>

                                </div>

                                <div className="rounded-xl border bg-slate-50 p-5">

                                    <p className="text-sm text-slate-500">

                                        Estatus

                                    </p>

                                    <h2 className={`text-xl font-bold mt-4 ${obtenerTextoColor()}`}>

                                        {

                                            porcentajeTotal < 100

                                                ? "INCOMPLETO"

                                                : porcentajeTotal > 100

                                                    ? "EXCEDIDO"

                                                    : "CORRECTO"

                                        }

                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* Obligaciones a mostrar  */}
            {obligacionSeleccionada && (

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="border-b px-6 py-5">

                        <h3 className="font-semibold text-slate-800">

                            Obligaciones del Contribuyente

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                            Actualice la información de las obligaciones fiscales que permanecerán registradas.

                        </p>

                    </div>

                    <div className="p-6 space-y-5">

                        <div className="space-y-4">

                            {obligacionesRestantes.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl border shadow-sm"
                                >

                                    {/* HEADER */}

                                    <div className="px-6 py-5 flex justify-between items-center">

                                        <div className="flex-1">

                                            <h3 className="font-semibold text-slate-800">

                                                {item.nombre}

                                            </h3>

                                            <div className="flex flex-wrap gap-3 mt-4">

                                                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

                                                    <BriefcaseBusiness
                                                        size={16}
                                                        className="text-slate-600"
                                                    />

                                                    <span className="text-sm text-slate-700">

                                                        {item.actividades[0]}

                                                    </span>

                                                </div>

                                                <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2">

                                                    <Percent
                                                        size={16}
                                                        className="text-sky-700"
                                                    />

                                                    <span className="text-sm font-semibold text-sky-700">

                                                        {item.porcentaje}%

                                                    </span>

                                                </div>

                                                {item.nombre.includes("Erogaciones") && (

                                                    <>

                                                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">

                                                            <Users
                                                                size={16}
                                                                className="text-orange-700"
                                                            />

                                                            <span className="text-sm font-semibold text-orange-700">

                                                                Temp. {item.temporales}

                                                            </span>

                                                        </div>

                                                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2">

                                                            <Users
                                                                size={16}
                                                                className="text-emerald-700"
                                                            />

                                                            <span className="text-sm font-semibold text-emerald-700">

                                                                Perm. {item.permanentes}

                                                            </span>

                                                        </div>

                                                    </>

                                                )}

                                            </div>

                                        </div>

                                        {obligacionEditando !== item.id && (
                                            <button
                                                onClick={() =>
                                                    setObligacionEditando(
                                                        obligacionEditando === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${obligacionEditando === item.id
                                                    ? "bg-emerald-600 text-white"
                                                    : "border hover:bg-slate-50"
                                                    }`}
                                            >

                                                {obligacionEditando === item.id ? (
                                                    <>
                                                        <Check size={18} />
                                                        Listo
                                                    </>
                                                ) : (
                                                    <>
                                                        <Pencil size={18} />
                                                        Editar
                                                    </>
                                                )}

                                            </button>
                                        )}

                                    </div>

                                    {/* EDICIÓN */}

                                    {obligacionEditando === item.id && (

                                        <div className="border-t bg-slate-50">

                                            {/* Encabezado */}

                                            <div className="px-6 py-5 border-b flex items-center gap-3">

                                                <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">

                                                    <Pencil
                                                        size={20}
                                                        className="text-amber-700"
                                                    />

                                                </div>

                                                <div>

                                                    <h4 className="font-semibold text-slate-800">

                                                        Editar Información

                                                    </h4>

                                                    <p className="text-sm text-slate-500">

                                                        Modifique únicamente la información permitida para esta obligación fiscal.

                                                    </p>

                                                </div>

                                            </div>

                                            {/* Formulario */}

                                            <div className="p-6">

                                                <div className="grid lg:grid-cols-2 gap-6">

                                                    <div className="rounded-xl border bg-white p-5">

                                                        <CampoSelect
                                                            etiqueta="Actividad Económica"
                                                            value={item.actividades[0]}
                                                            opciones={item.actividades.map(a => ({
                                                                value: a,
                                                                label: a
                                                            }))}
                                                            disabled
                                                        />

                                                    </div>

                                                    <div className="rounded-xl border bg-white p-5">

                                                        <CampoInput
                                                            etiqueta="Porcentaje de Participación"
                                                            type="number"
                                                            value={item.porcentaje}
                                                            onChange={(e) =>
                                                                actualizarObligacion(
                                                                    item.id,
                                                                    "porcentaje",
                                                                    Number(e.target.value)
                                                                )
                                                            }
                                                        />

                                                    </div>

                                                    {item.nombre.includes("Erogaciones") && (

                                                        <>

                                                            <div className="rounded-xl border bg-sky-50 p-5">

                                                                <CampoInput
                                                                    etiqueta="Trabajadores Temporales"
                                                                    type="number"
                                                                    value={item.temporales}
                                                                    onChange={(e) =>
                                                                        actualizarObligacion(
                                                                            item.id,
                                                                            "temporales",
                                                                            Number(e.target.value)
                                                                        )
                                                                    }
                                                                />

                                                            </div>

                                                            <div className="rounded-xl border bg-emerald-50 p-5">

                                                                <CampoInput
                                                                    etiqueta="Trabajadores Permanentes"
                                                                    type="number"
                                                                    value={item.permanentes}
                                                                    onChange={(e) =>
                                                                        actualizarObligacion(
                                                                            item.id,
                                                                            "permanentes",
                                                                            Number(e.target.value)
                                                                        )
                                                                    }
                                                                />

                                                            </div>

                                                        </>

                                                    )}

                                                </div>

                                                <div className="mt-8 flex justify-end">

                                                    <button
                                                        onClick={() => setObligacionEditando(null)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
                                                    >

                                                        <Check size={18} />

                                                        Finalizar Edición

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            )}

            {/*botones  */}
            {mostrarEdicion && (

                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="px-6 py-5 flex justify-between">

                        <button

                            className="px-6 py-3 rounded-lg border hover:bg-slate-50"

                        >

                            Regresar

                        </button>

                        <button
                            onClick={guardarDisminucion}
                            className="px-6 py-3 rounded-lg bg-red-700 hover:bg-red-800 text-white"

                        >

                            Guardar Disminución

                        </button>

                    </div>

                </div>

            )}
            {
                modalActividad && (

                    <Modal
                        titulo="Cambio de Actividad Económica"
                        onClose={() => setModalActividad(false)}
                    >

                        <div className="space-y-6">

                            <CampoSelect
                                etiqueta="Actividad Económica"
                                value={nuevaActividad}
                                onChange={(e) => setNuevaActividad(e.target.value)}
                                opciones={[
                                    "Comercio",
                                    "Servicios",
                                    "Construcción",
                                    "Hospedaje",
                                    "Industria"
                                ]}
                            />

                            <div className="flex justify-end gap-3">

                                <BotonSecundario
                                    onClick={() => setModalActividad(false)}
                                >

                                    Cancelar

                                </BotonSecundario>

                                <BotonPrimario
                                    onClick={() => {

                                        actualizarActividad(
                                            actividadEditar,
                                            "actividad",
                                            nuevaActividad
                                        );

                                        setModalActividad(false);

                                    }}
                                >

                                    Aceptar

                                </BotonPrimario>

                            </div>

                        </div>

                    </Modal>

                )
            }
            {
                modalPorcentaje && (

                    <Modal
                        titulo="Porcentaje Incorrecto"
                        onClose={() => setModalPorcentaje(false)}
                    >

                        <div className="space-y-5">

                            <div className="rounded-xl bg-orange-50 border border-orange-200 p-5">

                                <p className="text-orange-700 font-medium">

                                    El porcentaje total de participación debe ser igual al 100%.

                                </p>

                            </div>

                            <div className="flex justify-end">

                                <BotonPrimario
                                    onClick={() => setModalPorcentaje(false)}
                                >

                                    Aceptar

                                </BotonPrimario>

                            </div>

                        </div>

                    </Modal>

                )
            }
            {
                modalGuardado && (

                    <Modal
                        titulo="Disminución de Obligaciones"
                        onClose={() => setModalGuardado(false)}
                    >

                        <div className="space-y-5">

                            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5">

                                <p className="text-emerald-700 font-medium">

                                    Se ha guardado correctamente la disminución de obligaciones.

                                </p>

                            </div>

                            <div className="flex justify-end">

                                <BotonPrimario
                                    onClick={() => {

                                        setModalGuardado(false);

                                        // navegar a Finalizado

                                    }}
                                >

                                    Aceptar

                                </BotonPrimario>

                            </div>

                        </div>

                    </Modal>

                )
            }

        </div>

    );

}
import React, { useState } from "react";
import Input from "./Input";
import CampoSelect from "./CampoSelect";
import CampoInput from "./CampoInput";
import CampoTextArea from "./CampoTextArea";
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
    MapPinHouse,
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
    Repeat,
    Eye,
    CirclePlus,
    Info
} from "lucide-react";
export default function DomicilioFiscal({
    titulo = "Datos del domicilio fiscal",
    onGuardar,
    onCancelar,
    className = ""

}) {



    const obligacionesDisponibles = [
        {
            id: 1,
            nombre: "Impuesto Sobre Nóminas"
        },
        {
            id: 2,
            nombre: "Impuesto Sobre Hospedaje"
        },
        {
            id: 3,
            nombre: "Impuesto Cedular"
        }
    ];

    const [obligacionesSeleccionadas, setObligacionesSeleccionadas] = useState([]);
    const [obligacionSeleccionada, setObligacionSeleccionada] = useState("");

    const agregarObligacion = (id) => {
        if (!id) return;
        console.log(id);
        const obligacion = obligacionesDisponibles.find(
            (item) => item.id === Number(id)
        );

        if (!obligacion) return;

        const yaExiste = obligacionesSeleccionadas.some(
            (item) => item.id === obligacion.id
        );

        if (!yaExiste) {
            setObligacionesSeleccionadas([
                ...obligacionesSeleccionadas,
                obligacion
            ]);
        }

        // Regresar el selector a su estado inicial
        setObligacionSeleccionada("");
    };

    const eliminarObligacion = (id) => {
        setObligacionesSeleccionadas(
            obligacionesSeleccionadas.filter(
                (item) => item.id !== id
            )
        );
    }; const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
    const [mostrarFormularioDomicilio, setMostrarFormularioDomicilio] = useState(false);
    const [ambito, setAmbito] = useState("");
    const [domicilios] = useState([
        {
            id: 1,
            tipo: "Fiscal",
            direccion:
                "Av. Universidad No. 100, Col. Centro, Oaxaca de Juárez, Oaxaca"
        },
        {
            id: 2,
            tipo: "Sucursal",
            direccion:
                "Calle Reforma No. 250, Col. Reforma, Oaxaca de Juárez, Oaxaca"
        },
        {
            id: 3,
            tipo: "Matriz",
            direccion:
                "Blvd. Eduardo Vasconcelos No. 500, Oaxaca de Juárez, Oaxaca"
        }
    ]);

    return (
        <div className="">
            {/* FORMULARIO */}
            <div className="overflow-hidden shadow-md mb-4">

                <div className="bg-white shadow-md overflow-hidden rounded-lg">

                    <section className="px-6 py-4 bg-white">

                        <CampoInput etiqueta="Nombre del Establecimiento" obligatorio={true} />

                    </section>
                    <div className="px-6 space-y-5 mb-4 pb-5">

                        {/* BÚSQUEDA POR CÓDIGO POSTAL */}

                        <section>

                            {/* <h3 className="font-medium text-slate-700 mb-4">
                                Búsqueda por Código Postal
                            </h3> */}

                            <div className="grid md:grid-cols-3 gap-4">

                                <CampoInput
                                    etiqueta="Código Postal *"
                                    placeholder="68000"
                                />

                            </div>

                        </section>

                        {/* DATOS GENERALES */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Datos Generales del Domicilio
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <CampoSelect
                                    etiqueta="Tipo de Ámbito"
                                    obligatorio
                                    value={ambito}
                                    onChange={(e) => setAmbito(e.target.value)}
                                    opciones={[
                                        {
                                            value: "",
                                            label: "Seleccione..."
                                        },
                                        {
                                            value: "URBANO",
                                            label: "Urbano"
                                        },
                                        {
                                            value: "RURAL",
                                            label: "Rural"
                                        }
                                    ]}
                                />

                                <CampoInput etiqueta="Región *" />

                                <CampoInput etiqueta="Distrito *" />

                                <CampoInput etiqueta="Municipio / Delegación *" />

                                <CampoInput etiqueta="Localidad *" />

                                <CampoInput etiqueta="Tipo de Asentamiento *" />

                                <CampoInput etiqueta="Nombre del Asentamiento *" />

                                <CampoInput etiqueta="Tipo de Inmueble *" />

                            </div>

                        </section>

                        {/* UBICACIÓN */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Ubicación del Domicilio
                            </h3>

                            {
                                ambito === "URBANO" ? (

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <CampoInput etiqueta="Tipo de Vialidad *" />

                                        <CampoInput etiqueta="Nombre de Vialidad *" />

                                        <CampoInput etiqueta="Número Exterior y/o Letra *" />

                                        <CampoInput etiqueta="Número Interior y/o Letra" />

                                        <CampoInput etiqueta="Entre Vialidad *" />

                                        <CampoInput etiqueta="Y Vialidad *" />

                                        <CampoInput etiqueta="Ubicación del Inmueble dentro de la Manzana" />

                                    </div>

                                ) : (

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <CampoInput etiqueta="Tipo de Vía de Comunicación *" />

                                        <CampoInput etiqueta="Nombre de Vía de Comunicación *" />

                                        <CampoInput etiqueta="Tramo *" />

                                    </div>

                                )
                            }

                        </section>

                        {/* INFORMACIÓN COMPLEMENTARIA */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Información Complementaria
                            </h3>

                            <div className="space-y-4">

                                <CampoTextArea etiqueta="Caracteristicas del domicilio" />
                                <CampoTextArea etiqueta="Referencias adicionales" />


                            </div>

                        </section>

                        {/* GEOLOCALIZACIÓN */}

                        <section>

                            <div className="flex items-center gap-2 mb-4">

                                <MapPin
                                    size={18}
                                    className="text-sky-700"
                                />

                                <h3 className="font-medium text-slate-700">
                                    Geolocalización
                                </h3>

                            </div>

                            <div className="h-80 rounded-xl border bg-slate-100 flex items-center justify-center text-slate-500">

                                Área de Google Maps

                            </div>

                        </section>

                    </div>
                </div>

            </div >

            {/* OBLIGACIONES FISCALES */}
            <div className="flex flex-col rounded-lg p-5 shadow-lg bg-white gap-4">
                {/* Header */}
                <div className="flex items-center gap-2">

                    <span className="bg-blue-100 rounded-lg">
                        <Building2
                            size={20}
                            className="text-sky-700 m-3"
                        />
                    </span>

                    <div className="flex flex-col">

                        <h4 className="font-semibold text-slate-700">
                            Obligaciones fiscales
                        </h4>

                        <p className="text-sm text-slate-500 mt-1">
                            Seleccione las obligaciones fiscales que desea vincular al domicilio del establecimiento.
                            <b>  Puede seleccionar una o más obligaciones fiscales.  </b>
                        </p>

                    </div>
                </div>

                <div className="rounded-xl border-slate-200">
                    <div className="flex gap-2 items-end">
                        {/* SELECTOR */}
                        <CampoSelect
                            etiqueta="Obligación Fiscal"
                            value={obligacionSeleccionada}
                            onChange={(e) => {
                                setObligacionSeleccionada(e.target.value);
                            }}
                            opciones={[
                                {
                                    key: "",
                                    value: "",
                                    label: "Seleccione una obligación fiscal"

                                },
                                ...obligacionesDisponibles
                                    .filter((obligacion) =>
                                        !obligacionesSeleccionadas.some(
                                            (seleccionada) =>
                                                obligacion.id === seleccionada.id
                                        )
                                    )
                                    .map((obligacion) => ({
                                        key: obligacion.id,
                                        value: obligacion.id,
                                        label: obligacion.nombre
                                    }))
                            ]}
                        />
                        <button
                            type="button"
                            onClick={() => agregarObligacion(obligacionSeleccionada)}
                            className="
        border
        border-slate-200
        bg-blue-600
        text-white
        rounded-lg
        px-4
        py-2
        hover:bg-white
        hover:text-slate-700
        shadow-md
        h-13
        whitespace-nowrap
        transition-colors
    "
                        >
                            + Agregar obligación
                        </button>
                    </div>
                    {/* OBLIGACIONES SELECCIONADAS */}
                    {obligacionesSeleccionadas.length > 0 && (
                        <div className="
    flex
    flex-wrap
    gap-2
    mt-4
    p-4
    rounded-lg
    border
    border-dotted
    border-slate-300
    min-h-[120px]
">
                            {obligacionesSeleccionadas.map((obligacion) => (
                                <span
                                    key={obligacion.id}
                                    className="
                inline-flex
                items-center
                gap-2
                h-fit
                px-3
                py-2
                rounded-full
                bg-sky-100
                text-sky-700
                text-sm
                font-medium
            "
                                >
                                    {obligacion.nombre}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            eliminarObligacion(obligacion.id)
                                        }
                                        className="
                    flex
                    items-center
                    justify-center
                    rounded-full
                    hover:bg-sky-200
                    transition-colors
                "
                                        title="Eliminar obligación"
                                    >
                                        <X size={15} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* SIN OBLIGACIONES */}
                    {obligacionesSeleccionadas.length === 0 && (
                        <div className="
    flex
    flex-col
    items-center
    justify-center
    mt-4
    p-6
    border
    border-dotted
    border-slate-300
    rounded-lg
    text-center
">
                            <Info
                                size={40}
                                className="text-slate-400"
                            />

                            <h1 className="text-sm font-medium text-slate-500 mt-3">
                                Sin obligaciones fiscales seleccionadas.
                            </h1>

                            <p className="text-sm text-slate-400 mt-2 max-w-xl">
                                Seleccione una obligación fiscal del selector y haga clic en el botón{" "}
                                <b className="font-semibold text-slate-500">
                                    + Agregar obligación
                                </b>{" "}
                                para vincularla al domicilio del establecimiento.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div >

    );
}
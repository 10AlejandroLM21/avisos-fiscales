import React, { useState } from "react";
import Input from "../components/Input";
import CampoSelect from "../components/CampoSelect";
import CampoInput from "../components/CampoInput";
import ModalFormulario from "../components/ModalFormulario";
import DetalleDomicilio from "../components/DetalleDomicilio";
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
    Repeat,
    Eye,
    Check
} from "lucide-react";
export default function DomicilioFiscal({
    onGuardar,
    onCancelar,
    className = "",
    titulo = "",
    descripcion = ""
}) {
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
    const [mostrarFormularioDomicilio, setMostrarFormularioDomicilio] = useState(false);
    const [openDetalle, setOpenDetalle] = useState(false);
    const [establecimientoDetalle, setEstablecimientoDetalle] = useState(null);
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
        <div className={`"bg-white rounded-xl ${className}" mt-6`}>

            {!mostrarFormularioDomicilio && (
                <div>
                    {!domicilioSeleccionado && (
                        <div className="rounded-xl border border-sky-200 bg-sky-50/30 overflow-hidden">
                          
                            {/* Header */}
                            <div className="bg-white border-b border-sky-200 px-6 py-5 flex justify-between items-center">

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                        <Building2
                                            className="text-sky-700"
                                            size={24}
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            {titulo}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {descripcion}
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => setMostrarFormularioDomicilio(true)}
                                    className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
                                >
                                    + Agregar Domicilio fiscal
                                </button>

                            </div>

                            <div className="overflow-x-auto p/2 flex flex-col gap-4 p-4 mt-2">

                                {domicilios.map((domicilio) => (

                                    <div
                                        key={domicilio.id}
                                        className={`
            relative
            flex
            overflow-hidden
            rounded-xl
            border
            transition-all
            hover:shadow-md
            ${domicilioSeleccionado?.id === domicilio.id
                                                ? "border-emerald-500 bg-emerald-50 shadow-sm"
                                                : "border-slate-200 bg-white hover:border-sky-500"
                                            }
        `}
                                    >

                                        {/* Indicador */}

                                        <div
                                            className={`w-2 ${domicilioSeleccionado?.id === domicilio.id
                                                ? "bg-emerald-600"
                                                : "bg-slate-300"
                                                }`}
                                        />

                                        <div className="flex-1 p-5">

                                            {domicilioSeleccionado?.id === domicilio.id && (

                                                <div className="mb-5">

                                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">

                                                        <CheckCircle size={14} />

                                                        Domicilio Seleccionado

                                                    </span>

                                                </div>

                                            )}

                                            <div className="grid md:grid-cols-2 gap-5">

                                                {/* Tipo */}

                                                <div>

                                                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                                                        Tipo de Domicilio
                                                    </p>

                                                    <div className="flex items-center gap-2">

                                                        <Home
                                                            size={18}
                                                            className="text-sky-700"
                                                        />

                                                        <span className="font-medium text-slate-800">
                                                            {domicilio.tipo}
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* Código Postal */}

                                                <div>

                                                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                                                        Código Postal
                                                    </p>

                                                    <div className="flex items-center gap-2">

                                                        <MapPin
                                                            size={18}
                                                            className="text-sky-700"
                                                        />

                                                        <span className="text-slate-700">
                                                            {domicilio.codigoPostal}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Domicilio */}

                                            <div className="mt-5">

                                                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                                                    Domicilio
                                                </p>

                                                <div className="flex gap-2">

                                                    <MapPin
                                                        size={18}
                                                        className="text-sky-700 mt-1"
                                                    />

                                                    <p className="text-slate-700 leading-6">
                                                        {domicilio.direccion}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Acciones */}

                                            <div className="mt-6 flex justify-end gap-3">

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEstablecimientoDetalle(domicilio);
                                                        setOpenDetalle(true);
                                                    }}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-50"
                                                >
                                                    <Eye size={18} />
                                                    Ver domicilio
                                                </button>

                                                {domicilioSeleccionado?.id === domicilio.id ? (

                                                    <button
                                                        type="button"
                                                        onClick={() => setDomicilioSeleccionado(null)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-800"
                                                    >
                                                        <Repeat size={18} />
                                                        Seleccionar otro domicilio
                                                    </button>

                                                ) : (

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDomicilioSeleccionado(domicilio);
                                                        }}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white hover:bg-sky-800"
                                                    >
                                                        <Check size={18} />
                                                        Seleccionar domicilio
                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        </div>

                    )}
                </div>
            )}

            {domicilioSeleccionado && (

                <div className="bg-white rounded-xl border border-green-300 shadow-sm mt-6">

                    <div className="border-b px-6 py-5 bg-green-50">
                        <h3 className="text-lg font-semibold text-green-800">
                            Domicilio Seleccionado
                        </h3>

                        <p className="text-sm text-green-700 mt-1">
                            El siguiente domicilio será utilizado para la conservación de la
                            contabilidad y notificaciones.
                        </p>
                    </div>

                    <div className="p-6">

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Tipo de Domicilio
                                </p>

                                <p className="font-medium text-slate-800 mt-1">
                                    {domicilioSeleccionado.tipo}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Tipo de Ámbito
                                </p>

                                <p className="font-medium text-slate-800 mt-1">
                                    {domicilioSeleccionado.ambito}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Domicilio
                            </p>

                            <p className="mt-2 text-slate-800 leading-relaxed">
                                {domicilioSeleccionado.direccion}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end gap-2 ">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDetalle(true);
                                }}
                                className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            border
                            hover:bg-slate-50
                            text-sm
                            font-medium
                            flex 
                            items-center 
                            gap-2
                        "
                            >
                                <Eye size={18} />
                                Ver domicilio
                            </button>
                            <button
                                type="button"
                                onClick={() => setDomicilioSeleccionado(null)}
                                className="px-5 py-2 border border-black-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                            >
                                <Repeat size={18} />
                                Seleccionar otro domicilio                            </button>
                        </div>

                    </div>
                </div>

            )}
            {mostrarFormularioDomicilio && (

                <div className="bg-white rounded-xl border shadow-sm overflow-hidden mt-6">

                    <div className="border-b bg-sky-50 px-6 py-4 flex items-center justify-between">

                        <div>

                            <h2 className="font-semibold text-slate-800">
                                Nuevo Domicilio Fiscal
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Capture la información correspondiente al domicilio fiscal.
                            </p>

                        </div>

                    </div>

                    <div className="p-6 space-y-8">

                        {/* Aquí van todas las secciones */}

                        <div className="p-6 space-y-8">

                            {/* BÚSQUEDA POR CÓDIGO POSTAL */}

                            <section>

                                <h3 className="font-medium text-slate-700 mb-4">
                                    Búsqueda por Código Postal
                                </h3>

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

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Características del Domicilio
                                        </label>

                                        <textarea
                                            rows="3"
                                            className="w-full border rounded-lg p-3"
                                            placeholder="Capture las características del domicilio"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Referencias Adicionales
                                        </label>

                                        <textarea
                                            rows="3"
                                            className="w-full border rounded-lg p-3"
                                            placeholder="Capture referencias adicionales"
                                        />

                                    </div>

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

                    <div className="border-t bg-slate-50 px-6 py-5 flex justify-end gap-3">

                        <button
                            onClick={() => setMostrarFormularioDomicilio(false)}
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={() => {
                                onGuardar();
                                setMostrarFormularioDomicilio(false);
                            }}
                            className="px-5 py-2 rounded-lg bg-green-700 text-white flex items-center gap-2"
                        >
                            <Repeat size={18} />
                            Modificar selección
                        </button>

                    </div>

                </div>

            )}
            {openDetalle && (

                <ModalFormulario
                    abierto={openDetalle}
                    onClose={() => setOpenDetalle(false)}
                    titulo="Domicilio para notificaciones"
                    descripcion="Consulte la información correspondiente al domicilio para recibir notificaciones."
                    icono={<Home className="text-white" size={28} />}
                    textoBoton="Cerrar"
                >

                    <DetalleDomicilio
                        domicilio={establecimientoDetalle}
                    />

                </ModalFormulario>

            )
            }
        </div>
    );
}
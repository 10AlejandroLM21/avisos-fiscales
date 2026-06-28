import React, { useState } from "react";
import Input from "../components/Input";
import CampoSelect from "../components/CampoSelect";
import CampoInput from "../components/CampoInput";
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
    Save
} from "lucide-react";
export default function DomicilioFiscal({
    titulo = "Domicilio fiscal del representante legal",
    onGuardar,
    onCancelar,
    className = ""

}) {
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
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
        <div className={`"bg-white rounded-xl ${className}"`}>

            {!mostrarFormularioDomicilio && (
                <div>


                    {!domicilioSeleccionado && (
                        <div className="rounded-xl border border-sky-200 bg-sky-50/30 overflow-hidden">
                            {/* Header */}

                            <div className="border-b bg-white px-6 py-5 flex justify-between items-center">

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                        <Building2
                                            className="text-sky-700"
                                            size={24}
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            Datos Generales del Domicilio
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            Capture o verifique la información general correspondiente al domicilio fiscal.
                                        </p>

                                    </div>

                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMostrarFormularioDomicilio(true)}
                                    className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
                                >
                                    + Agregar Domicilio Fiscal
                                </button>
                            </div>

                            <div className="overflow-x-auto p/2">

                                <table className="w-full text-sm">

                                    <thead className="bg-slate-100">

                                        <tr>
                                            <th className="p-3 text-left">ID</th>
                                            <th className="p-3 text-left">Tipo Domicilio</th>
                                            <th className="p-3 text-left">Domicilio</th>
                                            <th className="p-3 text-center">Seleccionar</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {domicilios.map((domicilio) => (

                                            <tr
                                                key={domicilio.id}
                                                className="border-t hover:bg-slate-50"
                                            >

                                                <td className="p-3">
                                                    {domicilio.id}
                                                </td>

                                                <td className="p-3">
                                                    {domicilio.tipo}
                                                </td>

                                                <td className="p-3">
                                                    {domicilio.direccion}
                                                </td>

                                                <td className="p-3 text-center">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDomicilioSeleccionado(domicilio)
                                                        }
                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                                    >
                                                        Continuar
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    )}

                </div>


            )}

            {domicilioSeleccionado && (

                <div className="p-6 bg-sky-50 border-t">
                    <div class="flex justify-between">
                        <h4 className="font-semibold text-slate-800 mb-4">
                            Domicilio Seleccionado
                        </h4>
                        <button
                            type="button"
                            onClick={() => setDomicilioSeleccionado(null)}
                            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg transition"
                        >
                            Cambiar domicilio
                        </button>
                    </div>


                    <div className="grid md:grid-cols-3 gap-4">

                        <div>
                            <label className="text-xs text-slate-500">
                                Tipo
                            </label>

                            <div className="font-medium">
                                {domicilioSeleccionado.tipo}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-500">
                                Domicilio
                            </label>

                            <div className="font-medium">
                                {domicilioSeleccionado.direccion}
                            </div>
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
                            className="px-5 py-2 rounded-lg bg-green-700 text-white"
                        >
                            Guardar Domicilio
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}